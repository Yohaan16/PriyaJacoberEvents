"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  { number: "01", title: "Share Your Idea", description: "Tell us about your vision, occasion, and preferences. Every great event starts with a conversation." },
  { number: "02", title: "We Design Your Concept", description: "Our team crafts a tailored event concept — from venue and theme to catering and entertainment." },
  { number: "03", title: "We Organize Everything", description: "Sit back while we coordinate vendors, manage timelines, and handle all the logistics." },
  { number: "04", title: "Enjoy Your Event", description: "Show up and enjoy — stress-free. We manage everything on the day so you can be fully present." },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-white min-h-full flex flex-col justify-center" ref={ref}>
      {/* Logo */}
      <div className="flex justify-center mb-6 md:mb-8">
        <img
          src="/logo.png"
          alt="Priya Jacober Events"
          className="w-80 md:w-96 h-auto object-contain"
        />
      </div>
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium mb-4">Process</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            How It <span className="text-primary">Works</span>
          </h2>
          <div className="w-16 h-1 rounded-full bg-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-[2px] bg-accent" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Number circle */}
              <div className="relative z-10 w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg shadow-primary/10" style={{ background: "var(--gold-gradient)" }}>
                <span className="text-white text-xl font-bold">{step.number}</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
