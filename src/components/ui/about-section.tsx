"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium mb-4">
              About Us
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              We Make Event Planning{" "}
              <span className="text-primary">Simple</span>
            </h2>
            <div className="w-16 h-1 rounded-full bg-primary mb-8" />
            <p className="text-muted-foreground leading-relaxed mb-6 text-base md:text-lg">
              I&apos;m Priya Jacober, Co-Founder and Event Manager based in Zurich.
              After many years as a lead coordinator in the telecom industry,
              I discovered my passion for event planning during my motherhood break.
              Today, I combine strong organizational skills with creativity to bring
              meaningful events to life.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 text-base md:text-lg">
              Together with my team, we organize: Company, summer &amp; Christmas parties;
              corporate team events; birthday celebrations; private gatherings &amp;
              themed parties; ladies&apos; events; community &amp; destination events.
              We work with trusted partners for catering, photography, DJs, decorations,
              flowers, and entertainment.
            </p>
            <a
              href="#services"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider hover:gap-3 transition-all duration-300"
            >
              Explore Our Services
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
              <img
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop&q=80"
                alt="Beautiful event decoration with flowers and elegant table setting"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              {/* Overlay accent */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            {/* Floating card */}
            <motion.div
              className="absolute -bottom-6 -left-6 md:-left-8 bg-white rounded-xl shadow-xl p-5 md:p-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <p className="text-3xl md:text-4xl font-bold text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
                100+
              </p>
              <p className="text-muted-foreground text-sm mt-1">Events Organized</p>
            </motion.div>
            {/* Decorative element */}
            <div
              className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-30"
              style={{ background: "var(--pink-gradient)" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
