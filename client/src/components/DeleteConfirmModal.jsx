import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, studentName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Dialog */}
      <div className="relative glass w-full max-w-md p-6 rounded-3xl border border-slate-800 shadow-2xl animate-slide-in pointer-events-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center text-center space-y-4 pt-2">
          <div className="h-12 w-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <AlertTriangle className="h-6 w-6" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-lg font-bold text-slate-100">Delete Student Record</h3>
            <p className="text-sm text-slate-400">
              Are you sure you want to delete <strong className="text-slate-200 font-semibold">{studentName}</strong>? This action cannot be undone.
            </p>
          </div>

          <div className="flex items-center justify-center space-x-3 w-full pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-slate-800 hover:bg-slate-700/80 rounded-xl text-slate-300 text-sm font-semibold border border-slate-700/50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-rose-600/10"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
