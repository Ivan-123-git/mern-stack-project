import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus, X } from 'lucide-react';

const Sidebar = ({ onClose }) => {
  const linkClass = ({ isActive }) =>
    `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? 'bg-indigo-600/20 text-indigo-400 border-l-4 border-indigo-500 font-semibold'
        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
    }`;

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <aside className="w-64 glass h-full p-4 flex flex-col justify-between border-r border-slate-850">
      <div className="space-y-6">
        <div className="flex items-center justify-between px-4">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Navigation
          </span>
          {/* Close button inside mobile sidebar menu */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors md:hidden"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <nav className="space-y-2">
          <NavLink to="/" className={linkClass} onClick={handleLinkClick}>
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/students" className={linkClass} onClick={handleLinkClick}>
            <Users className="h-5 w-5" />
            <span>Students Directory</span>
          </NavLink>
          <NavLink to="/add-student" className={linkClass} onClick={handleLinkClick}>
            <UserPlus className="h-5 w-5" />
            <span>Add Student</span>
          </NavLink>
        </nav>
      </div>

      <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-850 text-center">
        <p className="text-xs text-slate-500">Logged in as</p>
        <p className="text-sm font-semibold text-slate-300">Administrator</p>
      </div>
    </aside>
  );
};

export default Sidebar;
