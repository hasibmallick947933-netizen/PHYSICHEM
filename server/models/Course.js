const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  classNumber: { type: Number, required: true, enum: [9, 10, 11, 12] },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  subjects: [{ type: String, enum: ['Physics', 'Chemistry'] }],
  highlights: [{ type: String }],
  timings: { type: String, default: '' },
  fees: { type: String, default: '' },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
