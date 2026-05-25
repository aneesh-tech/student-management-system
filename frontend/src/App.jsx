import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, GraduationCap, LogOut, Plus, Trash2, Edit } from 'lucide-react';
import api from './api';
import './App.css';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setToken(res.data.token);
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="card" style={{ width: '400px' }}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Student Management System</h2>
        {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group" style={{ marginBottom: '2rem' }}>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
        </form>
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
          <Route path="/" element={<div><h1>Welcome Dashboard</h1><p style={{ color: 'var(--text-muted)' }}>Overview of student management system.</p></div>} />
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

  if (!token) return <Login setToken={setToken} />;

  return (
    <Router>
      <Dashboard logout={logout} />
    </Router>
  );
};

export default App;
