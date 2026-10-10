import type { Metadata, Viewport } from 'next';
import './globals.css';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import CartDrawer from '@/components/cart/CartDrawer';
import SearchOverlay from '@/components/ui/SearchOverlay';
import LuxuryToast from '@/components/ui/LuxuryToast';
import LuxuryLoader from '@/components/ui/LuxuryLoader';
import LuxuryParticles from '@/components/ui/LuxuryParticles';
import PageTransition from '@/components/layout/PageTransition';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://luxignia.com'),
  title: 'LUXIGNIA — Antique & Luxury Home Decor Showroom',
  description:
    'Experience curated antique pieces, handcrafted bronze sculptures, and collectible luxury decor for discerning modern spaces. Explore interactive 3D antiquities.',
  keywords: [
    'LUXIGNIA',
    'antique home decor',
    'luxury sculptures',
    'bronze statues',
    'heritage decor',
    '3D antique showroom',
    'handcrafted vases',
  ],
  authors: [{ name: 'LUXIGNIA Maison' }],
  openGraph: {
    title: 'LUXIGNIA — Antique Pieces for Modern Spaces',
    description: 'Curated collectibles and handcrafted decor that bring heritage, elegance and soul to your home.',
    url: 'https://luxignia.com',
    siteName: 'LUXIGNIA',
    images: [
      {
        url: '/images/hero-horse.png',
        width: 1200,
        height: 630,
        alt: 'LUXIGNIA Antique Collection',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LUXIGNIA — Luxury Antique Home Decor',
    description: 'Interactive 3D digital showroom for rare antiquities and handcrafted bronze decor.',
    images: ['/images/hero-horse.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#0b0a09',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#0b0a09] text-[#ede8df] selection:bg-[#c5a059] selection:text-[#0c0a09]">
        <SmoothScrollProvider>
          {/* Luxury Brand Preloader */}
          <LuxuryLoader />

          {/* Minimalistic Ambient Golden Particle Background */}
          <LuxuryParticles />

          {/* Global Interactive Custom Cursor */}
          <CustomCursor />

          {/* Top Announcement Bar */}
          <AnnouncementBar />

          {/* Floating Luxury Navbar */}
          <Navbar />

          {/* Main Content with Cinematic Vertical Transitions */}
          <main className="flex-1 flex flex-col">
            <PageTransition>{children}</PageTransition>
          </main>

          {/* Shared Luxury Modals & Drawers */}
          <CartDrawer />
          <SearchOverlay />
          <LuxuryToast />

          {/* Global Footer */}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
