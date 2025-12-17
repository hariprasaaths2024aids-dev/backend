import express from 'express'
import {
  enrollInCourse,
  getUserEnrollments,
  unenrollFromCourse
} from '../controllers/enrollmentController.js'

const router = express.Router()

router.post('/enroll', enrollInCourse)
router.get('/user/:userId', getUserEnrollments)
router.delete('/:enrollmentId', unenrollFromCourse)

export default router