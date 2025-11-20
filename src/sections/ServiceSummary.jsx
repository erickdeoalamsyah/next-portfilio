
"use client";

import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Particles from "../components/Particle"; 
gsap.registerPlugin(ScrollTrigger);

const serviceSummaryMeta={
  id: "servicesummary",
  titleService1: "Architucture",
  titleService2: "Development",
  titleService3: "Deployment",
  titleService4a: "APIs",
  titleService4b: "Frontends",
  titleService4c: "Scalability",
  titleService5: "Databases",

}
const ServiceSummary = () => {
  // ... (Logika State dan handleMouseMove/handleMouseLeave)
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMousePosition({ x, y });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  }

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // Desktop (min-width: 768px): Animasi XPercent Agresif
    mm.add("(min-width: 768px)", () => {
      // Posisi Awal (Offset) untuk desktop
      gsap.set("#title-service-2", { x: '4rem' }); 
      gsap.set("#title-service-3", { x: '-12rem' }); 
      gsap.set("#title-service-4", { x: '12rem' }); 

      // Animasi XPercent Parallax
      gsap.to("#title-service-1", { xPercent: 20, scrollTrigger: { target: "#title-service-1", scrub: true } });
      gsap.to("#title-service-2", { xPercent: -30, scrollTrigger: { target: "#title-service-2", scrub: true } });
      gsap.to("#title-service-3", { xPercent: 100, scrollTrigger: { target: "#title-service-3", scrub: true } });
      gsap.to("#title-service-4", { xPercent: -100, scrollTrigger: { target: "#title-service-4", scrub: true } });
    });

    //  Mobile (max-width: 767px): Animasi Fade In Vertikal
    mm.add("(max-width: 767px)", () => {
      // Posisi Awal (Reset) untuk mobile
      gsap.set(["#title-service-1", "#title-service-2", "#title-service-3", "#title-service-4"], { 
          x: 0, 
          opacity: 0.2, 
          y: 20 
      });
      
      // Animasi YPercent/Opacity saat di-scroll
      gsap.to(["#title-service-1", "#title-service-2", "#title-service-3", "#title-service-4"], {
          opacity: 1,
          y: 0,
          stagger: 0.1, 
          scrollTrigger: {
              trigger: "section",
              start: "top 85%", 
              end: "bottom 15%", 
              scrub: 1,
          }
      });
    });

    // Refresh ScrollTrigger setelah setting
    ScrollTrigger.refresh();
  }, []);

  return (
    <section className="mt-20 overflow-hidden font-light leading-snug text-center contact-text-responsive relative min-h-screen">
      
      {/* Latar Belakang Partikel (z-0) */}
      <div className="absolute inset-0 z-0 min-h-screen">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
          
          externalMouseX={mousePosition.x}
          externalMouseY={mousePosition.y}
          
          forceHoverState={isHovering} 
          hoverIntensity={3} 
          rotateOnHover={isHovering} 
        />
      </div>

      {/* Konten Utama (z-10) */}
      <div
        className="relative z-10 space-y-4 pt-20 pb-20 "
        onMouseMove={handleMouseMove} 
        onMouseLeave={handleMouseLeave}
      >
        
        {/* ID 1 */}
        <div id="title-service-1">
          <p className="bg-gradient-to-b from-white via-slate-300 to-slate-400 bg-clip-text text-transparent">{serviceSummaryMeta.titleService1}</p>
        </div>
        
        {/* ID 2 */}
        <div
          id="title-service-2"
          className="flex items-center justify-center gap-3"
        >
          <p className="font-normal bg-gradient-to-b from-white via-slate-300 to-slate-400 bg-clip-text text-transparent">{serviceSummaryMeta.titleService2}</p>
          <div className="w-10 h-1 md:w-32 bg-white" />
          <p className="bg-gradient-to-b from-white via-slate-300 to-slate-400 bg-clip-text text-transparent">{serviceSummaryMeta.titleService3}</p>
        </div>
        
        {/* ID 3 */}
        <div
          id="title-service-3"
          className="flex items-center justify-center gap-3"
        >
          <p className="bg-gradient-to-b from-white via-slate-300 to-slate-400 bg-clip-text text-transparent">{serviceSummaryMeta.titleService4a}</p>
          <div className="w-10 h-1 md:w-32 bg-white" />
          <p className="italic bg-gradient-to-b from-white via-slate-300 to-slate-400 bg-clip-text text-transparent">{serviceSummaryMeta.titleService4b}</p>
          <div className="w-10 h-1 md:w-32 bg-white" />
          <p className="bg-gradient-to-b from-white via-slate-300 to-slate-400 bg-clip-text text-transparent">{serviceSummaryMeta.titleService4c}</p>
        </div>
        
        {/* ID 4 */}
        <div id="title-service-4">
          <p className="bg-gradient-to-b from-white via-slate-300 to-slate-400 bg-clip-text text-transparent">{serviceSummaryMeta.titleService5}</p>
        </div>
      </div>
    </section>
  );
};

export default ServiceSummary;