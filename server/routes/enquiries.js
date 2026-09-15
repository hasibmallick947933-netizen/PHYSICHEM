const express = require('express');
const Enquiry = require('../models/Enquiry');
const auth = require('../middleware/auth');
const router = express.Router();

// Create enquiry (public — from contact form)
router.post('/', async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    res.status(201).json({ message: 'Enquiry submitted successfully', enquiry });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all enquiries (admin)
router.get('/', auth, async (req, res) => {
  try {
    const { status, classNumber, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (classNumber) filter.classNumber = Number(classNumber);

    const enquiries = await Enquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Enquiry.countDocuments(filter);

    res.json({
      enquiries,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update enquiry status (admin)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
    res.json(enquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete enquiry (admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
    res.json({ message: 'Enquiry deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get enquiry stats (admin)
router.get('/stats', auth, async (req, res) => {
  try {
    const total = await Enquiry.countDocuments();
    const newCount = await Enquiry.countDocuments({ status: 'New' });
    const contacted = await Enquiry.countDocuments({ status: 'Contacted' });
    const enrolled = await Enquiry.countDocuments({ status: 'Enrolled' });
    res.json({ total, new: newCount, contacted, enrolled });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
