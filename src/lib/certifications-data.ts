/**
 * All certifications — linked to PDFs in public/certificates/
 *
 * Resume link (paste on CV): https://YOUR-SITE.vercel.app/certifications
 */
export type Certification = {
  id: string;
  name: string;
  provider: string;
  issued?: string;
  credentialId?: string;
  verifyUrl?: string;
  /** Path under public/, e.g. /certificates/my-cert.pdf */
  file?: string;
};

export const CERTIFICATIONS: Certification[] = [
  {
    id: "aws-ml-foundations",
    name: "AWS Academy Graduate — Machine Learning Foundations",
    provider: "AWS Academy",
    issued: "Dec 2025",
    file:
      "/certificates/shivam kumarAWS_Academy_Graduate___Machine_Learning_Foundations___Training_Badge_Badge20251203-32-lbq0l6.pdf",
  },
  {
    id: "samtrix-pmr",
    name: "PMR Certification",
    provider: "SAMTRIX",
    issued: "Dec 2025",
    file: "/certificates/PMR(SAMTRIX).pdf",
  },
  {
    id: "course-attendance",
    name: "Course Attendance Certificate",
    provider: "Training Program",
    issued: "Dec 2025",
    file: "/certificates/CourseAttendance20251203-32-nmkvab.pdf",
  },
];

const CERT_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".pdf"] as const;

/** Encode filename for URLs (spaces, parentheses, etc.) */
export function encodeCertificatePath(path: string): string {
  const lastSlash = path.lastIndexOf("/");
  if (lastSlash === -1) return encodeURIComponent(path);
  return `${path.slice(0, lastSlash + 1)}${encodeURIComponent(path.slice(lastSlash + 1))}`;
}

export function getCertificateFileCandidates(cert: Certification): string[] {
  if (cert.file) return [encodeCertificatePath(cert.file)];
  return CERT_EXTENSIONS.map((ext) =>
    encodeCertificatePath(`/certificates/${cert.id}${ext}`)
  );
}

export const CERTIFICATIONS_PAGE_PATH = "/certifications";
