'use client'

import { useState } from 'react'

interface InquiryFormProps {
  providerId: string
  providerName: string
}

interface FormData {
  name: string
  email: string
  phone: string
  country: string
  treatment: string
  message: string
}

export default function InquiryForm({ providerId, providerName }: InquiryFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    country: '',
    treatment: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error')
      setErrorMessage('Please fill in all required fields')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setStatus('error')
      setErrorMessage('Please enter a valid email address')
      return
    }

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          providerId,
          providerName
        })
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          country: '',
          treatment: '',
          message: ''
        })
        // Reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    }
  }

  return (
    <div className="inquiry-form">
      <h3>Get Free Medical Quote</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            disabled={status === 'loading'}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            disabled={status === 'loading'}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 234 567 8900"
            disabled={status === 'loading'}
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="United States"
            disabled={status === 'loading'}
          />
        </div>

        <div className="form-group">
          <label htmlFor="treatment">Treatment Interest</label>
          <select
            id="treatment"
            name="treatment"
            value={formData.treatment}
            onChange={handleChange}
            disabled={status === 'loading'}
          >
            <option value="">Select Treatment</option>
            <option value="dental">Dental Care</option>
            <option value="cardiology">Cardiology</option>
            <option value="plastic-surgery">Plastic Surgery</option>
            <option value="orthopedics">Orthopedics</option>
            <option value="ophthalmology">Eye Care</option>
            <option value="oncology">Cancer Treatment</option>
            <option value="ivf">IVF & Fertility</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message">Your Message *</label>
          <textarea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="Please describe your medical needs, preferred treatment dates, and any questions you have..."
            disabled={status === 'loading'}
          />
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? (
            <>Sending... <span className="loading"></span></>
          ) : (
            'Send Inquiry'
          )}
        </button>

        {status === 'success' && (
          <div className="form-message success">
            ✅ Thank you! Your inquiry has been sent successfully. We'll contact you within 24 hours.
          </div>
        )}

        {status === 'error' && (
          <div className="form-message error">
            ❌ {errorMessage}
          </div>
        )}
      </form>
    </div>
  )
} 