"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function Motion() {
  const path = usePathname();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (document.querySelector(".hero-copy"))
        gsap.fromTo(
          ".hero-copy > *",
          { y: 20 },
          { y: 0, duration: 1, stagger: 0.1, ease: "power2.out" },
        );
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 24 },
          {
            y: 0,
            duration: 0.75,
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          },
        );
      });
      if (window.innerWidth > 900 && document.querySelector(".hero-image")) {
        gsap.to(".hero-image img", {
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    });
    return () => mm.revert();
  }, [path]);
  return null;
}
