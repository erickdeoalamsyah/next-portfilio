"use client"; 

import { useMemo, useRef, useState, useEffect } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import {
  SiReact, SiNextdotjs, SiVuedotjs, SiNuxtdotjs,
  SiRedux, SiTailwindcss, SiVite,
  SiJavascript, SiTypescript, SiNodedotjs,
  SiExpress, SiNestjs, SiGraphql, SiSwagger,
  SiPostgresql, SiMysql, SiMongodb, SiSqlite, SiRedis,
  SiDocker, SiNginx, SiCloudflare, SiPm2,
  SiGithubactions, SiGitlab, SiGithub, SiGit,
  SiJest, SiEslint, SiPrettier,
  SiGrafana, SiPrometheus,
  SiLinux, SiGnubash,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { name: "React", Icon: SiReact }, { name: "Next.js", Icon: SiNextdotjs },
  { name: "Vue", Icon: SiVuedotjs }, { name: "Nuxt", Icon: SiNuxtdotjs },
  { name: "Redux", Icon: SiRedux }, { name: "Tailwind", Icon: SiTailwindcss },
  { name: "Vite", Icon: SiVite },
  { name: "JavaScript", Icon: SiJavascript }, { name: "TypeScript", Icon: SiTypescript },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Express", Icon: SiExpress }, { name: "NestJS", Icon: SiNestjs },
  { name: "GraphQL", Icon: SiGraphql }, { name: "OpenAPI", Icon: SiSwagger },
  { name: "PostgreSQL", Icon: SiPostgresql }, { name: "MySQL", Icon: SiMysql },
  { name: "SQLite", Icon: SiSqlite }, { name: "MongoDB", Icon: SiMongodb },
  { name: "Redis", Icon: SiRedis },
  { name: "Docker", Icon: SiDocker }, { name: "NGINX", Icon: SiNginx },
  { name: "Cloudflare", Icon: SiCloudflare }, { name: "PM2", Icon: SiPm2 },
  { name: "Git", Icon: SiGit }, { name: "GitHub", Icon: SiGithub },
  { name: "Git Action", Icon: SiGithubactions }, { name: "GitLab CI", Icon: SiGitlab },
  { name: "Jest", Icon: SiJest }, { name: "ESLint", Icon: SiEslint }, { name: "Prettier", Icon: SiPrettier },
  { name: "Grafana", Icon: SiGrafana }, { name: "Prometheus", Icon: SiPrometheus },
  { name: "Linux", Icon: SiLinux }, { name: "Bash", Icon: SiGnubash },
];

// Nilai default yang deterministik untuk Server-Side Rendering
const DEFAULT_TIMING = { dur: '2.80', delay: '0.50', amp: 7, ampSm: 3 };

export default function Skills() {
  const gridRef = useRef(null);
  const headerText = `The tools I use to ship reliable, scalable, and maintainable full-stack products — without sacrificing UX.`;

  // 1. Inisialisasi state dengan nilai default/deterministik
  const [timings, setTimings] = useState(
    SKILLS.map(() => DEFAULT_TIMING)
  );

  // 2. useEffect untuk menghitung nilai random HANYA di client
  // Ini memastikan nilai acak hanya muncul setelah hydration selesai.
  useEffect(() => {
    const generatedTimings = SKILLS.map(() => ({
      dur: (Math.random() * 0.6 + 2.4).toFixed(2),
      delay: (Math.random() * 0.8).toFixed(2),
      amp: Math.random() < 0.5 ? 5 : 7,
      ampSm: 3,
    }));
    setTimings(generatedTimings);
  }, []); // [] agar hanya berjalan sekali (saat component mount/di client)
  useGSAP(() => {
    const items = gsap.utils.toArray(".skill-item");
    // Entrance sekali jalan
    gsap.fromTo(
      items,
      { opacity: 0, y: 18, scale: 0.96, rotate: (i) => gsap.utils.random(-3, 3) },
      {
        opacity: 1, y: 0, scale: 1, rotate: 0,
        duration: 0.6, ease: "power3.out",
        stagger: { amount: 0.7, from: "random" },
        force3D: true,
        scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true },
      }
    );
  }, []);

  return (
    <section id="skills" className="mt-20 min-h-screen rounded-t-4xl">
      <AnimatedHeaderSection
        subTitle="Stack that scales, UX that sails"
        title="Skills"
        text={headerText}
        textColor="text-white"
        withScrollTrigger={true}
        reverse={true}          
      />

      {/* GRID ICONS */}
      <div
        ref={gridRef}
        className="
          mx-auto max-w-6xl px-6 md:px-8 mt-10
          grid grid-cols-3 gap-4
          sm:grid-cols-4 sm:gap-5
          md:grid-cols-7 lg:grid-cols-8
        "
      >
        {SKILLS.map(({ name, Icon }, i) => (
          <div
            key={i}
            className="
              skill-item group aspect-square rounded-2xl
              border border-white/20 bg-gradient-to-br from-[#0d021a] via-[#12052a] to-slate-950 backdrop-blur-sm
              flex flex-col items-center justify-center
              transition-all duration-250
              hover:-translate-y-1 hover:scale-[1.04] hover:border-2
              hover:border-blue-500/50 hover:bg-blue-500/10
              text-white hover:text-blue-400
            "
            style={{
              // Nilai timing diambil dari state yang berubah setelah mount
              animationName: "skill-bob",
              animationDuration: `${timings[i].dur}s`,
              animationDelay: `${timings[i].delay}s`,
              animationIterationCount: "infinite",
              animationTimingFunction: "cubic-bezier(.45,.05,.55,.95)",
              animationDirection: "alternate",
              willChange: "transform",
              "--amp": `${timings[i].amp}px`,
              "--ampSm": `${timings[i].ampSm}px`,
            }}
            title={name}
          >
            <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" />
            <span className="mt-2 text-[8px] sm:text-xs tracking-widest uppercase">
              {name}
            </span>
          </div>
        ))}
      </div>

      {/* CSS idle animation lightweight */}
      <style>{`
        @keyframes skill-bob {
          from { transform: translateY(0); }
          to   { transform: translateY(calc(var(--amp, 7px))); }
        }
        @media (max-width: 639px) {
          .skill-item { animation-name: skill-bob-sm; }
          @keyframes skill-bob-sm {
            from { transform: translateY(0); }
            to   { transform: translateY(var(--ampSm, 3px)); }
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .skill-item { animation: none !important; }
        }
      `}</style>
    </section>
  );
}