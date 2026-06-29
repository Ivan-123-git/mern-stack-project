import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, AlertCircle, Loader2 } from 'lucide-react';
import { createStudent } from '../services/api';
import { useToast } from '../context/ToastContext';

const AddStudent = () => {
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'semester' ? (value ? parseInt(value) : '') : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { name, rollNumber, department, semester, email, phone } = formData;

    // Required fields validation
    if (!name.trim() || !rollNumber.trim() || !department.trim() || !semester || !email.trim() || !phone.trim()) {
      const msg = 'All fields are required. Please fill out the form completely.';
      setError(msg);
      showToast(msg, 'error');
      setLoading(false);
      return;
    }

    // Email regex validation
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      const msg = 'Please enter a valid email address.';
      setError(msg);
      showToast(msg, 'error');
      setLoading(false);
      return;
    }

    if (semester < 1 || semester > 8) {
      const msg = 'Semester must be between 1 and 8.';
      setError(msg);
      showToast(msg, 'error');
      setLoading(false);
      return;
    }

    try {
      await createStudent(formData);
      showToast(`Student record for ${name} created successfully!`, 'success');
      setTimeout(() => {
        navigate('/students');
      }, 1000);
    } catch (err) {
      setError(err);
      showToast(err || 'Failed to create student record.', 'error');
      setLoading(false);
    }
  };

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
          <h1 className="text-xl font-bold text-slate-100 tracking-tight">New Student Enrollment</h1>
          <p className="text-xs text-slate-400">Fill in details to add a new record to the live database</p>
        </div>
      </div>

      {/* Inline Warning (only for persistent layout context, major toast alerts handles floating displays) */}
      {error && (
        <div className="p-4 bg-rose-950/20 border border-rose-900/30 rounded-2xl text-rose-400 text-sm flex items-start space-x-3 animate-slide-in">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. John Doe"
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
              placeholder="e.g. CS2026042"
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
              placeholder="e.g. Computer Science"
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
              placeholder="e.g. johndoe@edu.com"
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
              placeholder="e.g. +1234567890"
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
            disabled={loading}
            className="flex items-center space-x-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Record</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
