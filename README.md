# EduConnect — MERN Stack Student Portal

A modern, full-stack Academic Management & Student Portal migrated from static HTML/Firebase to the **MERN Stack** (MongoDB, Express.js, React.js, Node.js).

---

## 🌟 Key Features

1. **MongoDB Atlas Cloud Database**:
   - Cluster: `EduConnectCluster` (`educonnectcluster.f4txqkc.mongodb.net`)
   - Database: `educonnect`
   - Real-time persistence for users, curricula, assignments, and verification codes.
2. **Secure Authentication & Session Management**:
   - Passwords hashed with `bcryptjs` (salt rounds: 10).
   - Stateless JWT (`jsonwebtoken`) token-based sessions with 30-day validity.
   - Client-side and server-side lockout protection (5 failed attempts locks login for 5 minutes).
3. **Simulated OTP Verification**:
   - Dynamic 6-digit verification code generation for both email and phone numbers.
   - Automatic expiry using MongoDB TTL index (expires after 5 minutes).
4. **Dynamic Course & Syllabus Management**:
   - Centralized MongoDB collection serving all programs: **MCA**, **MBA**, **B.Tech (CSE)**, **B.Tech (CSE/IT)**, **B.Tech (AI/ML)**, and **M.Tech**.
   - Search & filtering by keywords, subjects, and eligibility.
   - Dynamic curriculum views per semester.
5. **Interactive Student Dashboard**:
   - Complete academic and personal profile cards.
   - Real-time assignment checklist with one-click "Mark as Done" / "Completed" toggle.
   - Course notice board and metrics widgets.
6. **Dark / Light Mode**:
   - Persistent theme system with CSS variables.

---

## 📁 Project Structure

```
EduConnect/
├── client/                     # React.js Frontend (Vite)
│   ├── src/
│   │   ├── api/client.js       # Axios client with JWT interceptor
│   │   ├── components/         # Navbar, Footer, ProtectedRoute
│   │   ├── context/            # AuthContext, ThemeContext
│   │   ├── pages/              # Home, Courses, CourseDetail, Register, Login, Dashboard
│   │   ├── App.jsx             # React Router DOM Setup
│   │   └── index.css           # Global Themes & Layout styles
│   └── package.json
│
├── server/                     # Node.js + Express Backend
│   ├── config/db.js            # MongoDB Atlas Connection via Mongoose
│   ├── controllers/            # authController, courseController, assignmentController
│   ├── middleware/auth.js      # JWT Route Protection Middleware
│   ├── models/                 # User.js, Course.js, Assignment.js, Otp.js
│   ├── routes/                 # authRoutes, courseRoutes, assignmentRoutes
│   ├── seed/coursesSeed.js     # Automatic Database Seeder for Courses & Assignments
│   ├── .env                    # Environment variables (Mongo URI, JWT Secret)
│   ├── server.js               # Express Server Entrypoint
│   └── package.json
│
├── package.json                # Root orchestration scripts (runs concurrently)
├── legacy_static_html/         # Archived original static HTML files & screenshots
└── README.md
```

---

## 🚀 How to Run the Application

### Option A: Run Both Together (Recommended)
From the project root:
```bash
npm run dev
```
*(This starts both the Node/Express backend on port `5000` and the Vite React frontend on port `5173` concurrently with live reload!)*

### Option B: Run Separately
1. **Start Backend Server**:
   ```bash
   npm run server
   ```
2. **Start Frontend Client**:
   ```bash
   npm run client
   ```
Open your browser at `http://localhost:5173`.

---

## 🔗 API Endpoints Summary

### Auth (`/api/auth`)
- `POST /api/auth/register` — Register student with admission records.
- `POST /api/auth/login` — Sign in and receive JWT token.
- `GET /api/auth/profile` — Get authenticated student profile (Requires Bearer Token).
- `POST /api/auth/otp/generate` — Generate 6-digit OTP code for email/phone.
- `POST /api/auth/otp/verify` — Verify entered OTP code.

### Courses (`/api/courses`)
- `GET /api/courses` — Get all degree programs.
- `GET /api/courses/:slug` — Get single program details and syllabus.

### Assignments (`/api/assignments`)
- `GET /api/assignments` — Get assignments for logged-in student's course.
- `POST /api/assignments/:id/complete` — Toggle assignment completion status.
