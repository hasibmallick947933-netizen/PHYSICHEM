import React from 'react';
import { Plus, Edit2, BookOpen } from 'lucide-react';

const AdminCourses = () => {
  const courses = [
    { id: 1, name: 'Class 9', description: 'Foundation course for Class 9 students covering basic concepts.', teacher: 'Dr. Ramesh & Ms. Sunita' },
    { id: 2, name: 'Class 10', description: 'Board preparation course focusing on full syllabus and mock exams.', teacher: 'Dr. Ramesh & Ms. Sunita' },
    { id: 3, name: 'Class 11', description: 'Higher secondary foundation course for science stream students.', teacher: 'Dr. Ramesh & Ms. Sunita' },
    { id: 4, name: 'Class 12', description: 'Advanced board and competitive exam preparation for Class 12.', teacher: 'Dr. Ramesh & Ms. Sunita' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading mb-1">Manage Courses</h1>
          <p className="text-[#A8B7C9] text-sm">Update course details, descriptions, and teacher assignments.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#38BDF8] hover:bg-[#38BDF8]/90 text-white px-4 py-2 rounded-xl font-medium transition-colors">
          <Plus size={18} />
          Add Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-[#102438] border border-white/5 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">{course.name}</h3>
              </div>
              <button className="p-2 text-[#A8B7C9] hover:text-[#38BDF8] bg-white/5 hover:bg-[#38BDF8]/10 rounded-lg transition-colors">
                <Edit2 size={18} />
              </button>
            </div>
            
            <p className="text-[#A8B7C9] mb-6 min-h-[48px]">{course.description}</p>
            
            <div className="flex items-center gap-2 text-sm text-[#A8B7C9] pt-4 border-t border-white/5">
              <span className="font-medium text-white">Instructors:</span> {course.teacher}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCourses;
