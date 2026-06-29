import React from 'react';

const Footer = () => {
  return (
    <footer className="glass py-4 px-6 border-t border-slate-800 text-center text-xs text-slate-500">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
        <p>&copy; {new Date().getFullYear()} EduSphere. All rights reserved.</p>
        <p className="flex items-center space-x-1">
          <span>Built with React + Vite + Tailwind CSS</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
