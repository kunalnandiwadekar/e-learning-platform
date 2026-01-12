# E-Learning Platform (Full Stack)

A full-stack E-Learning Platform built using the MERN stack.  
The project includes user authentication, course management, enrollments, admin dashboard, and image-based course thumbnails.

This repository contains **both backend and frontend**.

---

## 🚀 Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- React Router
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer (Image Upload)

---

## 📂 Project Structure

e-learning-platform/
├── backend/ # Express + MongoDB API
├── frontend/ # React (Vite) frontend
└── README.md

---

## ⚙️ How to Run the Project Locally

### 1️⃣ Clone the Repository
git clone 
```bash
https://github.com/your-username/e-learning-platform.git
cd e-learning-platform
```

## Backend Setup
```bash
cd backend
npm install
Create a .env file inside backend/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

# Run backend
```bash
npm run dev
```
Backend runs on:
http://localhost:5000
## Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
Frontend runs on:
http://localhost:5173
## Authentication & Roles
JWT-based authentication

# Roles:

user – can browse and enroll in courses

admin – can manage courses and view enrollments

Admin routes are protected on both frontend and backend

## Course Thumbnails
- Admin uploads course thumbnails

- Images stored on backend (/uploads)

- Thumbnails rendered dynamically on frontend

## Deployment (Recommended)
- Backend: Render

- Frontend: Vercel

- Both frontend and backend can be deployed independently using this repository.


## User signup & login

- Course listing & detail pages

- Enrollment system

- Admin dashboard

- Course CRUD operations

- Image upload for course thumbnails

## License
This project is developed for learning and internship submission purposes.