import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Calendar, Clock, MapPin, XCircle } from 'lucide-react';

const MyRegistrations = () => {
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

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel your registration?')) {
      try {
        await api.delete(`/registrations/${id}`);
        fetchRegistrations();
      } catch (err) {
        alert(err.response?.data?.message || 'Error cancelling registration');
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">My Registrations</h2>

      {loading ? (
        <div className="text-center py-12">Loading registrations...</div>
      ) : registrations.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl shadow-sm border border-gray-200">
          <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No Registrations Found</h3>
          <p className="text-gray-500">You haven't registered for any exams yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {registrations.map(reg => (
            <div key={reg._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col sm:flex-row">
              <div className="p-6 flex-1 border-b sm:border-b-0 sm:border-r border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{reg.exam?.examName}</h3>
                    <p className="text-gray-500">{reg.exam?.subject}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    reg.status === 'registered' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {reg.status}
                  </span>
                </div>
                
                <div className="space-y-2 mt-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-3 text-gray-500" />
                    {new Date(reg.exam?.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-3 text-gray-500" />
                    {reg.exam?.startTime} - {reg.exam?.endTime}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-3 text-gray-500" />
                    {reg.exam?.venue}
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gray-50 flex items-center justify-center sm:w-48">
                {reg.status === 'registered' ? (
                  <button
                    onClick={() => handleCancel(reg._id)}
                    className="flex flex-col items-center justify-center text-red-600 hover:text-red-800 transition-colors"
                  >
                    <XCircle className="h-8 w-8 mb-2" />
                    <span className="text-sm font-medium">Cancel Reg.</span>
                  </button>
                ) : (
                  <div className="text-center text-gray-500">
                    <span className="text-sm font-medium">Cancelled on</span>
                    <br/>
                    <span className="text-xs">{new Date(reg.updatedAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRegistrations;
