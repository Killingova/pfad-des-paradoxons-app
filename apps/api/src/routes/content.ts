import { Router } from 'express';
const router = Router();

// Beispiel-Endpoint für Content
router.get('/', (req, res) => {
  res.json({ message: 'Content-Endpoint (Stub)' });
});

export default router;
