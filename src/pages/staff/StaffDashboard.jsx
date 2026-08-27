import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { BookOpen, ClipboardList, Calendar } from 'lucide-react';

const StaffDashboard = () => {
  const [stats, setStats] = useState({
    upcomingExams: 0,
    activeExams: 0,
    totalRegistrations: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [examsRes, regRes] = await Promise.all([
          api.get('/exams'),
          api.get('/registrations')
        ]);
        
        const exams = examsRes.data.data;
        const upcoming = exams.filter(e => e.status === 'upcoming').length;
        const active = exams.filter(e => e.status === 'ongoing').length;
        
        setStats({
          upcomingExams: upcoming,
          activeExams: active,
          totalRegistrations: regRes.data.count
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
    { title: 'Upcoming Exams', value: stats.upcomingExams, icon: Calendar, color: 'bg-blue-100 text-blue-600' },
    { title: 'Active Exams', value: stats.activeExams, icon: BookOpen, color: 'bg-green-100 text-green-600' },
    { title: 'Total Registrations', value: stats.totalRegistrations, icon: ClipboardList, color: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="flex space-x-4">
          <p className="text-gray-500">Navigate to Examinations to create and manage schedules.</p>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
