import express from 'express'
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  enrollCourse
} from '../controllers/studentController.js'

const router = express.Router()

router.get('/', getAllStudents)
router.get('/:id', getStudentById)
router.post('/', createStudent)
router.put('/:id', updateStudent)
router.delete('/:id', deleteStudent)
router.post('/:id/enroll', enrollCourse)

export default router
