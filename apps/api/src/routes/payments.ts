import { Router } from 'express'

const router = Router()

// Beispiel-Endpoint für Zahlungen
router.get('/', (req, res) => {
  res.json({ message: 'Payments-Endpoint (Stub)' })
})

export default router
