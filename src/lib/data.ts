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

// Default data to use if files don't exist
const defaultProviders: Provider[] = [
  {
    id: "1",
    slug: "default-provider",
    name: "Default Healthcare Provider",
    description: "This is a placeholder provider. Add your real providers to data/providers.json",
    city: "Istanbul",
    address: "123 Example Street",
    phone: "+90 123 456 7890",
    email: "info@example.com",
    website: "https://example.com",
    image: "/images/placeholder.jpg",
    languages: ["English"],
    treatments: ["dental"],
    yearsExperience: 10,
    patientsPerYear: 1000,
    features: ["Example Feature"]
  }
]

const defaultTreatments: Treatment[] = [
  {
    id: "dental",
    name: "Dental Care",
    description: "Dental treatments",
    icon: "🦷"
  }
]

export function getProviders(): Provider[] {
  try {
    // During build, return default data
    if (process.env.NODE_ENV === 'production' && !global.providersData) {
      return defaultProviders
    }
    const providersData = require('../../data/providers.json')
    return providersData as Provider[]
  } catch (error) {
    console.warn('Could not load providers.json, using defaults')
    return defaultProviders
  }
}

export function getProviderBySlug(slug: string): Provider | undefined {
  try {
    const providers = getProviders()
    return providers.find(p => p.slug === slug)
  } catch (error) {
    console.warn('Error finding provider:', error)
    return undefined
  }
}

export function getTreatments(): Treatment[] {
  try {
    // During build, return default data
    if (process.env.NODE_ENV === 'production' && !global.treatmentsData) {
      return defaultTreatments
    }
    const treatmentsData = require('../../data/treatments.json')
    return treatmentsData as Treatment[]
  } catch (error) {
    console.warn('Could not load treatments.json, using defaults')
    return defaultTreatments
  }
}

export function getProvidersByTreatment(treatmentId: string): Provider[] {
  try {
    const providers = getProviders()
    return providers.filter(p => p.treatments.includes(treatmentId))
  } catch (error) {
    console.warn('Error filtering providers:', error)
    return []
  }
}

export function getProvidersByCity(city: string): Provider[] {
  try {
    const providers = getProviders()
    return providers.filter(p => p.city.toLowerCase() === city.toLowerCase())
  } catch (error) {
    console.warn('Error filtering providers by city:', error)
    return []
  }
}

// Declare global types
declare global {
  var providersData: any
  var treatmentsData: any
}