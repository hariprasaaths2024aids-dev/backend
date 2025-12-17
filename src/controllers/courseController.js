import Course from '../models/Course.js'

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 })
    res.json(courses)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }
    res.json(course)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const createCourse = async (req, res) => {
  try {
    const { name, description, schedule, instructor, level, capacity } = req.body

    if (!name || !description || !schedule || !instructor) {
      return res.status(400).json({ message: 'Required fields missing' })
    }

    const course = await Course.create({
      name,
      description,
      schedule,
      instructor,
      level,
      capacity
    })

    res.status(201).json(course)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }

    res.json(course)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id)
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }

    res.json({ message: 'Course deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}
