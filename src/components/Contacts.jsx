import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useRateLimit } from "../hooks/useRateLimit";

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

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1Ba3jumoK6/",
    slug: "facebook",
  },
  {
    label: "GitHub",
    href: "https://github.com/andrewsandrew0811-maker",
    slug: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jhon-andrew-gamboa-083791419",
    slug: "linkedin",
  },
];

export default function Contacts() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const { canSubmit, recordSubmit, remainingCooldown } = useRateLimit();

  const reveal = (delayMs = 0) => ({
    className: `transition-all duration-700 ease-out ${
      inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`,
    style: { transitionDelay: `${delayMs}ms` },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          full_name: form.fullName,
          mobile_number: form.mobileNumber,
          reply_to: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setStatus("sent");
        setForm({ fullName: "", mobileNumber: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      });
  };

  return (
    <section
      id="contacts"
      ref={ref}
      className="relative flex min-h-screen w-full items-center overflow-hidden px-6 py-20 md:px-10 md:py-28 lg:px-12"
    >
      {/* Starfield + comets — dark mode only, matches About/Hero */}
      <div className="hidden dark:block pointer-events-none absolute inset-0 overflow-hidden">
        <span className="star" style={{ top: "12%", left: "8%", animationDelay: "0.3s" }} />
        <span className="star" style={{ top: "20%", left: "85%", animationDelay: "1.2s" }} />
        <span className="star" style={{ top: "75%", left: "92%", animationDelay: "0.6s" }} />
        <span className="star" style={{ top: "82%", left: "12%", animationDelay: "1.8s" }} />
        <span className="star" style={{ top: "40%", left: "3%", animationDelay: "0.9s" }} />
        <span className="star" style={{ top: "35%", left: "96%", animationDelay: "0.4s" }} />

        <span className="comet" style={{ top: "15%", left: "-10%", animationDelay: "1.5s", animationDuration: "7.5s" }} />
        <span className="comet-alt" style={{ top: "55%", left: "105%", animationDelay: "3s", animationDuration: "8.5s" }} />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Left: socials + intro */}
        <div className="text-center order-1 md:text-left" {...reveal(0)}>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 sm:px-4 sm:py-1.5 sm:text-xs">
            ✦ Get In Touch
          </span>

          <h2 className="mt-5 text-2xl font-bold uppercase tracking-tight text-slate-900 dark:text-white sm:text-3xl md:text-3xl lg:text-4xl">
            Let's{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>

          <p className="mx-auto text-justify mt-4 max-w-md text-sm leading-relaxed text-slate-800 dark:text-slate-300 md:mx-0">
            Have a project in mind, an opportunity to discuss, or just want
            to say hi? I'm always open to talking about full-time work or freelance
            projects — feel free to reach out and I'll get
            back to you as soon as I can.
          </p>

          <div className="mx-auto mt-8 flex items-center justify-center gap-4 md:mx-0 md:justify-start">
            {SOCIALS.map(({ label, href, slug }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-white dark:bg-blue-950 transition-all hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg dark:border-slate-800"
              >
                <img
                  src={`https://cdn.simpleicons.org/${slug}`}
                  alt={label}
                  className="h-5 w-5 object-contain"
                  onError={(e) => {
                    if (!e.currentTarget.dataset.fallback) {
                      e.currentTarget.dataset.fallback = "1";
                      e.currentTarget.src = `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`;
                    }
                  }}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Right: contact form */}
        <div className="order-2" {...reveal(150)}>
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 sm:p-8"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Jhon Andrew Gamboa"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>

              <div>
                <label
                  htmlFor="mobileNumber"
                  className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300"
                >
                  Mobile Number
                </label>
                <input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="tel"
                  required
                  value={form.mobileNumber}
                  onChange={handleChange}
                  placeholder="09XX XXX XXXX"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="message"
                className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or opportunity..."
                className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={16} />
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "sent" && (
              <p className="mt-3 text-center text-xs font-medium text-blue-600 dark:text-blue-300">
                Thanks! Your message has been sent — I'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="mt-3 text-center text-xs font-medium text-red-500">
                Something went wrong. Please try again or email me directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}