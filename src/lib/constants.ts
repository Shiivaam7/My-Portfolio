export const SITE = {
  name: "Shivam Kumar",
  role: "AI/ML Engineer",
  taglines: ["MACHINE LEARNING", "GENERATIVE AI & NLP"],
  email: "shivamraj0k0r@gmail.com",
  phone: "+91 9097925538",
  github: "https://github.com/Shiivaam7",
  linkedin: "https://www.linkedin.com/in/shivam-kumar-b67984348/",
  resumeUrl: "/resume.pdf",
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
    title: "Machine Learning",
    groups: [
      ["Supervised & Unsupervised Learning", "Regression", "Classification", "Clustering"],
      ["Feature Engineering", "Model Training & Evaluation", "Cross-Validation", "Hyperparameter Tuning", "Scikit-learn"],
    ],
  },
  {
    title: "Deep Learning & NLP",
    groups: [
      ["Neural Networks", "PyTorch", "TensorFlow", "Transformers"],
      ["Transfer Learning", "Model Fine-Tuning", "NLP", "Whisper", "Text Embeddings"],
    ],
  },
  {
    title: "Generative AI & LLM Engineering",
    groups: [
      ["LLMs", "RAG (Retrieval-Augmented Generation)", "Prompt Engineering", "LangChain"],
      ["FAISS", "Vector Databases", "LLM APIs", "AI Agents", "Agentic AI", "MCP"],
    ],
  },
  {
    title: "Data & Backend",
    groups: [
      ["NumPy", "Pandas", "Matplotlib", "Seaborn"],
      ["Flask", "FastAPI", "Hugging Face Transformers", "REST APIs", "PostgreSQL", "SQLite"],
    ],
  },
  {
    title: "MLOps & Deployment",
    groups: [
      ["Hugging Face Spaces", "AWS", "GitHub Actions"],
      ["Model & Cloud Deployment"],
    ],
  },
] as const;

export const PROJECTS = [
  {
    id: "rag-assistant",
    title: "RAG-Based AI Teaching Assistant",
    description:
      "A Retrieval-Augmented Generation application that answers academic questions using relevant educational content, with speech-to-text and context-aware LLM responses.",
    tech: ["Python", "FAISS", "Transformers", "Whisper", "Gradio"],
    github: "https://github.com/Shiivaam7/Rag-based-ai-teaching-assistant",
    gradient: "from-[#915EFF] to-[#00FFFF]",
  },
  {
    id: "abhedya-chakra",
    title: "Abhedya Chakra — Mule Account Risk Screening",
    description:
      "A financial transaction investigation prototype combining risk scoring, Isolation Forest anomaly detection, transaction-network visualization, account investigation, fund-tracing paths, and downloadable reports. Screening signals support human review and are not proof of fraud.",
    tech: ["Python", "FastAPI", "React", "Pandas", "NumPy", "Scikit-learn", "Isolation Forest"],
    github: "https://github.com/Shiivaam7/abhedya-chakra-mule-detection",
    gradient: "from-[#FF00FF] to-[#915EFF]",
  },
  {
    id: "classmate-ai",
    title: "ClassMate AI — Smart Attendance & Classroom Management",
    description:
      "An AI-powered classroom companion designed to support attendance workflows and smarter learning through an interactive application.",
    tech: ["Python", "Streamlit", "Supabase", "dlib", "Scikit-learn", "NumPy"],
    github: "https://github.com/Shiivaam7/Class_mate_Ai",
    liveDemo: "https://classmate-main.streamlit.app/",
    gradient: "from-[#915EFF] to-[#00FFFF]",
  },
] as const;

export const TIMELINE = [
  {
    year: "2024 – 2028",
    title: "B.Tech Artificial Intelligence & Machine Learning",
    description: "Pursuing undergraduate degree at SAGE University, Indore",
  },
  { year: "2025", title: "Built AI and Data Science Projects" },
  { year: "2026", title: "Developed Abhedya Chakra Mule Risk Screening Prototype" },
  { year: "2026", title: "Participated in VOID HACKS" },
  { year: "2026", title: "Seeking AI/ML Internship Opportunities" },
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
  { label: "Focus", text: "Machine Learning & Generative AI" },
  { label: "Learning", text: "Building Practical AI Systems" },
  { label: "Passion", text: "AI/ML Engineering" },
] as const;
