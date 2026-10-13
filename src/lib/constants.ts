export const SITE = {
  name: "Shivam Kumar",
  role: "AI/ML Engineer",
  taglines: ["DATA SCIENTIST", "PROBLEM SOLVER"],
  email: "shivamraj0k0r@gmail.com",
  phone: "+91 9097925538",
  github: "https://github.com/Shiivaam7",
  linkedin: "https://www.linkedin.com/in/shivam-kumar-b67984348/",
  resumeUrl: "/shivam%20kumar.pdf",
} as const;

export const COLORS = {
  bg: "#050816",
  primary: "#915EFF",
  secondary: "#00FFFF",
  accent: "#FF00FF",
  text: "#FFFFFF",
} as const;

export const SKILL_CATEGORIES = [
  {
    title: "Languages",
    groups: [
      ["Python", "C", "C++", "JavaScript"],
      ["SQL", "NoSQL", "LaTeX"],
    ],
  },
  {
    title: "ML / DL",
    groups: [
      ["Linear/Logistic Regression", "Random Forest", "SVM", "XGBoost"],
      ["ANN", "CNN", "NLP", "Transformers", "LLMs"],
    ],
  },
  {
    title: "Frameworks",
    groups: [
      ["PySpark", "Scikit-Learn", "PyTorch"],
      ["TensorFlow", "Keras", "Node.js"],
    ],
  },
  {
    title: "Cloud + Databases",
    groups: [
      ["MySQL", "PostgreSQL", "MongoDB"],
      ["Azure", "AWS", "GCP"],
    ],
  },
] as const;

export const PROJECTS = [
  {
    id: "rag-assistant",
    title: "RAG Based AI Teaching Assistant",
    description:
      "Built end-to-end Retrieval-Augmented Generation system for contextual academic question answering.",
    tech: ["Python", "FAISS", "Transformers", "Whisper", "Gradio"],
    github: "https://github.com/Shiivaam7/Rag-based-ai-teaching-assistant",
    gradient: "from-[#915EFF] to-[#00FFFF]",
  },
  {
    id: "classmate-ai",
    title: "Classmate AI",
    description:
      "An AI-powered learning companion designed to make studying smarter through intelligent assistance, interactive learning, and AI-driven academic support.",
    tech: ["Python", "Streamlit", "Supabase", "dlib", "scikit-learn", "NumPy"],
    github: "https://github.com/Shiivaam7/Class_mate_Ai",
    liveDemo: "https://classmate-main.streamlit.app/",
    gradient: "from-[#915EFF] to-[#00FFFF]",
  },
  {
    id: "insta-bot",
    title: "Insta Manager Bot",
    description:
      "Instagram automation dashboard with analytics and tracking for smarter social growth.",
    tech: ["Flask", "SQLite", "Python"],
    github: "https://github.com/Shiivaam7/insta-manager-bot",
    gradient: "from-[#FF00FF] to-[#915EFF]",
  },
] as const;

export const TIMELINE = [
  {
    year: "2024 – 2028",
    title: "Started B.Tech AI & ML",
    description: "Pursuing undergraduate degree in Artificial Intelligence and Machine Learning",
  },
  { year: "2025", title: "Built AI Projects" },
  { year: "2025", title: "Created Data Science Applications" },
  { year: "2026", title: "Learning Machine Learning" },
  { year: "2026", title: "Seeking Internship Opportunities" },
] as const;

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#timeline", label: "Timeline" },
  { href: "#certifications", label: "Certs" },
  { href: "#message", label: "Contact" },
] as const;

export const LOADER_STEPS = [
  "INITIALIZING 3D CORE...",
  "LOADING PROJECTS...",
  "INITIALIZING PORTFOLIO...",
  "PORTFOLIO READY",
] as const;

export const ABOUT_COUNTERS = [
  { label: "Major Projects", value: 3, suffix: "+" },
  { label: "Focus", text: "AI/ML Focused" },
  { label: "Learning", text: "Open Source Learner" },
  { label: "Passion", text: "Data Science Enthusiast" },
] as const;
