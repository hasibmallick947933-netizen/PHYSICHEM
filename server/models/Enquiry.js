const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  parentName: { type: String, default: '' },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  classNumber: { type: Number, enum: [9, 10, 11, 12] },
  subject: { type: String, enum: ['Physics', 'Chemistry', 'Both'], default: 'Both' },
  message: { type: String, default: '' },
  status: { type: String, enum: ['New', 'Contacted', 'Enrolled', 'Closed'], default: 'New' },
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', enquirySchema);
