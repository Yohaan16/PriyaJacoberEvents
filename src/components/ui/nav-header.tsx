"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

function NavHeader() {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  const tabs = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      {/* Desktop Nav */}
      <ul
        className="relative mx-auto hidden md:flex w-fit rounded-full glass shadow-lg shadow-black/5 p-1.5"
        onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
      >
        {tabs.map((tab) => (
          <Tab key={tab.label} setPosition={setPosition} href={tab.href}>
            {tab.label}
          </Tab>
        ))}
        <Cursor position={position} />
      </ul>

      {/* Mobile hamburger */}
      <div className="md:hidden flex items-center justify-between w-full glass rounded-full px-5 py-3 shadow-lg">
        <span className="text-sm font-semibold text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
          PJE
        </span>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1 p-1"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-foreground transition-transform ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`} />
          <span className={`block w-5 h-0.5 bg-foreground transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-foreground transition-transform ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-16 left-4 right-4 glass rounded-2xl shadow-xl p-4"
        >
          {tabs.map((tab) => (
            <a
              key={tab.label}
              href={tab.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 px-4 text-sm font-medium text-foreground hover:text-primary transition-colors border-b border-accent/30 last:border-0"
            >
              {tab.label}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
}

const Tab = ({
  children,
  setPosition,
  href,
}: {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<{ left: number; width: number; opacity: number }>>;
  href: string;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 block cursor-pointer"
    >
      <a
        href={href}
        className="block px-4 py-2.5 text-xs uppercase tracking-wider font-medium text-foreground mix-blend-difference lg:px-6 lg:py-3 lg:text-sm transition-colors"
      >
        {children}
      </a>
    </li>
  );
};

const Cursor = ({ position }: { position: { left: number; width: number; opacity: number } }) => {
  return (
    <motion.li
      animate={position}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="absolute z-0 h-10 rounded-full lg:h-11"
      style={{ background: "var(--gold-gradient)" }}
    />
  );
};

export default NavHeader;
