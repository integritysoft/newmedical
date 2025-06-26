interface Inquiry {
  id: string
  name: string
  email: string
  phone?: string
  country?: string
  treatment?: string
  message: string
  providerId: string
  providerName: string
  createdAt: string
  ip?: string
}

export async function sendInquiryEmail(inquiry: Inquiry) {
  // Skip if no API key configured
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_dac8gh98_636TXabfhVTztuP7m2C2hR1J') {
    console.log('Skipping email send - no API key configured')
    console.log('Inquiry details:', inquiry)
    return { data: { id: 'mock-id' } }
  }

  try {
    // Lazy load Resend only when needed
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    const { data, error } = await resend.emails.send({
      from: 'Medical Tourism Turkey <noreply@updates.medicaltourismturkey.com>',
      to: process.env.ADMIN_EMAIL || 'admin@example.com',
      subject: `New Inquiry for ${inquiry.providerName} - ${inquiry.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0066cc; color: white; padding: 20px; text-align: center; }
            .content { background: #f4f4f4; padding: 20px; margin-top: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Patient Inquiry</h2>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Provider:</span> ${inquiry.providerName}
              </div>
              <div class="field">
                <span class="label">Patient Name:</span> ${inquiry.name}
              </div>
              <div class="field">
                <span class="label">Email:</span> <a href="mailto:${inquiry.email}">${inquiry.email}</a>
              </div>
              <div class="field">
                <span class="label">Phone:</span> ${inquiry.phone || 'Not provided'}
              </div>
              <div class="field">
                <span class="label">Country:</span> ${inquiry.country || 'Not provided'}
              </div>
              <div class="field">
                <span class="label">Treatment Interest:</span> ${inquiry.treatment || 'Not specified'}
              </div>
              <div class="field">
                <span class="label">Message:</span><br>
                <p style="background: white; padding: 15px; border-radius: 5px;">
                  ${inquiry.message.replace(/\n/g, '<br>')}
                </p>
              </div>
            </div>
            <div class="footer">
              <p>Inquiry ID: ${inquiry.id}</p>
              <p>Received: ${new Date(inquiry.createdAt).toLocaleString()}</p>
              <p>IP Address: ${inquiry.ip || 'Unknown'}</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        New Patient Inquiry
        
        Provider: ${inquiry.providerName}
        Patient Name: ${inquiry.name}
        Email: ${inquiry.email}
        Phone: ${inquiry.phone || 'Not provided'}
        Country: ${inquiry.country || 'Not provided'}
        Treatment Interest: ${inquiry.treatment || 'Not specified'}
        
        Message:
        ${inquiry.message}
        
        ---
        Inquiry ID: ${inquiry.id}
        Received: ${new Date(inquiry.createdAt).toLocaleString()}
      `
    })

    if (error) {
      console.error('Email send error:', error)
      return { error }
    }

    console.log('Email sent successfully:', data)
    return { data }
  } catch (error) {
    console.error('Email send error:', error)
    return { error }
  }
}