// Add this export to force dynamic rendering
export const dynamic = 'force-dynamic'

import { getProviders, getTreatments } from '@/lib/data'
import ProviderCard from '@/components/ProviderCard'
import SearchBar from '@/components/SearchBar'

export default function Home() {
  const providers = getProviders()
  const treatments = getTreatments()

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h2>Find Top Healthcare Providers in Turkey</h2>
          <p>Connect with JCI-accredited hospitals and clinics for your medical journey</p>
          <div className="search-container">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Treatments Section */}
      <section id="treatments" className="treatments">
        <div className="container">
          <h2>Popular Medical Treatments</h2>
          <div className="treatment-grid">
            {treatments.map((treatment) => (
              <div key={treatment.id} className="treatment-card">
                <div className="icon">{treatment.icon}</div>
                <h3>{treatment.name}</h3>
                <p>{treatment.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Providers Section */}
      <section id="providers" className="providers">
        <div className="container">
          <h2>Featured Healthcare Providers</h2>
          <div className="provider-grid">
            {providers.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}