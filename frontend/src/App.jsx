import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, GraduationCap, LogOut, Plus, Trash2, Edit } from 'lucide-react';
import api from './api';
import './App.css';

const AuthScreen = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(window.location.pathname !== '/register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (isLogin) {
      try {
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setToken(res.data.token);
      } catch (err) {
        setError(err.response?.data?.message || 'Invalid credentials');
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const res = await api.post('/auth/register', { name, email, password, role });
        setSuccess('Registration successful! Logging you in...');
        
        setTimeout(async () => {
          try {
            const loginRes = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', loginRes.data.token);
            localStorage.setItem('user', JSON.stringify(loginRes.data.user));
            setToken(loginRes.data.token);
          } catch (loginErr) {
            setIsLogin(true);
            setError('Registration succeeded, but auto-login failed. Please log in manually.');
          }
        }, 1500);

      } catch (err) {
        setError(err.response?.data?.message || 'Registration failed');
        setLoading(false);
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setName('');
    setRole('student');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '2rem 1rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '420px', transition: 'all 0.3s ease' }}>
        <h2 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Student Management</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          {isLogin ? 'Sign in to access student management system' : 'Create an account to manage records'}
        </p>

        {error && (
          <div style={{ 
            color: 'var(--danger)', 
            background: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid rgba(239, 68, 68, 0.2)',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem', 
            textAlign: 'center',
            fontSize: '0.875rem'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ 
            color: 'var(--success)', 
            background: 'rgba(34, 197, 94, 0.1)', 
            border: '1px solid rgba(34, 197, 94, 0.2)',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem', 
            textAlign: 'center',
            fontSize: '0.875rem'
          }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                placeholder="John Doe"
              />
            </div>
          )}

          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="name@example.com"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="••••••••"
            />
          </div>

          {!isLogin && (
            <div className="input-group" style={{ marginBottom: '1.5rem' }}>
              <label>Role</label>
              <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg)', padding: '0.25rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
                <button 
                  type="button" 
                  onClick={() => setRole('student')}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    border: 'none',
                    borderRadius: '0.375rem',
                    background: role === 'student' ? 'var(--primary)' : 'transparent',
                    color: role === 'student' ? '#ffffff' : 'var(--text-muted)',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  Student
                </button>
                <button 
                  type="button" 
                  onClick={() => setRole('admin')}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    border: 'none',
                    borderRadius: '0.375rem',
                    background: role === 'admin' ? 'var(--primary)' : 'transparent',
                    color: role === 'admin' ? '#ffffff' : 'var(--text-muted)',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  Admin
                </button>
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginBottom: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}
            disabled={loading}
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button 
            onClick={toggleMode}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--primary)', 
              cursor: 'pointer', 
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Overview = () => {
  const [activeTab, setActiveTab] = useState('auth');

  const services = [
    { name: 'API Gateway', port: '5050', status: 'Online', tech: 'Express / http-proxy', desc: 'Central routing, proxying & authorization gatekeeper' },
    { name: 'Auth Service', port: '5001', status: 'Online', tech: 'Express / GraphQL / JWT', desc: 'Handles user registration, login, and token generation' },
    { name: 'Student Service', port: '5002', status: 'Online', tech: 'Express / GraphQL / Mongoose', desc: 'Student profile, details and records management' },
    { name: 'Course Service', port: '5003', status: 'Online', tech: 'Express / GraphQL / Mongoose', desc: 'Academic courses, curriculum and credits catalog' },
    { name: 'Enrollment Service', port: '5004', status: 'Online', tech: 'Express / GraphQL / Mongoose', desc: 'Handles student-to-course registration mapping' },
  ];

  const apis = {
    auth: [
      { method: 'POST', path: '/api/auth/register', auth: 'Public', desc: 'Registers a new user (admin/student role)', url: 'http://localhost:5050/api/auth/register' },
      { method: 'POST', path: '/api/auth/login', auth: 'Public', desc: 'Authenticates user credentials and returns JWT token', url: 'http://localhost:5050/api/auth/login' },
    ],
    students: [
      { method: 'GET', path: '/api/students', auth: 'Bearer Token', desc: 'Retrieves complete list of students', url: 'http://localhost:5050/api/students' },
      { method: 'GET', path: '/api/students/:id', auth: 'Bearer Token', desc: 'Gets details of a single student by DB ID', url: 'http://localhost:5050/api/students/:id' },
      { method: 'POST', path: '/api/students', auth: 'Bearer Token', desc: 'Creates a new student record', url: 'http://localhost:5050/api/students' },
      { method: 'PUT', path: '/api/students/:id', auth: 'Bearer Token', desc: 'Updates details of an existing student', url: 'http://localhost:5050/api/students/:id' },
      { method: 'DELETE', path: '/api/students/:id', auth: 'Bearer Token', desc: 'Removes student profile from system', url: 'http://localhost:5050/api/students/:id' },
    ],
    courses: [
      { method: 'GET', path: '/api/courses', auth: 'Bearer Token', desc: 'Retrieves all available academic courses', url: 'http://localhost:5050/api/courses' },
      { method: 'POST', path: '/api/courses', auth: 'Bearer Token', desc: 'Adds a new course to the curriculum', url: 'http://localhost:5050/api/courses' },
      { method: 'DELETE', path: '/api/courses/:id', auth: 'Bearer Token', desc: 'Deletes a course entry by DB ID', url: 'http://localhost:5050/api/courses/:id' },
    ],
    enrollments: [
      { method: 'GET', path: '/api/enrollments', auth: 'Bearer Token', desc: 'Lists all current student course enrollments', url: 'http://localhost:5050/api/enrollments' },
      { method: 'POST', path: '/api/enrollments', auth: 'Bearer Token', desc: 'Enrolls a student in a course', url: 'http://localhost:5050/api/enrollments' },
      { method: 'DELETE', path: '/api/enrollments/:id', auth: 'Bearer Token', desc: 'Cancels student course enrollment', url: 'http://localhost:5050/api/enrollments/:id' },
    ]
  };

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET': return '#3b82f6';
      case 'POST': return '#22c55e';
      case 'PUT': return '#eab308';
      case 'DELETE': return '#ef4444';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ marginBottom: '0.5rem' }}>System Developer Dashboard</h1>
        <p style={{ color: 'var(--text-muted)' }}>Microservice topology status, REST API endpoints, documentation, and live links.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {services.map((svc) => (
          <div key={svc.name} className="card" style={{ padding: '1.25rem', position: 'relative', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>{svc.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', background: 'rgba(34, 197, 94, 0.1)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 8px #22c55e' }}></span>
                <span style={{ color: '#22c55e', fontSize: '0.75rem', fontWeight: 'bold' }}>{svc.status}</span>
              </div>
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{svc.desc}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.75rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem', border: '1px solid rgba(99, 102, 241, 0.2)' }}>Port {svc.port}</span>
              <span style={{ fontSize: '0.75rem', background: 'var(--bg)', color: 'var(--text-muted)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem', border: '1px solid var(--border)' }}>{svc.tech}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>📄 Swagger API Documentation</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>Access complete interactive OpenAPI UI documentation, test parameters, schemas, and live queries in real-time.</p>
          <a href="http://localhost:5050/api-docs" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignSelf: 'flex-start' }}>
            Open Central Swagger UI
          </a>
        </div>
        <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: '2rem' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>🧬 GraphQL Playgrounds</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>Test structured queries, mutations, and introspect graphs directly via local service endpoints:</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <a href="http://localhost:5001/graphql" target="_blank" rel="noreferrer" style={{ fontSize: '0.875rem', color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>• Auth Graph ↗</a>
            <a href="http://localhost:5002/graphql" target="_blank" rel="noreferrer" style={{ fontSize: '0.875rem', color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>• Student Graph ↗</a>
            <a href="http://localhost:5003/graphql" target="_blank" rel="noreferrer" style={{ fontSize: '0.875rem', color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>• Course Graph ↗</a>
            <a href="http://localhost:5004/graphql" target="_blank" rel="noreferrer" style={{ fontSize: '0.875rem', color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>• Enrollment Graph ↗</a>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3>API Routing Directory</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Explore available endpoints exposed by the API Gateway proxy layer.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--bg)', padding: '0.25rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
            {['auth', 'students', 'courses', 'enrollments'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '0.375rem',
                  background: activeTab === tab ? 'var(--primary)' : 'transparent',
                  color: activeTab === tab ? '#ffffff' : 'var(--text-muted)',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  textTransform: 'capitalize',
                  transition: 'all 0.2s'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Method</th>
                <th style={{ padding: '0.75rem 1rem' }}>Gateway Endpoint Path</th>
                <th style={{ padding: '0.75rem 1rem' }}>Auth Scope</th>
                <th style={{ padding: '0.75rem 1rem' }}>Action Description</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Live Test Links</th>
              </tr>
            </thead>
            <tbody>
              {apis[activeTab].map((api, idx) => (
                <tr key={idx} style={{ borderBottom: idx === apis[activeTab].length - 1 ? 'none' : '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem',
                      background: `${getMethodColor(api.method)}1A`,
                      color: getMethodColor(api.method),
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                      border: `1px solid ${getMethodColor(api.method)}33`
                    }}>
                      {api.method}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: '500', fontFamily: 'monospace', color: 'var(--text)' }}>
                    {api.path}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      padding: '0.125rem 0.375rem',
                      borderRadius: '0.25rem',
                      background: api.auth === 'Public' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                      color: api.auth === 'Public' ? '#22c55e' : '#eab308',
                      border: api.auth === 'Public' ? '1px solid rgba(34, 197, 94, 0.2)' : '1px solid rgba(234, 179, 8, 0.2)'
                    }}>
                      {api.auth}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                    {api.desc}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <a
                      href={api.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: 'var(--primary)',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '0.875rem'
                      }}
                    >
                      Test Endpoint ↗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Students = () => {
  const [students, setStudents] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '', department: '', semester: 1, phone: '' });

  useEffect(() => { fetchStudents(); }, []);

  const fetchStudents = async () => {
    const res = await api.get('/students');
    setStudents(res.data.data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await api.post('/students', formData);
    fetchStudents();
    setShowAdd(false);
  };

  const handleDelete = async (id) => {
    await api.delete(`/students/${id}`);
    fetchStudents();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Student Records</h1>
        <button className="btn btn-primary" onClick={() => setShowAdd(!showAdd)}>
          <Plus size={18} style={{ marginRight: '0.5rem' }} /> Add Student
        </button>
      </div>

      {showAdd && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3>New Student</h3>
          <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            <input placeholder="Student ID" className="btn" style={{ background: '#334155', textAlign: 'left' }} onChange={e => setFormData({ ...formData, studentId: e.target.value })} required />
            <input placeholder="Name" className="btn" style={{ background: '#334155', textAlign: 'left' }} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
            <input placeholder="Email" className="btn" style={{ background: '#334155', textAlign: 'left' }} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
            <input placeholder="Department" className="btn" style={{ background: '#334155', textAlign: 'left' }} onChange={e => setFormData({ ...formData, department: e.target.value })} required />
            <input placeholder="Semester" type="number" className="btn" style={{ background: '#334155', textAlign: 'left' }} onChange={e => setFormData({ ...formData, semester: e.target.value })} required />
            <input placeholder="Phone" className="btn" style={{ background: '#334155', textAlign: 'left' }} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
            <button type="submit" className="btn btn-primary">Save Student</button>
          </form>
        </div>
      )}

      <div className="card">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '1rem' }}>ID</th>
              <th style={{ padding: '1rem' }}>Name</th>
              <th style={{ padding: '1rem' }}>Email</th>
              <th style={{ padding: '1rem' }}>Department</th>
              <th style={{ padding: '1rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s._id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem' }}>{s.studentId}</td>
                <td style={{ padding: '1rem' }}>{s.name}</td>
                <td style={{ padding: '1rem' }}>{s.email}</td>
                <td style={{ padding: '1rem' }}>{s.department}</td>
                <td style={{ padding: '1rem' }}>
                  <Trash2 size={18} style={{ color: 'var(--danger)', cursor: 'pointer' }} onClick={() => handleDelete(s._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({ courseId: '', courseName: '', credits: 3, faculty: '' });

  useEffect(() => { fetchCourses(); }, []);

  const fetchCourses = async () => {
    const res = await api.get('/courses');
    setCourses(res.data.data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await api.post('/courses', formData);
    fetchCourses();
    setShowAdd(false);
  };

  const handleDelete = async (id) => {
    await api.delete(`/courses/${id}`);
    fetchCourses();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Course Management</h1>
        <button className="btn btn-primary" onClick={() => setShowAdd(!showAdd)}>
          <Plus size={18} style={{ marginRight: '0.5rem' }} /> Add Course
        </button>
      </div>

      {showAdd && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3>New Course</h3>
          <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            <input placeholder="Course ID" className="btn" style={{ background: '#334155', textAlign: 'left' }} onChange={e => setFormData({ ...formData, courseId: e.target.value })} required />
            <input placeholder="Course Name" className="btn" style={{ background: '#334155', textAlign: 'left' }} onChange={e => setFormData({ ...formData, courseName: e.target.value })} required />
            <input placeholder="Credits" type="number" className="btn" style={{ background: '#334155', textAlign: 'left' }} onChange={e => setFormData({ ...formData, credits: e.target.value })} required />
            <input placeholder="Faculty" className="btn" style={{ background: '#334155', textAlign: 'left' }} onChange={e => setFormData({ ...formData, faculty: e.target.value })} required />
            <button type="submit" className="btn btn-primary">Save Course</button>
          </form>
        </div>
      )}

      <div className="card">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '1rem' }}>ID</th>
              <th style={{ padding: '1rem' }}>Name</th>
              <th style={{ padding: '1rem' }}>Credits</th>
              <th style={{ padding: '1rem' }}>Faculty</th>
              <th style={{ padding: '1rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(c => (
              <tr key={c._id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem' }}>{c.courseId}</td>
                <td style={{ padding: '1rem' }}>{c.courseName}</td>
                <td style={{ padding: '1rem' }}>{c.credits}</td>
                <td style={{ padding: '1rem' }}>{c.faculty}</td>
                <td style={{ padding: '1rem' }}>
                  <Trash2 size={18} style={{ color: 'var(--danger)', cursor: 'pointer' }} onClick={() => handleDelete(c._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({ enrollmentId: '', studentId: '', courseId: '' });

  useEffect(() => { fetchEnrollments(); }, []);

  const fetchEnrollments = async () => {
    const res = await api.get('/enrollments');
    setEnrollments(res.data.data);
  };

  const handleEnroll = async (e) => {
    e.preventDefault();
    await api.post('/enrollments', formData);
    fetchEnrollments();
    setShowAdd(false);
  };

  const handleDelete = async (id) => {
    await api.delete(`/enrollments/${id}`);
    fetchEnrollments();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Enrollments</h1>
        <button className="btn btn-primary" onClick={() => setShowAdd(!showAdd)}>
          <Plus size={18} style={{ marginRight: '0.5rem' }} /> New Enrollment
        </button>
      </div>

      {showAdd && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3>New Enrollment</h3>
          <form onSubmit={handleEnroll} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            <input placeholder="Enrollment ID" className="btn" style={{ background: '#334155', textAlign: 'left' }} onChange={e => setFormData({ ...formData, enrollmentId: e.target.value })} required />
            <input placeholder="Student ID" className="btn" style={{ background: '#334155', textAlign: 'left' }} onChange={e => setFormData({ ...formData, studentId: e.target.value })} required />
            <input placeholder="Course ID" className="btn" style={{ background: '#334155', textAlign: 'left' }} onChange={e => setFormData({ ...formData, courseId: e.target.value })} required />
            <button type="submit" className="btn btn-primary">Enroll</button>
          </form>
        </div>
      )}

      <div className="card">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '1rem' }}>Enrollment ID</th>
              <th style={{ padding: '1rem' }}>Student ID</th>
              <th style={{ padding: '1rem' }}>Course ID</th>
              <th style={{ padding: '1rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map(e => (
              <tr key={e._id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem' }}>{e.enrollmentId}</td>
                <td style={{ padding: '1rem' }}>{e.studentId}</td>
                <td style={{ padding: '1rem' }}>{e.courseId}</td>
                <td style={{ padding: '1rem' }}>
                  <Trash2 size={18} style={{ color: 'var(--danger)', cursor: 'pointer' }} onClick={() => handleDelete(e._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Dashboard = ({ logout }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '2rem', padding: '0 1rem', color: 'var(--primary)' }}>Admin SMS</div>
        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}><LayoutDashboard size={18} /> Overview</Link>
        <Link to="/students" className={`nav-link ${isActive('/students') ? 'active' : ''}`}><Users size={18} /> Students</Link>
        <Link to="/courses" className={`nav-link ${isActive('/courses') ? 'active' : ''}`}><BookOpen size={18} /> Courses</Link>
        <Link to="/enrollments" className={`nav-link ${isActive('/enrollments') ? 'active' : ''}`}><GraduationCap size={18} /> Enrollments</Link>
        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
          <button onClick={logout} className="nav-link" style={{ background: 'none', border: 'none', width: '100%', cursor: 'pointer' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/students" element={<Students />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/enrollments" element={<Enrollments />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
  };

  if (!token) return <AuthScreen setToken={setToken} />;

  return (
    <Router>
      <Dashboard logout={logout} />
    </Router>
  );
};

export default App;
