import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { EXPERIENCES } from "../constants";

const experienceMeta={
  id: "experience",
  title: "Experience",
  subTitle: "Where impact meets execution",
  text: `Selected roles and the impact delivered across frontend, backend, and platform work. Security, performance, and developer velocity are always first-class citizens.`,

}

export default function Experience() {
  const container = useRef(null);
  const listenersRef = useRef([]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // timeline vertical digambar
      gsap.fromTo(
        ".exp-line-fill",
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
            end: "bottom 10%",
            scrub: 0.6,
          },
        }
      );

      const cards = gsap.utils.toArray(".exp-card");

      cards.forEach((card) => {
        const overlay = card.querySelector(".exp-overlay");
        const shine = card.querySelector(".exp-shine");
        const title = card.querySelector(".exp-title");
        const meta = card.querySelector(".exp-meta");
        const bullets = card.querySelectorAll(".exp-bullets li");

        gsap.set(card, { y: 80, opacity: 0, rotateX: -8, transformPerspective: 1000, filter: "blur(4px)" });
        gsap.set(overlay, { clipPath: "circle(0% at 50% 50%)" });
        gsap.set(shine, { backgroundPosition: "-150% 0%" });
        gsap.set([title, meta, bullets], { opacity: 0, y: 24, filter: "blur(6px)" });

        const tl = gsap.timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: { trigger: card, start: "top 78%", once: true },
        });

        tl.to(card, { y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)", duration: 1.0 }, 0)
          .to(overlay, { clipPath: "circle(120% at 50% 50%)", duration: 0.9 }, 0.05)
          .fromTo(card, { boxShadow: "0 0 0 0 rgba(255,255,255,0)" }, { boxShadow: "0 0 0 1px rgba(255,255,255,0.15)", duration: 0.6 }, 0.1)
          .to(shine, { backgroundPosition: "150% 0%", duration: 0.9, ease: "power2.out" }, 0.15)
          .to(title, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 }, 0.25)
          .to(meta, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 }, 0.35)
          .to(bullets, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, stagger: 0.06 }, 0.4);

        // parallax tilt desktop
        const mq = window.matchMedia("(min-width: 1024px)");
        if (mq.matches) {
          const move = (e) => {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / rect.width;
            const dy = (e.clientY - cy) / rect.height;
            gsap.to(card, { rotateY: dx * 6, rotateX: -dy * 6, duration: 0.3, ease: "power2.out" });
            gsap.to(overlay, { x: dx * 12, y: dy * 12, duration: 0.3, ease: "power2.out" });
          };
          const leave = () => {
            gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.4, ease: "power3.out" });
            gsap.to(overlay, { x: 0, y: 0, duration: 0.4, ease: "power3.out" });
          };
          card.addEventListener("mousemove", move);
          card.addEventListener("mouseleave", leave);
          listenersRef.current.push({ card, move, leave });
        }
      });
    }, container);

    return () => {
      listenersRef.current.forEach(({ card, move, leave }) => {
        card.removeEventListener("mousemove", move);
        card.removeEventListener("mouseleave", leave);
      });
      listenersRef.current = [];
      ctx.revert();
    };
  }, []);
  return (
    <section id="experience" ref={container} className="relative py-20">
      {/* HEADER pakai AnimatedHeaderSection */}
      <AnimatedHeaderSection
        subTitle={experienceMeta.subTitle}
        title={experienceMeta.title}
        text={experienceMeta.text}
        textColor="text-white"
        withScrollTrigger={true}
      />


      {/* CARDS */}
      <div className="mx-auto max-w-6xl px-4 space-y-10">
        {EXPERIENCES.map((e, i) => (
          <article
            key={i}
            className={`
              exp-card relative grid gap-6 p-6 md:p-8
              rounded-2xl border border-white/10 bg-gradient-to-br from-[#0d021a] via-[#12052a] to-slate-950 backdrop-blur-sm
              transition-[border,box-shadow,transform]
              hover:border-white/25 hover:shadow-white/10 hover:shadow-xl
              md:grid-cols-12
              ${i % 2 ? "md:pl-6" : "md:pr-6"}
            `}
          >
            

            {/* HEADER SIDE */}
            <header className={`md:col-span-5 ${i % 2 ? "md:order-2 md:pl-8" : "md:order-1 md:pr-8"}`}>
              <h3 className="exp-title text-white text-2xl md:text-3xl leading-tight">{e.role}</h3>
              <p className="exp-meta text-white/70">{e.company}</p>
              <p className="mt-1 text-[11px] tracking-[0.2em] uppercase text-white/50">{e.period}</p>

              {/* chips */}
              <ul className="mt-4 flex flex-wrap gap-2">
                {e.stack.map((s) => (
                  <li
                    key={s}
                    className="text-[11px] uppercase tracking-wider px-2 py-1 rounded-full border border-white/15 text-white/80 bg-white/[0.04]"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </header>

            {/* CONTENT SIDE — SELALU rata kiri agar bullet rapi */}
            <div className={`md:col-span-7 ${i % 2 ? "md:order-1 md:pr-8" : "md:order-2 md:pl-8"}`}>
              <ul
                className={`
                  exp-bullets text-white/80
                  list-disc list-outside
                  space-y-2
                  pl-5 md:pl-6      /* indent konsisten */
                  
                  text-justify       /* PENTING: selalu rata kiri */
                `}
              >
                {e.bullets.map((b, j) => (
                  <li key={j} className="text-sm md:text-base leading-relaxed marker:text-white/50">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
