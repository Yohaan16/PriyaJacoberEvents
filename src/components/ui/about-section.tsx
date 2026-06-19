"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/language-context";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium mb-4">
              {t("about.label")}
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t("about.title1")} <span className="text-primary">{t("about.title2")}</span>
            </h2>
            <div className="w-16 h-1 rounded-full bg-primary mb-8" />
            <p className="text-muted-foreground leading-relaxed mb-6 text-base md:text-lg">
              {t("about.desc1")}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6 text-base md:text-lg">
              {t("about.desc2")}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6 text-base md:text-lg">
              {t("about.desc3")}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 text-base md:text-lg">
              {t("about.desc4")}
            </p>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("pje-navigate", { detail: "services" }))}
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider hover:gap-3 transition-all duration-300"
            >
              {t("about.cta")}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 flex justify-center bg-stone-50">
              <img
                src="/Profile_Pic.jpeg"
                alt="Priya Jacober, Co-Founder and Event Manager"
                className="h-[400px] md:h-[500px] object-contain"
              />
              {/* Overlay accent */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
            </div>
            {/* Decorative element */}
            <div
              className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-30"
              style={{ background: "var(--pink-gradient)" }}
            />
          </motion.div>
        </div>

        {/* Divider */}
        <hr className="border-t border-accent/20 my-16 md:my-20" />

        {/* Partnership Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          <div className="lg:col-span-7">
            <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium mb-4">
              {t("partner.label")}
            </p>
            <h3
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t("partner.title1")} <span className="text-primary">{t("partner.title2")}</span> {t("partner.title3")}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4 text-base">
              {t("partner.desc1")}
            </p>
            <p className="text-muted-foreground leading-relaxed text-base">
              {t("partner.desc2")}
            </p>
          </div>

          {/* Link / CTA Side */}
          <div className="lg:col-span-5">
            <motion.div
              className="glass rounded-2xl p-6 md:p-8 border border-primary/20 bg-secondary/30 flex flex-col justify-between h-full"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div>
                <h4 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {t("partner.card.title")}
                </h4>
                <p className="text-xs text-primary uppercase tracking-wider font-semibold mb-4">
                  {t("partner.card.subtitle")}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {t("partner.card.desc")}
                </p>
              </div>
              <a
                href="https://labodega77.ch/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full py-3.5 px-6 rounded-full text-white text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-[1.03] text-center"
                style={{ background: "var(--gold-gradient)" }}
              >
                {t("partner.card.cta")}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
