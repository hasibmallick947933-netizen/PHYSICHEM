const express = require('express');
const multer = require('multer');
const Teacher = require('../models/Teacher');
const auth = require('../middleware/auth');
const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');
const router = express.Router();

// Multer for temporary file storage
const upload = multer({ dest: '/tmp/physichem-uploads/' });

// Get all teachers (public)
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find({ isActive: true }).sort({ subject: 1 });
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single teacher (public)
router.get('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create teacher (admin) — with optional image upload
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const teacherData = { ...req.body };

    if (req.file) {
      const result = await uploadToCloudinary(req.file.path, 'physichem/teachers');
      teacherData.imageUrl = result.url;
      teacherData.imagePublicId = result.publicId;
    }

    const teacher = await Teacher.create(teacherData);
    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update teacher (admin) — with optional image upload
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    const existing = await Teacher.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Teacher not found' });

    if (req.file) {
      // Delete old image from Cloudinary
      if (existing.imagePublicId) {
        await deleteFromCloudinary(existing.imagePublicId);
      }
      const result = await uploadToCloudinary(req.file.path, 'physichem/teachers');
      updateData.imageUrl = result.url;
      updateData.imagePublicId = result.publicId;
    }

    const teacher = await Teacher.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    res.json(teacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete teacher (admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    // Delete image from Cloudinary
    if (teacher.imagePublicId) {
      await deleteFromCloudinary(teacher.imagePublicId);
    }

    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ message: 'Teacher deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
