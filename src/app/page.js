"use client";
import React, { useEffect, useState } from "react";
import Script from 'next/script';
import Navbar from "../sections/Navbar";
import Hero from "../sections/Hero";
import ServiceSummary from "../sections/ServiceSummary";
import Services from "../sections/Services";
import ReactLenis from "lenis/react";
import About from "../sections/About";
import Works from "../sections/Works";
import ContactSummary from "../sections/ContactSummary";
import Contact from "../sections/Contact";
import { useProgress } from "@react-three/drei";
import Experience from "../sections/Experiences";
import Skills from "../sections/Skills";

const App = () => {
  const { progress, active } = useProgress();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // active jadi false saat antrean loader kosong. Tanpa cek ini, model
    // yang sudah ada di cache browser bisa selesai sebelum komponen sempat
    // berlangganan, dan progress tertahan di 0 selamanya.
    if (progress === 100 || (!active && progress > 0)) {
      setIsReady(true);
    }
  }, [progress, active]);

  // Jaring pengaman: kalau model gagal atau lambat dimuat, pengunjung tidak
  // terjebak di layar loading selamanya.
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 3000);
    return () => clearTimeout(timer);
  }, []);
    
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Eric Deo Alamsyah',
    url: 'https://erickdeoalamsyah.web.id',
    jobTitle: 'Full-Stack Web Engineer',
    description:
      'Full-Stack Web Engineer yang fokus ke Next.js, Node.js, PostgreSQL, dan sistem produksi yang stabil & cepat.',
    sameAs: [
      'https://www.linkedin.com/in/ericdeoalamsyah',
      'https://github.com/erickdeoalamsyah'
    ]
  };

  return (
    <>
      <Script
        id="ld-json-home"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <ReactLenis root className="relative w-full min-h-screen overflow-x-hidden">
      {!isReady && (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 font-light">
          <p className="mb-4 text-xl tracking-widest animate-pulse">
            Loading {Math.floor(progress)}%
          </p>
          <div className="relative h-1 overflow-hidden rounded w-60 bg-white/20">
            <div
              className="absolute top-0 left-0 h-full transition-all duration-300 bg-white"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      <div
        className={`${
          isReady ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500`}
      >
        <Navbar />
        <Hero />
        <ServiceSummary />
        <Skills />
        <Services />
        <About />
        <Works />
        <Experience />
        <ContactSummary />
        <Contact />
      </div>
    </ReactLenis>
    </>
  );
};

export default App;
