export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return re.test(email)
}

export const validatePhone = (phone) => {
  const re = /^[0-9]{10}$/
  return re.test(phone)
}

export const validatePassword = (password) => {
  return password.length >= 6
}

export const validateRequest = (req, res, next) => {
  const { email, phone, password } = req.body

  if (email && !validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' })
  }

  if (phone && !validatePhone(phone)) {
    return res.status(400).json({ message: 'Invalid phone number (10 digits required)' })
  }

  if (password && !validatePassword(password)) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' })
  }

  next()
}
