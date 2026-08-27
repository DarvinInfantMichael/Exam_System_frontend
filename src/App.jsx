import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Layouts
import AdminLayout from './components/layout/AdminLayout';
import StaffLayout from './components/layout/StaffLayout';
import StudentLayout from './components/layout/StudentLayout';

// Public Pages
import Landing from './pages/public/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageExams from './pages/admin/ManageExams';

// Staff Pages
import StaffDashboard from './pages/staff/StaffDashboard';
import StaffRegistrations from './pages/staff/StaffRegistrations';
// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import AvailableExams from './pages/student/AvailableExams';
import MyRegistrations from './pages/student/MyRegistrations';
import Profile from './pages/student/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students" element={<ManageUsers roleFilter="student" />} />
            <Route path="staff" element={<ManageUsers roleFilter="staff" />} />
            <Route path="exams" element={<ManageExams />} />
            <Route path="registrations" element={<StaffRegistrations />} />
            {/* Additional admin routes can be added here */}
          </Route>

          {/* Staff Routes */}
          <Route 
            path="/staff" 
            element={
              <ProtectedRoute allowedRoles={['staff']}>
                <StaffLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<StaffDashboard />} />
            <Route path="exams" element={<ManageExams isStaff={true} />} />
            <Route path="registrations" element={<StaffRegistrations />} />
            <Route path="students" element={<ManageUsers roleFilter="student" isStaff={true} />} />
          </Route>

          {/* Student Routes */}
          <Route 
            path="/student" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="exams" element={<AvailableExams />} />
            <Route path="registrations" element={<MyRegistrations />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
