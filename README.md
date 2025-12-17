# Rhythmix Dance Studio - Backend API

Node.js Express backend with MongoDB Atlas for the Rhythmix dance studio management system.

## Features
- User authentication (register, login, forgot password)
- Course management (CRUD operations)
- Student management with course enrollment
- Role-based access (admin/user)
- Auto-seeding of admin user and initial courses

## Project Structure
```
backend/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   ├── User.js            # User model
│   │   ├── Course.js          # Course model
│   │   └── Student.js         # Student model
│   ├── controllers/
│   │   ├── authController.js   # Auth logic
│   │   ├── courseController.js # Course logic
│   │   └── studentController.js# Student logic
│   ├── routes/
│   │   ├── authRoutes.js      # Auth endpoints
│   │   ├── courseRoutes.js    # Course endpoints
│   │   └── studentRoutes.js   # Student endpoints
│   └── middleware/
│       └── validation.js      # Input validation
├── server.js                  # Main entry point
├── package.json
└── .env                       # Environment variables

```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/rhythmix?retryWrites=true&w=majority
PORT=3000
```

3. Run the server:
```bash
npm start
```

Or with auto-reload (development):
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Reset password

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student
- `POST /api/students/:id/enroll` - Enroll student in course

### Health
- `GET /api/health` - Server health check

## Default Admin Account
- Email: admin@rhythmix.com
- Password: admin123

## Initial Seeded Courses
1. Competition Team - Advanced level
2. Summer Intensives - Intermediate level
3. Adult Drop-In - Beginner level

