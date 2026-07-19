import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

// Reveals once when the section scrolls into view
function useInView(options = { threshold: 0.2 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

const PHOTOS = [
  { src: "/profile.png", alt: "Jhon Andrew A. Gamboa" },
  { src: "/profile2.jpg", alt: "Jhon Andrew A. Gamboa, alternate photo" },
];

// Replace these with your actual certificate image paths/titles (drop images in /public/certificates)
const CERTIFICATIONS = [
  { src: "/certificates/cert1.jpg", alt: "Certificate 1" },
  { src: "/certificates/cert2.jpg", alt: "Certificate 2" },
  { src: "/certificates/cert3.jpg", alt: "Certificate 3" },
];

// Logos pulled from Simple Icons CDN — no install needed
const TECH_STACK = [
  { name: "HTML5", slug: "html5" },
  { name: "CSS3", slug: "css3" },
  { name: "JavaScript", slug: "javascript" },
  { name: "React", slug: "react" },
  { name: "Java", slug: "openjdk" },
  { name: "Python", slug: "python" },
  { name: "Git", slug: "git" },
  { name: "GitHub", slug: "github" },
  { name: "Supabase", slug: "supabase" },
  { name: "Firebase", slug: "firebase" },
  { name: "Docker", slug: "docker" },
  { name: "Vercel", slug: "vercel" },
];

export default function About() {
  const [ref, inView] = useInView();
  const [active, setActive] = useState(null); // null | 0 | 1
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [techModalOpen, setTechModalOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null); // null | number

  const reveal = (delayMs = 0) => ({
    className: `transition-all duration-700 ease-out ${
      inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`,
    style: { transitionDelay: `${delayMs}ms` },
  });

  // Touch devices (no hover): tap toggles which photo sits on top
  const handleTap = (i) => {
    if (window.matchMedia("(hover: none)").matches) {
      setActive((prev) => (prev === i ? null : i));
    }
  };

  // Escape key closes whichever modal/lightbox is open
  useEffect(() => {
    if (!certModalOpen && !techModalOpen) return;
    const handleKey = (e) => {
      if (e.key !== "Escape") return;
      if (lightboxIndex !== null) setLightboxIndex(null);
      else if (certModalOpen) setCertModalOpen(false);
      else if (techModalOpen) setTechModalOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [certModalOpen, techModalOpen, lightboxIndex]);

  return (
        <section
          id="about"
          ref={ref}
          className="relative flex min-h-screen w-full items-center overflow-hidden px-6 py-20 md:px-10 md:py-28 lg:px-12"
        >
      {/* Starfield + comets — dark mode only, matches Hero */}
        <div className="hidden dark:block pointer-events-none absolute inset-0 overflow-hidden">
          <span className="star" style={{ top: "14%", left: "10%", animationDelay: "0.2s" }} />
          <span className="star" style={{ top: "8%", left: "80%", animationDelay: "1.4s" }} />
          <span className="star" style={{ top: "70%", left: "90%", animationDelay: "0.7s" }} />
          <span className="star" style={{ top: "85%", left: "15%", animationDelay: "2s" }} />
          <span className="star" style={{ top: "45%", left: "5%", animationDelay: "1s" }} />
          <span className="star" style={{ top: "30%", left: "95%", animationDelay: "0.5s" }} />

          <span className="comet" style={{ top: "10%", left: "-10%", animationDelay: "1s", animationDuration: "7s" }} />
          <span className="comet" style={{ top: "50%", left: "-5%", animationDelay: "4s", animationDuration: "9s" }} />

          <span className="comet-alt" style={{ top: "20%", left: "100%", animationDelay: "2s", animationDuration: "7.5s" }} />
          <span className="comet-alt" style={{ top: "60%", left: "105%", animationDelay: "5.5s", animationDuration: "9s" }} />
        </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Left: two overlapping photos */}
        <div className="relative mx-auto flex items-center justify-center order-1" {...reveal(0)}>
          {/* Wide ambient glow blob, dark mode only */}
          <div className="glow-blob hidden dark:block h-56 w-56 -translate-y-4 sm:h-80 sm:w-80" />

          <div className="relative mx-auto flex w-fit items-center justify-center -space-x-6 sm:-space-x-10 lg:-space-x-16">
            {PHOTOS.map((photo, i) => {
              const isActive = active === i;
              const isOther = active === (i === 0 ? 1 : 0);
              return (
                <div
                  key={photo.src}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onClick={() => handleTap(i)}
                  className={`group relative h-32 w-32 cursor-pointer transition-all duration-500 ease-out sm:h-56 sm:w-56 lg:h-72 lg:w-72 ${
                    isActive
                      ? "z-30 -translate-y-5 scale-105"
                      : isOther
                      ? "z-10 translate-y-1 scale-95 opacity-90"
                      : "z-20"
                  }`}
                >
                  {/* Glow ring, brighter when this photo is active */}
                  <div
                    className={`absolute -inset-2 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 blur-xl transition-opacity duration-500 dark:opacity-50 ${
                      isActive ? "opacity-60 dark:opacity-80" : "profile-glow opacity-30"
                    }`}
                  />

                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="relative h-full w-full rounded-full border-4 border-white object-cover shadow-2xl dark:border-slate-800"
                  />
                </div>
              );
            })}
          </div>

          {/* Soft light pooling under the pair */}
          <div className="absolute -bottom-2 left-1/2 h-6 w-52 -translate-x-1/2 rounded-full bg-blue-400/50 blur-2xl dark:bg-blue-400/35" />
        </div>

        {/* Right: bio content */}
        <div className="text-center order-2 md:text-left" {...reveal(150)}>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 sm:px-4 sm:py-1.5 sm:text-xs">
            ✦ About Me
          </span>

          <h2 className="mt-5 text-2xl font-bold uppercase tracking-tight text-slate-900 dark:text-white sm:text-3xl md:text-3xl lg:text-4xl">
            Who I{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              Am
            </span>
          </h2>

            <p className="mx-auto mt-4 max-w-md text-justify indent-6 text-sm leading-relaxed text-slate-800 dark:text-slate-300 md:mx-0">
                I'm a Computer Engineering graduate with a growing focus in 
                building clean, usable interfaces on the web and application
                 — paired with a steady interest on networking and infrastructure.
            </p>
            <p className="mx-auto mt-3 max-w-md text-justify indent-6 text-sm leading-relaxed text-slate-800 dark:text-slate-300 md:mx-0">
                I got hands-on experience as a Network and Communications
                Engineer Intern, working across server administration,
                networking, and web development — and I'm currently building
                toward a career in IT.
            </p>

          {/* Quick facts */}
          <div className="mx-auto mt-6 grid max-w-sm grid-cols-2 gap-3 sm:mt-8 md:mx-0">
            <div
              className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-center transition-colors hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-blue-500/50"
              {...reveal(300)}
            >
              <p className="text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-500">
                Education
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
                BS Computer Engineering
              </p>
            </div>
            <div
              className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-center transition-colors hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-blue-500/50"
              {...reveal(450)}
            >
              <p className="text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-500">
                Focus
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
                Software Dev & Networking 
              </p>
            </div>

            {/* Certifications — click to open gallery */}
            <button
              type="button"
              onClick={() => setCertModalOpen(true)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-left transition-colors hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-blue-500/50"
              {...reveal(600)}
            >
              <p className="text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-500">
                Certifications
              </p>
              <p className="mt-1 text-sm font-semibold text-blue-600 dark:text-blue-300">
                View certificates →
              </p>
            </button>

            {/* Tech Stack — click to open logo grid */}
            <button
              type="button"
              onClick={() => setTechModalOpen(true)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-left transition-colors hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-blue-500/50"
              {...reveal(750)}
            >
              <p className="text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-500">
                Tech Stack
              </p>
              <p className="mt-1 text-sm font-semibold text-blue-600 dark:text-blue-300">
                View tech stack →
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Certifications modal */}
      {certModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setCertModalOpen(false)}
        >
          <div
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setCertModalOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold uppercase tracking-tight text-slate-900 dark:text-white">
              Certifications
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Click a certificate to view it larger.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {CERTIFICATIONS.map((cert, i) => (
                <button
                  key={cert.src}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="group overflow-hidden rounded-lg border border-slate-200 text-left transition-colors hover:border-blue-400 dark:border-slate-700"
                >
                  <img
                    src={cert.src}
                    alt={cert.alt}
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-56"
                  />
                  {cert.title && (
                    <p className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                      {cert.title}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox — enlarged certificate */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-white hover:bg-white/10"
          >
            <X size={22} />
          </button>
          <img
            src={CERTIFICATIONS[lightboxIndex].src}
            alt={CERTIFICATIONS[lightboxIndex].alt}
            className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Tech Stack modal */}
      {techModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setTechModalOpen(false)}
        >
          <div
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setTechModalOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold uppercase tracking-tight text-slate-900 dark:text-white">
              Tech Stack
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Tools and technologies I work with.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-4 sm:grid-cols-4">
              {TECH_STACK.map((tech) => (
                <div
                  key={tech.slug}
                  className="flex flex-col items-center gap-2 rounded-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 dark:bg-slate-700 p-2 shadow-sm">
                    <img
                      src={`https://cdn.simpleicons.org/${tech.slug}`}
                      alt={tech.name}
                      className="h-full w-full object-contain"
                      loading="lazy"
                      onError={(e) => {
                        if (!e.currentTarget.dataset.fallback) {
                          e.currentTarget.dataset.fallback = "1";
                          e.currentTarget.src = `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${tech.slug}.svg`;
                          return;
                        }
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement.classList.add("bg-slate-200");
                      }}
                    />
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 dark:text-slate-200">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}