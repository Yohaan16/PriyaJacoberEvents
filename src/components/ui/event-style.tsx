"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function EventStyle() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden py-20 md:py-32" ref={ref}>
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1478146059778-26028b07395a?w=1400&auto=format&fit=crop&q=80')" }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="text-accent-light text-sm uppercase tracking-[0.3em] font-medium mb-6">Your Vision, Our Expertise</p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          Your Event, <span className="gold-shimmer">Your Way</span>
        </h2>
        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Simple or big. Fun or formal. Budget-friendly or premium.
          We tailor everything to your vision.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["Simple", "Elegant", "Fun", "Formal", "Budget-Friendly", "Premium"].map((style) => (
            <span key={style} className="px-5 py-2 rounded-full border border-white/20 text-white/80 text-sm font-medium hover:border-primary hover:text-primary transition-colors duration-300 cursor-default">
              {style}
            </span>
          ))}
        </div>

        <motion.a
          href="#contact"
          className="inline-block px-10 py-4 rounded-full text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
          style={{ background: "var(--gold-gradient)" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Get Started
        </motion.a>
      </motion.div>
    </section>
  );
}
