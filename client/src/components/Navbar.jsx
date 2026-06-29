import React from 'react';
import { GraduationCap, Bell, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ onToggleSidebar }) => {
  return (
    <nav className="glass sticky top-0 z-50 px-4 md:px-6 py-4 flex items-center justify-between border-b border-slate-800/80">
      <div className="flex items-center space-x-3">
        {/* Hamburger Menu on Mobile */}
        <button
          onClick={onToggleSidebar}
          className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors md:hidden"
          title="Toggle Navigation Menu"
        >
          <Menu className="h-5.5 w-5.5" />
        </button>

        <GraduationCap className="h-8 w-8 text-indigo-400 animate-pulse" />
        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent tracking-wide">
          EduSphere
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 text-slate-400 hover:text-slate-200 transition-colors duration-200 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-rose-500 border border-slate-900"></span>
        </button>

        <div className="h-6 w-px bg-slate-800"></div>

        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">
            A
          </div>
          <span className="hidden md:inline text-sm font-medium text-slate-300">Admin Portal</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
