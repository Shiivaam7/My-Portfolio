# 🚀 Shiko AI Portfolio

A modern AI/ML Engineer portfolio built with Next.js, TypeScript, Tailwind CSS, and a secure contact system powered by Resend API.

## 🌐 Live Demo

Portfolio: https://my-portfolio-mu-fawn-aaldipuwfk.vercel.app

---

## 👨‍💻 About Me

Hi, I'm Shivam Kumar, a B.Tech AI & ML student passionate about:

- Artificial Intelligence
- Machine Learning
- Data Science
- Python Development
- Full Stack Development
- Building AI-powered solutions

My goal is to secure an AI/ML internship and become an AI Engineer.

---

## ✨ Features

- Modern Dark UI
- Responsive Design
- AI-Themed Animations
- Skills Showcase
- Projects Section
- Certifications Timeline
- Contact Form
- Secure Backend API
- Email Delivery with Resend
- SEO Friendly

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion

### Backend

- Node.js
- Express.js
- TypeScript
- Resend API

### Deployment

- Vercel (Frontend)
- Render (Backend)

---

## 📂 Featured Projects

### 🤖 RAG Based AI Teaching Assistant

AI-powered teaching assistant using Retrieval Augmented Generation (RAG).

GitHub:
https://github.com/Shiivaam7/Rag-based-ai-teaching-assistant

---

### 🏏 IPL Cricket Data Analysis

Comprehensive IPL analysis from 2008–2024 using Python and Data Science libraries.

GitHub:
https://github.com/Shiivaam7/IPL-Cricket-Data-Analysis-2008-2024-

---

### 📸 Insta Manager Bot

Instagram management and automation tool.

GitHub:
https://github.com/Shiivaam7/insta-manager-bot

---

## 📧 Contact

Feel free to connect with me regarding:

- AI/ML Opportunities
- Internships
- Freelance Projects
- Collaborations

### Email

shivamraj0k0r@gmail.com

### LinkedIn

https://www.linkedin.com/in/shivam-kumar-b67984348/

### GitHub

https://github.com/Shiivaam7

---

## ⚙️ Local Setup

Clone the repository:

```bash
git clone https://github.com/Shiivaam7/My-Portfolio.git
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

## 📈 Future Improvements

- AI Chat Assistant
- Blog Section
- Project Analytics Dashboard
- Resume Download Tracking
- AI Career Recommendation System

---

## ⭐ Support

If you like this project, consider giving it a star ⭐ on GitHub.

---

Built with ❤️ by Shivam Kumar

Ultra-modern, dark futuristic portfolio for **Shivam Kumar**, AI/ML Engineer and B.Tech AI & ML Student.

## Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **Framer Motion**
- **Three.js** + **React Three Fiber** + **Drei**
- **GSAP** (ScrollTrigger)

## Features

- Full-screen hero with 3D AI sphere, particle network, typing animation
- SHIKO AI floating assistant
- Glassmorphism sections with animated counters
- 3D tilt skill cards & premium project cards
- Animated timeline & certification cards
- Page loader: "INITIALIZING SHIKO AI..."
- Magnetic buttons, scroll reveals, mouse parallax
- Fully responsive (desktop, tablet, mobile)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Contact form (Express API)

The contact form uses a separate Express backend with the Resend API (no SMTP).

**Full setup:** see [docs/CONTACT_SETUP.md](docs/CONTACT_SETUP.md)

```bash
# Terminal 1
cd server && cp .env.example .env && npm install && npm run dev

# Terminal 2 (root)
cp .env.example .env.local
# NEXT_PUBLIC_CONTACT_API_URL=http://localhost:5000
npm run dev
```

## Build & Deploy

```bash
npm run build
npm start
```

### Deploy (production)

**Full guide:** [docs/DEPLOY.md](docs/DEPLOY.md)

| Part | Platform |
|------|----------|
| Portfolio (Next.js) | **Vercel** |
| Contact API (Express) | **Render** |

Quick steps: GitHub → Render (`server/`) → Vercel (root) → set env vars → update CORS.

## Certifications

Add certificates and PDFs in `src/lib/certifications-data.ts` and `public/certificates/`. Public showcase: `/certifications`.

## Customization

| File | Purpose |
|------|---------|
| `src/lib/constants.ts` | Site content, projects, links |
| `src/lib/certifications-data.ts` | All certificates + verify URLs |
| `/certifications` | Public certificate showcase page |
| `public/resume.pdf` | Replace with your actual resume |
| `src/app/globals.css` | Theme colors & utilities |

## Performance

- Three.js loaded dynamically (no SSR)
- Reduced particle count on mobile
- `dpr={[1, 1.5]}` for optimized canvas rendering
- Next.js font optimization with `display: swap`

## License

MIT — © Shivam Kumar
