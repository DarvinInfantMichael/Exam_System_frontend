import React, { useContext, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BookOpen, ClipboardList, LayoutDashboard, LogOut, Users, Menu, X } from 'lucide-react';

const StaffLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/staff/dashboard', icon: LayoutDashboard },
    { name: 'Examinations', path: '/staff/exams', icon: BookOpen },
    { name: 'Registrations', path: '/staff/registrations', icon: ClipboardList },
    { name: 'Students', path: '/staff/students', icon: Users },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden">
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/90 backdrop-blur-xl border-r border-gray-200/50 shadow-xl transform transition-transform duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200/50 shadow-sm shrink-0">
          <span className="text-xl font-bold text-primary">Staff Portal</span>
          <button className="md:hidden text-gray-500 hover:text-gray-900 focus:outline-none" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-2.5 rounded-md transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3 shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200/50 shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors font-medium"
          >
            <LogOut className="h-5 w-5 mr-3 shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden w-full relative">
        <header className="h-16 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm flex items-center justify-between px-4 sm:px-6 shrink-0 z-30">
          <div className="flex items-center">
            <button 
              className="md:hidden p-2 mr-3 -ml-2 text-gray-600 rounded-md hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900 capitalize truncate max-w-[150px] sm:max-w-xs">
              {location.pathname.split('/').pop().replace('-', ' ')}
            </h1>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-4">
            <span className="text-sm font-medium text-gray-500 hidden sm:block truncate max-w-[120px]">Staff: {user?.name}</span>
            <div className="h-8 w-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold shrink-0 shadow-sm border border-white">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 bg-transparent">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StaffLayout;
