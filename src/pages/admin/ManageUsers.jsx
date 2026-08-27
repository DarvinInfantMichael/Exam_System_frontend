import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';

const ManageUsers = ({ roleFilter, isStaff = false }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: roleFilter });

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/users');
      const filteredUsers = res.data.data.filter(u => u.role === roleFilter);
      setUsers(filteredUsers);
    } catch (err) {
      console.error('Failed to fetch users', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users', formData);
      setShowModal(false);
      fetchUsers();
      setFormData({ name: '', email: '', password: '', role: roleFilter });
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating user');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/users/${id}`);
        fetchUsers();
      } catch (err) {
        alert('Error deleting user');
      }
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="relative w-64">
          <input
            type="text"
            placeholder={`Search ${roleFilter}s...`}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
        </div>
        {!isStaff && (
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add {roleFilter === 'staff' ? 'Staff' : 'Student'}
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 border-b border-gray-200">
                <th className="px-6 py-4 font-semibold text-sm">Name</th>
                <th className="px-6 py-4 font-semibold text-sm">Email</th>
                <th className="px-6 py-4 font-semibold text-sm">Status</th>
                {!isStaff && <th className="px-6 py-4 font-semibold text-sm text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="4" className="text-center py-8">Loading...</td></tr>
              ) : filteredUsers.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-8 text-gray-500">No {roleFilter}s found.</td></tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{u.name}</td>
                    <td className="px-6 py-4 text-gray-500">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        u.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    {!isStaff && (
                      <td className="px-6 py-4 text-right space-x-3">
                        <button className="text-blue-600 hover:text-blue-800"><Edit2 className="h-5 w-5" /></button>
                        <button onClick={() => handleDelete(u._id)} className="text-red-600 hover:text-red-800"><Trash2 className="h-5 w-5" /></button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold mb-6">Add New {roleFilter}</h3>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                <input type="text" required className="w-full px-4 py-2 border rounded-lg focus:border-primary focus:outline-none" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                <input type="email" required className="w-full px-4 py-2 border rounded-lg focus:border-primary focus:outline-none" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Password</label>
                <input type="password" required className="w-full px-4 py-2 border rounded-lg focus:border-primary focus:outline-none" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
              </div>
              <div className="flex justify-end space-x-3 mt-8">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
