# Contact Form — Production Setup

Express + **Resend API** backend, Next.js frontend on Vercel. No SMTP ports required.

---

## Environment variables

### Backend (`server/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | Yes | `development` or `production` |
| `PORT` | No | Default `5000` |
| `FRONTEND_URL` | Yes | Comma-separated CORS origins |
| `RESEND_API_KEY` | Yes | API key from [resend.com/api-keys](https://resend.com/api-keys) |
| `RESEND_FROM_EMAIL` | Yes | Verified sender (testing: `onboarding@resend.dev`) |
| `CONTACT_TO_EMAIL` | Yes | `shivamraj0k0r@gmail.com` |
| `MAIL_FROM_NAME` | No | Display name in From header |

### Frontend (`.env.local` / Vercel)

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_CONTACT_API_URL` | Yes | Render API URL (no trailing `/`) |

**Never** put `RESEND_API_KEY` on Vercel — backend only.

---

## Resend setup

1. Sign up at [resend.com](https://resend.com)
2. Create an API key → **API Keys**
3. For testing, use `onboarding@resend.dev` as `RESEND_FROM_EMAIL`
4. For production, verify your domain in Resend and use e.g. `noreply@yourdomain.com`

```env
RESEND_API_KEY=re_xxxxxxxx
RESEND_FROM_EMAIL=onboarding@resend.dev
CONTACT_TO_EMAIL=shivamraj0k0r@gmail.com
MAIL_FROM_NAME=Shivam Kumar Portfolio
```

---

## Run locally

```bash
cd server
cp .env.example .env
# Add RESEND_API_KEY
npm install
npm run dev
```

```bash
# Frontend
NEXT_PUBLIC_CONTACT_API_URL=http://localhost:5000
npm run dev
```

---

## Test

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test\",\"email\":\"test@example.com\",\"subject\":\"Hello\",\"message\":\"Test from Resend API.\"}"
```

---

## Render deployment

Set these environment variables:

| Key | Value |
|-----|--------|
| `RESEND_API_KEY` | your Resend API key |
| `RESEND_FROM_EMAIL` | `onboarding@resend.dev` or verified domain email |
| `CONTACT_TO_EMAIL` | `shivamraj0k0r@gmail.com` |
| `FRONTEND_URL` | your Vercel URL + localhost |
| `MAIL_FROM_NAME` | `Shivam Kumar Portfolio` |

No SMTP / Gmail variables needed.
