"use client";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tick, setTick] = useState(0);

  // Subtle counter animation on mount
  useEffect(() => {
    const t = setInterval(() => setTick((p) => (p >= 100 ? 100 : p + 1)), 18);
    return () => clearInterval(t);
  }, []);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.4,
        alpha: Math.random() * 0.45 + 0.08,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168,85,247,${p.alpha})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (d < 95) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124,58,237,${0.13 * (1 - d / 95)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50" />

      {/* Quantam-style dual blur streaks — inspired by Magic MCP "Mysh Hero" */}
      <div
        className="absolute top-0 right-0 z-0 opacity-40 pointer-events-none"
        style={{ transform: "rotate(-20deg) skewY(-8deg)", top: "-30rem", right: "-20rem" }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute"
            style={{
              width: "10rem",
              height: "28rem",
              left: `${i * 12}rem`,
              background: "linear-gradient(180deg, rgba(255,255,255,0.07), rgba(124,58,237,0.25))",
              filter: "blur(40px)",
            }}
          />
        ))}
      </div>
      <div
        className="absolute opacity-20 pointer-events-none"
        style={{ transform: "rotate(-20deg) skewY(-8deg)", top: "-40rem", right: "-35rem" }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute"
            style={{
              width: "10rem",
              height: "32rem",
              left: `${i * 14}rem`,
              background: "linear-gradient(180deg, rgba(6,182,212,0.1), rgba(124,58,237,0.3))",
              filter: "blur(50px)",
            }}
          />
        ))}
      </div>

      {/* Bottom glow — Mysh-style */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "350px",
          background: "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(124,58,237,0.18) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 text-center">
        {/* Campaign badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-8 text-sm font-medium border anim-fadeup"
          style={{
            background: "rgba(124,58,237,0.12)",
            borderColor: "rgba(124,58,237,0.35)",
            color: "#c4b5fd",
            animationDelay: "0.1s",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#a855f7", boxShadow: "0 0 6px #a855f7", animation: "pulse 1.5s infinite" }}
          />
          <span>🥳</span> Yeni Kampanya · 2025
        </div>

        {/* Headline */}
        <h1
          className="text-5xl sm:text-7xl md:text-8xl font-black leading-none tracking-tight anim-fadeup"
          style={{ animationDelay: "0.2s" }}
        >
          <span className="block text-white mb-2">Dostunuzun Sağlığı</span>
          <span
            className="block"
            style={{
              background: "linear-gradient(135deg, #a855f7, #06b6d4, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Seninle!
          </span>
        </h1>

        {/* Sub */}
        <p
          className="mt-6 text-lg sm:text-xl text-slate-400 max-w-xl mx-auto leading-relaxed anim-fadeup"
          style={{ animationDelay: "0.35s" }}
        >
          PetVerse ile can dostunuzun hayatına değer katın. Modern veterinerlik,{" "}
          <span style={{ color: "#c4b5fd", fontWeight: 600 }}>şefkatli bakım</span>, kesintisiz takip.
        </p>

        {/* CTA */}
        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-4 anim-fadeup"
          style={{ animationDelay: "0.5s" }}
        >
          <button
            onClick={() => scrollTo("urunler")}
            className="btn-neon px-8 py-4 rounded-full text-base font-bold"
          >
            <span>Ürünleri Keşfet ⚡</span>
          </button>
          <button
            onClick={() => scrollTo("kampanya")}
            className="px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300"
            style={{
              border: "1px solid rgba(100,100,130,0.5)",
              color: "#94a3b8",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.6)";
              (e.currentTarget as HTMLElement).style.color = "#fff";
              (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(100,100,130,0.5)";
              (e.currentTarget as HTMLElement).style.color = "#94a3b8";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            Kampanya Detayları →
          </button>
        </div>

        {/* Animated stats */}
        <div
          className="mt-16 flex flex-wrap items-center justify-center gap-10 sm:gap-16 anim-fadeup"
          style={{ animationDelay: "0.65s" }}
        >
          {[
            { label: "Aktif Kullanıcı", value: "500K+" },
            { label: "Ürün Serisi", value: "4" },
            { label: "Memnuniyet", value: "98%" },
            { label: "Ülke", value: "30+" },
          ].map((s) => (
            <div key={s.label} className="text-center group cursor-default">
              <div
                className="text-3xl sm:text-4xl font-black transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, #a855f7, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.value}
              </div>
              <div className="text-xs text-slate-500 mt-1 font-medium tracking-wide uppercase">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-14 flex flex-col items-center gap-2 animate-bounce" style={{ color: "#475569" }}>
          <span className="text-xs tracking-widest uppercase font-medium">Keşfet</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
