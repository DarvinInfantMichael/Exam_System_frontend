import React, { useContext } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Users, BookOpen, ClipboardList, LayoutDashboard, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Students', path: '/admin/students', icon: Users },
    { name: 'Staff', path: '/admin/staff', icon: Users },
    { name: 'Examinations', path: '/admin/exams', icon: BookOpen },
    { name: 'Registrations', path: '/admin/registrations', icon: ClipboardList },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white/70 backdrop-blur-xl border-r border-white/50 shadow-sm flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-white/50 shadow-sm">
          <span className="text-xl font-bold text-primary">ExamSystem</span>
        </div>
        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-gray-900 capitalize">
            {location.pathname.split('/').pop().replace('-', ' ')}
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-500">Admin: {user?.name}</span>
            <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
