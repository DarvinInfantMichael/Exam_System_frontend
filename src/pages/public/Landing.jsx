import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, CheckCircle, ArrowRight, Users, Building, FileText, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import countUpModule from 'react-countup';

const CountUp = countUpModule.default ? countUpModule.default : countUpModule;

const Landing = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

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
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg shadow-lg shadow-blue-500/30">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">ExamRegistrar</span>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex space-x-4 items-center"
        >
          <Link to="/login" className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors">Login</Link>
          <Link to="/register" className="px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all font-medium shadow-md hover:shadow-xl hover:-translate-y-0.5">Register</Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          <motion.div variants={slideInLeft} className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-200/50 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-600">Registrations are now open</span>
          </motion.div>
          <motion.h1 variants={slideInLeft} className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
            Streamline your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              examination
            </span>
            <br/> registrations
          </motion.h1>
          <motion.p variants={slideInLeft} className="text-xl text-gray-600 leading-relaxed max-w-lg font-light">
            A modern, lightning-fast platform designed to help students register for exams effortlessly from anywhere.
          </motion.p>
          <motion.div variants={slideInLeft} className="flex flex-col sm:flex-row gap-5">
            <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center group shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1">
              Get Started <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
            <Link to="/login" className="px-8 py-4 bg-white/80 backdrop-blur-md text-gray-900 text-lg font-semibold border border-gray-200/50 rounded-2xl hover:bg-white hover:border-gray-300 transition-all duration-300 text-center shadow-sm hover:shadow-md hover:-translate-y-1">
              Student Login
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-purple-200 rounded-[2.5rem] transform rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-70"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-indigo-200 to-blue-100 rounded-[2.5rem] transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500 opacity-70"></div>
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" 
            alt="Students taking exam" 
            loading="lazy"
            className="relative rounded-[2rem] shadow-2xl object-cover h-[550px] w-full border-4 border-white/50 group-hover:-translate-y-2 transition-all duration-500"
          />
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 py-16 bg-white/40 border-y border-white/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { label: 'Active Students', value: 15420, icon: <Users className="h-6 w-6 text-blue-500 mb-2 mx-auto" /> },
              { label: 'Partner Institutes', value: 120, icon: <Building className="h-6 w-6 text-indigo-500 mb-2 mx-auto" /> },
              { label: 'Exams Registered', value: 45800, icon: <FileText className="h-6 w-6 text-purple-500 mb-2 mx-auto" /> },
              { label: 'Success Rate', value: 99, suffix: '%', icon: <Shield className="h-6 w-6 text-green-500 mb-2 mx-auto" /> }
            ].map((stat, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="p-4">
                {stat.icon}
                <h4 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight flex justify-center items-center">
                  <CountUp end={stat.value} duration={2.5} separator="," enableScrollSpy scrollSpyOnce />
                  {stat.suffix && <span>{stat.suffix}</span>}
                  {!stat.suffix && <span>+</span>}
                </h4>
                <p className="text-gray-500 mt-2 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Uses of this project Section */}
      <div className="relative z-10 py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Who uses ExamRegistrar?</h2>
            <p className="text-xl text-gray-500 mt-4 max-w-2xl mx-auto font-light">
              Built for modern educational ecosystems, catering to every stakeholder in the examination process.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 gap-12"
          >
            <motion.div variants={slideInLeft} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow flex items-start gap-6">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl shrink-0">
                <Users className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">For Students</h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  A seamless experience to view available exams, check eligibility, and register in minutes. Track exam history, download hall tickets, and get real-time notifications about schedules and results without the usual administrative runaround.
                </p>
              </div>
            </motion.div>

            <motion.div variants={slideInRight} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow flex items-start gap-6">
              <div className="bg-purple-100 text-purple-600 p-4 rounded-2xl shrink-0">
                <Building className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">For Institutes & Staff</h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  Powerful administrative tools to create exams, manage seat capacities, verify student eligibility, and generate comprehensive attendance reports. Automate the registration lifecycle and reduce manual workload significantly.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-32 bg-white/40 backdrop-blur-xl border-t border-white/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Why choose our platform?</h2>
            <p className="text-xl text-gray-500 mt-5 max-w-2xl mx-auto font-light">Designed to solve the challenges of manual exam registrations with a beautifully crafted online experience.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-3 gap-10"
          >
            <motion.div variants={fadeInUp} className="bg-white/80 backdrop-blur-lg p-10 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="h-16 w-16 bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-blue-100/50">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Real-time Scheduling</h3>
              <p className="text-gray-500 leading-relaxed font-light">View upcoming exams, registration deadlines, and seat availability instantly without visiting the campus.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-white/80 backdrop-blur-lg p-10 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="h-16 w-16 bg-gradient-to-br from-green-100 to-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-green-100/50">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Instant Confirmation</h3>
              <p className="text-gray-500 leading-relaxed font-light">Register securely and receive immediate confirmation for your exams. No more waiting in long queues.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-white/80 backdrop-blur-lg p-10 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="h-16 w-16 bg-gradient-to-br from-purple-100 to-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-purple-100/50">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Centralized Dashboard</h3>
              <p className="text-gray-500 leading-relaxed font-light">Manage all your academic examinations, view details, and track your history in one beautifully designed portal.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
