import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, Home, User, FolderKanban, Mail } from "lucide-react";

export default function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { label: "HOME", href: "#home", icon: Home, id: "home" },
    { label: "ABOUT", href: "#about", icon: User, id: "about" },
    { label: "PROJECTS", href: "#projects", icon: FolderKanban, id: "projects" },
    { label: "CONTACTS", href: "#contacts", icon: Mail, id: "contacts" },
  ];

  useEffect(() => {
    const sectionIds = navLinks.map(({ id }) => id);

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      let bestId = sectionIds[0];
      let bestOverlap = -Infinity;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const overlap = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        if (overlap > bestOverlap) {
          bestOverlap = overlap;
          bestId = id;
        }
      }

      setActiveSection(bestId);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <header className="fixed top-0 z-40 flex w-full items-center justify-between bg-slate-50 px-4 py-3 dark:bg-slate-950 sm:px-6 sm:py-4 md:px-10 md:py-5 lg:px-12 animate-fadeSlideRight border-b border-slate-200/60 dark:border-slate-800/60">
      {/* Logo + name */}
      <a href="#home" className="flex shrink-0 items-center gap-1.5 select-none sm:gap-2">
        <img src="/logo.png" alt="Drewss logo" className="h-6 w-6 object-contain sm:h-7 sm:w-7 md:h-8 md:w-8" />
        <span className="text-base font-bold tracking-wider text-slate-900 dark:text-blue-600 sm:text-lg md:text-xl">
          Drewss
        </span>
      </a>

      {/* Right side: nav + theme toggle + hamburger, grouped together */}
      <div className="flex shrink-0 items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        {/* Text nav — only from md up */}
        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map(({ label, href, id }) => {
            const isActive = activeSection === id;
            return (
              <a
                key={label}
                href={href}
                className={`text-xs font-semibold tracking-[0.2em] transition-colors duration-200 ${
                  isActive
                    ? "text-blue-600 drop-shadow-[0_0_6px_rgba(96,165,250,0.5)] dark:text-blue-300 dark:drop-shadow-[0_0_6px_rgba(96,165,250,0.7)]"
                    : "text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-blue-300"
                }`}>
              
                {label}
              </a>
            );
          })}
        </nav>

        {/* Icon-only nav — below md, only shows when hamburger is clicked */}
        {menuOpen && (
          <nav className="flex items-center gap-2.5 sm:gap-3 md:hidden">
            {navLinks.map(({ label, href, icon: Icon, id }) => {
              const isActive = activeSection === id;
              return (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  onClick={() => setMenuOpen(false)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors sm:h-9 sm:w-9 ${
                    isActive
                      ? "text-blue-600 drop-shadow-[0_0_6px_rgba(96,165,250,0.5)] dark:text-blue-300 dark:drop-shadow-[0_0_6px_rgba(96,165,250,0.7)]"
                      : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-blue-300"
                  }`}>
                
                  <Icon size={16} className="sm:hidden" />
                  <Icon size={18} className="hidden sm:block" />
                </a>
              );
            })}
          </nav>
        )}

        {/* Theme toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle theme"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900 sm:h-9 sm:w-9"
        >
          {darkMode ? <Sun size={14} className="sm:hidden" /> : <Moon size={14} className="sm:hidden" />}
          {darkMode ? <Sun size={16} className="hidden sm:block" /> : <Moon size={16} className="hidden sm:block" />}
        </button>

        {/* Hamburger — only below md, toggles the icon nav above */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex h-8 w-8 items-center justify-center text-slate-900 dark:text-white sm:h-9 sm:w-9 md:hidden"
        >
          {menuOpen ? (
            <>
              <X size={20} className="sm:hidden" />
              <X size={22} className="hidden sm:block" />
            </>
          ) : (
            <>
              <Menu size={20} className="sm:hidden" />
              <Menu size={22} className="hidden sm:block" />
            </>
          )}
        </button>
      </div>
    </header>
  );
}