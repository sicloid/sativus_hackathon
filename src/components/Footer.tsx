"use client";

const socials = [
  { label: "Instagram", href: "#", icon: "📸" },
  { label: "TikTok", href: "#", icon: "🎵" },
  { label: "YouTube", href: "#", icon: "▶️" },
  { label: "X / Twitter", href: "#", icon: "𝕏" },
];

export default function Footer() {
  return (
    <footer
      className="relative border-t overflow-hidden"
      style={{ borderColor: "rgba(124,58,237,0.15)" }}
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.5), rgba(6,182,212,0.3), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-xs"
                style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}
              >
                L
              </div>
              <span className="font-bold text-lg text-white">
                Lumina<span
                  style={{
                    background: "linear-gradient(135deg, #a855f7, #06b6d4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >Tech</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Gençler için akıllı teknoloji ürünleri. Hayatını ışılt, enerjini göster.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-widest">Kampanya</h4>
            <ul className="space-y-2">
              {["Ana Sayfa", "Kampanya Detayları", "Ürünler", "Hangi Ürün?"].map((link, i) => {
                const ids = ["hero", "kampanya", "urunler", "quiz"];
                return (
                  <li key={link}>
                    <button
                      onClick={() => document.getElementById(ids[i])?.scrollIntoView({ behavior: "smooth" })}
                      className="text-sm text-slate-500 hover:text-purple-400 transition-colors duration-200"
                    >
                      {link}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-widest">Bizi Takip Et</h4>
            <div className="flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 transition-all duration-200"
                  style={{ border: "1px solid rgba(124,58,237,0.2)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.5)";
                    (e.currentTarget as HTMLElement).style.color = "#c4b5fd";
                    (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.2)";
                    (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  <span>{s.icon}</span>
                  <span>{s.label}</span>
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-xs text-slate-500 mb-2">Kampanyalardan haberdar ol:</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="e-posta adresin"
                  className="flex-1 px-3 py-2 rounded-lg text-xs text-white outline-none"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(124,58,237,0.25)",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(168,85,247,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(124,58,237,0.25)")}
                />
                <button
                  className="btn-neon px-4 py-2 rounded-lg text-xs font-bold"
                  style={{ whiteSpace: "nowrap" }}
                >
                  <span>Abone Ol</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 text-xs text-slate-600"
          style={{ borderTop: "1px solid rgba(124,58,237,0.1)" }}
        >
          <span>© 2025 Lumina Tech. Tüm hakları saklıdır.</span>
          <span
            style={{
              background: "linear-gradient(135deg, #a855f7, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Gençlik Enerjisi Seninle! ✦
          </span>
        </div>
      </div>
    </footer>
  );
}
