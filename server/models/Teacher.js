const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true, enum: ['Physics', 'Chemistry'] },
  classes: { type: String, default: '9–12' },
  qualification: { type: String, default: '' },
  experience: { type: String, default: '' },
  bio: { type: String, default: '' },
  philosophy: { type: String, default: '' },
  approach: { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  imagePublicId: { type: String, default: '' },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);
