const User = require('../models/User');
const Otp = require('../models/Otp');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Register a new student
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      dob,
      gender,
      phone,
      bloodGroup,
      fatherName,
      motherName,
      course,
      admissionCategory,
      rollNo,
      section,
      isEmailVerified,
      isPhoneVerified
    } = req.body;

    if (!fullName || !email || !password || !dob || !gender || !phone || !fatherName || !motherName || !course || !admissionCategory) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    const userExists = await User.findOne({ email: email.toLowerCase().trim() });
    if (userExists) {
      return res.status(400).json({ message: 'An account with this email already exists' });
    }

    const user = await User.create({
      fullName,
      email: email.toLowerCase().trim(),
      password,
      dob,
      gender,
      phone,
      bloodGroup: bloodGroup || '—',
      fatherName,
      motherName,
      course,
      admissionCategory,
      rollNo: rollNo || '',
      section: section || 'A',
      isEmailVerified: !!isEmailVerified,
      isPhoneVerified: !!isPhoneVerified
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        course: user.course,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error during registration' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'No registered account found with this email' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      course: user.course,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error during login' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Generate simulated OTP for verification
// @route   POST /api/auth/otp/generate
exports.generateOtp = async (req, res) => {
  try {
    const { target, type } = req.body; // target: email or phone, type: 'email' or 'phone'
    if (!target || !type) {
      return res.status(400).json({ message: 'Target and type are required' });
    }

    // Generate 6 digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Remove old OTP for this target
    await Otp.deleteMany({ target });

    await Otp.create({ target, type, code });

    res.json({
      success: true,
      message: `OTP sent successfully to ${target}`,
      otp: code // Returned for testing / immediate verification simulation
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/otp/verify
exports.verifyOtp = async (req, res) => {
  try {
    const target = req.body.target;
    const code = req.body.code || req.body.otp;
    if (!target || !code) {
      return res.status(400).json({ message: 'Target and OTP code are required' });
    }

    const otpDoc = await Otp.findOne({ target, code });
    if (!otpDoc) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP code' });
    }

    // Remove verified OTP
    await Otp.deleteOne({ _id: otpDoc._id });

    res.json({
      success: true,
      message: `${otpDoc.type === 'email' ? 'Email' : 'Phone'} verified successfully!`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
