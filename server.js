import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import connectDB from './src/config/db.js'
import authRoutes from './src/routes/authRoutes.js'
import courseRoutes from './src/routes/courseRoutes.js'
import studentRoutes from './src/routes/studentRoutes.js'
import User from './src/models/User.js'
import Course from './src/models/Course.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000

async function seedData() {
  const adminExists = await User.findOne({ email: 'admin@rhythmix.com' })
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123', 10)
    await User.create({
      name: 'Admin User',
      email: 'admin@rhythmix.com',
      phone: '0000000000',
      password: hashedPassword,
      role: 'admin'
    })
    console.log('✓ Admin user seeded')
  }

  const suryaExists = await User.findOne({ email: 'suryasekar626@gmail.com' })
  if (!suryaExists) {
    const hashedPassword = await bcrypt.hash('surya@123', 10)
    await User.create({
      name: 'Surya',
      email: 'suryasekar626@gmail.com',
      phone: '0000000000',
      password: hashedPassword,
      role: 'user'
    })
    console.log('✓ Surya user seeded')
  }

  const courseCount = await Course.countDocuments()
  if (courseCount === 0) {
    await Course.insertMany([
      {
        name: 'Competition Team',
        description: 'Elite training for competitive dancers',
        schedule: 'Mon/Wed/Fri 6-8 PM',
        instructor: 'Sarah Johnson',
        level: 'Advanced',
        capacity: 15
      },
      {
        name: 'Summer Intensives',
        description: 'Intensive summer dance workshop',
        schedule: 'Jun-Aug, Daily 10 AM - 4 PM',
        instructor: 'Mike Chen',
        level: 'Intermediate',
        capacity: 25
      },
      {
        name: 'Adult Drop-In',
        description: 'Casual dance classes for adults',
        schedule: 'Tue/Thu 7-8 PM',
        instructor: 'Emma Davis',
        level: 'Beginner',
        capacity: 20
      }
    ])
    console.log('✓ Initial courses seeded')
  }
}

app.use('/api/auth', authRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/students', studentRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

connectDB().then(async () => {
  await seedData()
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  })
})
