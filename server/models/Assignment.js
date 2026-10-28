const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    course: {
      type: String,
      required: true
    },
    section: {
      type: String,
      default: 'All'
    },
    dueDate: {
      type: Date,
      required: true
    },
    submissions: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        studentEmail: String,
        status: {
          type: String,
          enum: ['pending', 'completed'],
          default: 'completed'
        },
        submittedAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Assignment', assignmentSchema);
