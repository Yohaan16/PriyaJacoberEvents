"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Heart, Calendar, Wallet, Clock, Music, Shield,
} from "lucide-react";

const features = [
  { icon: Heart, title: "Stress-Free Planning", description: "We handle the details so you can focus on enjoying the moment." },
  { icon: Calendar, title: "Events for Every Occasion", description: "From intimate gatherings to grand celebrations — we do it all." },
  { icon: Wallet, title: "Flexible for Every Budget", description: "Tailored packages that respect your vision and your budget." },
  { icon: Clock, title: "Reliable Coordination", description: "Vendors, timelines, logistics — all perfectly managed." },
  { icon: Music, title: "Entertainment Options", description: "DJs, performers, photographers — we bring the magic." },
  { icon: Shield, title: "On-the-Day Support", description: "We ensure everything runs smoothly from start to finish." },
];

export function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding" style={{ background: "var(--secondary)" }} ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium mb-4">Why Us</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Why People <span className="text-primary">Choose Us</span>
          </h2>
          <div className="w-16 h-1 rounded-full bg-primary mx-auto" />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.title} className="group relative bg-white rounded-2xl p-7 md:p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-accent/20 hover:border-primary/30 cursor-default" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -5 }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: "var(--pink-gradient)" }}>
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
