import Link from 'next/link'
import type { Provider } from '@/lib/data'

interface ProviderCardProps {
  provider: Provider
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  // Use placeholder image if provider image doesn't exist
  const imageUrl = provider.image || '/images/placeholder.jpg'
  
  return (
    <div className="provider-card">
      <img 
        src={imageUrl} 
        alt={provider.name}
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.src = '/images/placeholder.jpg'
        }}
      />
      <div className="provider-card-content">
        <h3>{provider.name}</h3>
        <p className="city">📍 {provider.city}</p>
        <p className="description">{provider.description}</p>
        <div className="features">
          {provider.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="feature-tag">{feature}</span>
          ))}
        </div>
        <p className="languages">
          <strong>Languages:</strong> {provider.languages.slice(0, 3).join(', ')}
          {provider.languages.length > 3 && ` +${provider.languages.length - 3} more`}
        </p>
        <Link href={`/providers/${provider.slug}`} className="view-details">
          View Details →
        </Link>
      </div>
    </div>
  )
} 