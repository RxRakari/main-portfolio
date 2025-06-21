import express from 'express';

const router = express.Router();

// Contact routes placeholders
router.post('/', (req, res) => {
  const { name, email, message } = req.body;
  
  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ 
      message: 'Please provide name, email and message' 
    });
  }
  
  // Here we would normally send an email with Nodemailer
  res.status(200).json({ 
    message: 'Contact form submission received',
    data: { name, email, messagePreview: message.substring(0, 30) + '...' }
  });
});

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Get all contact submissions endpoint' });
});

router.delete('/:id', (req, res) => {
  res.status(200).json({ message: `Delete contact submission with id: ${req.params.id}` });
});

export default router; 