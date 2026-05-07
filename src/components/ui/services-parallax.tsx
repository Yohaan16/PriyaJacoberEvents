"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const IMG_PADDING = 12;

const services = [
  {
    imgUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&auto=format&fit=crop&q=80",
    subheading: "Celebrate",
    heading: "Birthday & Private Parties",
    title: "Make Every Milestone Memorable",
    description: "From surprise birthday bashes to elegant private gatherings, we create celebrations that reflect your personality. We handle venue selection, décor, catering, entertainment, and every detail in between.",
    services: ["Birthday Parties", "Private House Parties", "Ladies' Events", "Themed Parties"],
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80",
    subheading: "Collaborate",
    heading: "Corporate & Team Events",
    title: "Professional Events, Flawlessly Executed",
    description: "Build team spirit and impress clients with expertly coordinated corporate events. From summer parties to annual galas, we bring professionalism and creativity to every corporate gathering.",
    services: ["Corporate Events", "Team Building", "Company Parties", "Summer & Christmas Parties"],
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&auto=format&fit=crop&q=80",
    subheading: "Explore",
    heading: "Destination Events",
    title: "Unforgettable Events in Stunning Locations",
    description: "Take your celebration to Switzerland's breathtaking landscapes or the tropical beauty of Mauritius. We coordinate every detail of your destination event, from travel logistics to on-site management.",
    services: ["Switzerland Events", "Mauritius Events", "Community Events", "Full Planning or Partial Support"],
  },
];

function StickyImage({ imgUrl }: { imgUrl: string }) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["end end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{ backgroundImage: `url(${imgUrl})`, backgroundSize: "cover", backgroundPosition: "center", height: `calc(100vh - ${IMG_PADDING * 2}px)`, top: IMG_PADDING, scale }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div className="absolute inset-0 bg-black/50" style={{ opacity }} />
    </motion.div>
  );
}

function OverlayCopy({ subheading, heading }: { subheading: string; heading: string }) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div style={{ y, opacity }} ref={targetRef} className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white">
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl text-accent-light uppercase tracking-widest">{subheading}</p>
      <p className="text-center text-4xl font-bold md:text-7xl" style={{ fontFamily: "'Playfair Display', serif" }}>{heading}</p>
    </motion.div>
  );
}

interface ServiceContentProps {
  title: string;
  description: string;
  serviceList: string[];
}

function ServiceContent({ title, description, serviceList }: ServiceContentProps) {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
      <h3 className="col-span-1 text-3xl font-bold md:col-span-4" style={{ fontFamily: "'Playfair Display', serif" }}>
        {title}
      </h3>
      <div className="col-span-1 md:col-span-8">
        <p className="mb-6 text-lg text-muted-foreground md:text-xl leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-3 mb-8">
          {serviceList.map((s) => (
            <span key={s} className="px-4 py-2 rounded-full text-sm font-medium border border-primary/30 text-primary bg-accent/20">{s}</span>
          ))}
        </div>
        <a href="#contact" className="inline-block rounded-full px-8 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg" style={{ background: "var(--gold-gradient)" }}>
          Get Started →
        </a>
      </div>
    </div>
  );
}

export function ServicesParallax() {
  return (
    <section id="services" className="bg-white">
      <div className="text-center pt-20 pb-8 px-6">
        <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium mb-4">What We Offer</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          Our <span className="text-primary">Services</span>
        </h2>
        <div className="w-16 h-1 rounded-full bg-primary mx-auto" />
      </div>
      {services.map((service) => (
        <div key={service.heading} style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}>
          <div className="relative h-[150vh]">
            <StickyImage imgUrl={service.imgUrl} />
            <OverlayCopy heading={service.heading} subheading={service.subheading} />
          </div>
          <ServiceContent title={service.title} description={service.description} serviceList={service.services} />
        </div>
      ))}
    </section>
  );
}
