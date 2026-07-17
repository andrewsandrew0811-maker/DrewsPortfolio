export const codeExamples = {
  "App.jsx": `import { useState } from "react";

function App() {
  const [ready, setReady] = useState(true);

  return (
    <Portfolio
      name="Jhon Andrew A. Gamboa"
      role="Aspiring Software Engineer"
      degree="BS Computer Engineering"
      school="Mindoro State University"
      status={ready}
    />
  );
}

export default App;`,

  "Hero.jsx": `export default function About() {
  const info = {
    based: "Philippines",
    focus: ["Web Development", "Cybersecurity", "Networking"],
    experience:
      "Network & Communications Engineer Intern " +
      "at Multi Axis Tech & Handlers Inc.",
    stack: ["React", "Vite", "Tailwind CSS", "JavaScript"],
  };

  return (
    <section>
      <h1>{info.experience}</h1>
      <p>Building projects with {info.stack.join(", ")}.</p>
    </section>
  );
}`,

  "Navbar.jsx": `export default function Contacts() {
  const links = {
    email: "jhonandrew.gamboa@email.com",
    github: "github.com/jagamboa",
    linkedin: "linkedin.com/in/jagamboa",
    location: "Philippines",
  };

  return (
    <nav>
      <a href={\`mailto:\${links.email}\`}>Email</a>
      <a href={links.github}>GitHub</a>
      <a href={links.linkedin}>LinkedIn</a>
    </nav>
  );
}`,
};

export const floatingCards = {
  "App.jsx": {
    bgColor: "bg-blue-500/20",
    iconColor: "text-blue-400",
    textColor: "text-blue-200",
    contentColor: "text-blue-300",
    icon: "★",
    title: "Who I Am",
    content: "Fresh Computer Engineering graduate building toward IT & cybersecurity.",
  },
  "Hero.jsx": {
    bgColor: "bg-purple-500/20",
    iconColor: "text-purple-400",
    textColor: "text-purple-200",
    contentColor: "text-purple-300",
    icon: "◆",
    title: "Background",
    content: "Hands-on internship experience in networking and web development.",
  },
  "Navbar.jsx": {
    bgColor: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    textColor: "text-emerald-200",
    contentColor: "text-emerald-300",
    icon: "✉",
    title: "Get In Touch",
    content: "Open to opportunities — reach out through any of these channels.",
  },
};