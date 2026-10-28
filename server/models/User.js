const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please enter your full name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please enter your email address'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
      default: 'student'
    },
    // Personal Details
    dob: {
      type: Date,
      required: [true, 'Please select your Date of Birth']
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: [true, 'Please select your gender']
    },
    phone: {
      type: String,
      required: [true, 'Please enter your 10-digit mobile number'],
      trim: true
    },
    bloodGroup: {
      type: String,
      default: '—',
      trim: true
    },
    // Parent Details
    fatherName: {
      type: String,
      required: [true, "Please enter Father's name"],
      trim: true
    },
    motherName: {
      type: String,
      required: [true, "Please enter Mother's name"],
      trim: true
    },
    // Academic Details
    course: {
      type: String,
      required: [true, 'Please select your course / branch']
    },
    admissionCategory: {
      type: String,
      enum: ['Direct', 'Counselling'],
      required: [true, 'Please select admission category']
    },
    rollNo: {
      type: String,
      default: '',
      trim: true
    },
    section: {
      type: String,
      default: 'A',
      trim: true
    },
    // Verification
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    isPhoneVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
