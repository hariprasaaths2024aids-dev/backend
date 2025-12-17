import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  schedule: {
    type: String,
    required: true
  },
  instructor: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  capacity: {
    type: Number,
    default: 20
  },
  enrolled: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

export default mongoose.model('Course', courseSchema)
