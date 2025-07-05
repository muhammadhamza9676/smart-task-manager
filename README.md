# 🧠 Smart Task Manager

A full stack task management web application. This productivity focused app includes full authentication, advanced task organization, urgency indicators, and a premium UI.

---

## 🚀 Features

### Frontend (React + Tailwind CSS)
- 🔐 Auth: Login/Register with JWT token management and protected routes
- ✅ Tasks: Full CRUD operations with beautiful task cards
- 📆 Deadlines: Visual urgency indicators (red glow for overdue, highlights for due soon)
- 🧩 Categories: Organize tasks (Work, Personal, Learning, Other)
- 🔍 Filtering: By category and deadline (Today, Tomorrow, This Week, Overdue)
- 📊 Dashboard: Animated task stats, responsive layout, and modals for task creation/editing
- 🌈 UI: Gradient themes, glassmorphism, smooth transitions, custom scrollbars, accessibility features

### Backend (Node.js + Express + MongoDB)
- 👤 Auth: JWT-based system with bcrypt password hashing
- 📄 API: Modular, RESTful endpoints for tasks and users
- 🗂️ Tasks: CRUD routes with filtering by category/deadline, tied to authenticated users
- ⏰ Due-Soon Polling: `/api/tasks/due-soon` returns tasks with <24h left (with hoursRemaining)
- 🧱 Structure: Clean separation of concerns (models, controllers, services, routes, etc.)
- 📘 Swagger: Available at `/api-docs` for testing and documentation
- 🛡️ Middleware: Centralized auth, error handling, and validations

---

## ⚙️ How to Run the Project

1. **Clone the repo**

   git clone https://github.com/muhammadhamza9676/smart-task-manager.git
   cd smart-task-manager

2. **Backend Setup**
cd backend
npm install
cp .env.example .env  # create .env file with MONGO_URI, JWT_SECRET.
npm run dev

3. **Frontend Setup**
cd frontend
npm install
npm run dev

### Improvements If We Had More Time

    🔔 Real push notifications (via service workers or Firebase)

    📱 PWA support and full offline mode

    🔄 Real-time sync using WebSockets

    🧪 Unit and integration tests (Jest, Supertest, React Testing Library)

    👥 User profile management (avatars, theme settings)

    📅 Calendar view or drag-and-drop task management

### Folder Structure

root/
│
├── frontend/         # React + Tailwind client
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── utils/
│   └── .env
│
├── backend/          # Node.js + Express + MongoDB server
│   ├── .env
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── middlewares/
│   └── utils/
└── README.md


#### Built With

    Frontend: React, Tailwind CSS, React Router, Axios, React Toastify

    Backend: Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt, Swagger