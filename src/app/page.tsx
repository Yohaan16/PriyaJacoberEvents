"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import NavHeader from "@/components/ui/nav-header";
import { ParticleHero } from "@/components/ui/particle-hero";
import { TrustStrip } from "@/components/ui/trust-strip";
import { AboutSection } from "@/components/ui/about-section";
import { WhyChooseUs } from "@/components/ui/why-choose-us";
import { ServicesParallax } from "@/components/ui/services-parallax";
import { HowItWorks } from "@/components/ui/how-it-works";
import { Gallery } from "@/components/ui/gallery";
import { ContactSection } from "@/components/ui/contact-section";
import { Footer } from "@/components/ui/footer";

const SECTIONS = ["home", "about", "services", "gallery", "how-it-works", "contact"] as const;
const SWIPE_THRESHOLD = 50; // minimum px to count as a swipe

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchLockedRef = useRef<"horizontal" | "vertical" | null>(null);

  const navigateTo = useCallback(
    (index: number) => {
      if (isAnimating || index === activeIndex) return;
      if (index < 0 || index >= SECTIONS.length) return;
      setIsAnimating(true);
      setActiveIndex(index);
      const panel = panelRefs.current[index];
      if (panel) panel.scrollTop = 0;
      setTimeout(() => setIsAnimating(false), 750);
    },
    [isAnimating, activeIndex],
  );

  // ── Touch / swipe handling for mobile ──
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    touchLockedRef.current = null;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - touchStartRef.current.x);
    const dy = Math.abs(touch.clientY - touchStartRef.current.y);

    // Lock direction once one axis exceeds 10px
    if (!touchLockedRef.current && (dx > 10 || dy > 10)) {
      touchLockedRef.current = dx > dy ? "horizontal" : "vertical";
    }

    // If swiping horizontally, prevent the default vertical scroll
    if (touchLockedRef.current === "horizontal") {
      e.preventDefault();
    }
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current) return;
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;

      if (touchLockedRef.current === "horizontal" && Math.abs(deltaX) >= SWIPE_THRESHOLD) {
        if (deltaX < 0) {
          // Swiped left → next section
          navigateTo(activeIndex + 1);
        } else {
          // Swiped right → previous section
          navigateTo(activeIndex - 1);
        }
      }

      touchStartRef.current = null;
      touchLockedRef.current = null;
    },
    [activeIndex, navigateTo],
  );

  useEffect(() => {
    const handleNav = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const idx = SECTIONS.indexOf(detail as (typeof SECTIONS)[number]);
      if (idx !== -1) navigateTo(idx);
    };
    window.addEventListener("pje-navigate", handleNav);
    return () => window.removeEventListener("pje-navigate", handleNav);
  }, [navigateTo]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") navigateTo(activeIndex + 1);
      if (e.key === "ArrowLeft") navigateTo(activeIndex - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, navigateTo]);

  const panelStyle: React.CSSProperties = {
    width: "100vw",
    minWidth: "100vw",
    height: "100vh",
    overflowY: "auto",
    overflowX: "hidden",
    flexShrink: 0,
  };

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <NavHeader activeSection={SECTIONS[activeIndex]} />

      {/* Horizontal slider — full viewport */}
      <div
        style={{ position: "relative", overflow: "hidden", height: "100vh" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          style={{
            display: "flex",
            height: "100%",
            width: `${SECTIONS.length * 100}vw`,
            transform: `translateX(-${activeIndex * 100}vw)`,
            transition: "transform 700ms cubic-bezier(0.76, 0, 0.24, 1)",
          }}
        >
          {/* Panel 0 — Home */}
          <div ref={(el) => { panelRefs.current[0] = el; }} style={panelStyle}>
            <ParticleHero />
            <TrustStrip />
            <Footer />
          </div>

          {/* Panel 1 — About */}
          <div ref={(el) => { panelRefs.current[1] = el; }} style={panelStyle}>
            <AboutSection />
            <WhyChooseUs />
            <Footer />
          </div>

          {/* Panel 2 — Services */}
          <div ref={(el) => { panelRefs.current[2] = el; }} style={panelStyle}>
            <ServicesParallax />
            <Footer />
          </div>

          {/* Panel 3 — Gallery */}
          <div ref={(el) => { panelRefs.current[3] = el; }} style={panelStyle}>
            <Gallery />
            <Footer />
          </div>

          {/* Panel 4 — How It Works */}
          <div ref={(el) => { panelRefs.current[4] = el; }} style={panelStyle}>
            <HowItWorks />
            <Footer />
          </div>

          {/* Panel 5 — Contact */}
          <div ref={(el) => { panelRefs.current[5] = el; }} style={panelStyle}>
            <ContactSection />
            <Footer />
          </div>
        </div>

        {/* Slide indicators */}
        <div style={{ position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "0.5rem", zIndex: 20 }}>
          {SECTIONS.map((s, i) => (
            <button
              key={s}
              onClick={() => {
                window.dispatchEvent(new CustomEvent("pje-navigate", { detail: s }));
              }}
              style={{
                width: i === activeIndex ? "2rem" : "0.5rem",
                height: "0.5rem",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.5s ease",
                background: i === activeIndex ? "var(--primary)" : "rgba(45,45,45,0.2)",
              }}
              aria-label={`Go to ${s}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
