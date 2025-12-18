import express from 'express'
import {
  enrollInCourse,
  getUserEnrollments,
  unenrollFromCourse,
  getAllEnrollments
} from '../controllers/enrollmentController.js'

const router = express.Router()

router.get('/', getAllEnrollments)
router.post('/enroll', enrollInCourse)
router.get('/user/:userId', getUserEnrollments)
router.delete('/:enrollmentId', unenrollFromCourse)

export default router