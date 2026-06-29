const Student = require('../models/Student');

// @desc    Get all students
// @route   GET /api/students
// @access  Public
const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error: Unable to fetch students',
    });
  }
};

// @desc    Get single student by ID
// @route   GET /api/students/:id
// @access  Public
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        error: `Student not found with id of ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    // If it's an invalid Mongoose ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        error: 'Invalid student ID format',
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error: Unable to retrieve student',
    });
  }
};

// @desc    Create new student
// @route   POST /api/students
// @access  Public
const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({
      success: true,
      data: student,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    }
    // Handle duplicate key error (code 11000) for unique fields (rollNumber, email)
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        success: false,
        error: `A student with this ${field} already exists.`,
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error: Unable to create student',
    });
  }
};

// @desc    Update student by ID
// @route   PUT /api/students/:id
// @access  Public
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return updated document
      runValidators: true, // Run model validators on update
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        error: `Student not found with id of ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        error: 'Invalid student ID format',
      });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    }
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        success: false,
        error: `A student with this ${field} already exists.`,
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error: Unable to update student',
    });
  }
};

// @desc    Delete student by ID
// @route   DELETE /api/students/:id
// @access  Public
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        error: `Student not found with id of ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: 'Student record successfully deleted',
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        error: 'Invalid student ID format',
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error: Unable to delete student',
    });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
