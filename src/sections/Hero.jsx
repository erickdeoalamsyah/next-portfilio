"use client";

import { Canvas } from "@react-three/fiber";
import { Planet } from "../components/Planet";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { FiDownload } from "react-icons/fi";

// "metadata"
const heroMeta = {
  id: "home",
  role: "Fullstack Web Developer",
  name: "Eric Deo Alamsyah",
  text: `I help growing brands and startups gain an
    unfair advantage through premium
    results driven webs/apps`,
};

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  return (
    <section
      id={heroMeta.id}
      className="flex flex-col justify-end min-h-screen"
      aria-label="Hero section Eric Deo Alamsyah"
    >
      <AnimatedHeaderSection
        subTitle={heroMeta.role}
        title={heroMeta.name}
        text={heroMeta.text}
        textColor={"text-white"}
      >
        <div className="text-left z-10">
          <a
            href="/CV.pdf"
            download
            aria-label="Download CV Eric Deo Alamsyah"
            className="
              inline-flex items-center gap-2 px-6 py-3 border border-white/30       
              bg-gradient-to-b from-[#0d021a] via-[#12052a] to-slate-950 text-white rounded-full 
              text-sm md:text-lg tracking-wider
              shadow-lg shadow-white/20 transition-all duration-300
              hover:bg-blue-700 hover:scale-[1.03]
              focus:outline-none focus:ring-4 focus:ring-blue-600/50
            "
          >
            <FiDownload className="w-5 h-5" />
            Download CV
          </a>
        </div>
      </AnimatedHeaderSection>

      <figure
        className="absolute inset-0 -z-50"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas
          shadows
          camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
        >
          <ambientLight intensity={0.5} />
          <Float speed={0.5}>
            <Planet scale={isMobile ? 0.7 : 1} />
          </Float>
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 4, 1]}>
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 5, -9]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 3, 1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[-5, -1, -1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[10, 1, 0]}
                scale={16}
              />
            </group>
          </Environment>
        </Canvas>
      </figure>
    </section>
  );
};

export default Hero;
