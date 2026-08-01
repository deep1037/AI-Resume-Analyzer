# AI Resume Analyzer

AI Resume Analyzer is a production-oriented SaaS platform for analyzing resumes with AI-powered ATS scoring, keyword matching, missing-skill detection, and structured resume history.

## Project Overview

The platform is designed for modern job seekers, recruiters, and hiring teams who want a fast, polished workflow for:

- uploading and parsing a resume
- generating ATS and quality feedback
- comparing the resume against a job description
- keeping a searchable history of previous analyses

It combines a premium glassmorphism UI, secure JWT authentication, and a modular AI provider strategy that is Gemini-first and easy to extend to OpenAI.

## Features

- User registration, login, logout, and JWT authentication
- Protected routes and profile management
- Resume upload for PDF and DOCX formats
- ATS scoring and AI summary generation
- Job description matching with missing-keyword suggestions
- Resume history search, view, and deletion
- Responsive dark and light premium UI
- Environment-based deployment configuration

## Tech Stack

### Frontend
- React 19
- Vite
- TypeScript
- Tailwind CSS
- React Router
- React Hook Form
- Axios
- Framer Motion
- Lucide React
- React Hot Toast

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- Multer
- pdf-parse
- mammoth
- dotenv
- cors

## Installation

1. Clone the project.
2. Install root dependencies:

```bash
npm install
```

3. Install workspace dependencies if needed:

```bash
npm install --workspace client
npm install --workspace server
```

4. Copy and configure your environment variables.

## Environment Variables

### Server

```bash
PORT=5000
MONGODB_URI=mongodb+srv://your-connection-string
JWT_SECRET=your_secret
GEMINI_API_KEY=your_gemini_key
AI_PROVIDER=gemini
CLIENT_URL=http://localhost:5173
```

### Client

```bash
VITE_API_URL=http://localhost:5000/api
```

## Running Locally

From the root folder:

```bash
npm run dev
```

This starts the React frontend and Express server together using the workspace scripts.

## Production Deployment

### Frontend
- Deploy the Vite app to Vercel
- Set `VITE_API_URL` to the deployed backend base URL

### Backend
- Deploy the Express server to Render
- Set the environment variables in the Render dashboard
- Keep `MONGODB_URI`, `JWT_SECRET`, and `GEMINI_API_KEY` in production secrets

### Database
- Use MongoDB Atlas
- Store the Mongo connection string in `MONGODB_URI`

## Folder Structure

```text
client/
  src/
  public/
  package.json
server/
  src/
  uploads/
  package.json
README.md
```

## Screenshots Placeholder

Add product screenshots, dashboard visuals, and upload flow captures here in a future design pass.

## Future Improvements

- Real Gemini/OpenAI response parsing for deeper analysis output
- Resume scoring charting with interactive analytics
- PDF export for the full AI report
- Search-driven history filters and resume tags
- Team accounts and recruiter dashboard roles
- Billing and subscription upgrade flows

## License

MIT
