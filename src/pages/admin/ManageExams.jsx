import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Search, Plus, Edit2, Trash2, Calendar, MapPin, Clock } from 'lucide-react';

const ManageExams = ({ isStaff = false }) => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  const initialForm = {
    examName: '', subject: '', examCode: '', date: '', startTime: '', endTime: '',
    duration: '', venue: '', maximumSeats: '', registrationDeadline: '', description: ''
  };
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      setLoading(true);
      const res = await api.get('/exams');
      setExams(res.data.data);
    } catch (err) {
      console.error('Failed to fetch exams', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/exams', formData);
      setShowModal(false);
      fetchExams();
      setFormData(initialForm);
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating exam');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      try {
        await api.delete(`/exams/${id}`);
        fetchExams();
      } catch (err) {
        alert('Error deleting exam');
      }
    }
  };

  const filteredExams = exams.filter(e => 
    e.examName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.examCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200 gap-4">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search exams, subjects, codes..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto justify-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Examination
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="bg-gray-50 text-gray-500 border-b border-gray-200">
                <th className="px-6 py-4 font-semibold text-sm">Exam details</th>
                <th className="px-6 py-4 font-semibold text-sm">Schedule</th>
                <th className="px-6 py-4 font-semibold text-sm">Venue & Seats</th>
                <th className="px-6 py-4 font-semibold text-sm">Status</th>
                <th className="px-6 py-4 font-semibold text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="5" className="text-center py-8">Loading...</td></tr>
              ) : filteredExams.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-8 text-gray-500">No examinations found.</td></tr>
              ) : (
                filteredExams.map((exam) => (
                  <tr key={exam._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{exam.examName}</div>
                      <div className="text-sm text-gray-500">{exam.subject} ({exam.examCode})</div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center text-gray-500 mb-1">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        {new Date(exam.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        {exam.startTime} - {exam.endTime} ({exam.duration}m)
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center text-gray-500 mb-1">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        {exam.venue}
                      </div>
                      <div className="text-gray-500">Max seats: {exam.maximumSeats}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 uppercase tracking-wider">
                        {exam.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button className="text-blue-600 hover:text-blue-800"><Edit2 className="h-5 w-5" /></button>
                      <button onClick={() => handleDelete(exam._id)} className="text-red-600 hover:text-red-800"><Trash2 className="h-5 w-5" /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white p-8 rounded-2xl w-full max-w-2xl shadow-2xl my-8">
            <h3 className="text-xl font-bold mb-6">Create New Examination</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Exam Name</label>
                  <input type="text" name="examName" required className="w-full px-4 py-2 border rounded-lg focus:border-primary focus:outline-none" onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Subject</label>
                  <input type="text" name="subject" required className="w-full px-4 py-2 border rounded-lg focus:border-primary focus:outline-none" onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Exam Code</label>
                  <input type="text" name="examCode" required className="w-full px-4 py-2 border rounded-lg focus:border-primary focus:outline-none" onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Date</label>
                  <input type="date" name="date" required className="w-full px-4 py-2 border rounded-lg focus:border-primary focus:outline-none" onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Start Time (e.g. 10:00 AM)</label>
                  <input type="time" name="startTime" required className="w-full px-4 py-2 border rounded-lg focus:border-primary focus:outline-none" onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">End Time</label>
                  <input type="time" name="endTime" required className="w-full px-4 py-2 border rounded-lg focus:border-primary focus:outline-none" onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Duration (minutes)</label>
                  <input type="number" name="duration" required className="w-full px-4 py-2 border rounded-lg focus:border-primary focus:outline-none" onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Venue</label>
                  <input type="text" name="venue" required className="w-full px-4 py-2 border rounded-lg focus:border-primary focus:outline-none" onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Max Seats</label>
                  <input type="number" name="maximumSeats" required className="w-full px-4 py-2 border rounded-lg focus:border-primary focus:outline-none" onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Reg. Deadline</label>
                  <input type="date" name="registrationDeadline" required className="w-full px-4 py-2 border rounded-lg focus:border-primary focus:outline-none" onChange={handleChange} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Description</label>
                <textarea name="description" rows="3" className="w-full px-4 py-2 border rounded-lg focus:border-primary focus:outline-none" onChange={handleChange}></textarea>
              </div>
              <div className="flex justify-end space-x-3 mt-8 pt-4 border-t">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700">Create Exam</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageExams;
