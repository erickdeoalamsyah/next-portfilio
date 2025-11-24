import { Orbitron } from "next/font/google";
import "./globals.css";
import React from 'react';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://erickdeoalamsyah.web.id';


// Mengimpor font Orbitron
const orbitron = Orbitron({
  variable: "--font-orbitron", // Beri nama variabel yang sesuai
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Eric Deo Alamsyah – Full-Stack Web Engineer',
    template: '%s | Eric Deo'
  },
  description:
    'Full-Stack Web Engineer yang fokus ke Next.js, Node.js, PostgreSQL, dan sistem produksi yang stabil & cepat.',
  keywords: [
    'Full-Stack Developer',
    'Full-Stack Web Engineer',
    'Next.js',
    'React',
    'Node.js',
    'Erick Deo Alamsyah',
    'Eric Deo Alamsyah',
    'erickdeoalamsyah',
    'Portfolio'
  ],
  authors: [{ name: 'Eric Deo Alamsyah', url: siteUrl }],
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Eric Deo – Full-Stack Web Engineer',
    description:
      'Portfolio Eric Deo: proyek Next.js, Node.js, dan sistem produksi yang benar-benar dipakai bisnis.',
    siteName: 'Eric Deo Alamsyah',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Eric Deo Alamsyah Portfolio'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eric Deo – Full-Stack Web Engineer',
    description:
      'Portfolio Eric Deo: proyek Next.js, Node.js, dan sistem produksi yang benar-benar dipakai bisnis.',
    images: ['/og-image.png']
  }, 
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={`${orbitron.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}