# SHIKO AI — Shivam Kumar Portfolio

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

The contact form uses a separate Express backend with Gmail/Nodemailer.

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
