import Enrollment from '../models/Enrollment.js'
import Course from '../models/Course.js'
import User from '../models/User.js'

export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate('userId', 'name email phone')
      .populate('courseId', 'name schedule instructor level')
      .sort({ enrolledAt: -1 })
    
    res.json(enrollments)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const { userId } = req.body // In real app, get from JWT token

    console.log('📝 Enroll request received:', { userId, courseId })

    if (!userId || !courseId) {
      console.log('❌ Missing userId or courseId')
      return res.status(400).json({ message: 'User ID and Course ID required' })
    }

    // Check if course exists
    const course = await Course.findById(courseId)
    if (!course) {
      console.log('❌ Course not found:', courseId)
      return res.status(404).json({ message: 'Course not found' })
    }

    // Check if user exists
    const user = await User.findById(userId)
    if (!user) {
      console.log('❌ User not found:', userId)
      return res.status(404).json({ message: 'User not found' })
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({ userId, courseId })
    if (existingEnrollment) {
      console.log('❌ Already enrolled:', { userId, courseId })
      return res.status(400).json({ message: 'Already enrolled in this course' })
    }

    // Check capacity
    if (course.enrolled >= course.capacity) {
      console.log('❌ Course is full:', { enrolled: course.enrolled, capacity: course.capacity })
      return res.status(400).json({ message: 'Course is full' })
    }

    // Create enrollment
    console.log('✅ Creating enrollment...')
    const enrollment = await Enrollment.create({ userId, courseId })
    console.log('✅ Enrollment created:', enrollment._id)

    // Update course enrolled count
    await Course.findByIdAndUpdate(courseId, { $inc: { enrolled: 1 } })
    console.log('✅ Course enrolled count updated')

    res.status(201).json({ 
      message: 'Successfully enrolled in course',
      enrollment 
    })
  } catch (error) {
    console.error('❌ Enrollment error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getUserEnrollments = async (req, res) => {
  try {
    const { userId } = req.params

    const enrollments = await Enrollment.find({ userId })
      .populate('courseId')
      .sort({ createdAt: -1 })

    res.json(enrollments)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const unenrollFromCourse = async (req, res) => {
  try {
    const { enrollmentId } = req.params

    const enrollment = await Enrollment.findById(enrollmentId)
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' })
    }

    // Update course enrolled count
    await Course.findByIdAndUpdate(enrollment.courseId, { $inc: { enrolled: -1 } })

    // Delete enrollment
    await Enrollment.findByIdAndDelete(enrollmentId)

    res.json({ message: 'Successfully unenrolled from course' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}