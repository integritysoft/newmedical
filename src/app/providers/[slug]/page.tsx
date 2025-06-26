import { getProviderBySlug, getTreatments } from '@/lib/data'
import InquiryForm from '@/components/InquiryForm'
import { notFound } from 'next/navigation'

interface PageProps {
  params: { slug: string }
}

export default function ProviderDetail({ params }: PageProps) {
  const provider = getProviderBySlug(params.slug)
  const treatments = getTreatments()
  
  if (!provider) {
    notFound()
  }

  const providerTreatments = treatments.filter(t => 
    provider.treatments.includes(t.id)
  )

  return (
    <div className="provider-detail">
      <div className="provider-header">
        <div className="container">
          <h1>{provider.name}</h1>
          <p className="city">📍 {provider.city}, Turkey</p>
        </div>
      </div>

      <div className="container">
        <div className="provider-info">
          <div>
            <div className="info-section">
              <h2>About This Provider</h2>
              <p>{provider.description}</p>
              
              <h2 style={{ marginTop: '2rem' }}>Medical Specialties</h2>
              <div className="features">
                {providerTreatments.map(treatment => (
                  <span key={treatment.id} className="feature-tag">
                    {treatment.icon} {treatment.name}
                  </span>
                ))}
              </div>

              <h2 style={{ marginTop: '2rem' }}>Languages Spoken</h2>
              <p>Our international team speaks: {provider.languages.join(', ')}</p>

              <h2 style={{ marginTop: '2rem' }}>Why Choose {provider.name}?</h2>
              <ul>
                {provider.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              <h2 style={{ marginTop: '2rem' }}>Experience</h2>
              <p>
                <strong>{provider.yearsExperience} years</strong> of excellence in healthcare<br />
                <strong>{provider.patientsPerYear.toLocaleString()}+</strong> international patients annually
              </p>
            </div>
          </div>

          <div>
            <div className="info-section">
              <h2>Contact Information</h2>
              <div className="contact-info">
                <p><strong>📍 Address:</strong><br />{provider.address}</p>
                <p><strong>📞 Phone:</strong><br />{provider.phone}</p>
                <p><strong>✉️ Email:</strong><br /><a href={`mailto:${provider.email}`}>{provider.email}</a></p>
                {provider.website && (
                  <p><strong>🌐 Website:</strong><br /><a href={provider.website} target="_blank" rel="noopener noreferrer">{provider.website}</a></p>
                )}
              </div>
            </div>

            <div className="info-section" style={{ marginTop: '2rem' }}>
              <InquiryForm providerId={provider.id} providerName={provider.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Generate static paths for all providers
export async function generateStaticParams() {
  const providers = getProviders()
  return providers.map((provider) => ({
    slug: provider.slug,
  }))
} 