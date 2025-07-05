const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },
  category: {
    type: String,
    enum: ['Work', 'Personal', 'Learning', 'Other'],
    default: 'Other',
  },
  deadline: {
    type: Date,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

// Index for user-specific queries
taskSchema.index({ user: 1, createdAt: -1 });

// Virtual field to check if task is due soon (within 24 hours)
taskSchema.virtual('isDueSoon').get(function () {
  if (!this.deadline) return false;
  const now = new Date();
  const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  return this.deadline - now <= oneDay && this.deadline > now;
});

// Ensure virtuals are included in toJSON output
taskSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Task', taskSchema);