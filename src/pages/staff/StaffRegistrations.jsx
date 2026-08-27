import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Calendar, User, BookOpen } from 'lucide-react';

const StaffRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const res = await api.get('/registrations');
      setRegistrations(res.data.data);
    } catch (err) {
      console.error('Failed to fetch registrations', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">All Exam Registrations</h2>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500 uppercase tracking-wider">
                <th className="p-4">Student</th>
                <th className="p-4">Exam</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">Loading registrations...</td>
                </tr>
              ) : registrations.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">No registrations found.</td>
                </tr>
              ) : (
                registrations.map(reg => (
                  <tr key={reg._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 text-primary flex items-center justify-center font-bold mr-3">
                          {reg.student?.name?.charAt(0) || '?'}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{reg.student?.name || 'Unknown Student'}</div>
                          <div className="text-sm text-gray-500">{reg.student?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center text-gray-900">
                        <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                        {reg.exam?.examName || 'Deleted Exam'}
                      </div>
                      <div className="text-sm text-gray-500 ml-6">{reg.exam?.subject}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center text-gray-500">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        {reg.exam?.date ? new Date(reg.exam.date).toLocaleDateString() : 'N/A'}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        reg.status === 'registered' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {reg.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffRegistrations;
