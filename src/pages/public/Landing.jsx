import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, CheckCircle, ArrowRight } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] rounded-full bg-purple-400/20 blur-3xl opacity-60 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] rounded-full bg-indigo-400/20 blur-3xl opacity-60 animate-pulse delay-700"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/20 bg-white/60 backdrop-blur-xl px-6 py-4 flex justify-between items-center sticky top-0 shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg shadow-lg shadow-blue-500/30">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">ExamRegistrar</span>
        </div>
        <div className="flex space-x-4 items-center">
          <Link to="/login" className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors">Login</Link>
          <Link to="/register" className="px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all font-medium shadow-md hover:shadow-xl hover:-translate-y-0.5">Register</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-10">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-200/50 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-600">Registrations are now open</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
            Streamline your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              examination
            </span>
            <br/> registrations
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-lg font-light">
            A modern, lightning-fast platform designed to help students register for exams effortlessly from anywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center group shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1">
              Get Started <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
            <Link to="/login" className="px-8 py-4 bg-white/80 backdrop-blur-md text-gray-900 text-lg font-semibold border border-gray-200/50 rounded-2xl hover:bg-white hover:border-gray-300 transition-all duration-300 text-center shadow-sm hover:shadow-md hover:-translate-y-1">
              Student Login
            </Link>
          </div>
        </div>
        
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-purple-200 rounded-[2.5rem] transform rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-70"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-indigo-200 to-blue-100 rounded-[2.5rem] transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500 opacity-70"></div>
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" 
            alt="Students taking exam" 
            className="relative rounded-[2rem] shadow-2xl object-cover h-[550px] w-full border-4 border-white/50 group-hover:-translate-y-2 transition-all duration-500"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-32 bg-white/40 backdrop-blur-xl border-t border-white/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Why choose our platform?</h2>
            <p className="text-xl text-gray-500 mt-5 max-w-2xl mx-auto font-light">Designed to solve the challenges of manual exam registrations with a beautifully crafted online experience.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white/80 backdrop-blur-lg p-10 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="h-16 w-16 bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-blue-100/50">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Real-time Scheduling</h3>
              <p className="text-gray-500 leading-relaxed font-light">View upcoming exams, registration deadlines, and seat availability instantly without visiting the campus.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-lg p-10 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="h-16 w-16 bg-gradient-to-br from-green-100 to-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-green-100/50">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Instant Confirmation</h3>
              <p className="text-gray-500 leading-relaxed font-light">Register securely and receive immediate confirmation for your exams. No more waiting in long queues.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-lg p-10 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="h-16 w-16 bg-gradient-to-br from-purple-100 to-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-purple-100/50">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Centralized Dashboard</h3>
              <p className="text-gray-500 leading-relaxed font-light">Manage all your academic examinations, view details, and track your history in one beautifully designed portal.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
