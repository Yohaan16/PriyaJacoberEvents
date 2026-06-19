"use client";
 
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/language-context";
 
const steps = [
  { number: "01", key: "step1" },
  { number: "02", key: "step2" },
  { number: "03", key: "step3" },
  { number: "04", key: "step4" },
] as const;
 
export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLanguage();
 
  return (
    <section className="section-padding bg-white min-h-full flex flex-col justify-center" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium mb-4">{t("how.label")}</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t("how.title1")} <span className="text-primary">{t("how.title2")}</span>
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
              <h3 className="text-lg font-bold text-foreground mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t(`how.${step.key}.title` as any)}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                {t(`how.${step.key}.desc` as any)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
