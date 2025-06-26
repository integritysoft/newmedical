import providersData from '../../data/providers.json'
import treatmentsData from '../../data/treatments.json'

export interface Provider {
  id: string
  slug: string
  name: string
  description: string
  city: string
  address: string
  phone: string
  email: string
  website?: string
  image: string
  languages: string[]
  treatments: string[]
  yearsExperience: number
  patientsPerYear: number
  features: string[]
}

export interface Treatment {
  id: string
  name: string
  description: string
  icon: string
}

export function getProviders(): Provider[] {
  try {
    return providersData as Provider[]
  } catch (error) {
    console.error('Error loading providers:', error)
    return []
  }
}

export function getProviderBySlug(slug: string): Provider | undefined {
  try {
    const providers = getProviders()
    return providers.find(p => p.slug === slug)
  } catch (error) {
    console.error('Error finding provider:', error)
    return undefined
  }
}

export function getTreatments(): Treatment[] {
  try {
    return treatmentsData as Treatment[]
  } catch (error) {
    console.error('Error loading treatments:', error)
    return []
  }
}

export function getProvidersByTreatment(treatmentId: string): Provider[] {
  try {
    const providers = getProviders()
    return providers.filter(p => p.treatments.includes(treatmentId))
  } catch (error) {
    console.error('Error filtering providers:', error)
    return []
  }
}

export function getProvidersByCity(city: string): Provider[] {
  try {
    const providers = getProviders()
    return providers.filter(p => p.city.toLowerCase() === city.toLowerCase())
  } catch (error) {
    console.error('Error filtering providers by city:', error)
    return []
  }
} 