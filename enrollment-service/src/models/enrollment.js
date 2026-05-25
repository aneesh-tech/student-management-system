const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    enrollmentId: { type: String, required: true, unique: true },
    studentId: { type: String, required: true },
    courseId: { type: String, required: true },
    enrollmentDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
