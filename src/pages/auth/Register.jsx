import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BookOpen, AlertCircle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', 
    studentId: '', department: '', course: '', year: '', section: '', dateOfBirth: '', address: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      if (user.role === 'superadmin') navigate('/admin/dashboard');
      else if (user.role === 'staff') navigate('/staff/dashboard');
      else navigate('/student/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const submitData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: 'student',
      studentDetails: {
        studentId: formData.studentId,
        department: formData.department,
        course: formData.course,
        year: formData.year,
        section: formData.section,
        dateOfBirth: formData.dateOfBirth,
        address: formData.address
      }
    };

    try {
      await register(submitData);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Student Registration</h2>
          <p className="mt-2 text-sm text-gray-500">Create an account to start registering for exams</p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center text-sm">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
              <input type="text" name="name" required className="w-full px-4 py-2 border rounded-lg" onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
              <input type="email" name="email" required className="w-full px-4 py-2 border rounded-lg" onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Password</label>
              <input type="password" name="password" required className="w-full px-4 py-2 border rounded-lg" onChange={handleChange} minLength="6" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Student ID</label>
              <input type="text" name="studentId" required className="w-full px-4 py-2 border rounded-lg" onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Department</label>
              <input type="text" name="department" required className="w-full px-4 py-2 border rounded-lg" onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Course</label>
              <input type="text" name="course" required className="w-full px-4 py-2 border rounded-lg" onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Year</label>
              <input type="text" name="year" required className="w-full px-4 py-2 border rounded-lg" onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Section</label>
              <input type="text" name="section" required className="w-full px-4 py-2 border rounded-lg" onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Date of Birth</label>
              <input type="date" name="dateOfBirth" required className="w-full px-4 py-2 border rounded-lg" onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
              <input type="text" name="address" required className="w-full px-4 py-2 border rounded-lg" onChange={handleChange} />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none transition-colors disabled:opacity-70"
            >
              {loading ? 'Registering...' : 'Register as Student'}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-blue-500 transition-colors">
              Sign In here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
