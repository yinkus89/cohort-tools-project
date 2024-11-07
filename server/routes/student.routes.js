const express = require('express');
const Student = require('../models/Student');
const { verifyToken } = require('../routes/auth.routes'); // Apply token validation

const router = express.Router();

// Get all students
router.get('/', verifyToken, async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Error fetching students", error: err.message });
  }
});

// Get all students by cohort
router.get('/cohort/:cohortId', verifyToken, async (req, res) => {
  try {
    const students = await Student.find({ cohort: req.params.cohortId });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Error fetching students by cohort", error: err.message });
  }
});

// Get a single student by id
router.get('/:studentId', verifyToken, async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Error fetching student", error: err.message });
  }
});

// Create a new student
router.post('/', verifyToken, async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ message: "Error creating student", error: err.message });
  }
});

// Update a student by id
router.put('/:studentId', verifyToken, async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Error updating student", error: err.message });
  }
});

// Delete a student by id
router.delete('/:studentId', verifyToken, async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting student", error: err.message });
  }
});

module.exports = router;
