import { useState } from "react";
import { codeExamples } from "../data/CodeVision";

export default function Hero() {
  const tabs = Object.keys(codeExamples);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section id="home" className="relative flex min-h-screen w-full items-center overflow-hidden px-6 pt-28 md:px-10 lg:px-12">
      {/* Starfield + comet background — dark mode only */}
      <div className="hidden dark:block pointer-events-none absolute inset-0 overflow-hidden">
        <span className="star" style={{ top: "12%", left: "18%", animationDelay: "0s" }} />
        <span className="star" style={{ top: "22%", left: "70%", animationDelay: "0.6s" }} />
        <span className="star" style={{ top: "35%", left: "40%", animationDelay: "1.2s" }} />
        <span className="star" style={{ top: "8%", left: "55%", animationDelay: "1.8s" }} />
        <span className="star" style={{ top: "60%", left: "85%", animationDelay: "0.3s" }} />
        <span className="star" style={{ top: "70%", left: "12%", animationDelay: "0.9s" }} />
        <span className="star" style={{ top: "48%", left: "92%", animationDelay: "1.5s" }} />
        <span className="star" style={{ top: "80%", left: "60%", animationDelay: "2.1s" }} />
        <span className="star" style={{ top: "15%", left: "88%", animationDelay: "0.4s" }} />
        <span className="star" style={{ top: "88%", left: "30%", animationDelay: "1.1s" }} />
        <span className="star" style={{ top: "40%", left: "6%", animationDelay: "1.7s" }} />
        <span className="star" style={{ top: "5%", left: "35%", animationDelay: "2.4s" }} />

        <span className="comet" style={{ top: "5%", left: "0%", animationDelay: "0s", animationDuration: "6s" }} />
        <span className="comet" style={{ top: "30%", left: "-10%", animationDelay: "3s", animationDuration: "8s" }} />
        <span className="comet" style={{ top: "60%", left: "-5%", animationDelay: "5.5s", animationDuration: "7s" }} />

        <span className="comet-alt" style={{ top: "10%", left: "100%", animationDelay: "1.5s", animationDuration: "7s" }} />
        <span className="comet-alt" style={{ top: "45%", left: "105%", animationDelay: "4.5s", animationDuration: "8.5s" }} />    
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 sm:gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">
        {/* Left: name / intro */}
        <div className="animate-fadeSlideUp text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 sm:px-4 sm:py-1.5 sm:text-xs">
            ✦ Computer Engineer
          </span>

          <h1 className="mt-5 leading-tight text-slate-900 dark:text-white">
            <span className="block text-xl font-medium uppercase tracking-wide text-slate-700 dark:text-slate-300 sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl">
              Hello, I'm
            </span>
            <span className="mt-1 inline-block -skew-x-6 text-3xl font-bold uppercase tracking-tight bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl">
              Jhon Andrew A. Gamboa
            </span>
          </h1>

          <p className="mt-4 text-xl font-bold uppercase tracking-wide text-slate-700 dark:text-slate-200 sm:mt-5 sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl">
            Aspiring Software Engineer
          </p>

          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:mt-5 md:mx-0">
            Building clean and functional experiences — from networking fundamentals to full-stack development.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 xs:flex-row sm:mt-8 sm:gap-4 md:justify-start">
            <a
              href="#projects"
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700 dark:bg-blue-400 dark:text-slate-950 dark:hover:bg-blue-300 sm:px-6 sm:py-3"
            >
              View Projects
            </a>
            <a
              href="#contacts"
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900 sm:px-6 sm:py-3"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Right: code-editor style card */}
        <div className="mx-auto w-full max-w-md rounded-xl border border-slate-300/60 bg-white/40 backdrop-blur-md p-0 shadow-2xl overflow-hidden md:max-w-full lg:max-w-lg dark:border-slate-800/80 dark:bg-slate-950/40">
          {/* Unified Window Header Bar */}
          <div className="flex items-center justify-between bg-slate-200/50 px-4 py-3 border-b border-slate-300/50 dark:bg-slate-900/40 dark:border-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] sm:h-3 sm:w-3" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] sm:h-3 sm:w-3" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f] sm:h-3 sm:w-3" />
              </div>
              <span className="text-xs font-semibold text-slate-700 sm:text-sm dark:text-slate-400">Andrew's</span>
            </div>
            <span className="text-slate-400 text-xs dark:text-slate-500">▼</span>
          </div>

          {/* Container for Tabs and Code Block */}
          <div className="p-4 bg-transparent">
            {/* Tabs Row */}
            <div className="mb-3 flex flex-wrap gap-2 sm:mb-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-md px-3 py-1.5 text-[11px] font-semibold transition-colors border sm:px-4 sm:py-2 sm:text-xs ${
                    activeTab === tab
                      ? "bg-slate-200/80 text-blue-600 border-slate-300 dark:bg-slate-800/50 dark:text-blue-400 dark:border-slate-700"
                      : "bg-slate-100/40 text-slate-500 border-slate-200 hover:text-slate-800 hover:bg-slate-200/50 dark:bg-slate-950/20 dark:text-slate-400 dark:border-slate-800/50 dark:hover:text-slate-200 dark:hover:bg-slate-800/30"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Code Block Container with Fixed Height & Scroll */}
            <pre className="code-scroll h-[280px] overflow-y-auto overflow-x-auto rounded-lg bg-slate-900/5 border border-slate-300/40 p-3 text-[11px] font-medium leading-relaxed text-slate-800 backdrop-blur-sm sm:rounded-xl sm:p-4 sm:text-xs dark:bg-slate-950/50 dark:border-slate-800/60 dark:text-slate-200">
              <code>{codeExamples[activeTab]}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}