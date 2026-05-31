# Deploy Shivam Kumar Portfolio (Vercel + Render)

Deploy **frontend** on Vercel and **contact API** on Render.

---

## Before you start

- [ ] GitHub account
- [ ] [Vercel](https://vercel.com) account (login with GitHub)
- [ ] [Render](https://render.com) account (login with GitHub)
- [ ] Gmail App Password ready (for contact form)
- [ ] Both builds work locally:
  ```bash
  npm run build
  cd server && npm run build
  ```

---

## Step 1 — Push code to GitHub

Open PowerShell in `d:\my Protfolio`:

```bash
git init
git add .
git commit -m "Portfolio ready for deployment"
```

Create a new repo on GitHub (e.g. `shivam-portfolio`), then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/shivam-portfolio.git
git branch -M main
git push -u origin main
```

> `.env` and `server/.env` are gitignored — secrets stay on your machine.

---

## Step 2 — Deploy backend (Render)

1. Go to [dashboard.render.com](https://dashboard.render.com) → **New +** → **Web Service**
2. Connect your GitHub repo
3. Settings:

   | Setting | Value |
   |--------|--------|
   | **Name** | `shiko-portfolio-api` |
   | **Root Directory** | `server` |
   | **Runtime** | Node |
   | **Build Command** | `npm install && npm run build` |
   | **Start Command** | `npm start` |
   | **Instance type** | Free |

4. **Environment variables** (Environment → Add):

   | Key | Value |
   |-----|--------|
   | `NODE_ENV` | `production` |
   | `RESEND_API_KEY` | your key from [resend.com/api-keys](https://resend.com/api-keys) |
   | `RESEND_FROM_EMAIL` | `onboarding@resend.dev` (or verified domain email) |
   | `CONTACT_TO_EMAIL` | `shivamraj0k0r@gmail.com` |
   | `MAIL_FROM_NAME` | `Shivam Kumar Portfolio` |
   | `FRONTEND_URL` | `http://localhost:3000` (update after Vercel — see Step 4) |

5. Click **Create Web Service** → wait for deploy (5–10 min)
6. Copy your API URL, e.g. `https://shiko-portfolio-api.onrender.com`
7. Test health:
   ```
   https://YOUR-API.onrender.com/api/health
   ```
   Should return `{"status":"ok",...}`

8. Check **Logs** for: `Resend emails.send() succeeded`

---

## Step 3 — Deploy frontend (Vercel)

1. Go to [vercel.com/new](https://vercel.com/new) → import your GitHub repo
2. Settings:

   | Setting | Value |
   |--------|--------|
   | **Framework Preset** | Next.js (auto) |
   | **Root Directory** | `.` (project root) |
   | **Build Command** | `npm run build` |
   | **Output** | default |

3. **Environment variables** (before Deploy):

   | Key | Value |
   |-----|--------|
   | `NEXT_PUBLIC_CONTACT_API_URL` | `https://shiko-portfolio-api.onrender.com` (your Render URL, no trailing `/`) |
   | `NEXT_PUBLIC_SITE_URL` | `https://your-app.vercel.app` (add after first deploy if unknown) |

4. Click **Deploy**
5. Copy your live URL, e.g. `https://shivam-portfolio.vercel.app`

---

## Step 4 — Connect frontend ↔ backend (CORS)

1. Render → your API service → **Environment**
2. Update `FRONTEND_URL`:
   ```
   http://localhost:3000,https://your-app.vercel.app
   ```
   (use your real Vercel URL, no trailing slash)
3. **Save Changes** → Render redeploys automatically

4. Vercel → Project → **Settings** → **Environment Variables**
   - Set `NEXT_PUBLIC_SITE_URL` = your Vercel URL
   - Redeploy: **Deployments** → ⋮ → **Redeploy**

---

## Step 5 — Verify live site

| Check | URL |
|-------|-----|
| Portfolio | `https://your-app.vercel.app` |
| Certifications | `https://your-app.vercel.app/certifications` |
| Resume download | Hero → **Download Resume** |
| Contact form | Send a test message |
| API health | `https://your-api.onrender.com/api/health` |

**Resume on resume:** paste certifications link:
`https://your-app.vercel.app/certifications`

---

## Optional — Custom domain (Vercel)

1. Vercel → Project → **Settings** → **Domains**
2. Add your domain and follow DNS instructions
3. Update Render `FRONTEND_URL` to include the custom domain

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Contact form network error | Check `NEXT_PUBLIC_CONTACT_API_URL` on Vercel; wake Render (free tier sleeps) |
| CORS error | Add exact Vercel URL to Render `FRONTEND_URL` |
| Email not sending | Check `RESEND_API_KEY` and `RESEND_FROM_EMAIL` in Render logs |
| Resume 404 | Ensure `public/resume.pdf` is committed: `git add public/resume.pdf` |
| Render slow first request | Free tier cold start ~30–60s — normal |

---

## Quick command reference

```bash
# Local dev
npm run dev              # frontend :3000
npm run dev:api          # backend :5000

# Production build test
npm run build
cd server && npm run build

# Regenerate resume PDF
npm run generate:resume
```

---

## Environment summary

**Vercel (frontend only)**
- `NEXT_PUBLIC_CONTACT_API_URL`
- `NEXT_PUBLIC_SITE_URL`

**Render (backend only)**
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_TO_EMAIL`
- `FRONTEND_URL`, `NODE_ENV`, `MAIL_FROM_NAME`

Never put Gmail password on Vercel.
