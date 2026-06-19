"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShaderAnimation } from "./shader-animation";
import { Globe, Phone, MapPin } from "lucide-react";

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.02,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="relative w-full min-h-full flex items-center overflow-hidden">
      {/* Shader Background */}
      <div className="absolute inset-0">
        <ShaderAnimation />
      </div>

      {/* White logo watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src="/logo.png"
          alt=""
          className="w-[50vw] max-w-[600px] h-auto object-contain opacity-50"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-32 md:py-40"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.p
          className="text-accent-light text-sm md:text-base uppercase tracking-[0.3em] font-medium mb-6"
          variants={itemVariants}
        >
          Priya Jacober Events
        </motion.p>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
          variants={itemVariants}
        >
          Making Every Moment
          <br />
          <span className="gold-shimmer">Unforgettable</span>
        </motion.h1>

        <motion.div
          className="w-20 h-1 rounded-full mb-8"
          style={{ background: "var(--gold-gradient)" }}
          variants={itemVariants}
        />

        <motion.p
          className="text-white/80 text-base md:text-lg max-w-xl mb-4 leading-relaxed"
          variants={itemVariants}
        >
          Stress‑Free Event Planning for Private, Luxury &amp; Corporate Occasions in Zurich.
          We turn your ideas into beautifully executed experiences.
        </motion.p>

        <motion.p
          className="text-accent-light text-sm md:text-base font-medium tracking-wide mb-10"
          variants={itemVariants}
        >
          Private · Luxury · Corporate
        </motion.p>

        <motion.button
          onClick={() => {
            window.dispatchEvent(new CustomEvent("pje-navigate", { detail: "contact" }));
          }}
          className="inline-block px-8 py-4 rounded-full text-sm md:text-base font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
          style={{ background: "var(--gold-gradient)" }}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Plan Your Event
        </motion.button>

        {/* Contact info strip */}
        <motion.div
          className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2 text-white/60 text-xs md:text-sm">
            <Globe className="w-4 h-4 text-primary" />
            <span>jacoberevents.ch</span>
          </div>
          <div className="flex items-center gap-2 text-white/60 text-xs md:text-sm">
            <Phone className="w-4 h-4 text-primary" />
            <span>+41 76 502 91 74</span>
          </div>
          <div className="flex items-center gap-2 text-white/60 text-xs md:text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Zurich, Switzerland</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
