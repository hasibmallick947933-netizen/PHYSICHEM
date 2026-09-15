import React from 'react';
import { MessageSquare, UserPlus, Users, BookOpen, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, colorClass, link }) => (
  <div className="bg-[#102438] border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-full">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-[#A8B7C9] text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-white">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${colorClass}`}>
        <Icon size={24} />
      </div>
    </div>
    {link && (
      <Link to={link} className="text-sm text-[#38BDF8] hover:text-[#22D3EE] flex items-center mt-2 group w-fit transition-colors">
        View Details <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </Link>
    )}
  </div>
);

const AdminDashboard = () => {
  const recentEnquiries = [
    { id: 1, name: 'Rahul Sharma', class: 'Class 10', subject: 'Both', phone: '+91 9876543210', status: 'New', date: 'Oct 24, 2026' },
    { id: 2, name: 'Priya Patel', class: 'Class 12', subject: 'Physics', phone: '+91 8765432109', status: 'Contacted', date: 'Oct 23, 2026' },
    { id: 3, name: 'Amit Singh', class: 'Class 11', subject: 'Chemistry', phone: '+91 7654321098', status: 'Enrolled', date: 'Oct 22, 2026' },
    { id: 4, name: 'Neha Gupta', class: 'Class 9', subject: 'Both', phone: '+91 6543210987', status: 'New', date: 'Oct 21, 2026' },
    { id: 5, name: 'Vikram Reddy', class: 'Class 12', subject: 'Physics', phone: '+91 5432109876', status: 'Closed', date: 'Oct 20, 2026' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New': return <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">New</span>;
      case 'Contacted': return <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">Contacted</span>;
      case 'Enrolled': return <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400 border border-green-500/30">Enrolled</span>;
      case 'Closed': return <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-500/20 text-gray-400 border border-gray-500/30">Closed</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-heading mb-2">Dashboard Overview</h1>
        <p className="text-[#A8B7C9]">Welcome back, here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Enquiries" value="48" icon={MessageSquare} colorClass="bg-blue-500/20 text-blue-400" link="/admin/enquiries" />
        <StatCard title="New Enquiries" value="12" icon={UserPlus} colorClass="bg-emerald-500/20 text-emerald-400" link="/admin/enquiries" />
        <StatCard title="Total Teachers" value="2" icon={Users} colorClass="bg-purple-500/20 text-purple-400" link="/admin/teachers" />
        <StatCard title="Total Courses" value="4" icon={BookOpen} colorClass="bg-orange-500/20 text-orange-400" link="/admin/courses" />
      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-[#102438] rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-xl font-bold font-heading">Recent Enquiries</h2>
          <Link to="/admin/enquiries" className="text-sm text-[#38BDF8] hover:text-[#22D3EE] transition-colors">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0D1B2A] text-[#A8B7C9] text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Student Name</th>
                <th className="px-6 py-4 font-medium">Class</th>
                <th className="px-6 py-4 font-medium">Subject</th>
                <th className="px-6 py-4 font-medium">Phone</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentEnquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-white font-medium">{enq.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#A8B7C9]">{enq.class}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#A8B7C9]">{enq.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#A8B7C9]">{enq.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(enq.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#A8B7C9] text-sm">{enq.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
