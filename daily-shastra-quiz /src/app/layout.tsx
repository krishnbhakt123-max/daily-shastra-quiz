import type { Metadata } from 'next'
import { Cinzel, Cormorant_Garamond, Crimson_Pro } from 'next/font/google'
import '@/styles/globals.css'
import Navbar from '@/components/layout/Navbar'
import SacredGeometry from '@/components/ui/SacredGeometry'

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-crimson',
  display: 'swap',
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Daily Shastra Quiz — Learn Bhagavad Gita & Vedic Wisdom',
  description:
    'Duolingo for Vedic Wisdom. Learn Bhagavad Gita, Karma, Bhakti Yoga, and Sanatana Dharma through gamified daily quizzes. Earn XP, build streaks, unlock badges.',
  keywords: [
    'Bhagavad Gita quiz',
    'Vedic wisdom learning',
    'Sanatana Dharma',
    'Krishna consciousness',
    'Bhakti Yoga',
    'Karma quiz',
    'Hindu philosophy',
    'ISKCON education',
    'daily spiritual quiz',
    'Vedanta learning',
  ],
  authors: [{ name: 'Daily Shastra Quiz' }],
  creator: 'Daily Shastra Quiz',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dailyshastraquiz.com',
    siteName: 'Daily Shastra Quiz',
    title: 'Daily Shastra Quiz — Learn Bhagavad Gita & Vedic Wisdom',
    description:
      'Gamified daily quizzes on Bhagavad Gita, Karma, Bhakti Yoga & Vedic wisdom. Earn XP, build streaks, compete on leaderboards.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Daily Shastra Quiz',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daily Shastra Quiz',
    description: 'Duolingo for Vedic Wisdom 🕉',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${crimsonPro.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Daily Shastra Quiz',
              description: 'Gamified Vedic wisdom learning platform',
              applicationCategory: 'EducationApplication',
              operatingSystem: 'Web',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            }),
          }}
        />
      </head>
      <body className="bg-parchment text-ink font-crimson antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
