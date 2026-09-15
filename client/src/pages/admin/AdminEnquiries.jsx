import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const AdminEnquiries = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const enquiries = [
    { id: 1, studentName: 'Rahul Sharma', parentName: 'Rakesh Sharma', class: 'Class 10', subject: 'Both', phone: '+91 9876543210', status: 'New', date: 'Oct 24, 2026' },
    { id: 2, studentName: 'Priya Patel', parentName: 'Sanjay Patel', class: 'Class 12', subject: 'Physics', phone: '+91 8765432109', status: 'Contacted', date: 'Oct 23, 2026' },
    { id: 3, studentName: 'Amit Singh', parentName: 'Vikram Singh', class: 'Class 11', subject: 'Chemistry', phone: '+91 7654321098', status: 'Enrolled', date: 'Oct 22, 2026' },
    { id: 4, studentName: 'Neha Gupta', parentName: 'Anil Gupta', class: 'Class 9', subject: 'Both', phone: '+91 6543210987', status: 'New', date: 'Oct 21, 2026' },
    { id: 5, studentName: 'Vikram Reddy', parentName: 'Mohan Reddy', class: 'Class 12', subject: 'Physics', phone: '+91 5432109876', status: 'Closed', date: 'Oct 20, 2026' },
    { id: 6, studentName: 'Sneha Iyer', parentName: 'Ramesh Iyer', class: 'Class 10', subject: 'Chemistry', phone: '+91 4321098765', status: 'Contacted', date: 'Oct 19, 2026' },
    { id: 7, studentName: 'Arjun Das', parentName: 'Sunil Das', class: 'Class 11', subject: 'Both', phone: '+91 3210987654', status: 'Enrolled', date: 'Oct 18, 2026' },
    { id: 8, studentName: 'Kavya Jain', parentName: 'Deepak Jain', class: 'Class 9', subject: 'Physics', phone: '+91 2109876543', status: 'Closed', date: 'Oct 17, 2026' },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Contacted': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Enrolled': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Closed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-white/10 text-white border-white/20';
    }
  };

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading mb-1">Student Enquiries</h1>
          <p className="text-[#A8B7C9] text-sm">Manage and track all admission queries.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8B7C9] w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by name or phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#102438] border border-white/10 rounded-xl text-white placeholder-[#A8B7C9]/50 focus:outline-none focus:border-[#38BDF8] transition-colors"
            />
          </div>
          <button className="p-2.5 bg-[#102438] border border-white/10 rounded-xl text-[#A8B7C9] hover:text-white hover:border-white/20 transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="bg-[#102438] rounded-2xl border border-white/5 overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0D1B2A] text-[#A8B7C9] text-sm uppercase tracking-wider border-b border-white/5">
                <th className="px-6 py-4 font-medium">Student Info</th>
                <th className="px-6 py-4 font-medium">Class / Subject</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {enquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-white">{enq.studentName}</div>
                    <div className="text-sm text-[#A8B7C9] mt-1">Parent: {enq.parentName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-white">{enq.class}</div>
                    <div className="text-sm text-[#A8B7C9] mt-1">{enq.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#A8B7C9]">{enq.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#A8B7C9]">{enq.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select 
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border outline-none appearance-none cursor-pointer ${getStatusStyle(enq.status)}`}
                      defaultValue={enq.status}
                    >
                      <option value="New" className="bg-[#0D1B2A] text-white">New</option>
                      <option value="Contacted" className="bg-[#0D1B2A] text-white">Contacted</option>
                      <option value="Enrolled" className="bg-[#0D1B2A] text-white">Enrolled</option>
                      <option value="Closed" className="bg-[#0D1B2A] text-white">Closed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-white/5 flex items-center justify-between text-sm text-[#A8B7C9]">
          <span>Showing 1 to 8 of 48 entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-white/10 rounded hover:bg-white/5 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border border-white/10 rounded bg-white/10 text-white">1</button>
            <button className="px-3 py-1 border border-white/10 rounded hover:bg-white/5">2</button>
            <button className="px-3 py-1 border border-white/10 rounded hover:bg-white/5">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEnquiries;
