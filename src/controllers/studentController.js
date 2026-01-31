import Student from '../models/Student.js'

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate('enrolledCourses', 'name')
      .sort({ createdAt: -1 })
    res.json(students)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('enrolledCourses', 'name schedule instructor')
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }
    
    res.json(student)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const createStudent = async (req, res) => {
  try {
    const { name, email, phone } = req.body

    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Required fields missing' })
    }

    const existingStudent = await Student.findOne({ email })
    if (existingStudent) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    const student = await Student.create({ name, email, phone })
    res.status(201).json(student)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    res.json(student)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id)
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    res.json({ message: 'Student deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const student = await Student.findById(req.params.id)

    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    if (student.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' })
    }

    student.enrolledCourses.push(courseId)
    await student.save()

    const updatedStudent = await Student.findById(req.params.id)
      .populate('enrolledCourses', 'name schedule')

    res.json(updatedStudent)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}
