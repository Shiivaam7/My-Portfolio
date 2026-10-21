/**
 * Keep the exact provided resume file as the only downloadable PDF.
 * The app serves the PDF directly from public/Shivam_Kumar.pdf and must not
 * overwrite it during build or resume generation.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "..", "public", "Shivam_Kumar.pdf");

if (fs.existsSync(outPath)) {
  console.log(`Using provided resume: ${outPath}`);
  process.exit(0);
}

console.warn(`Resume file not found at ${outPath}. Upload the exact Shivam_Kumar.pdf to public/ and try again.`);
process.exit(1);
