# Consistency Tracker (Habit Tracking App)

A full-stack Habit Tracking Application built using the MERN stack (MongoDB, Express, React, Node.js) that helps users build consistency by tracking daily habits and visualizing progress through an interactive dashboard.


### Live Demo:

Live URL: [Live](https://habit-tracker-frontend-kwoj.onrender.com/)

GitHub Repositor: 
- [Frontend](https://github.com/RamitRoshan/habit-tracker/tree/main/frontend) 
- [Backend](https://github.com/RamitRoshan/habit-tracker/tree/main/backend)

---

## Features

### Authentication
- User Registration
- User Login
- Secure password hashing using bcrypt
- JWT based authentication
- Protected routes

### Habit Management
- Create habits
- Edit habits
- Delete habits
- View all habits

Each habit contains:
- Title
- Description
- Created date

### Daily Tracking
- Mark habit as completed
- Prevent multiple completion in same day
- View completion history

### Progress Dashboard
- Current streak calculation
- Completion percentage
- Weekly progress chart
- Visual progress insights

### User Experience
- Responsive design
- Clean UI
- Loading states
- Error handling

---

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- Chart Library (Recharts / Chart.js)

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt (Password Hashing)

### Database
- MongoDB (Mongoose ODM)

### Deployment

1. Frontend: Render
2. Backend: Render
3. Database: MongoDB Atlas

---

## Project Architecture

### Backend Structure
```
backend/
│
├── src/
│   │
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
|   |   ├── dashboardController.js
│   │   ├── habitController.js
│   │   └── logController.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Habit.js
│   │   └── HabitLog.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
|   |   ├── dashboardRoutes.js
│   │   ├── habitRoutes.js
│   │   └── logRoutes.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── .env
│   │
│   └── server.js
```

### Frontend Structure

```
frontend/
│
├── src/
│   ├── api/
│   │   └── axios.js
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── HabitPage.jsx
│   │   └── Dashboard.jsx
│   │
│   ├── components/
│   │   ├── HabitCard.jsx
│   │   ├── Navbar.jsx
│   │   ├── PrivateRoute.jsx
│   │   └── ProgressChart.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── main.jsx
│   └── App.jsx
```

---

## Database Schema


```
- User Schema

name: String
email: String (unique)
password: String (hashed)
createdAt: Date


- Habit Schema

userId: ObjectId
title: String
description: String
createdAt: Date


- Tracking Schema

userId: ObjectId
habitId: ObjectId
date: Date
completed: Boolean

```

---

### **Installation and Setup**

**Clone Repository**
```
git clone https://github.com/yourusername/habit-tracker.git
cd habit-tracker
```

**Backend Setup**

```
cd backend
npm install
nodemon server.js
```

**Create .env file:**
```
PORT= 3030
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

**Run backend:**

> npm start

 
**Frontend Setup**
```
cd frontend
npm install
npm run dev
```
---

## Authentication Flow

- User registers
- Password is hashed using bcrypt
- User logs in
- JWT token is generated
- Token is used to access protected routes

## Security Features

- Password hashing
- JWT authentication
- Protected routes
- Error handling
- User-specific data protection

---

## Assignment Requirements Status
```
Requirement	                    Status
User Authentication         	Completed
Habit CRUD Operations	        Completed
Daily Tracking	                Completed
Dashboard with Progress Chart	Completed
MongoDB Database Integration	Completed
REST API Implementation	        Completed
Secure Authentication	        Completed
Frontend Integration	        Completed

```
**All mandatory assignment requirements are successfully implemented.**

 

**Conclusion:**
This project successfully implements a full-stack habit tracking system with secure authentication, habit management, daily tracking, and progress visualization using modern web technologies.

<hr>

### 👨‍💻 Author

    ~ Ramit Roshan 💖
    
GitHub: https://github.com/RamitRoshan




