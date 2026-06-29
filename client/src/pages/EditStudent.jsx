import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, AlertCircle, Loader2 } from 'lucide-react';
import { getStudentById, updateStudent } from '../services/api';
import { useToast } from '../context/ToastContext';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    department: '',
    semester: '',
    email: '',
    phone: '',
  });

  const [fetchLoading, setFetchLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudentDetails = async () => {
      setFetchLoading(true);
      setError('');
      try {
        const res = await getStudentById(id);
        if (res.data) {
          const { name, rollNumber, department, semester, email, phone } = res.data;
          setFormData({ name, rollNumber, department, semester, email, phone });
        }
      } catch (err) {
        console.error(`Error loading student ${id}:`, err);
        const errMsg = typeof err === 'string' ? err : 'Failed to fetch student details.';
        setError(errMsg);
        showToast(errMsg, 'error');
      } finally {
        setFetchLoading(false);
      }
    };

    fetchStudentDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'semester' ? (value ? parseInt(value) : '') : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    setError('');

    const { name, rollNumber, department, semester, email, phone } = formData;

    // Required fields validation
    if (!name.trim() || !rollNumber.trim() || !department.trim() || !semester || !email.trim() || !phone.trim()) {
      const msg = 'All fields are required.';
      setError(msg);
      showToast(msg, 'error');
      setSaveLoading(false);
      return;
    }

    if (semester < 1 || semester > 8) {
      const msg = 'Semester must be between 1 and 8.';
      setError(msg);
      showToast(msg, 'error');
      setSaveLoading(false);
      return;
    }

    try {
      await updateStudent(id, formData);
      showToast(`Student record for ${name} updated successfully!`, 'success');
      setTimeout(() => {
        navigate('/students');
      }, 1000);
    } catch (err) {
      setError(err);
      showToast(err || 'Failed to update student record.', 'error');
      setSaveLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 text-indigo-500 animate-spin" />
        <p className="text-sm text-slate-400">Loading student record details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back Header */}
      <div className="flex items-center space-x-3">
        <Link
          to="/students"
          className="p-2 bg-slate-800 hover:bg-slate-700/80 rounded-xl text-slate-400 hover:text-slate-200 transition-colors border border-slate-700/40"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-100 tracking-tight">Edit Student Record</h1>
          <p className="text-xs text-slate-400">Modify student record in live database</p>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 bg-rose-950/20 border border-rose-900/30 rounded-2xl text-rose-400 text-sm flex items-start space-x-3 animate-slide-in">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Form Card */}
      {!error && (
        <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900/50 focus:bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-slate-200 text-sm outline-none transition-all"
                required
              />
            </div>

            {/* Roll Number */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Roll Number</label>
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900/50 focus:bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-slate-200 text-sm outline-none transition-all"
                required
              />
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900/50 focus:bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-slate-200 text-sm outline-none transition-all"
                required
              />
            </div>

            {/* Semester */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Semester</label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900/50 focus:bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl text-slate-300 text-sm outline-none cursor-pointer transition-all"
                required
              >
                <option value="">Select Semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem}
                  </option>
                ))}
              </select>
            </div>

            {/* Email */}
            <div className="space-y-2 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900/50 focus:bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-slate-200 text-sm outline-none transition-all"
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-2 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900/50 focus:bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-slate-200 text-sm outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-slate-800/60">
            <Link
              to="/students"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700/80 rounded-xl text-slate-300 text-sm font-semibold border border-slate-700/40 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saveLoading}
              className="flex items-center space-x-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20"
            >
              {saveLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Update Record</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditStudent;
