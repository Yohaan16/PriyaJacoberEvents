"use client";
 
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/language-context";
 
function navigateToSection(section: string) {
  window.dispatchEvent(new CustomEvent("pje-navigate", { detail: section }));
}
 
interface NavHeaderProps {
  activeSection?: string;
}
 
function NavHeader({ activeSection }: NavHeaderProps) {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
 
  const tabs = [
    { label: t("nav.home"), section: "home" },
    { label: t("nav.about"), section: "about" },
    { label: t("nav.services"), section: "services" },
    { label: t("nav.gallery"), section: "gallery" },
    { label: t("nav.howItWorks"), section: "how-it-works" },
    { label: t("nav.contact"), section: "contact" },
  ];
 
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between md:justify-center px-6 pt-4 md:pt-6 max-w-7xl mx-auto w-full">
      {/* Desktop Nav */}
      <ul
        className="relative hidden md:flex w-fit items-center rounded-full glass shadow-lg shadow-black/5 p-1.5"
        onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.label}
            setPosition={setPosition}
            section={tab.section}
            isActive={activeSection === tab.section}
          >
            {tab.label}
          </Tab>
        ))}
        {/* Language selector dropdown inside the same nav pill */}
        <LanguageDropdown setPosition={setPosition} />
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
          className="md:hidden absolute top-16 left-4 right-4 glass rounded-2xl shadow-xl p-4 flex flex-col gap-1"
        >
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => {
                navigateToSection(tab.section);
                setMobileOpen(false);
              }}
              className={`block w-full text-left py-3 px-4 text-sm font-medium transition-colors border-b border-accent/20 last:border-0 ${
                activeSection === tab.section
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
 
          {/* Mobile Language Switcher */}
          <div className="flex justify-center gap-4 pt-3 mt-2 border-t border-accent/20 text-xs font-semibold">
            {(["en", "fr", "ch"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  setMobileOpen(false);
                }}
                className={`uppercase tracking-wider transition-colors hover:text-primary cursor-pointer py-1.5 px-3.5 rounded-full border border-accent/20 ${
                  language === lang ? "bg-primary text-white border-primary" : "text-muted-foreground"
                }`}
              >
                {lang === "ch" ? "CH" : lang}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}

const Tab = ({
  children,
  setPosition,
  section,
  isActive,
}: {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<{ left: number; width: number; opacity: number }>>;
  section: string;
  isActive?: boolean;
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
      <button
        onClick={() => navigateToSection(section)}
        className={`block px-4 py-2.5 text-xs uppercase tracking-wider font-medium mix-blend-difference lg:px-6 lg:py-3 lg:text-sm transition-colors ${
          isActive ? "text-primary" : "text-foreground"
        }`}
      >
        {children}
      </button>
    </li>
  );
};

const LanguageDropdown = ({
  setPosition,
}: {
  setPosition: React.Dispatch<React.SetStateAction<{ left: number; width: number; opacity: number }>>;
}) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const currentDisplay = language === "ch" ? "CH" : language.toUpperCase();

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
      className="relative z-10 block"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-4 py-2.5 text-xs uppercase tracking-wider font-medium mix-blend-difference lg:px-6 lg:py-3 lg:text-sm text-foreground transition-colors cursor-pointer"
      >
        <span>{currentDisplay}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 top-full mt-2 w-24 rounded-xl glass shadow-lg p-1 flex flex-col border border-accent/20"
          >
            {(["en", "fr", "ch"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${
                  language === lang
                    ? "text-primary font-bold bg-accent/20"
                    : "text-muted-foreground hover:text-primary hover:bg-accent/10"
                }`}
              >
                {lang === "ch" ? "CH" : lang}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
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

export { navigateToSection };
export default NavHeader;
