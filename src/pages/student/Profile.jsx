import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { User, Mail, Shield } from 'lucide-react';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary to-blue-600"></div>
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="h-24 w-24 rounded-full bg-white p-1 shadow-lg">
              <div className="h-full w-full rounded-full bg-blue-100 text-primary flex items-center justify-center text-4xl font-bold">
                {user?.name?.charAt(0)}
              </div>
            </div>
            <span className="px-4 py-1.5 bg-blue-50 text-primary text-sm font-semibold rounded-full uppercase tracking-wider mb-2">
              {user?.role}
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
              <p className="text-gray-500">Student Account</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email Address</p>
                  <p className="text-gray-900">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Account Status</p>
                  <p className="text-green-600 font-medium">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
