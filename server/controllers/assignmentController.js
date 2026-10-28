const Assignment = require('../models/Assignment');

// @desc    Get assignments for logged-in student
// @route   GET /api/assignments
exports.getMyAssignments = async (req, res) => {
  try {
    const studentCourse = req.user.course;
    const studentId = req.user._id;

    // Find assignments matching the student's course or marked "All"
    const assignments = await Assignment.find({
      $or: [
        { course: studentCourse },
        { course: 'All' },
        { course: { $regex: new RegExp(studentCourse.split(' ')[0], 'i') } }
      ]
    }).sort({ dueDate: 1 });

    // Format for student view
    const formatted = assignments.map((a) => {
      const isCompleted = a.submissions.some(
        (sub) => sub.student && sub.student.toString() === studentId.toString()
      );
      return {
        _id: a._id,
        title: a.title,
        description: a.description,
        course: a.course,
        section: a.section,
        dueDate: a.dueDate,
        isCompleted
      };
    });

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark assignment as completed
// @route   POST /api/assignments/:id/complete
exports.completeAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    const studentId = req.user._id;
    const alreadyCompleted = assignment.submissions.some(
      (s) => s.student && s.student.toString() === studentId.toString()
    );

    if (alreadyCompleted) {
      // Toggle back to incomplete or inform
      assignment.submissions = assignment.submissions.filter(
        (s) => s.student.toString() !== studentId.toString()
      );
      await assignment.save();
      return res.json({ message: 'Assignment marked as pending', isCompleted: false });
    }

    assignment.submissions.push({
      student: studentId,
      studentEmail: req.user.email,
      status: 'completed'
    });

    await assignment.save();
    res.json({ message: 'Assignment marked as completed!', isCompleted: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
