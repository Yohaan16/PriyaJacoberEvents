"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import {
  Heart, Calendar, Wallet, Clock, Music, Shield,
} from "lucide-react";

const features = [
  { icon: Heart, titleKey: "why.feature1.title", descKey: "why.feature1.desc" },
  { icon: Calendar, titleKey: "why.feature2.title", descKey: "why.feature2.desc" },
  { icon: Wallet, titleKey: "why.feature3.title", descKey: "why.feature3.desc" },
  { icon: Clock, titleKey: "why.feature4.title", descKey: "why.feature4.desc" },
  { icon: Music, titleKey: "why.feature5.title", descKey: "why.feature5.desc" },
  { icon: Shield, titleKey: "why.feature6.title", descKey: "why.feature6.desc" },
] as const;

export function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLanguage();

  return (
    <section className="section-padding" style={{ background: "var(--secondary)" }} ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium mb-4">{t("why.label")}</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t("why.title1")} <span className="text-primary">{t("why.title2")}</span>
          </h2>
          <div className="w-16 h-1 rounded-full bg-primary mx-auto" />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const title = t(feature.titleKey);
            const description = t(feature.descKey);
            return (
              <motion.div key={feature.titleKey} className="group relative bg-white rounded-2xl p-7 md:p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-accent/20 hover:border-primary/30 cursor-default" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -5 }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: "var(--pink-gradient)" }}>
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

