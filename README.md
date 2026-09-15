# PHYSICHEM

**Understand the Concept. Master the Science.**

Premium Physics & Chemistry coaching website for Classes 9–12. Built with React, Tailwind CSS, Framer Motion, GSAP, Node.js, Express, and MongoDB.

---

## Tech Stack

### Frontend
- **React 18** + **Vite** — Fast build tooling
- **Tailwind CSS v4** — Utility-first styling
- **Framer Motion** — Scroll & page animations
- **GSAP + ScrollTrigger** — Frame sequence scroll animation
- **React Router v6** — Client-side routing
- **Lucide React** — Icon system

### Backend
- **Node.js** + **Express** — REST API
- **MongoDB** + **Mongoose** — Database
- **JWT** — Authentication
- **Cloudinary** — Image hosting
- **Multer** — File upload handling

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Frontend
```bash
cd client
npm install
npm run dev
# → http://localhost:5173
```

### Backend
```bash
cd server
npm install
# Create .env with your credentials (see .env.example)
npm run dev
# → http://localhost:5000
```

### Environment Variables (server/.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
CLIENT_URL=http://localhost:5173
```

---

## Deployment

### Frontend → Vercel
1. Import the repo on [vercel.com](https://vercel.com)
2. Set **Root Directory** to `client`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. Add environment variable: `VITE_API_URL` = your Render backend URL

### Backend → Render
1. Create a **Web Service** on [render.com](https://render.com)
2. Set **Root Directory** to `server`
3. **Build Command**: `npm install`
4. **Start Command**: `node server.js`
5. Add environment variables: `MONGODB_URI`, `JWT_SECRET`, `CLOUDINARY_*`, `CLIENT_URL`

---

## Project Structure
```
PHYSICHEM/
├── client/               # React frontend
│   ├── public/frames/    # 287 scroll animation frames
│   ├── src/
│   │   ├── components/   # Navbar, Footer, FrameSequence, Admin
│   │   ├── pages/        # Home, About, Teachers, Courses, etc.
│   │   ├── data/         # Static site content
│   │   └── styles/       # Global CSS + design system
│   └── vercel.json       # Vercel deployment config
├── server/               # Express backend
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── middleware/        # JWT auth
│   ├── config/           # DB + Cloudinary setup
│   └── render.yaml       # Render deployment config
└── README.md
```

---

## Pages
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with frame sequence + 8 sections |
| About | `/about` | Mission, philosophy, teaching approach |
| Teachers | `/teachers` | Detailed teacher profiles |
| Courses | `/courses` | Class 9–12 course offerings |
| Methodology | `/methodology` | Teaching methodology timeline |
| Contact | `/contact` | Contact form + enquiry system |
| Admin | `/admin` | Dashboard, teacher/course/enquiry management |

---

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| POST | `/api/auth/setup` | Create initial admin |
| GET/POST/PUT/DELETE | `/api/teachers` | Teacher CRUD |
| GET/POST/PUT/DELETE | `/api/courses` | Course CRUD |
| POST | `/api/enquiries` | Submit enquiry |
| GET | `/api/enquiries` | List enquiries (admin) |

---

© 2026 PHYSICHEM. All rights reserved.
