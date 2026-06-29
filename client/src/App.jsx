import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import StudentList from './pages/StudentList';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import NotFound from './pages/NotFound';
import { ToastProvider } from './context/ToastContext';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ToastProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white relative">
          {/* Navbar */}
          <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          {/* Main Body (Sidebar + Content) */}
          <div className="flex flex-1 relative">
            {/* Sidebar for large screens (static) */}
            <div className="hidden md:block shrink-0 md:h-[calc(100vh-73px)] sticky top-[73px]">
              <Sidebar />
            </div>

            {/* Sidebar drawer for mobile screens (overlay) */}
            {sidebarOpen && (
              <div className="fixed inset-0 z-50 flex md:hidden">
                {/* Overlay backdrop */}
                <div 
                  className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
                  onClick={() => setSidebarOpen(false)}
                ></div>
                
                {/* Drawer Content */}
                <div className="relative z-10 w-64 h-full animate-slide-in">
                  <Sidebar onClose={() => setSidebarOpen(false)} />
                </div>
              </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col justify-between overflow-x-hidden min-h-[calc(100vh-73px)]">
              <main className="p-4 md:p-8 max-w-7xl w-full mx-auto flex-1">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/students" element={<StudentList />} />
                  <Route path="/add-student" element={<AddStudent />} />
                  <Route path="/edit-student/:id" element={<EditStudent />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              {/* Footer */}
              <Footer />
            </div>
          </div>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;
