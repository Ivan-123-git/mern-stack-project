import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, UserPlus, Trash2, Edit, AlertCircle, RefreshCw } from 'lucide-react';
import { getStudents, deleteStudent } from '../services/api';
import { useToast } from '../context/ToastContext';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

const StudentList = () => {
  const { showToast } = useToast();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Delete modal state variables
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [activeStudent, setActiveStudent] = useState(null);

  const fetchStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getStudents();
      setStudents(res.data || []);
    } catch (err) {
      console.error('Error fetching students:', err);
      setError(typeof err === 'string' ? err : 'Unable to connect to the backend server. Please verify the API is running and connected.');
      showToast('Database connection failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const openDeleteModal = (student) => {
    setActiveStudent(student);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!activeStudent) return;
    
    try {
      await deleteStudent(activeStudent._id);
      setStudents(students.filter((s) => s._id !== activeStudent._id));
      showToast(`Successfully deleted ${activeStudent.name}'s record.`, 'success');
    } catch (err) {
      showToast(err || 'Failed to delete student record.', 'error');
    } finally {
      setDeleteModalOpen(false);
      setActiveStudent(null);
    }
  };

  // Filter students based on search query
  const filteredStudents = students.filter((student) => {
    const query = searchQuery.toLowerCase();
    return (
      student.name.toLowerCase().includes(query) ||
      student.rollNumber.toLowerCase().includes(query) ||
      student.department.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Students Directory</h1>
          <p className="text-sm text-slate-400">View, search, and manage student details in real time</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={fetchStudents}
            className="p-2.5 bg-slate-800 hover:bg-slate-700/80 rounded-xl text-slate-300 border border-slate-700/40 transition-colors"
            title="Refresh database"
          >
            <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <Link
            to="/add-student"
            className="flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add Student</span>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
        <input
          type="text"
          placeholder="Search by student name, roll number, department, email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-slate-900/50 focus:bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-slate-200 text-sm outline-none transition-all"
        />
      </div>

      {/* Table Container */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-4">
          <div className="h-10 w-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
          <p className="text-sm text-slate-400">Loading student table data from backend...</p>
        </div>
      ) : error ? (
        <div className="glass p-8 rounded-2xl border border-rose-900/20 text-center space-y-4 py-16 animate-fade-in">
          <AlertCircle className="h-12 w-12 text-rose-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-200">Unable to Fetch Directory</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">{error}</p>
          <button
            onClick={fetchStudents}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-xl border border-slate-700/60 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="glass p-12 rounded-2xl border border-slate-800 text-center space-y-4 py-20">
          <div className="h-14 w-14 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <Search className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-slate-300">No student records found</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            {students.length === 0
              ? 'Get started by creating the first student record in your database.'
              : 'Try adjusting your search query to find what you are looking for.'}
          </p>
          {students.length === 0 && (
            <Link
              to="/add-student"
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-indigo-600/10"
            >
              <UserPlus className="h-4 w-4" />
              <span>Add Your First Student</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="glass rounded-2xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/40 border-b border-slate-800 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Roll Number</th>
                  <th className="py-4 px-6">Department</th>
                  <th className="py-4 px-6">Semester</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6">Phone</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-sm text-slate-300">
                {filteredStudents.map((student) => (
                  <tr 
                    key={student._id} 
                    className="hover:bg-slate-800/20 transition-colors duration-150 group"
                  >
                    <td className="py-4 px-6 font-medium text-slate-200 group-hover:text-indigo-400 transition-colors">
                      {student.name}
                    </td>
                    <td className="py-4 px-6 font-mono text-slate-400">
                      {student.rollNumber}
                    </td>
                    <td className="py-4 px-6 text-slate-400">
                      {student.department}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        Sem {student.semester}
                      </span>
                    </td>
                    <td className="py-4 px-6 break-all font-mono text-xs text-slate-400">
                      <a href={`mailto:${student.email}`} className="hover:text-indigo-400 hover:underline">
                        {student.email}
                      </a>
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-slate-400">
                      <a href={`tel:${student.phone}`} className="hover:text-indigo-400 hover:underline">
                        {student.phone}
                      </a>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/edit-student/${student._id}`}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700/80 rounded-lg text-indigo-400 hover:text-indigo-300 border border-slate-700/50 transition-all"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => openDeleteModal(student)}
                          className="p-1.5 bg-rose-950/20 hover:bg-rose-900/40 rounded-lg text-rose-400 hover:text-rose-300 border border-rose-900/30 transition-all"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Overlay Dialog */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        studentName={activeStudent ? activeStudent.name : ''}
      />
    </div>
  );
};

export default StudentList;
