import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Users, UserCheck, BookOpen, ClipboardList } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    staff: 0,
    exams: 0,
    registrations: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, examsRes, regRes] = await Promise.all([
          api.get('/users'),
          api.get('/exams'),
          api.get('/registrations')
        ]);
        
        const students = usersRes.data.data.filter(u => u.role === 'student').length;
        const staff = usersRes.data.data.filter(u => u.role === 'staff').length;
        
        setStats({
          students,
          staff,
          exams: examsRes.data.count,
          registrations: regRes.data.count
        });
      } catch (err) {
        console.error('Failed to load stats', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  const statCards = [
    { title: 'Total Students', value: stats.students, icon: Users, color: 'bg-blue-100 text-blue-600' },
    { title: 'Total Staff', value: stats.staff, icon: UserCheck, color: 'bg-green-100 text-green-600' },
    { title: 'Total Exams', value: stats.exams, icon: BookOpen, color: 'bg-purple-100 text-purple-600' },
    { title: 'Registrations', value: stats.registrations, icon: ClipboardList, color: 'bg-yellow-100 text-yellow-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center space-x-4">
              <div className={`p-4 rounded-2xl shadow-sm ${card.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{card.title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Registration Overview</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <p className="text-gray-500">Chart will be displayed here</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">System Activity</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <p className="text-gray-500">Activity logs will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
