import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, School, Calendar, UserPlus, Clock, ArrowRight } from 'lucide-react';
import { getStudents } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalDepartments: 0,
    latestStudents: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await getStudents();
        const students = res.data || [];
        
        // Compute unique departments count
        const uniqueDepts = [...new Set(students.map((s) => s.department))];
        
        // Sort students by creation date (latest first)
        // Fallback to sorting by _id if createdAt is missing, or simply reverse the array
        const sortedStudents = [...students].sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt) : new Date();
          const dateB = b.createdAt ? new Date(b.createdAt) : new Date();
          return dateB - dateA;
        });

        // Take the latest 5 added students
        const latest = sortedStudents.slice(0, 5);

        setStats({
          totalStudents: students.length,
          totalDepartments: uniqueDepts.length,
          latestStudents: latest,
        });
      } catch (err) {
        console.error('Error fetching dashboard statistics:', err);
        setError('Unable to fetch dashboard statistics. Verify that your server and database are running.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 p-8 shadow-2xl shadow-indigo-500/10">
        <div className="absolute top-0 right-0 h-40 w-40 translate-x-10 -translate-y-10 rounded-full bg-white/5 blur-3xl"></div>
        <div className="relative z-10 max-w-xl space-y-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-cyan-200">
            Console Active
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            EduSphere Dashboard
          </h1>
          <p className="text-indigo-100 text-sm sm:text-base leading-relaxed">
            Quick metrics and overview of registered students and departmental allocations.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-950/20 border border-rose-900/30 rounded-2xl text-rose-400 text-sm flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Students Card */}
        <div className="glass p-6 rounded-2xl border border-slate-800 flex items-center justify-between group hover:border-indigo-500/30 transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <Users className="h-7 w-7" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Students</p>
              <h2 className="text-3xl font-bold text-slate-100 mt-1">
                {loading ? (
                  <span className="inline-block h-6 w-12 bg-slate-800 rounded animate-pulse"></span>
                ) : (
                  stats.totalStudents
                )}
              </h2>
            </div>
          </div>
          <Link
            to="/students"
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-slate-200 transition-colors"
            title="View Directory"
          >
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Total Departments Card */}
        <div className="glass p-6 rounded-2xl border border-slate-800 flex items-center justify-between group hover:border-cyan-500/30 transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <School className="h-7 w-7" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Departments</p>
              <h2 className="text-3xl font-bold text-slate-100 mt-1">
                {loading ? (
                  <span className="inline-block h-6 w-12 bg-slate-800 rounded animate-pulse"></span>
                ) : (
                  stats.totalDepartments
                )}
              </h2>
            </div>
          </div>
          <Link
            to="/students"
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-slate-200 transition-colors"
            title="Browse Directory"
          >
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Grid for Actions and Latest Added Students */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions Panel */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4 lg:col-span-1 h-fit">
          <h3 className="text-lg font-bold text-slate-200">Management Panel</h3>
          <div className="space-y-3">
            <Link
              to="/add-student"
              className="flex items-center space-x-3 p-4 bg-slate-800/40 hover:bg-indigo-600/10 border border-slate-700/50 hover:border-indigo-500/30 rounded-xl group transition-all duration-200"
            >
              <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                <UserPlus className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-300 group-hover:text-slate-100">Enroll Student</p>
                <p className="text-xs text-slate-500">Add a new record to system</p>
              </div>
            </Link>

            <Link
              to="/students"
              className="flex items-center space-x-3 p-4 bg-slate-800/40 hover:bg-cyan-600/10 border border-slate-700/50 hover:border-cyan-500/30 rounded-xl group transition-all duration-200"
            >
              <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-300 group-hover:text-slate-100">View Directory</p>
                <p className="text-xs text-slate-500">Query and edit directories</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Latest Added Students Section */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-200 flex items-center space-x-2">
              <Clock className="h-5 w-5 text-indigo-400 shrink-0" />
              <span>Latest Added Students</span>
            </h3>
            <Link to="/students" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3 py-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-16 bg-slate-800/40 rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : stats.latestStudents.length === 0 ? (
            <div className="text-center py-10 text-slate-500 border border-dashed border-slate-800 rounded-xl">
              <p className="text-sm">No student records registered yet.</p>
              <Link to="/add-student" className="text-xs font-bold text-indigo-400 hover:underline mt-2 inline-block">
                Add a student record
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-800/60">
              {stats.latestStudents.map((student) => (
                <div key={student._id} className="py-4 flex items-center justify-between first:pt-0 last:pb-0 group">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 font-bold group-hover:bg-indigo-600/10 group-hover:text-indigo-400 transition-colors">
                      {student.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
                        {student.name}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {student.department} &bull; <span className="font-mono text-slate-500">{student.rollNumber}</span>
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    Sem {student.semester}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
