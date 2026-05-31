/**
 * Generates public/resume.pdf — run: npm run generate:resume
 * Replace public/resume.pdf with your own file anytime.
 */
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "..", "public", "resume.pdf");

const resume = {
  name: "Shivam Kumar",
  role: "AI/ML Engineer | Data Science Enthusiast",
  education: "B.Tech AI & ML (2024 – 2028)",
  email: "shivamraj0k0r@gmail.com",
  phone: "+91 9097925538",
  github: "github.com/Shiivaam7",
  linkedin: "linkedin.com/in/shivam-kumar-b67984348",
  skills: [
    "Languages: Python, C, C++, JavaScript, SQL, LaTeX",
    "ML/DL: Regression, Random Forest, SVM, XGBoost, CNN, NLP, LLMs",
    "Frameworks: PySpark, Scikit-Learn, PyTorch, TensorFlow, Keras",
    "Cloud/DB: MySQL, PostgreSQL, MongoDB, Azure, AWS, GCP",
  ],
  projects: [
    "RAG Based AI Teaching Assistant — Python, FAISS, Transformers, Gradio",
    "IPL Cricket Data Analysis (2008–2024) — Pandas, Matplotlib",
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

let y = 740;

function line(text, size = 11, font = helvetica, color = black, bold = false) {
  const usedFont = bold ? helveticaBold : font;
  page.drawText(text, { x: 50, y, size, font: usedFont, color });
  y -= size + 8;
}

function section(title) {
  y -= 6;
  page.drawText(title, { x: 50, y, size: 13, font: helveticaBold, color: purple });
  y -= 20;
  page.drawLine({
    start: { x: 50, y: y + 12 },
    end: { x: 562, y: y + 12 },
    thickness: 1,
    color: purple,
  });
  y -= 8;
}

line(resume.name, 24, helveticaBold, purple, true);
line(resume.role, 12, helvetica, gray);
y -= 4;
line(`${resume.email}  |  ${resume.phone}`, 10, helvetica, gray);
line(`${resume.github}  |  ${resume.linkedin}`, 10, helvetica, gray);

section("Education");
line(resume.education);

section("Skills");
for (const s of resume.skills) line(s, 10);

section("Projects");
for (const p of resume.projects) line(`• ${p}`, 10);

section("Certifications");
line("AWS Academy — Machine Learning Foundations");
line("SAMTRIX PMR | Course Attendance Certificates");

y -= 8;
line("Full portfolio: Deploy your site URL here", 9, helvetica, gray);

const pdfBytes = await doc.save();
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, pdfBytes);
console.log(`Resume written to ${outPath}`);
