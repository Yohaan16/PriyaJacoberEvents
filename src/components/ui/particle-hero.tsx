"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Globe, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/context/language-context"

interface Particle {
  x: number
  y: number
  speed: number
  opacity: number
  fadeDelay: number
  fadeStart: number
  fadingOut: boolean
  reset: () => void
  update: () => void
  draw: (ctx: CanvasRenderingContext2D) => void
}

export function ParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number | undefined>(undefined)
  const { t } = useLanguage()

  const createParticle = (canvas: HTMLCanvasElement): Particle => {
    const particle = {
      x: 0,
      y: 0,
      speed: 0,
      opacity: 1,
      fadeDelay: 0,
      fadeStart: 0,
      fadingOut: false,
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.speed = Math.random() / 5 + 0.1
        this.opacity = 1
        this.fadeDelay = Math.random() * 600 + 100
        this.fadeStart = Date.now() + this.fadeDelay
        this.fadingOut = false
      },
      update() {
        this.y -= this.speed
        if (this.y < 0) {
          this.reset()
        }

        if (!this.fadingOut && Date.now() > this.fadeStart) {
          this.fadingOut = true
        }

        if (this.fadingOut) {
          this.opacity -= 0.008
          if (this.opacity <= 0) {
            this.reset()
          }
        } else {
          // Twinkle effect: oscillate opacity slightly over time
          this.opacity = 0.4 + Math.sin((Date.now() + this.x) * 0.003) * 0.3
        }
      },
      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(255, ${200 + Math.random() * 55}, ${110 + Math.random() * 110}, ${this.opacity})`
        ctx.beginPath()
        // Draw round gold glowing particles of size 1.2px - 2.7px radius
        ctx.arc(this.x, this.y, Math.random() * 1.5 + 1.2, 0, Math.PI * 2)
        ctx.fill()
      },
    }

    particle.reset()
    particle.y = Math.random() * canvas.height
    particle.fadeDelay = Math.random() * 600 + 100
    particle.fadeStart = Date.now() + particle.fadeDelay
    particle.fadingOut = false

    return particle
  }

  const calculateParticleCount = (canvas: HTMLCanvasElement) => {
    return Math.floor((canvas.width * canvas.height) / 6000)
  }

  const initParticles = (canvas: HTMLCanvasElement) => {
    const particleCount = calculateParticleCount(canvas)
    particlesRef.current = []
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle(canvas))
    }
  }

  const animate = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particlesRef.current.forEach((particle) => {
      particle.update()
      particle.draw(ctx)
    })
    animationRef.current = requestAnimationFrame(() => animate(canvas, ctx))
  }

  const handleResize = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    initParticles(canvas)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    initParticles(canvas)
    animate(canvas, ctx)

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.02,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut" as const,
      },
    },
  }

  return (
    <div
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{ 
        background: "#05060f",
        backgroundImage: "linear-gradient(0deg,rgba(216,236,248,.06),rgba(152,192,239,.06))",
        fontSize: "max(calc(min(600px, 80vh) * 0.03), 10px)",
        WebkitFontSmoothing: "antialiased",
        textRendering: "optimizeLegibility",
        scrollBehavior: "smooth",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes load {  
          0% { opacity: 0;}    
          100% { opacity: 1;}    
        }
        @keyframes up {      
          100% { transform: translateY(0); }    
        }
        @keyframes spotlight {
          0% {
            transform: rotateZ(0deg) scale(1);
            filter: blur(15px) opacity(0.5);
          }
          20% {
            transform: rotateZ(-1deg) scale(1.2);
            filter: blur(16px) opacity(0.6);
          }    
          40% {
            transform: rotateZ(2deg) scale(1.3);
            filter: blur(14px) opacity(0.4);
          }    
          60% {
            transform: rotateZ(-2deg) scale(1.2);
            filter: blur(15px) opacity(0.6);
          }    
          80% {
            transform: rotateZ(1deg) scale(1.1);
            filter: blur(13px) opacity(0.4);
          }    
          100% {
            transform: rotateZ(0deg) scale(1);
            filter: blur(15px) opacity(0.5);
          }    
        }
        @keyframes loadrot {
          0% { transform: rotate(0deg) scale(0);}
          100% { transform: scale(1);}
        }
        @keyframes accentload {
          0% {
            opacity: 0; transform: scale(0);
          }
          100% {
            opacity: 1; transform: scale(1);
          }
        }
      `}} />

      {/* Spotlights */}
      <div
        className="spotlight absolute inset-0 pointer-events-none z-0 overflow-hidden"
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              borderRadius: "0 0 50% 50%",
              position: "absolute",
              left: 0,
              right: 0,
              margin: "0 auto",
              top: "3em",
              width: "30em",
              height: "max(42em, 86vh)",
              backgroundImage:
                "conic-gradient(from 0deg at 50% -5%, transparent 45%, rgba(201, 168, 76, .25) 48%, rgba(232, 212, 139, .55) 50%, rgba(201, 168, 76, .25) 52%, transparent 55%)",
              transformOrigin: "50% 0",
              filter: "blur(15px) opacity(0.5)",
              zIndex: -1,
              transform: i === 0 ? "rotate(20deg)" : i === 1 ? "rotate(-20deg)" : "rotate(0deg)",
              animation:
                i === 0
                  ? "load 2s ease-in-out forwards, loadrot 2s ease-in-out forwards, spotlight 17s ease-in-out infinite"
                  : i === 1
                    ? "load 2s ease-in-out forwards, loadrot 2s ease-in-out forwards, spotlight 14s ease-in-out infinite"
                    : "load 2s ease-in-out forwards, loadrot 2s ease-in-out forwards, spotlight 21s ease-in-out infinite reverse",
            }}
          />
        ))}
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        id="particleCanvas"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          animation: "load 0.4s ease-in-out forwards",
          zIndex: 1,
          width: "100%",
          height: "100%"
        }}
      />

      {/* Accent Grid Lines */}
      <div
        className="accent-lines absolute inset-0 pointer-events-none z-0"
        style={{
          height: "100%",
        }}
      >
        <div style={{ position: "absolute", top: 0, right: 0, left: 0, margin: "auto", height: "100%", width: "100%" }}>
          {[6, 11, 16, 24, 29].map((top, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: `${top}em`,
                right: 0,
                left: 0,
                margin: "auto",
                width: "100%",
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(186, 215, 247, .18), transparent)",
                opacity: 0,
                transform: "scale(0)",
                animation: "accentload 2s ease-out 2.4s forwards",
              }}
            />
          ))}
        </div>
        <div style={{ position: "absolute", top: 0, right: 0, left: 0, margin: "auto", height: "100%", width: "100%" }}>
          {[24, 34, -24, -34].map((left, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: left > 0 ? `${left}em` : "auto",
                right: left < 0 ? `${Math.abs(left)}em` : "auto",
                margin: "auto",
                width: "1px",
                height: "100%",
                background: "rgba(186, 215, 247, .18)",
                opacity: 0,
                transform: "scale(0)",
                animation: "accentload 2s ease-out 2s forwards",
              }}
            />
          ))}
        </div>
      </div>

      {/* White logo watermark */}
      <div className="logo-watermark absolute inset-0 flex items-center justify-center pointer-events-none z-1">
        <img
          src="/logo.png"
          alt=""
          className="w-[50vw] max-w-[600px] h-auto object-contain opacity-50 transition-all duration-1000"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40 z-1" />

      {/* Content Section */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-32 md:py-40 flex flex-col justify-center h-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.p
          className="hero-text text-accent-light text-sm md:text-base uppercase tracking-[0.3em] font-medium mb-6 transition-all duration-1000"
          variants={itemVariants}
        >
          {t("hero.subtitle")}
        </motion.p>
 
        <motion.h1
          className="hero-text text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-6 transition-all duration-1000"
          style={{ fontFamily: "'Playfair Display', serif" }}
          variants={itemVariants}
        >
          {t("hero.title1")}
          <br />
          <span className="gold-shimmer transition-all duration-1000">{t("hero.title2")}</span>
        </motion.h1>
 
        <motion.div
          className="w-20 h-1 rounded-full mb-8"
          style={{ background: "var(--gold-gradient)" }}
          variants={itemVariants}
        />
 
        <motion.p
          className="hero-text text-white/80 text-base md:text-lg max-w-xl mb-4 leading-relaxed transition-all duration-1000"
          variants={itemVariants}
        >
          {t("hero.desc")}
        </motion.p>
 
        <motion.p
          className="hero-text text-accent-light text-sm md:text-base font-medium tracking-wide mb-10 transition-all duration-1000"
          variants={itemVariants}
        >
          {t("hero.tags")}
        </motion.p>
 
        <div>
          <motion.button
            onClick={() => {
              window.dispatchEvent(new CustomEvent("pje-navigate", { detail: "contact" }));
            }}
            className="contact-btn inline-block px-8 py-4 rounded-full text-sm md:text-base font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 cursor-pointer"
            style={{ background: "var(--gold-gradient)" }}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {t("hero.cta")}
          </motion.button>
        </div>
 
        {/* Contact info strip */}
        <motion.div
          className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl"
          variants={itemVariants}
        >
          <div className="contact-item flex items-center gap-2 text-white/60 text-xs md:text-sm transition-all duration-1000">
            <Globe className="w-4 h-4 text-primary" />
            <span>jacoberevents.ch</span>
          </div>
          <div className="contact-item flex items-center gap-2 text-white/60 text-xs md:text-sm transition-all duration-1000">
            <Phone className="w-4 h-4 text-primary" />
            <span>{t("hero.phone")}</span>
          </div>
          <div className="contact-item flex items-center gap-2 text-white/60 text-xs md:text-sm transition-all duration-1000">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{t("hero.location")}</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
