# Contact Form — Production Setup

Express + Nodemailer + Gmail App Password backend, Next.js frontend on Vercel.

---

## Environment variables

### Backend (`server/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | Yes | `development` or `production` |
| `PORT` | No | Default `5000` |
| `FRONTEND_URL` | Yes | Comma-separated CORS origins, e.g. `http://localhost:3000,https://your-app.vercel.app` |
| `GMAIL_USER` | Yes | Gmail address used to send mail |
| `GMAIL_APP_PASSWORD` | Yes | 16-character Gmail App Password |
| `CONTACT_TO_EMAIL` | Yes | Inbox for messages (`shivamraj0k0r@gmail.com`) |
| `MAIL_FROM_NAME` | No | Display name in From header |

### Frontend (`.env.local` / Vercel)

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_CONTACT_API_URL` | Yes | Render API base URL, e.g. `https://shiko-portfolio-api.onrender.com` |

**Never** put `GMAIL_APP_PASSWORD` in the frontend.

---

## Gmail App Password setup

1. Open [Google Account](https://myaccount.google.com/) → **Security**.
2. Enable **2-Step Verification** (required for app passwords).
3. Search **App passwords** → create a new app (name: `Portfolio Contact API`).
4. Copy the **16-character** password (no spaces).
5. Set in `server/.env`:
   ```env
   GMAIL_USER=shivamraj0k0r@gmail.com
   GMAIL_APP_PASSWORD=xxxxxxxxxxxxxxxx
   CONTACT_TO_EMAIL=shivamraj0k0r@gmail.com
   ```

---

## Run locally

### Terminal 1 — Backend

```bash
cd server
cp .env.example .env
# Edit .env with your Gmail App Password
npm install
npm run dev
```

API: `http://localhost:5000`  
Health: `http://localhost:5000/api/health`

### Terminal 2 — Frontend

```bash
# From project root
cp .env.example .env.local
# Set NEXT_PUBLIC_CONTACT_API_URL=http://localhost:5000
npm install
npm run dev
```

Open `http://localhost:3000` → Contact → submit the form.

---

## Test with curl

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"subject\":\"Hello\",\"message\":\"This is a test message from curl.\"}"
```

Expected: `200` + `"success":true` and email in inbox.

---

## Deploy backend (Render)

1. Push repo to GitHub.
2. [Render Dashboard](https://dashboard.render.com/) → **New** → **Web Service**.
3. Connect repository.
4. Settings:
   - **Root Directory:** `server`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
5. Add environment variables from `server/.env.example`.
6. Set `FRONTEND_URL` to your Vercel URL (and `http://localhost:3000` if you test locally).
7. Deploy → copy service URL (e.g. `https://shiko-portfolio-api.onrender.com`).

Optional: use `server/render.yaml` for Blueprint deploy.

---

## Deploy frontend (Vercel)

1. Import project on [Vercel](https://vercel.com).
2. **Root Directory:** project root (not `server`).
3. Environment variable:
   ```
   NEXT_PUBLIC_CONTACT_API_URL=https://YOUR-RENDER-SERVICE.onrender.com
   ```
4. Deploy.
5. Update Render `FRONTEND_URL` to include your live Vercel URL.

---

## Security features

- Helmet HTTP headers
- CORS allowlist (`FRONTEND_URL`)
- Rate limit: 10 requests / 15 min per IP on `/api/contact`
- Server-side validation + XSS sanitization
- Secrets only on backend
- JSON body size limit 32kb

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| CORS error | Add exact Vercel URL to `FRONTEND_URL` on Render |
| 503 / email failed | Check `GMAIL_USER` + App Password; 2FA enabled |
| Network error on form | Set `NEXT_PUBLIC_CONTACT_API_URL`; Render service awake |
| Too many requests | Wait 15 minutes (rate limit) |

---

## Project structure

```
server/
  src/
    index.ts
    app.ts
    config/env.ts
    controllers/contact.controller.ts
    services/email.service.ts
    routes/
    middleware/
    utils/
  package.json
  .env.example
  render.yaml

src/
  components/contact/ContactForm.tsx
  lib/contact-api.ts
  lib/contact-validation.ts
```
