"use client";
import { Analytics } from '@vercel/analytics/react';
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// Logo-Komponente
function UniPodLogo({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 800 600" 
      className={`w-32 h-auto ${className}`}
      fill="none"
    >
      {/* Soundwellen */}
      <g transform="translate(280, 100)">
        <rect x="0" y="0" width="40" height="160" rx="20" fill="#6EE7B7" />
        <rect x="80" y="-40" width="40" height="240" rx="20" fill="#6EE7B7" />
        <rect x="160" y="0" width="40" height="160" rx="20" fill="#6EE7B7" />
      </g>
      {/* Logo Text */}
      <g transform="translate(150, 400)">
        {/* "Uni" in dunkelgrün */}
        <path d="M0 0v-60h15v50c0 15 7.5 22.5 22.5 22.5S60 5 60 -10v-50h15v60c0 25-15 37.5-37.5 37.5S0 25 0 0z" fill="#1a3a2b"/>
        <path d="M90 25V-60h15v85h-15z" fill="#1a3a2b"/>
        <path d="M120 25V-60h15v85h-15zM150 25v-85l15-2.5 45 70v-70h15v85l-15 2.5-45-70v70h-15z" fill="#1a3a2b"/>
        {/* "Pod" in hellgrün */}
        <path d="M240 25V-60h45c20 0 30 10 30 30s-10 30-30 30h-30v25h-15zm15-40h30c10 0 15-5 15-15s-5-15-15-15h-30v30z" fill="#6EE7B7"/>
        <path d="M330 0v-60h15v50c0 15 7.5 22.5 22.5 22.5S390 5 390 -10v-50h15v60c0 25-15 37.5-37.5 37.5S330 25 330 0z" fill="#6EE7B7"/>
        <path d="M420 25V-60h45c20 0 30 10 30 30 0 12.5-5 22.5-15 27.5l20 27.5h-17.5l-17.5-25h-30v25h-15zm15-40h30c10 0 15-5 15-15s-5-15-15-15h-30v30z" fill="#6EE7B7"/>
      </g>
    </svg>
  );
}

// Reveal-Komponente mit Typisierung
function Reveal({ children, className = "", effect = "fade-in-up" }: { children: React.ReactNode; className?: string; effect?: "fade-in-up" | "fade-in" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${
        inView
          ? effect === "fade-in-up"
            ? "opacity-100 translate-y-0"
            : effect === "fade-in"
            ? "opacity-100"
            : ""
          : effect === "fade-in-up"
          ? "opacity-0 translate-y-8"
          : effect === "fade-in"
          ? "opacity-0"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Glassmorphism Card
function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl p-8 ${className}`}>{children}</div>
  );
}

// Animated Background Bubble Component
function Bubble({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute rounded-full bg-[#338ae9]/10 backdrop-blur-sm animate-float ${className}`} />
  );
}

// Animated Wave Component
function Wave({ className = "", delay = "0s" }: { className?: string; delay?: string }) {
  return (
    <div 
      className={`absolute h-32 w-32 rounded-full border-2 border-[#338ae9]/20 animate-ripple ${className}`}
      style={{ animationDelay: delay }}
    />
  );
}

// Animated Dot Grid
function DotGrid({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute w-24 h-24 grid grid-cols-3 gap-2 animate-pulse ${className}`}>
      {[...Array(9)].map((_, i) => (
        <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#338ae9]/20" />
      ))}
    </div>
  );
}

// Animated SoundWave Component
function SoundWave({ className = "", size = "lg" }: { className?: string; size?: "lg" | "xl" }) {
  const bars = 40; // Mehr Balken für durchgehende Animation
  const baseHeight = size === "lg" ? 64 : 80;
  
  return (
    <div className={`absolute flex items-center w-full ${className}`}>
      {[...Array(bars)].map((_, i) => (
        <div
          key={i}
          className="flex-1 bg-[#338ae9]/20 rounded-full mx-[1px] animate-soundwave"
          style={{
            height: `${(i % 2 === 0 ? baseHeight : baseHeight * 0.6)}px`,
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  // State für Modal und E-Mail
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Countdown zum Launch (1. September 2025)
  const launchDate = new Date("2025-09-01T00:00:00");
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = launchDate.getTime() - now.getTime();
      
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  // Animierter Zähler für Live-Lernanzeige
  const [learners, setLearners] = useState(0);
  useEffect(() => {
    let current = 0;
    const target = 128;
    const step = Math.ceil(target / 30);
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        setLearners(target);
        clearInterval(interval);
      } else {
        setLearners(current);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Modal Handler
  const openModal = () => {
    setModalOpen(true);
    setEmail("");
    setSubmitted(false);
  };
  const closeModal = () => setModalOpen(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f8f9fa] to-white font-sans text-[#338ae9] overflow-hidden">
      <Analytics />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Single Sound Wave in the middle */}
        <SoundWave className="top-1/2 -translate-y-1/2" size="xl" />
      </div>

      {/* Header with adjusted padding and larger logo */}
      <header className="relative w-full py-3 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="UniPod Logo"
            width={400}
            height={100}
            priority
            className="h-24 w-auto hover:scale-105 transition-transform duration-300"
          />
        </div>
        <button
          className="bg-[#338ae9] text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-md hover:scale-105 hover:bg-[#338ae9]/90 transition-all duration-300"
          onClick={openModal}
        >
          Early Access
        </button>
      </header>

      {/* Hero Section without backdrop */}
      <section className="relative min-h-[80vh] flex flex-col justify-center items-center text-center px-4 pt-12 pb-24 md:pb-32">
        <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl mx-auto">
          <Reveal effect="fade-in-up">
            <h1 className="text-2xl md:text-4xl font-bold text-[#338ae9] hover:scale-[1.02] transition-transform duration-500">
              Vorlesungen neu gedacht – jetzt als Podcast.
            </h1>
            <p className="text-lg md:text-xl text-[#338ae9]/90 mt-2 hover:text-[#338ae9] transition-colors duration-300">
              Versteh deinen Stoff beim Spazierengehen, im Gym oder in der U-Bahn.
            </p>
          </Reveal>
          <Reveal effect="fade-in-up">
            <div className="mt-4 mb-2">
              <div className="inline-block px-8 py-4 rounded-2xl shadow-xl">
                <span className="text-[#338ae9] font-bold text-lg mr-2">Launch in:</span>
                <span className="font-mono text-2xl text-[#338ae9]">{countdown.days}d</span>
                <span className="font-mono text-xl text-[#338ae9]/70 mx-1">:</span>
                <span className="font-mono text-2xl text-[#338ae9]">{String(countdown.hours).padStart(2, '0')}h</span>
                <span className="font-mono text-xl text-[#338ae9]/70 mx-1">:</span>
                <span className="font-mono text-2xl text-[#338ae9]">{String(countdown.minutes).padStart(2, '0')}m</span>
                <span className="font-mono text-xl text-[#338ae9]/70 mx-1">:</span>
                <span className="font-mono text-2xl text-[#338ae9]">{String(countdown.seconds).padStart(2, '0')}s</span>
              </div>
            </div>
            <button
              className="mt-4 bg-[#338ae9] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:scale-105 hover:bg-[#338ae9]/90 transition-all duration-300"
              onClick={openModal}
            >
              Jetzt Zugang sichern
            </button>
            <div className="text-sm text-[#338ae9]/80 mt-2">Sei unter den Ersten, die UniPod testen dürfen.</div>
          </Reveal>
        </div>
      </section>

      {/* Feature Section without backdrop */}
      <section className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 -mt-24 relative z-20">
        <Reveal effect="fade-in-up">
          <div className="flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
            <div className="w-16 h-16 mb-4 rounded-full bg-[#338ae9] flex items-center justify-center shadow-lg">
              <svg width="36" height="36" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1.5"/></svg>
            </div>
            <h3 className="font-bold text-lg mb-2 text-[#338ae9]">Lernen mit Podcasts</h3>
            <p className="text-[#338ae9]/80 text-sm">Unterwegs, jederzeit – UniPod macht Lernen mobil und flexibel.</p>
          </div>
        </Reveal>
        <Reveal effect="fade-in-up">
          <div className="flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
            <div className="w-16 h-16 mb-4 rounded-full bg-[#338ae9] flex items-center justify-center shadow-lg">
              <svg width="36" height="36" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M2 7l10-4 10 4-10 4-10-4z"/><path d="M12 11v10"/><path d="M7 17c0 2.5 10 2.5 10 0"/></svg>
            </div>
            <h3 className="font-bold text-lg mb-2 text-[#338ae9]">Alle Lehrgänge, alle Unis</h3>
            <p className="text-[#338ae9]/80 text-sm">UniPod deckt sämtliche Studienrichtungen und Lehrveranstaltungen aller Universitäten in Österreich ab.</p>
          </div>
        </Reveal>
        <Reveal effect="fade-in-up">
          <div className="flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
            <div className="w-16 h-16 mb-4 rounded-full bg-[#338ae9] flex items-center justify-center shadow-lg">
              <svg width="36" height="36" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="4"/><path d="M8 12h8"/></svg>
            </div>
            <h3 className="font-bold text-lg mb-2 text-[#338ae9]">Keine Skripte mehr</h3>
            <p className="text-[#338ae9]/80 text-sm">Komplexe Inhalte einfach erklärt – Schluss mit Textwüsten.</p>
          </div>
        </Reveal>
      </section>

      {/* Countdown & Live-Lernanzeige */}
      <section className="max-w-4xl mx-auto px-4 mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <Reveal effect="fade-in-up">
          <GlassCard className="flex flex-col items-center justify-center text-center py-8 bg-white">
            <div className="text-lg font-semibold text-[#338ae9] mb-2">Nächste Prüfungswoche beginnt in:</div>
            <div className="text-5xl font-extrabold text-[#338ae9] drop-shadow-lg mb-2">{countdown.days} Tage</div>
          </GlassCard>
        </Reveal>
        <Reveal effect="fade-in-up">
          <GlassCard className="flex flex-col items-center justify-center text-center py-8 bg-white">
            <div className="text-lg font-semibold text-[#338ae9] mb-2">Studierende lernen gerade mit UniPod</div>
            <div className="text-5xl font-extrabold text-[#338ae9] drop-shadow-lg mb-2 animate-pulse">{learners}</div>
            <div className="text-xs text-[#338ae9]/50">(Live-Demo)</div>
          </GlassCard>
        </Reveal>
      </section>

      {/* Testimonials / Trust-Section */}
      <section className="max-w-3xl mx-auto px-4 mt-20">
        <Reveal effect="fade-in-up">
          <GlassCard className="flex flex-col md:flex-row items-center gap-6 p-8 bg-white">
            <div className="w-16 h-16 rounded-full bg-[#338ae9] flex items-center justify-center shadow-lg">
              <svg width="40" height="40" fill="white" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>
            </div>
            <div className="flex-1">
              <div className="text-[#338ae9] italic font-medium text-lg">„Ich hätte mir UniPod schon im ersten Semester gewünscht."</div>
              <div className="text-xs text-[#338ae9]/50 mt-2">— Lisa, BWL-Studentin</div>
            </div>
          </GlassCard>
        </Reveal>
      </section>

      {/* Fake-Door Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full relative animate-fade-in scale-95 transition-all duration-300">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-[#338ae9]/40 hover:text-[#338ae9] text-2xl font-bold transition-colors"
              aria-label="Schließen"
            >
              ×
            </button>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold mb-2 text-[#338ae9] text-center">Warteliste voll</div>
              <p className="mb-4 text-[#338ae9]/90 text-center">Momentan ist unsere Warteliste voll.<br/>Trag dich hier ein und wir informieren dich, sobald ein Platz frei wird.</p>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full mt-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Deine E-Mail-Adresse"
                    required
                    className="px-4 py-3 rounded-full border border-[#338ae9]/20 focus:outline-none focus:ring-2 focus:ring-[#338ae9]"
                  />
                  <button type="submit" className="bg-[#338ae9] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#338ae9]/90 transition-all duration-300">
                    Auf Warteliste setzen
                  </button>
                </form>
              ) : (
                <div className="text-[#338ae9] font-semibold text-center py-4">Danke! Wir melden uns bei dir.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer without backdrop */}
      <footer className="w-full mt-20 py-10 flex flex-col items-center gap-4 border-t border-[#338ae9]/10">
        <div className="flex gap-6 mb-2">
          <a href="#" className="text-[#338ae9]/50 hover:text-[#338ae9] transition-colors">Datenschutz</a>
          <a href="#" className="text-[#338ae9]/50 hover:text-[#338ae9] transition-colors">Impressum</a>
        </div>
        <div className="flex gap-4 mb-2">
          <a href="#" className="p-2 rounded-full border border-[#338ae9]/30 hover:border-[#338ae9] transition-colors">
            <svg width="20" height="20" fill="none" stroke="#338ae9" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>
          </a>
          <a href="#" className="p-2 rounded-full border border-[#338ae9]/30 hover:border-[#338ae9] transition-colors">
            <svg width="20" height="20" fill="none" stroke="#338ae9" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="6"/></svg>
          </a>
          <a href="#" className="p-2 rounded-full border border-[#338ae9]/30 hover:border-[#338ae9] transition-colors">
            <svg width="20" height="20" fill="none" stroke="#338ae9" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><path d="M7 10l5 5 5-5"/></svg>
          </a>
        </div>
        <div className="text-xs text-[#338ae9]/40">© 2024 UniPod</div>
      </footer>

      {/* Add styles for sound wave animation */}
      <style jsx global>{`
        @keyframes soundwave {
          0%, 100% {
            transform: scaleY(0.3);
            opacity: 0.3;
          }
          50% {
            transform: scaleY(1);
            opacity: 0.8;
          }
        }
        
        .animate-soundwave {
          animation: soundwave 3s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>
    </div>
  );
}
