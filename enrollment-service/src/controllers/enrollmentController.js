const Enrollment = require('../models/enrollment');

exports.getEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find();
        res.status(200).json({ success: true, count: enrollments.length, data: enrollments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.enrollStudent = async (req, res) => {
    try {
        const enrollment = await Enrollment.create(req.body);
        res.status(201).json({ success: true, data: enrollment });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.dropEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
        if (!enrollment) return res.status(404).json({ success: false, message: 'Enrollment not found' });
        res.status(200).json({ success: true, message: 'Enrollment dropped' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
