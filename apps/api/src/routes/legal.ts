import { Router } from 'express';
import fs from 'fs';
import path from 'path';
const router = Router();

// Beispiel: Lädt Impressum-Markdown und liefert HTML (Stub)
router.get('/impressum', (_req, res) => {
  const md = fs.readFileSync(path.resolve(__dirname, '../../docs/legal/IMPRESSUM.md'), 'utf8');
  res.type('text/markdown').send(md);
});

export default router;
