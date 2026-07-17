import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50 px-6 py-8 dark:border-slate-800 dark:bg-slate-950 md:px-10 lg:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="text-sm font-bold tracking-wider text-slate-900 dark:text-blue-200">
            Drewss
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            © {year} Jhon Andrew A. Gamboa. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 sm:items-end">
          <a
            href="mailto:andrewsandrew0811@gmail.com"
            className="flex items-center gap-2 text-xs font-medium text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-300"
          >
            <Mail size={14} />
            andrewsandrew0811@gmail.com
          </a>
          <p className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
            <MapPin size={14} />
            Banilad, Pinamalayan, Or. Mindoro
          </p>
        </div>
      </div>
    </footer>
  );
}