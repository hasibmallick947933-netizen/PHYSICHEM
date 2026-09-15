import React from 'react';
import { Plus, Edit2, Trash2, User } from 'lucide-react';

const AdminTeachers = () => {
  const teachers = [
    {
      id: 1,
      name: 'Dr. Ramesh Sharma',
      subject: 'Physics',
      qualification: 'Ph.D. in Physics, M.Sc.',
      classes: 'Classes 9-12'
    },
    {
      id: 2,
      name: 'Ms. Sunita Verma',
      subject: 'Chemistry',
      qualification: 'M.Sc. Chemistry, B.Ed.',
      classes: 'Classes 9-12'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading mb-1">Manage Teachers</h1>
          <p className="text-[#A8B7C9] text-sm">View and edit teacher profiles and information.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#38BDF8] hover:bg-[#38BDF8]/90 text-white px-4 py-2 rounded-xl font-medium transition-colors">
          <Plus size={18} />
          Add Teacher
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-[#102438] border border-white/5 rounded-2xl p-6 flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-[#0D1B2A] border border-white/10 flex items-center justify-center shrink-0">
                <User size={32} className="text-[#A8B7C9]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{teacher.name}</h3>
                <span className={`inline-block mt-1 px-2.5 py-1 text-xs font-medium rounded-lg ${
                  teacher.subject === 'Physics' ? 'bg-blue-500/20 text-blue-400' : 'bg-cyan-500/20 text-cyan-400'
                }`}>
                  {teacher.subject}
                </span>
              </div>
            </div>
            
            <div className="space-y-3 mb-6 flex-grow text-sm">
              <div className="flex">
                <span className="text-[#A8B7C9] w-24 shrink-0">Qualification:</span>
                <span className="text-white">{teacher.qualification}</span>
              </div>
              <div className="flex">
                <span className="text-[#A8B7C9] w-24 shrink-0">Classes:</span>
                <span className="text-white">{teacher.classes}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-white/5">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-[#38BDF8]/50 text-[#38BDF8] hover:bg-[#38BDF8]/10 rounded-xl transition-colors text-sm font-medium">
                <Edit2 size={16} /> Edit
              </button>
              <button className="flex items-center justify-center py-2 px-4 border border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors text-sm font-medium">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTeachers;
