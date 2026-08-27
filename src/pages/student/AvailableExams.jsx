import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Calendar, Clock, MapPin, Users, Info } from 'lucide-react';

const AvailableExams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      setLoading(true);
      const res = await api.get('/exams');
      // Only show upcoming exams
      const upcoming = res.data.data.filter(e => e.status === 'upcoming');
      setExams(upcoming);
    } catch (err) {
      console.error('Failed to fetch exams', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (examId) => {
    if (window.confirm('Are you sure you want to register for this examination?')) {
      try {
        setRegistering(examId);
        setMessage({ text: '', type: '' });
        await api.post('/registrations', { examId });
        setMessage({ text: 'Successfully registered for the examination!', type: 'success' });
        // Optionally update the UI to show registered state
      } catch (err) {
        setMessage({ 
          text: err.response?.data?.message || 'Failed to register. You might be already registered.', 
          type: 'error' 
        });
      } finally {
        setRegistering(null);
        setTimeout(() => setMessage({ text: '', type: '' }), 5000);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Available Examinations</h2>
      </div>

      {message.text && (
        <div className={`p-4 rounded-lg flex items-center ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          <Info className="h-5 w-5 mr-2" />
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">Loading available exams...</div>
      ) : exams.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl shadow-sm border border-gray-200">
          <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No Upcoming Exams</h3>
          <p className="text-gray-500">There are currently no upcoming examinations available for registration.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {exams.map(exam => (
            <div key={exam._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full mb-3 inline-block">
                      {exam.examCode}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">{exam.examName}</h3>
                    <p className="text-gray-500 mt-1">{exam.subject}</p>
                  </div>
                </div>
                
                <div className="space-y-3 mt-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-3 text-gray-500" />
                    {new Date(exam.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-3 text-gray-500" />
                    {exam.startTime} - {exam.endTime} ({exam.duration} mins)
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-3 text-gray-500" />
                    {exam.venue}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-3 text-gray-500" />
                    Max Seats: {exam.maximumSeats}
                  </div>
                </div>
                
                {exam.description && (
                  <p className="text-sm text-gray-500 mt-4 pt-4 border-t border-gray-50 line-clamp-2">
                    {exam.description}
                  </p>
                )}
              </div>
              
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <button
                  onClick={() => handleRegister(exam._id)}
                  disabled={registering === exam._id}
                  className="w-full py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {registering === exam._id ? 'Processing...' : 'Register Now'}
                </button>
                <p className="text-center text-xs text-gray-500 mt-2">
                  Deadline: {new Date(exam.registrationDeadline).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableExams;
