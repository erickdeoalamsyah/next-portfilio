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
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setIsReady(true);
    }
  }, [progress]);
    
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
    <ReactLenis root className="relative w-screen min-h-screen overflow-x-auto">
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
        } transition-opacity duration-1000`}
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
