import React, { useState } from 'react';
import { Save } from 'lucide-react';

const AdminSettings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    centreName: 'PHYSICHEM',
    phone: '+91 9876543210',
    email: 'info@physichem.com',
    whatsapp: '+91 9876543210',
    address: '123 Education Hub, Sector 4, New Delhi'
  });

  const [timings, setTimings] = useState({
    class9: 'Mon, Wed, Fri: 4:00 PM - 5:30 PM',
    class10: 'Tue, Thu, Sat: 4:00 PM - 5:30 PM',
    class11: 'Mon, Wed, Fri: 6:00 PM - 8:00 PM',
    class12: 'Tue, Thu, Sat: 6:00 PM - 8:00 PM'
  });

  const handleGeneralChange = (e) => {
    setGeneralSettings({ ...generalSettings, [e.target.name]: e.target.value });
  };

  const handleTimingChange = (e) => {
    setTimings({ ...timings, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold font-heading mb-1">Site Settings</h1>
        <p className="text-[#A8B7C9] text-sm">Update website content, contact information, and class schedules.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact Information */}
        <div className="bg-[#102438] border border-white/5 rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#A8B7C9] mb-2">Centre Name</label>
              <input
                type="text"
                name="centreName"
                value={generalSettings.centreName}
                onChange={handleGeneralChange}
                className="w-full bg-[#0D1B2A] border border-white/10 focus:border-[#38BDF8] rounded-xl px-4 py-2.5 text-white outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#A8B7C9] mb-2">Primary Phone</label>
              <input
                type="text"
                name="phone"
                value={generalSettings.phone}
                onChange={handleGeneralChange}
                className="w-full bg-[#0D1B2A] border border-white/10 focus:border-[#38BDF8] rounded-xl px-4 py-2.5 text-white outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#A8B7C9] mb-2">WhatsApp Number</label>
              <input
                type="text"
                name="whatsapp"
                value={generalSettings.whatsapp}
                onChange={handleGeneralChange}
                className="w-full bg-[#0D1B2A] border border-white/10 focus:border-[#38BDF8] rounded-xl px-4 py-2.5 text-white outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#A8B7C9] mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={generalSettings.email}
                onChange={handleGeneralChange}
                className="w-full bg-[#0D1B2A] border border-white/10 focus:border-[#38BDF8] rounded-xl px-4 py-2.5 text-white outline-none transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#A8B7C9] mb-2">Full Address</label>
              <textarea
                name="address"
                value={generalSettings.address}
                onChange={handleGeneralChange}
                rows="2"
                className="w-full bg-[#0D1B2A] border border-white/10 focus:border-[#38BDF8] rounded-xl px-4 py-2.5 text-white outline-none transition-colors resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Class Timings */}
        <div className="bg-[#102438] border border-white/5 rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">Class Timings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#A8B7C9] mb-2">Class 9 Timings</label>
              <input
                type="text"
                name="class9"
                value={timings.class9}
                onChange={handleTimingChange}
                className="w-full bg-[#0D1B2A] border border-white/10 focus:border-[#38BDF8] rounded-xl px-4 py-2.5 text-white outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#A8B7C9] mb-2">Class 10 Timings</label>
              <input
                type="text"
                name="class10"
                value={timings.class10}
                onChange={handleTimingChange}
                className="w-full bg-[#0D1B2A] border border-white/10 focus:border-[#38BDF8] rounded-xl px-4 py-2.5 text-white outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#A8B7C9] mb-2">Class 11 Timings</label>
              <input
                type="text"
                name="class11"
                value={timings.class11}
                onChange={handleTimingChange}
                className="w-full bg-[#0D1B2A] border border-white/10 focus:border-[#38BDF8] rounded-xl px-4 py-2.5 text-white outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#A8B7C9] mb-2">Class 12 Timings</label>
              <input
                type="text"
                name="class12"
                value={timings.class12}
                onChange={handleTimingChange}
                className="w-full bg-[#0D1B2A] border border-white/10 focus:border-[#38BDF8] rounded-xl px-4 py-2.5 text-white outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#38BDF8] hover:bg-[#38BDF8]/90 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <Save size={20} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
