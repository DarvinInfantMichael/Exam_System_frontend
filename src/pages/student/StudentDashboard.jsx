import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import { BookOpen, Calendar, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ available: 0, registered: 0 });
  const [recentRegistrations, setRecentRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [examsRes, regsRes] = await Promise.all([
          api.get('/exams'),
          api.get('/registrations')
        ]);
        
        const regs = regsRes.data.data;
        setStats({
          available: examsRes.data.count,
          registered: regs.length
        });
        setRecentRegistrations(regs.slice(0, 3));
      } catch (err) {
        console.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-white shadow-lg">
        <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h2>
        <p className="text-blue-100 opacity-90">Ready to register for your upcoming examinations?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center space-x-4">
          <div className="p-4 rounded-2xl shadow-sm bg-blue-100 text-blue-600">
            <BookOpen className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Available Exams</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.available}</h3>
            <Link to="/student/exams" className="text-sm text-primary hover:underline mt-1 inline-block">Browse all</Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center space-x-4">
          <div className="p-4 rounded-2xl shadow-sm bg-green-100 text-green-600">
            <CheckCircle className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">My Registrations</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.registered}</h3>
            <Link to="/student/registrations" className="text-sm text-primary hover:underline mt-1 inline-block">View details</Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-gray-500" /> Recent Registrations
        </h3>
        {recentRegistrations.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            You haven't registered for any exams yet.
          </div>
        ) : (
          <div className="space-y-4">
            {recentRegistrations.map(reg => (
              <div key={reg._id} className="flex justify-between items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="font-bold text-gray-900">{reg.exam?.examName}</h4>
                  <p className="text-sm text-gray-500">{reg.exam?.subject} • {new Date(reg.exam?.date).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  reg.status === 'registered' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {reg.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
