<p align="center">
  <img src="https://img.shields.io/badge/AI-Resume%20Analyzer-4ab8ff?style=for-the-badge&logo=openai&logoColor=white" alt="AI Resume Analyzer" />
</p>

<p align="center">
  <strong>AI-powered ATS scoring, skill-gap detection, and job matching — in one premium SaaS platform.</strong>
</p>

<p align="center">
  <a href="https://github.com"><img alt="React 19" src="https://img.shields.io/badge/React-19-blue.svg?logo=react&logoColor=white"></a>
  <a href="https://github.com"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?logo=typescript&logoColor=white"></a>
  <a href="https://github.com"><img alt="Express" src="https://img.shields.io/badge/Express-4.x-000000.svg"></a>
  <a href="https://github.com"><img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-8.x-47A248.svg?logo=mongodb&logoColor=white"></a>
  <a href="https://github.com"><img alt="License" src="https://img.shields.io/badge/License-MIT-green.svg"></a>
</p>

---

## 📋 Table of Contents

- [What is AI Resume Analyzer?](#-what-is-ai-resume-analyzer)
- [✨ Features](#-features)
- [🏗️ How It Works](#️-how-it-works)
- [🧰 Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [🔐 Environment Variables](#-environment-variables)
- [📡 API Reference](#-api-reference)
- [📁 Project Structure](#-project-structure)
- [🤖 AI Provider Strategy](#-ai-provider-strategy)
- [🌍 Deployment](#-deployment)
- [🛠️ Troubleshooting](#️-troubleshooting)
- [🗺️ Roadmap](#️-roadmap)
- [📄 License](#-license)

---

## 🎯 What is AI Resume Analyzer?

**AI Resume Analyzer** is a production-oriented SaaS platform that helps **job seekers, recruiters, and hiring teams** transform a plain resume into a high-impact, ATS-optimized document.

It combines a premium **glassmorphism UI**, secure **JWT authentication**, and a **modular AI provider strategy** (Gemini-first, OpenAI-ready) to deliver:

- 📄 Fast **PDF / DOCX parsing**
- 🧠 Instant **AI-generated ATS feedback**
- 🎯 **Job description matching** with missing-keyword suggestions
- 🗃️ A **searchable, persistent history** of every analysis
- 📤 One-click **report export**

---

## ✨ Features

### 🔐 Authentication & User Management
- User registration, login, and logout
- Secure **JWT** token-based sessions (7-day expiry)
- Protected routes with redirect handling
- Profile management (update name / password)

### 📄 Resume Upload & Parsing
- **Drag-and-drop** file upload with click-to-browse
- Supports **PDF** (`pdf-parse`) and **DOCX** (`mammoth`)
- Server-side text extraction with graceful fallback
- Secure multipart uploads via **Multer**

### 🧠 AI Analysis
- **ATS score** (0–100) with actionable feedback
- **Skill detection** from a curated keyword set
- **Missing-skill** recommendations
- Strengths, weaknesses, and improvement suggestions
- **Gemini 2.0 Flash** powered — with a smart offline fallback engine

### 🎯 Job Matching
- Paste a job description and get a **match percentage**
- Detect **missing keywords** relative to the target role
- Receive targeted tips to improve alignment

### 🗃️ History & Reports
- View and search all previous uploads
- Re-open old analysis results
- Delete records (file + database entry)
- **Export** the full analysis as a text report

### 🎨 Premium UI/UX
- Responsive **glassmorphism** design
- **Dark / light** theme toggle
- Smooth Framer Motion animations
- Toast notifications, lucide icons, and a polished landing page

---

## 🏗️ How It Works

```
┌──────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   Frontend   │ ──► │   Express API    │ ──► │    MongoDB       │
│  React 19    │     │  /api/resume     │     │  (Mongoose)      │
│  Vite + TS   │ ◄── │  /api/auth       │ ◄── │  Users & Resumes │
└──────────────┘     └───────┬──────────┘     └──────────────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │   AI Service Layer   │
                  │ Gemini 2.0 Flash     │
                  │  + Fallback engine   │
                  └──────────────────────┘
```

1. User **registers/logs in** → receives a JWT.
2. User **uploads** a PDF/DOCX resume.
3. Server **extracts text** and sends it to the **AI layer**.
4. AI returns an **ATS score + analysis** which is stored against the user.
5. User can **match against a job description**, **browse history**, or **export a report**.

---

## 🧰 Tech Stack

### Frontend (`client/`)
| Layer | Technology |
|-------|------------|
| Framework | **React 19** |
| Build tool | **Vite 5** |
| Language | **TypeScript 5** |
| Styling | **Tailwind CSS** + custom glassmorphism |
| Routing | **React Router 6** |
| Forms | **React Hook Form** |
| HTTP | **Axios** |
| Animations | **Framer Motion** |
| Icons | **Lucide React** |
| Notifications | **React Hot Toast** |

### Backend (`server/`)
| Layer | Technology |
|-------|------------|
| Runtime | **Node.js** |
| Framework | **Express 4** |
| Language | **TypeScript 5** |
| Database | **MongoDB + Mongoose 8** |
| Auth | **JWT** + **bcryptjs** |
| File upload | **Multer** |
| PDF parsing | **pdf-parse** |
| DOCX parsing | **mammoth** |
| Validation | **validator** |
| Logging | **morgan** |
| Dev tooling | **ts-node-dev** |

### Monorepo Tooling
- **npm workspaces** (`client` & `server`)
- **concurrently** to run both dev servers at once

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18 (with `npm` ≥ 9)
- **MongoDB** (local instance or Atlas cluster)
- (Optional) A **Gemini API key** for full AI features — the app falls back to a built-in scoring engine if absent.

### 1. Clone & install

```bash
git clone <your-repo-url>
cd <project-folder>

# Install all workspace dependencies
npm install
```

> npm workspaces installs `client` and `server` dependencies automatically. No need to run per-workspace installs unless you add new packages.

### 2. Configure environment variables

Create `.env` files from the templates below (see [Environment Variables](#-environment-variables)).

### 3. Run in development

From the project root, run both servers together:

```bash
npm run dev
```

- ⚛️ Frontend → **http://localhost:5173**
- 🖥️ Backend  → **http://localhost:5000**
- 💚 Health check → **http://localhost:5000/api/health**

### 4. Build for production

```bash
npm run build
```

This type-checks and bundles the client, then compiles the server to `server/dist`.

### 5. Start the production server

```bash
npm run start
```

---

## 🔐 Environment Variables

### Server (`server/.env`)

```env
# Server port
PORT=5000

# MongoDB connection string (Atlas or local)
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<db>?retryWrites=true&w=majority

# JWT signing secret (use a strong, random value in production)
JWT_SECRET=supersecretvalue

# AI provider — 'gemini' (default) or 'openai'
AI_PROVIDER=gemini

# Gemini API key (optional — enables live AI analysis)
GEMINI_API_KEY=your_gemini_api_key

# Allowed CORS origin for the frontend
CLIENT_URL=http://localhost:5173
```

### Client (`client/.env`)

```env
# Base URL of the backend API
VITE_API_URL=http://localhost:5000/api
```

> ⚠️ **Security note:** Never commit real secrets. `.env`, `.env.bak`, and other sensitive files are already git-ignored. Use a secrets manager in production.

---

## 📡 API Reference

All endpoints are prefixed with `/api`. Authenticated routes require an `Authorization: Bearer <token>` header.

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Liveness check |

### Auth (`/api/auth`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | — | Create account `{ name, email, password }` |
| POST | `/api/auth/login` | — | Login `{ email, password }` |
| GET | `/api/auth/profile` | ✅ | Get current user profile |
| PUT | `/api/auth/profile` | ✅ | Update name / password |

### Resume (`/api/resume`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/resume/upload` | ✅ | Upload **PDF/DOCX** (multipart field `resume`) → stores + analyzes |
| POST | `/api/resume/analyze` | ✅ | Analyze raw text `{ parsedText }` |
| POST | `/api/resume/job-match` | ✅ | Match resume to job `{ parsedText, jobDescription }` |
| GET | `/api/resume/history` | ✅ | List user's analyses (newest first) |
| DELETE | `/api/resume/:id` | ✅ | Delete an analysis + file |

---

## 📁 Project Structure

```
📦ai-resume-analyzer
├── 📄 package.json                 # Root monorepo config (npm workspaces)
├── 📄 README.md
├── 📄 TODO.md
├── 📄 .gitignore
│
├── 🧩 client/                      # React frontend
│   ├── 📄 index.html
│   ├── 📄 vite.config.ts           # Dev server on :5173
│   ├── 📄 tailwind.config.js       # Brand palette & shadows
│   ├── 📄 package.json
│   └── 📁 src/
│       ├── 📄 main.tsx             # App entry (Router + AuthProvider)
│       ├── 📄 App.tsx              # Route definitions
│       ├── 📄 styles.css           # Glassmorphism / theme styles
│       ├── 📁 components/
│       │   ├── 📄 GlassCard.tsx    # Reusable glass card
│       │   └── 📄 ProtectedRoute.tsx
│       ├── 📁 context/
│       │   └── 📄 AuthContext.tsx  # Auth state + token management
│       ├── 📁 pages/               # Landing, Login, Register, Dashboard,
│       │                           # Upload, Analysis, History, Profile,
│       │                           # Settings, NotFound
│       ├── 📁 services/
│       │   └── 📄 api.ts           # Axios client + typed API calls
│       └── 📁 types/
│           └── 📄 index.ts         # Shared TypeScript types
│
└── 🗄️ server/                      # Express backend
    ├── 📄 package.json
    ├── 📄 tsconfig.json
    ├── 📁 uploads/                 # Stored resume files (git-ignored)
    ├── 📁 scripts/                 # Mongo connection diagnostics
    └── 📁 src/
        ├── 📄 server.ts            # App bootstrap + DNS fix + DB connect
        ├── 📁 config/
        │   └── 📄 db.ts            # Mongoose connection helper
        ├── 📁 controllers/
        │   ├── 📄 authController.ts
        │   └── 📄 resumeController.ts
        ├── 📁 middleware/
        │   └── 📄 authMiddleware.ts # JWT bearer guard
        ├── 📁 models/
        │   ├── 📄 User.ts
        │   └── 📄 Resume.ts
        ├── 📁 routes/
        │   ├── 📄 authRoutes.ts
        │   └── 📄 resumeRoutes.ts
        ├── 📁 services/
        │   └── 📄 aiService.ts     # Gemini/OpenAI + fallback engine
        └── 📁 utils/
            └── 📄 fileParser.ts    # PDF/DOCX text extraction
```

---

## 🤖 AI Provider Strategy

The AI layer (`server/src/services/aiService.ts`) is built around a **modular provider pattern**:

- Current default: **Gemini 2.0 Flash** via the Generative Language API.
- **Extensible** to OpenAI by setting `AI_PROVIDER=openai` — the service already exposes a `callOpenAiProvider` hook.
- Includes a **built-in fallback engine** that computes ATS scores, detects keywords, and flags missing skills — so the app stays **fully functional even without an API key or when the AI provider is unreachable**.

---

## 🌍 Deployment

### Frontend → Vercel
1. Import the `client/` folder as a new project.
2. Set the build command to `npm run build` and output directory to `dist`.
3. Add the environment variable:
   ```
   VITE_API_URL=https://your-backend-url/api
   ```

### Backend → Render
1. Create a **Node.js** service pointing at the repo root.
2. Set the **build command** to `npm run build` and **start command** to `npm run start`.
3. Add production environment variables:
   ```
   PORT, MONGODB_URI, JWT_SECRET, GEMINI_API_KEY, AI_PROVIDER, CLIENT_URL
   ```

### Database → MongoDB Atlas
1. Create a cluster and whitelist your deployment IP (or `0.0.0.0/0` for open access).
2. Copy the connection string into `MONGODB_URI`.

---

## 🛠️ Troubleshooting

### `querySrv ECONNREFUSED` on server start
This happens when the local DNS resolver can't resolve MongoDB Atlas **SRV records**. The server already mitigates this by overriding Node's DNS servers as seen in `server/src/server.ts`:
```ts
dns.setServers(['8.8.8.8', '8.8.4.4']);
```
If you still hit connection issues, verify your IP is **whitelisted** in Atlas → **Network Access → IP Access List** (the app has diagnostic scripts in `server/scripts/` to help).

### AI analysis returns generic results
The app gracefully falls back to a built-in scoring engine when `GEMINI_API_KEY` is missing or the provider errors. To get richer AI output, add a valid `GEMINI_API_KEY`.

### File uploads fail
- Confirm the request sends the file under the `resume` multipart field.
- Only **PDF** and **DOCX** are supported.

---

## 🗺️ Roadmap

- [ ] Deeper Gemini/OpenAI response parsing for richer analysis output
- [ ] Interactive ATS scoring charts & analytics
- [ ] PDF export of the full AI report
- [ ] Search-driven history filters and resume tags
- [ ] Team accounts & recruiter dashboard roles
- [ ] Billing and subscription upgrade flows

---

## 📄 License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

<p align="center">
  Built with ⚛️ React, 🟢 Node.js, and 🤖 AI · © 2026 AI Resume Analyzer
</p>
#   A I - R e s u m e - A n a l y z e r  
 