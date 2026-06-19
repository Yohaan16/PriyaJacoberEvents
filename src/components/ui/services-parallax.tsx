"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/language-context";

const services = [
  {
    imgUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80",
    headingKey: "services.private.title",
    descKey: "services.private.desc",
    tagKeys: ["services.private.tag1", "services.private.tag2", "services.private.tag3", "services.private.tag4"],
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop&q=80",
    headingKey: "services.luxury.title",
    descKey: "services.luxury.desc",
    tagKeys: ["services.luxury.tag1", "services.luxury.tag2", "services.luxury.tag3", "services.luxury.tag4"],
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
    headingKey: "services.corporate.title",
    descKey: "services.corporate.desc",
    tagKeys: ["services.corporate.tag1", "services.corporate.tag2", "services.corporate.tag3", "services.corporate.tag4"],
  },
] as const;

export function ServicesParallax() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-white min-h-full flex flex-col justify-center" ref={ref}>
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium mb-4">{t("services.label")}</p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t("services.title1")} <span className="text-primary">{t("services.title2")}</span>
          </h2>
          <div className="w-16 h-1 rounded-full bg-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const heading = t(service.headingKey);
            const description = t(service.descKey);
            return (
              <motion.div
                key={service.headingKey}
                className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-default"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
              >
                {/* Image */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img
                    src={service.imgUrl}
                    alt={heading}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <h3
                    className="absolute bottom-4 left-5 right-5 text-xl md:text-2xl font-bold text-white"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {heading}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-5 md:p-6 bg-white">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tagKeys.map((tagKey) => (
                      <span
                        key={tagKey}
                        className="px-3 py-1 rounded-full text-xs font-medium border border-primary/30 text-primary bg-accent/20"
                      >
                        {t(tagKey)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

