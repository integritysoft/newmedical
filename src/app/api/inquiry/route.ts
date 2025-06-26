import { NextRequest, NextResponse } from 'next/server'
import { sendInquiryEmail } from '@/lib/email'
import fs from 'fs/promises'
import path from 'path'

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 60 * 1000 // 1 hour
  const maxRequests = 5

  const requests = rateLimitStore.get(ip) || []
  const recentRequests = requests.filter(time => now - time < windowMs)
  
  if (recentRequests.length >= maxRequests) {
    return true
  }

  recentRequests.push(now)
  rateLimitStore.set(ip, recentRequests)
  return false
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    
    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.message || !body.providerId || !body.providerName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Sanitize input
    const inquiry = {
      id: Date.now().toString(),
      name: body.name.slice(0, 100),
      email: body.email.slice(0, 100),
      phone: body.phone?.slice(0, 50) || '',
      country: body.country?.slice(0, 100) || '',
      treatment: body.treatment?.slice(0, 100) || '',
      message: body.message.slice(0, 1000),
      providerId: body.providerId,
      providerName: body.providerName,
      createdAt: new Date().toISOString(),
      ip: ip
    }

    // Save to JSON file
    const inquiriesDir = path.join(process.cwd(), 'data/inquiries')
    const fileName = `${inquiry.id}_${inquiry.providerId}.json`
    const filePath = path.join(inquiriesDir, fileName)
    
    // Ensure directory exists
    await fs.mkdir(inquiriesDir, { recursive: true })
    
    // Write inquiry to file
    await fs.writeFile(filePath, JSON.stringify(inquiry, null, 2))

    // Send email notification (don't await to make response faster)
    sendInquiryEmail(inquiry).catch(console.error)

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your inquiry. We will contact you soon.',
      id: inquiry.id 
    })
  } catch (error) {
    console.error('Inquiry error:', error)
    return NextResponse.json(
      { error: 'Failed to process inquiry. Please try again.' },
      { status: 500 }
    )
  }
} 