# 🚀 MERN Task Management Application  
### Full-Stack Developer (SDE-1) Take-Home Assignment

A full-stack MERN application implementing authentication, role-based access control (RBAC), and task management with secure REST APIs and a modern, responsive UI.

---

## 📌 Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt (Password Hashing)
- Multer (Profile Image Upload)

### Database
- MySQL

---

# 🎯 Objective

This project demonstrates the ability to:

- Implement secure authentication & authorization
- Build protected REST APIs
- Implement role-based access control (RBAC)
- Develop a clean, usable frontend
- Handle errors and edge cases
- Structure code professionally

---

# 🔐 1. Authentication

## Registration

Fields implemented:

- Full Name
- Email (unique)
- Contact Number
- Username (unique)
- Password (hashed using bcrypt)
- Role (admin or user)

### Security Features:
- Password hashing using bcrypt
- Duplicate email & username validation
- Input validation & error handling

---

## Login

- Login using Email OR Username + Password
- On successful login:
  - JWT token is generated
  - Token is used for authenticated requests
- Token validation handled on backend

---

# 🛡 2. Protected Routes

### Backend
- JWT verification middleware
- Unauthorized requests return 401
- Token expiration handling

### Frontend
- Private route handling
- Automatic redirection to login if not authenticated

### Protected Pages:
- Dashboard
- Profile Page
- Task Management Pages

---

# 👥 3. Role-Based Access Control (RBAC)

Two roles implemented:

## 👑 Admin
- View all users
- View all tasks
- Create, update, delete any task

## 👤 User
- View only their own tasks
- Create tasks
- Update only their own tasks
- Delete only their own tasks

Middleware ensures:
- Role validation
- Ownership validation
- Secure access enforcement

---

# 📋 4. Task Management (CRUD)

Each task includes:

- Title
- Description
- Status (pending / in-progress / completed)
- Created By (user reference)
- Created At / Updated At (timestamps)

### Features Implemented

- Create task
- View task list
- Update task
- Delete task
- Filter tasks by status
- Admin can see all tasks
- User can see only their tasks

---

# ⚠ 5. Error Handling

The application properly handles:

- Unauthorized access
- Token expiration
- Server errors
- Validation errors
- Empty states (no tasks available)

---

# 🎁 Bonus Features Implemented

## 🎨 Strong UI / UX
- Clean modern dark theme
- Responsive layout
- Consistent spacing & typography
- Smooth transitions
- Loading states
- Proper empty states
- Well-designed forms

## 🖼 Profile Picture Upload
- Users can upload profile image
- Image stored locally
- Multer used for handling file uploads
- Ability to remove profile image
- Fallback to user initials if no image

---

# 🧱 Project Structure
backend/
├── controllers/
├── middleware/
├── models/
├── routes/
├── uploads/
├── server.js

frontend/
├── components/
├── pages/
├── api/
├──tasks/
├──context/
├── App.js


Modular structure for scalability and maintainability.

---

# ⚙️ Setup Instructions

## 1️⃣ Clone Repository

bash
git clone "repo-link"
cd project-folder
cd backend
npm install
----

##DATABASE : AIVEN MYSQL (ONLINE DATABASE)

Start backend:
node server.js
Backend runs on:

http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm start


Frontend runs on:

http://localhost:3000

🌍 Deployment

Frontend: Vercel

Backend: Render

Database: AIVEN MYSQL

🔗 Deployed URL:
https://webx-assignment-frontend.vercel.app/
https://webx-assignment-backend-1.onrender.com/

🧠 Assumptions & Trade-offs

Local storage used for profile images for simplicity

Basic validation implemented (can be extended using Joi/Zod)

No refresh token flow implemented (can be extended for production use)

Focused on security, clarity, and clean architecture

🔐 Security Practices

Password hashing using bcrypt

JWT-based authentication

Protected routes

Role-based middleware

Ownership validation

Sensitive data excluded from responses

Environment variables used for secrets

⏱ Completion Time

Completed within: 12 hours

