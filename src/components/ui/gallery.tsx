"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Heart, Star, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/language-context";

interface LeafData {
  front: {
    type: "cover" | "image" | "text" | "outro";
    imageSrc?: string;
    title?: string;
    subtitle?: string;
    text?: string;
    pageNum?: string;
    tag?: string;
  };
  back: {
    type: "cover" | "image" | "text" | "outro";
    imageSrc?: string;
    title?: string;
    subtitle?: string;
    text?: string;
    pageNum?: string;
    tag?: string;
  };
}

export function Gallery() {
  const [currentLeaf, setCurrentLeaf] = useState(0);
  const [flippingLeaf, setFlippingLeaf] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Resize listener to scale the 3D book to fit mobile screens
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      // Original book width is 840px, let's aim for 840px + some side padding (880px total)
      if (screenWidth < 900) {
        // Scale down keeping at least scale 0.38
        setScale(Math.max(0.38, (screenWidth - 40) / 840));
      } else {
        setScale(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const leaves: LeafData[] = [
    // Leaf 0: Cover & Intro
    {
      front: {
        type: "cover",
        title: t("gallery.leaf0.front.title"),
        subtitle: t("gallery.leaf0.front.subtitle"),
        text: t("gallery.leaf0.front.text"),
      },
      back: {
        type: "text",
        pageNum: "I",
        tag: t("gallery.leaf0.back.tag"),
        title: t("gallery.leaf0.back.title"),
        text: t("gallery.leaf0.back.text"),
      },
    },
    // Leaf 1: Image 010 & Image 013
    {
      front: {
        type: "image",
        imageSrc: "/010.jpg",
        pageNum: "II",
        tag: t("gallery.leaf1.front.tag"),
        title: t("gallery.leaf1.front.title"),
        text: t("gallery.leaf1.front.text"),
      },
      back: {
        type: "image",
        imageSrc: "/013.jpg",
        pageNum: "III",
        tag: t("gallery.leaf1.back.tag"),
        title: t("gallery.leaf1.back.title"),
        text: t("gallery.leaf1.back.text"),
      },
    },
    // Leaf 2: Image 023 & Image 031
    {
      front: {
        type: "image",
        imageSrc: "/023.jpg",
        pageNum: "IV",
        tag: t("gallery.leaf2.front.tag"),
        title: t("gallery.leaf2.front.title"),
        text: t("gallery.leaf2.front.text"),
      },
      back: {
        type: "image",
        imageSrc: "/031.jpg",
        pageNum: "V",
        tag: t("gallery.leaf2.back.tag"),
        title: t("gallery.leaf2.back.title"),
        text: t("gallery.leaf2.back.text"),
      },
    },
    // Leaf 3: Image 033 & Image 034
    {
      front: {
        type: "image",
        imageSrc: "/033.jpg",
        pageNum: "VI",
        tag: t("gallery.leaf3.front.tag"),
        title: t("gallery.leaf3.front.title"),
        text: t("gallery.leaf3.front.text"),
      },
      back: {
        type: "image",
        imageSrc: "/034.jpg",
        pageNum: "VII",
        tag: t("gallery.leaf3.back.tag"),
        title: t("gallery.leaf3.back.title"),
        text: t("gallery.leaf3.back.text"),
      },
    },
    // Leaf 4: Outro & Back Cover
    {
      front: {
        type: "outro",
        pageNum: "VIII",
        title: t("gallery.leaf4.front.title"),
        text: t("gallery.leaf4.front.text"),
      },
      back: {
        type: "cover",
        title: t("gallery.leaf4.back.title"),
        subtitle: t("gallery.leaf4.back.subtitle"),
        text: t("gallery.leaf4.back.text"),
      },
    },
  ];

  const totalLeaves = leaves.length;

  const flipNext = () => {
    if (currentLeaf >= totalLeaves || flippingLeaf !== null) return;
    setFlippingLeaf(currentLeaf);
    setCurrentLeaf((prev) => prev + 1);
    setTimeout(() => {
      setFlippingLeaf(null);
    }, 800);
  };

  const flipPrev = () => {
    if (currentLeaf <= 0 || flippingLeaf !== null) return;
    setFlippingLeaf(currentLeaf - 1);
    setCurrentLeaf((prev) => prev - 1);
    setTimeout(() => {
      setFlippingLeaf(null);
    }, 800);
  };

  // Render helper for page content
  const renderPageContent = (content: any, isLeft: boolean) => {
    const isCover = content.type === "cover";
    const isImage = content.type === "image";
    const isText = content.type === "text";
    const isOutro = content.type === "outro";

    // Card style background texture
    const pageBg = "linear-gradient(135deg, #FFFDFB 0%, #FFF9F5 100%)";

    if (isCover) {
      return (
        <div
          className="w-full h-full p-8 flex flex-col justify-between items-center text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #2D2D2D 0%, #1A1A1A 100%)",
            color: "#FFFFFF",
          }}
        >
          {/* Elegant gold foil frame */}
          <div className="absolute inset-4 border border-primary/40 rounded-lg pointer-events-none" />
          <div className="absolute inset-5 border border-primary/20 rounded-lg pointer-events-none" />

          {/* Top ornamentation */}
          <div className="mt-8">
            <span className="text-[10px] tracking-[0.4em] uppercase text-primary font-semibold">
              {content.subtitle}
            </span>
          </div>

          {/* Logo / Monogram */}
          <div className="my-auto flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full border border-primary/30 flex items-center justify-center bg-white/5 shadow-inner">
              <img src="/logo.png" alt="Logo" className="w-14 h-14 object-contain brightness-0 invert" />
            </div>
            <h3
              className="text-3xl md:text-4xl font-bold mt-4 tracking-wider gold-shimmer font-display"
              style={{ letterSpacing: "0.1em" }}
            >
              {content.title}
            </h3>
            <div className="w-12 h-0.5 bg-primary/50 my-2" />
            <p className="text-[11px] tracking-[0.25em] text-white/60 font-medium px-4">
              {content.text}
            </p>
          </div>

          {/* Bottom brand info */}
          <div className="mb-8 flex items-center gap-1.5 text-primary/70">
            <Sparkles className="w-3 h-3" />
            <span className="text-[9px] uppercase tracking-[0.3em] font-medium">Zurich</span>
          </div>
        </div>
      );
    }

    if (isImage) {
      return (
        <div className="w-full h-full relative overflow-hidden bg-white">
          {/* Subtle shadow near the spine to give folding depth */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none z-10"
            style={{
              width: "35px",
              left: isLeft ? "auto" : 0,
              right: isLeft ? 0 : "auto",
              background: isLeft
                ? "linear-gradient(to left, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 100%)"
                : "linear-gradient(to right, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 100%)",
            }}
          />
          <img
            src={content.imageSrc}
            alt={content.title || "Event Image"}
            className="w-full h-full object-cover"
          />
          {/* A soft overlay to tie it to the book aesthetics */}
          <div className="absolute inset-0 bg-black/[0.02] pointer-events-none" />
        </div>
      );
    }

    return (
      <div
        className="w-full h-full p-8 flex flex-col justify-between relative overflow-hidden"
        style={{
          background: pageBg,
          color: "var(--foreground)",
        }}
      >
        {/* Subtle shadow near the spine */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            width: "30px",
            left: isLeft ? "auto" : 0,
            right: isLeft ? 0 : "auto",
            background: isLeft
              ? "linear-gradient(to left, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0) 100%)"
              : "linear-gradient(to right, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/30 via-transparent to-transparent" />

        {/* Top Header Row */}
        <div className="flex justify-between items-center z-10 border-b border-accent/20 pb-3">
          <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-semibold">
            {content.tag || "Priya Jacober Events"}
          </span>
          <span className="text-[10px] text-muted-foreground/60 tracking-wider font-mono">
            {content.pageNum}
          </span>
        </div>

        {/* Main Content Area */}
        <div className="my-auto flex flex-col justify-center h-[85%] z-10">
          {isText && (
            <div className="py-4 px-2 flex flex-col justify-center text-center">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Compass className="w-4 h-4 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-4 tracking-wide font-display text-foreground">
                {content.title}
              </h4>
              <div className="w-10 h-0.5 bg-primary/40 mx-auto mb-4" />
              <p className="text-xs leading-relaxed text-muted-foreground text-center max-w-xs mx-auto">
                {content.text}
              </p>
            </div>
          )}

          {isOutro && (
            <div className="py-4 px-2 flex flex-col justify-center text-center">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-4 h-4 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-4 tracking-wide font-display text-foreground">
                {content.title}
              </h4>
              <div className="w-10 h-0.5 bg-primary/40 mx-auto mb-4" />
              <p className="text-xs leading-relaxed text-muted-foreground text-center max-w-xs mx-auto mb-6">
                {content.text}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.dispatchEvent(new CustomEvent("pje-navigate", { detail: "contact" }));
                }}
                className="inline-block mx-auto px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
                style={{ background: "var(--gold-gradient)" }}
              >
                {t("gallery.leaf4.front.cta")}
              </button>
            </div>
          )}
        </div>

        {/* Footer Page Number / Brand */}
        <div className="flex justify-between items-center text-[9px] text-muted-foreground/40 tracking-wider pt-2 border-t border-accent/10 z-10">
          <span>{isLeft ? "Portfolio" : "Zurich"}</span>
          <span>© Priya Jacober</span>
        </div>
      </div>
    );
  };

  return (
    <section
      id="gallery"
      className="section-padding flex flex-col justify-center items-center relative select-none"
      style={{
        background: "var(--secondary)",
        minHeight: "100vh",
      }}
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center z-10">
        {/* Section Header */}
        <div className="text-center mb-10 w-full px-4">
          <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium mb-3">{t("gallery.label")}</p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t("gallery.title1")} <span className="text-primary">{t("gallery.title2")}</span>
          </h2>
          <div className="w-16 h-1 rounded-full bg-primary mx-auto mb-4" />
          <p className="text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed">
            {t("gallery.desc")}
          </p>
        </div>

        {/* 3D Book Layout Container */}
        <div
          className="flex flex-col items-center justify-center relative w-full overflow-visible"
          style={{
            height: `${540 * scale}px`,
            transition: "height 0.3s ease",
            marginBottom: "2rem",
          }}
        >
          {/* Inner Scaled Book Frame */}
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "center center",
              width: "840px",
              height: "540px",
              position: "relative",
              perspective: "1800px",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Hardcover Base Backing (Shadow and wooden feel) */}
            <div
              className="absolute inset-0 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.18)] pointer-events-none"
              style={{
                background: "linear-gradient(135deg, #1f1f1f 0%, #0d0d0d 100%)",
                border: "2px solid #C9A84C",
              }}
            />

            {/* Left Cover (Base) */}
            <div
              className="absolute w-[420px] h-full left-0 top-0 rounded-l-2xl border-r border-black/30"
              style={{
                background: "linear-gradient(to left, #2d2d2d 0%, #151515 100%)",
                boxShadow: "inset 5px 0 15px rgba(255,255,255,0.05)",
                borderLeft: "4px solid #C9A84C",
                borderTop: "3px solid #C9A84C",
                borderBottom: "3px solid #C9A84C",
              }}
            />

            {/* Right Cover (Base) */}
            <div
              className="absolute w-[420px] h-full right-0 top-0 rounded-r-2xl border-l border-black/30"
              style={{
                background: "linear-gradient(to right, #2d2d2d 0%, #151515 100%)",
                boxShadow: "inset -5px 0 15px rgba(255,255,255,0.05)",
                borderRight: "4px solid #C9A84C",
                borderTop: "3px solid #C9A84C",
                borderBottom: "3px solid #C9A84C",
              }}
            />

            {/* Middle Spine (Base) */}
            <div
              className="absolute w-[30px] h-full left-[405px] top-0 z-20 pointer-events-none"
              style={{
                background: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(255,255,255,0.15) 50%, rgba(0,0,0,0.6) 100%)",
                boxShadow: "0 0 10px rgba(0,0,0,0.5)",
              }}
            />

            {/* The Pages Stack */}
            {leaves.map((leaf, index) => {
              const isFlipped = index < currentLeaf;
              const isFlipping = index === flippingLeaf;

              // Calculate zIndex using flipping logic
              let zIndex = 0;
              if (isFlipping) {
                zIndex = 50; // Keep flipping page on top
              } else if (isFlipped) {
                zIndex = index + 1;
              } else {
                zIndex = totalLeaves - index;
              }

              return (
                <div
                  key={index}
                  onClick={(e) => {
                    // Click on the leaf to flip it
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    if (x > rect.width / 2) {
                      // Clicked right side, flip next if this leaf is current unflipped
                      if (!isFlipped && index === currentLeaf) {
                        flipNext();
                      }
                    } else {
                      // Clicked left side, flip prev if this is the last flipped leaf
                      if (isFlipped && index === currentLeaf - 1) {
                        flipPrev();
                      }
                    }
                  }}
                  className="absolute w-[400px] h-[500px] left-[420px] top-[20px] cursor-pointer"
                  style={{
                    transformOrigin: "left center",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1), z-index 0.8s",
                    transform: isFlipped ? "rotateY(-180deg)" : "rotateY(0deg)",
                    zIndex: zIndex,
                  }}
                >
                  {/* Front Page Side */}
                  <div
                    className="absolute inset-0 rounded-r-xl border border-accent/25 border-l-0 shadow-[4px_0_10px_rgba(0,0,0,0.06)]"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      overflow: "hidden",
                    }}
                  >
                    {renderPageContent(leaf.front, false)}
                  </div>

                  {/* Back Page Side (Rotated 180deg) */}
                  <div
                    className="absolute inset-0 rounded-l-xl border border-accent/25 border-r-0 shadow-[-4px_0_10px_rgba(0,0,0,0.06)]"
                    style={{
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      overflow: "hidden",
                    }}
                  >
                    {renderPageContent(leaf.back, true)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Controls at the Bottom */}
        <div className="flex flex-col items-center gap-4 z-20 mt-4">
          <div className="flex items-center gap-8">
            {/* Prev button */}
            <button
              onClick={flipPrev}
              disabled={currentLeaf === 0 || flippingLeaf !== null}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 shadow-md ${currentLeaf === 0
                ? "border-muted text-muted-foreground/30 bg-muted/20 cursor-not-allowed"
                : "border-primary/40 text-primary bg-white hover:bg-primary hover:text-white hover:border-primary active:scale-95"
                }`}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Page tracker dots */}
            <div className="flex gap-2">
              {Array.from({ length: totalLeaves + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (flippingLeaf !== null) return;
                    setFlippingLeaf(currentLeaf);
                    setCurrentLeaf(idx);
                    setTimeout(() => setFlippingLeaf(null), 800);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-500 ${idx === currentLeaf
                    ? "w-8 bg-primary"
                    : "w-2.5 bg-accent/40 hover:bg-primary/50"
                    }`}
                  aria-label={`Go to page ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={flipNext}
              disabled={currentLeaf === totalLeaves || flippingLeaf !== null}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 shadow-md ${currentLeaf === totalLeaves
                ? "border-muted text-muted-foreground/30 bg-muted/20 cursor-not-allowed"
                : "border-primary/40 text-primary bg-white hover:bg-primary hover:text-white hover:border-primary active:scale-95"
                }`}
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Book progress guide text */}
          <p className="text-xs text-muted-foreground tracking-[0.15em] uppercase font-medium">
            {currentLeaf === 0
              ? t("gallery.control.front")
              : currentLeaf === totalLeaves
                ? t("gallery.control.back")
                : `${t("gallery.control.spread")} ${currentLeaf} ${t("gallery.control.of")} ${totalLeaves - 1}`}
          </p>
        </div>
      </div>
    </section>
  );
}
