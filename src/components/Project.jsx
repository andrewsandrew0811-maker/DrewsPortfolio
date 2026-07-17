import { useEffect, useRef, useState } from "react";

// Reveals once when the section scrolls into view
function useInView(options = { threshold: 0.15 }) {
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

const PROJECTS = [
  {
    id: "pos",
    title: "POS System for 2838 Tea & Café",
    course: "CpE 225 – System Analysis and Design",
    image: "/projects/pos-system.png",
    image2: "/projects/pos-system-2.png",
    description:
      "A point-of-sale software application built with C# (Visual Studio) and MySQL to automate order processing and transaction management for a café business, cutting down manual order-taking time and errors.",
    tags: ["C#", "MySQL", "Visual Studio"],
  },
  {
    id: "waste",
    title: "Smart Waste Segregation System",
    course: "CpE 414 – Embedded Systems & CpE 113 – Microelectronics 3",
    image: "/projects/waste-segregation.png",
    image2: "/projects/waste-segregation-2.png",
    description:
      "An automated waste segregation system using an Arduino Uno with ultrasonic, capacitive, and inductive sensors to detect and sort waste by material type, driven by a DC motor mechanism for physical sorting.",
    tags: ["Arduino Uno", "Sensors", "Embedded Systems"],
  },
  {
    id: "shrimp",
    title: "IoT-Based Shrimp Waste Powdering and Seasoning System",
    course: "CpE Practice and Design 1 & 2",
    image: "/projects/shrimp-system.png",
    image2: "/projects/shrimp-system-2.png",
    description:
      "Led software development for an IoT-integrated system using ESP8266, a PTC ceramic air heater, temperature sensors, and an industrial grinder, with Firebase/Supabase for real-time monitoring — automating seasoning production.",
    tags: ["ESP8266", "IoT", "Firebase", "Supabase"],
  },
];

// A single image with a graceful text fallback if the file doesn't exist yet
function ProjectImage({ src, alt, className, fallbackLabel = "Project Image" }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-slate-200/50 dark:bg-slate-900/60 ${className}`}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.nextSibling.style.display = "flex";
        }}
      />
      <span className="absolute inset-0 hidden items-center justify-center text-xs font-medium text-slate-400 dark:text-slate-600">
        {fallbackLabel}
      </span>
    </div>
  );
}

export default function Project() {
  const [ref, inView] = useInView();
  const [expandedId, setExpandedId] = useState(null);
  const [lightbox, setLightbox] = useState(null); // { src, alt } | null

  const reveal = (delayMs = 0) => ({
    className: `transition-all duration-700 ease-out ${
      inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`,
    style: { transitionDelay: `${delayMs}ms` },
  });

  // Lock page scroll while a card is expanded
  useEffect(() => {
    document.body.style.overflow = expandedId || lightbox ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [expandedId, lightbox]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setLightbox(null);
        setExpandedId(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const expandedProject = PROJECTS.find((p) => p.id === expandedId) || null;

  return (
    <section
      id="projects"
      ref={ref}
      className="relative w-full overflow-hidden px-6 pt-20 pb-10 md:px-10 md:pt-28 md:pb-14 lg:px-12"
    >
      {/* Starfield + comets — dark mode only, matches Hero/About */}
      <div className="hidden dark:block pointer-events-none absolute inset-0 overflow-hidden">
        <span className="star" style={{ top: "10%", left: "15%", animationDelay: "0.3s" }} />
        <span className="star" style={{ top: "6%", left: "75%", animationDelay: "1.6s" }} />
        <span className="star" style={{ top: "80%", left: "88%", animationDelay: "0.9s" }} />
        <span className="star" style={{ top: "88%", left: "10%", animationDelay: "2.2s" }} />
        <span className="star" style={{ top: "40%", left: "3%", animationDelay: "1.1s" }} />
        <span className="star" style={{ top: "35%", left: "96%", animationDelay: "0.6s" }} />
        <span className="star" style={{ top: "60%", left: "50%", animationDelay: "1.8s" }} />

        <span className="comet" style={{ top: "15%", left: "-10%", animationDelay: "1.2s", animationDuration: "7.5s" }} />
        <span className="comet" style={{ top: "55%", left: "-5%", animationDelay: "4.2s", animationDuration: "8.5s" }} />
        <span className="comet-alt" style={{ top: "12%", left: "100%", animationDelay: "2.4s", animationDuration: "7s" }} />
        <span className="comet-alt" style={{ top: "65%", left: "105%", animationDelay: "5.8s", animationDuration: "9s" }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Header — centered, bold, slanted. "My Work" badge floats diagonally above the end of "PROJECTS" */}
        <div className="text-center" {...reveal(0)}>
          <div className="relative inline-block">
            <span className="absolute left-full top-0 ml-3 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-600 shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 sm:ml-4 sm:px-4 sm:py-1.5 sm:text-xs">
              ✦ My Work
            </span>
            <h2 className="inline-block -skew-x-6 text-3xl font-bold uppercase tracking-tight bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent sm:text-4xl md:text-4xl lg:text-5xl">
              Projects
            </h2>
          </div>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            A few things I've built across coursework and hands-on training.
          </p>
        </div>

        {/* Cards — centered row on md+, stacked one-at-a-time on mobile */}
        <div className="mt-6 grid grid-cols-1 place-items-center gap-8 sm:mt-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {PROJECTS.map((project, i) => (
            <button
              key={project.id}
              onClick={() => setExpandedId(project.id)}
              {...reveal(150 * (i + 1))}
              className="group w-full max-w-sm rounded-xl border border-slate-300/60 bg-white/40 text-left shadow-lg backdrop-blur-md transition-[transform,border-color] duration-200 ease-out will-change-transform hover:-translate-y-1.5 hover:border-blue-400/60 active:scale-[0.98] dark:border-slate-800/80 dark:bg-slate-950/40 dark:hover:border-blue-500/50"
            >
              {/* Image box */}
              <div className="overflow-hidden rounded-t-xl">
                <div className="aspect-video w-full transition-transform duration-200 ease-out group-hover:scale-105">
                  <ProjectImage src={project.image} alt={project.title} className="h-full w-full" />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                  {project.course}
                </p>
                <h3 className="mt-1.5 text-base font-bold text-slate-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-slate-200 bg-slate-100/60 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Expanded modal */}
      {expandedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-6 backdrop-blur-sm"
          onClick={() => setExpandedId(null)}
        >
          <div
            className="animate-scaleIn relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-300/60 bg-white shadow-2xl dark:border-slate-800/80 dark:bg-slate-950 sm:max-w-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setExpandedId(null)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/60 text-white transition-colors hover:bg-slate-900/80"
            >
              ✕
            </button>

            {/* Two pictures side by side, equal size — left is the cover shown on the card. Both open a full view on click. */}
            <div className="grid grid-cols-2 gap-1.5 p-2">
              <button
                type="button"
                onClick={() =>
                  setLightbox({ src: expandedProject.image, alt: expandedProject.title })
                }
                className="cursor-zoom-in transition-opacity hover:opacity-90"
              >
                <ProjectImage
                  src={expandedProject.image}
                  alt={expandedProject.title}
                  className="h-36 w-full rounded-md sm:h-44"
                />
              </button>
              <button
                type="button"
                onClick={() =>
                  setLightbox({
                    src: expandedProject.image2,
                    alt: `${expandedProject.title} — second photo`,
                  })
                }
                className="cursor-zoom-in transition-opacity hover:opacity-90"
              >
                <ProjectImage
                  src={expandedProject.image2}
                  alt={`${expandedProject.title} — second photo`}
                  className="h-36 w-full rounded-md sm:h-44"
                  fallbackLabel="Photo 2"
                />
              </button>
            </div>

            <div className="p-4 pt-1 sm:p-5 sm:pt-1">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 sm:text-xs">
                {expandedProject.course}
              </p>
              <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white sm:text-lg">
                {expandedProject.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
                {expandedProject.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {expandedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-slate-200 bg-slate-100/60 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox — view a single picture alone, as big as the whole project card */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/85 p-6 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div
            className="animate-scaleIn relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-300/60 bg-white shadow-2xl dark:border-slate-800/80 dark:bg-slate-950 sm:max-w-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/60 text-white transition-colors hover:bg-slate-900/80"
            >
              ✕
            </button>
            <ProjectImage src={lightbox.src} alt={lightbox.alt} className="h-72 w-full sm:h-96" />
          </div>
        </div>
      )}
    </section>
  );
}