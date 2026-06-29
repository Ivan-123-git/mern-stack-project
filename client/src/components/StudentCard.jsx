import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Hash, Award, Trash2, Edit } from 'lucide-react';

const StudentCard = ({ student, onDelete }) => {
  const { _id, name, rollNumber, department, semester, email, phone } = student;

  return (
    <div className="glass-card hover:bg-slate-800/40 p-6 rounded-2xl border border-slate-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 group flex flex-col justify-between h-full">
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg uppercase shadow-lg shadow-indigo-500/20">
              {name.charAt(0)}
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors duration-200">
                {name}
              </h3>
              <p className="text-xs text-slate-400 font-medium">{department}</p>
            </div>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Sem {semester}
          </span>
        </div>

        <div className="space-y-2.5 my-5 text-sm text-slate-400">
          <div className="flex items-center space-x-2.5">
            <Hash className="h-4 w-4 text-indigo-500" />
            <span>Roll No: {rollNumber}</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <Mail className="h-4 w-4 text-indigo-500" />
            <a href={`mailto:${email}`} className="hover:text-indigo-400 hover:underline break-all transition-colors duration-150">
              {email}
            </a>
          </div>
          <div className="flex items-center space-x-2.5">
            <Phone className="h-4 w-4 text-indigo-500" />
            <a href={`tel:${phone}`} className="hover:text-indigo-400 hover:underline transition-colors duration-150">
              {phone}
            </a>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-800/60">
        <Link
          to={`/edit-student/${_id}`}
          className="p-2 bg-slate-800 hover:bg-slate-700/80 rounded-lg text-indigo-400 hover:text-indigo-300 border border-slate-700/50 transition-all duration-200"
          title="Edit Record"
        >
          <Edit className="h-4 w-4" />
        </Link>
        <button
          onClick={() => onDelete(_id)}
          className="p-2 bg-rose-950/20 hover:bg-rose-900/40 rounded-lg text-rose-400 hover:text-rose-300 border border-rose-900/30 transition-all duration-200"
          title="Delete Record"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
