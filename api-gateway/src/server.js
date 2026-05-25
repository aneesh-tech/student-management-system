const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');
const { authMiddleware, roleMiddleware } = require('./middlewares/authMiddleware');

dotenv.config();

const app = express();
app.use(cors());
app.use(morgan('dev'));

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:5001';
const STUDENT_SERVICE_URL = process.env.STUDENT_SERVICE_URL || 'http://localhost:5002';
const COURSE_SERVICE_URL = process.env.COURSE_SERVICE_URL || 'http://localhost:5003';
const ENROLLMENT_SERVICE_URL = process.env.ENROLLMENT_SERVICE_URL || 'http://localhost:5004';

// Use express.json() ONLY for routes that don't need proxying or handle it carefully
// Proxying multipart/json might fail if body-parser is used before proxy
// However, for this project, we'll use it globally and the proxy should work fine for standard JSON

// Auth Route (No JWT required for login/register)
app.use('/api/auth', createProxyMiddleware({
    target: AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/auth': '/api/auth' }
}));

// Protected Routes
app.use('/api/students', authMiddleware, createProxyMiddleware({
    target: STUDENT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/students': '/api/students' }
}));

app.use('/api/courses', authMiddleware, createProxyMiddleware({
    target: COURSE_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/courses': '/api/courses' }
}));

app.use('/api/enrollments', authMiddleware, createProxyMiddleware({
    target: ENROLLMENT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/enrollments': '/api/enrollments' }
}));

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
