/**
 * Generates the downloadable resume PDF(s) needed by the portfolio.
 * Keep the primary resume output compatible with the existing site URL while also
 * preserving the public/resume.pdf convenience path used by the project docs.
 */
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const legacyOutPath = path.join(__dirname, "..", "public", "shivam kumar.pdf");
const underscoreOutPath = path.join(__dirname, "..", "public", "Shivam_Kumar.pdf");
const standardOutPath = path.join(__dirname, "..", "public", "resume.pdf");

const resume = {
  name: "Shivam Kumar",
  role: "Aspiring AI/ML Engineer | Generative AI & NLP | Machine Learning",
  education: "B.Tech Artificial Intelligence & Machine Learning, SAGE University, Indore | Jun 2024 – Jun 2028 | CGPA: 7.57/10",
  email: "shivamraj0k0r@gmail.com",
  phone: "+91 9097925538",
  github: "github.com/Shiivaam7",
  linkedin: "linkedin.com/in/shivam-kumar-b67984348",
  portfolio: "my-portfolio-mu-fawn-aaldipuwfk.vercel.app",
  skills: [
    "Machine Learning: Python, Supervised & Unsupervised Learning, Regression, Classification, Feature Engineering, Model Training & Evaluation, Cross-Validation, Scikit-learn",
    "Deep Learning & NLP: Neural Networks, PyTorch, TensorFlow, Transformers, Transfer Learning, Model Fine-Tuning, NLP, Whisper, Text Embeddings",
    "Generative AI & LLM Engineering: Large Language Models, RAG, Prompt Engineering, LangChain, FAISS, Vector Databases, LLM APIs, AI Agents, Agentic AI, MCP",
    "Data & Backend: NumPy, Pandas, Matplotlib, Seaborn, Flask, FastAPI, REST APIs, SQL, PostgreSQL, SQLite, Git, GitHub",
    "MLOps & Deployment: Hugging Face, Streamlit, AWS, GitHub Actions, Model Deployment, Model & Cloud Deployment",
  ],
  projects: [
    "RAG-Based AI Teaching Assistant — Python, FAISS, Transformers, Whisper, Gradio",
    "Abhedya Chakra — Mule Account Risk Screening — Python, FastAPI, React, Pandas, NumPy, Scikit-learn, Isolation Forest",
    "ClassMate AI — Smart Attendance & Classroom Management — Python, Streamlit, Supabase, dlib, Scikit-learn, NumPy",
    "Insta Manager Bot — Flask, SQLite, Python",
  ],
};

const doc = await PDFDocument.create();
const page = doc.addPage([612, 792]);
const helvetica = await doc.embedFont(StandardFonts.Helvetica);
const helveticaBold = await doc.embedFont(StandardFonts.HelveticaBold);

const purple = rgb(0.569, 0.369, 1);
const black = rgb(0.1, 0.1, 0.15);
const gray = rgb(0.35, 0.35, 0.4);

let y = 750;
const left = 44;
const right = 568;
const maxWidth = right - left;

function wrapText(text, font, size, width) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > width && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function line(text, size = 9, font = helvetica, color = black, bold = false) {
  const usedFont = bold ? helveticaBold : font;
  for (const wrapped of wrapText(text, usedFont, size, maxWidth)) {
    if (y < 42) return;
    page.drawText(wrapped, { x: left, y, size, font: usedFont, color });
    y -= size + 4;
  }
}

function section(title) {
  y -= 4;
  if (y < 52) return;
  page.drawText(title, { x: left, y, size: 11, font: helveticaBold, color: purple });
  y -= 7;
  page.drawLine({
    start: { x: left, y },
    end: { x: right, y },
    thickness: 0.7,
    color: purple,
  });
  y -= 12;
}

line(resume.name, 20, helveticaBold, purple, true);
line(resume.role, 9, helvetica, gray);
line(`${resume.email} | ${resume.phone}`, 8, helvetica, gray);
line(`${resume.github} | ${resume.linkedin}`, 8, helvetica, gray);
line(resume.portfolio, 8, helvetica, gray);

section("Education");
line(resume.education, 8);

section("Technical Skills");
for (const skill of resume.skills) line(skill, 7.5);

section("Projects");
for (const project of resume.projects) line(project, 8);

section("Experience & Achievements");
line("VOID HACKS — Hackathon Participant", 8);
line("Participation in a hackathon focused on collaborative problem-solving and building practical solutions.", 7.5);

const pdfBytes = await doc.save();
fs.mkdirSync(path.dirname(legacyOutPath), { recursive: true });
fs.writeFileSync(legacyOutPath, pdfBytes);
fs.writeFileSync(underscoreOutPath, pdfBytes);
fs.writeFileSync(standardOutPath, pdfBytes);
console.log(`Resume written to ${legacyOutPath}`);
console.log(`Resume written to ${underscoreOutPath}`);
console.log(`Resume written to ${standardOutPath}`);
