'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const [treatment, setTreatment] = useState('')
  const [city, setCity] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // For MVP, just scroll to providers section
    const element = document.getElementById('providers')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <select 
        value={treatment} 
        onChange={(e) => setTreatment(e.target.value)}
        aria-label="Select treatment"
      >
        <option value="">All Treatments</option>
        <option value="dental">🦷 Dental Care</option>
        <option value="cardiology">❤️ Cardiology</option>
        <option value="plastic-surgery">✨ Plastic Surgery</option>
        <option value="orthopedics">🦴 Orthopedics</option>
        <option value="ophthalmology">👁️ Eye Care</option>
        <option value="oncology">🏥 Cancer Treatment</option>
        <option value="ivf">👶 IVF & Fertility</option>
      </select>
      
      <select 
        value={city} 
        onChange={(e) => setCity(e.target.value)}
        aria-label="Select city"
      >
        <option value="">All Cities</option>
        <option value="istanbul">Istanbul</option>
        <option value="ankara">Ankara</option>
        <option value="antalya">Antalya</option>
        <option value="izmir">Izmir</option>
      </select>
      
      <button type="submit">
        Search Providers
      </button>
    </form>
  )
} 