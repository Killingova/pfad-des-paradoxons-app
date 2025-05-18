import { Router } from 'express'

const router = Router()

// POST /v1/auth/register (Ticket S1-01)
router.post('/register', (req, res) => {
  res.status(201).json({ message: 'User registriert (Stub)' })
})

export default router
