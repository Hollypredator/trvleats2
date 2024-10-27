import express from 'express';
import { auth, adminAuth } from '../middleware/auth';
import upload, { processImage } from '../middleware/upload';

const router = express.Router();

// Upload single file
router.post('/single', auth, adminAuth, upload.single('file'), processImage, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`,
    mimetype: req.file.mimetype
  });
});

// Upload multiple files
router.post('/multiple', auth, adminAuth, upload.array('files', 5), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  const files = Array.isArray(req.files) ? req.files : [req.files];
  
  const processedFiles = files.map(file => ({
    filename: file.filename,
    path: `/uploads/${file.filename}`,
    mimetype: file.mimetype
  }));

  res.json(processedFiles);
});

export default router;