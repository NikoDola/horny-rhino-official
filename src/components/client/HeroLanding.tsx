"use client";

import { useState, useEffect, useRef } from "react";
import "@/components/client/HeroLanding.css";
import Image from "next/image";

export default function ParallaxEffect() {
  const [scrollNum, setScrollNum] = useState(0);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          if (currentScrollY > lastScrollY.current) {
            setScrollNum((prev) => prev + 1);
          } else if (currentScrollY < lastScrollY.current && currentScrollY <= 0) {
            setScrollNum(0);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="heroSectionMain">
      <div className="heroSection">
        <p className="text">{scrollNum > 0 ?  "Coming Soon": "Under Construction"}</p>

        <div className="imageWrapper">
          <Image
            className="mountain"
            src={"/other/mountain-rhino.png"}
            alt="Mountain"
            width={600}
            height={200}
          />

          <Image
            className="distant"
            src={"/other/distant.png"}
            alt="Distant Mountains"
            width={300}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}
