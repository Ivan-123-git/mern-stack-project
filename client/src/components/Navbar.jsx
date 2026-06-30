import React from 'react';
import { GraduationCap, Bell, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';

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
        <button className="p-2 text-slate-400 hover:text-slate-200 transition-colors duration-200 relative" title="View Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-rose-500 border border-slate-900"></span>
        </button>

        <div className="h-6 w-px bg-slate-800"></div>

        <div className="flex items-center space-x-3">
          <UserButton 
            afterSignOutUrl="/login"
            appearance={{
              elements: {
                userButtonAvatarBox: 'h-8 w-8 border border-indigo-500/30 rounded-full hover:scale-105 transition-transform duration-200',
                userButtonPopoverCard: 'bg-slate-900 border border-slate-800 shadow-2xl text-slate-100',
                userButtonPopoverActionButton: 'hover:bg-slate-850 text-slate-300 hover:text-slate-100 transition-colors duration-150',
                userButtonPopoverActionButtonText: 'text-slate-200 font-medium',
                userButtonPopoverFooter: 'hidden'
              }
            }}
          />
          <span className="hidden md:inline text-sm font-medium text-slate-300">Admin Portal</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
