const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    title: {
      type: String,
      required: true
    },
    shortDesc: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: 'fa-graduation-cap'
    },
    overview: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      default: '2-4 Years'
    },
    eligibility: {
      type: String,
      required: true
    },
    intake: {
      type: Number,
      default: 60
    },
    fees: {
      type: String,
      default: 'As per institute norms'
    },
    coreSubjects: [{ type: String }],
    careerOptions: [{ type: String }],
    syllabus: [
      {
        semester: Number,
        title: String,
        subjects: [{ type: String }]
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Course', courseSchema);
