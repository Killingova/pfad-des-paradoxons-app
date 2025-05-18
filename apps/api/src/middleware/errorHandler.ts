// apps/api/src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express'

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ error: 'Ungültiges CSRF-Token' })
  }
  // ... weitere Fehlerfälle
  res.status(err.status || 500).json({ error: err.message || 'Serverfehler' })
}
