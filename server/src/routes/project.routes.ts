import express from 'express';

const router = express.Router();

// Project routes placeholders
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Get all projects endpoint' });
});

router.get('/:id', (req, res) => {
  res.status(200).json({ message: `Get project with id: ${req.params.id}` });
});

router.post('/', (req, res) => {
  res.status(201).json({ message: 'Create project endpoint' });
});

router.put('/:id', (req, res) => {
  res.status(200).json({ message: `Update project with id: ${req.params.id}` });
});

router.delete('/:id', (req, res) => {
  res.status(200).json({ message: `Delete project with id: ${req.params.id}` });
});

export default router; 