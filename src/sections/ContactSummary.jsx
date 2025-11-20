import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ContactSummary = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center center",
        scrub: 0.5,
        markers: false,
      },
    });
  }, []);
  return (
    <section
      ref={containerRef}
      className="mt-20 flex flex-col items-center justify-between min-h-screen gap-12 mt-16"
    >

      <div className="overflow-hidden font-light text-center contact-text-responsive">
        <p>
          “ Let’s build a <br />
          <span className="font-normal">memorable</span> &{" "}
          <span className="italic">inspiring</span> <br />
          web application <span className="text-blue-900">together</span> “
        </p>
      </div>
    </section>
  );
};

export default ContactSummary;
