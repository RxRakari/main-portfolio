import express from 'express';
import multer from 'multer';

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

// Gallery routes placeholders with file upload
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Get all gallery items endpoint' });
});

router.post('/', upload.single('image'), (req, res) => {
  res.status(201).json({ 
    message: 'Upload image endpoint',
    file: req.file ? req.file.originalname : 'No file uploaded'
  });
});

router.delete('/:id', (req, res) => {
  res.status(200).json({ message: `Delete gallery item with id: ${req.params.id}` });
});

export default router; 