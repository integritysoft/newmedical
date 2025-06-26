import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Medical Tourism Turkey - Top Healthcare Providers',
  description: 'Find JCI-accredited hospitals and clinics in Turkey for medical tourism. Get free quotes from top healthcare providers.',
  keywords: 'medical tourism turkey, healthcare turkey, hospitals istanbul, medical treatment turkey',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="header">
          <div className="container">
            <div className="header-content">
              <h1>Medical Tourism Turkey</h1>
              <nav>
                <a href="/">Home</a>
                <a href="/#providers">Providers</a>
                <a href="/#treatments">Treatments</a>
                <a href="/#contact">Contact</a>
              </nav>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="footer" id="contact">
          <div className="container">
            <div className="footer-content">
              <div>
                <h3>Medical Tourism Turkey</h3>
                <p>Connecting international patients with Turkey's top healthcare providers</p>
              </div>
              <div>
                <h4>Quick Links</h4>
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="/#providers">Find Providers</a></li>
                  <li><a href="/#treatments">Treatments</a></li>
                </ul>
              </div>
              <div>
                <h4>Contact</h4>
                <p>Email: info@medicaltourismturkey.com</p>
                <p>Phone: +90 212 123 4567</p>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2024 Medical Tourism Turkey. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
} 