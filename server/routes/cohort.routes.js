const express = require('express');
const Cohort = require('../models/Cohort');
const { verifyToken } = require('../routes/auth.routes'); // Ensure token verification is applied to protected routes

const router = express.Router();

// Get all cohorts
router.get('/', verifyToken, async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.json(cohorts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cohorts", error: err.message });
  }
});

// Get a single cohort by id
router.get('/:cohortId', verifyToken, async (req, res) => {
  try {
    const cohort = await Cohort.findById(req.params.cohortId);
    if (!cohort) return res.status(404).json({ message: "Cohort not found" });
    res.json(cohort);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cohort", error: err.message });
  }
});

// Create a new cohort
router.post('/', verifyToken, async (req, res) => {
  try {
    const newCohort = new Cohort(req.body);
    await newCohort.save();
    res.status(201).json(newCohort);
  } catch (err) {
    res.status(500).json({ message: "Error creating cohort", error: err.message });
  }
});

// Update a cohort by id
router.put('/:cohortId', verifyToken, async (req, res) => {
  try {
    const cohort = await Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true });
    if (!cohort) return res.status(404).json({ message: "Cohort not found" });
    res.json(cohort);
  } catch (err) {
    res.status(500).json({ message: "Error updating cohort", error: err.message });
  }
});

// Delete a cohort by id
router.delete('/:cohortId', verifyToken, async (req, res) => {
  try {
    const cohort = await Cohort.findByIdAndDelete(req.params.cohortId);
    if (!cohort) return res.status(404).json({ message: "Cohort not found" });
    res.json({ message: "Cohort deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting cohort", error: err.message });
  }
});

module.exports = router;
