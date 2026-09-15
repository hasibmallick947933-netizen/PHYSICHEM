import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Atom, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { contactInfo } from '../data/siteData';

const Contact = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    email: '',
    class: '',
    subject: [],
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      let updatedSubjects = [...formData.subject];
      if (checked) {
        updatedSubjects.push(value);
      } else {
        updatedSubjects = updatedSubjects.filter(sub => sub !== value);
      }
      setFormData({ ...formData, subject: updatedSubjects });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form Submitted:', formData);
    alert('Enquiry sent successfully!');
    setFormData({
      studentName: '', parentName: '', phone: '', email: '', class: '', subject: [], message: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#07111F] text-white pt-24 pb-16 font-body">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
            Let's Start Your <span className="bg-gradient-to-r from-[#38BDF8] to-[#22D3EE] bg-clip-text text-transparent">Learning Journey.</span>
          </h1>
          <p className="text-lg text-[#A8B7C9] max-w-2xl mx-auto">
            Get in touch with us to enroll in our specialized Physics and Chemistry classes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left Column: Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 hover:border-[#38BDF8]/30 transition-all duration-300 h-full flex flex-col"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#38BDF8]/20 p-3 rounded-2xl">
                <Atom className="w-8 h-8 text-[#38BDF8]" />
              </div>
              <h2 className="text-3xl font-bold font-heading">PHYSICHEM</h2>
            </div>

            <div className="space-y-8 flex-grow">
              <div className="flex items-start gap-4">
                <div className="bg-[#102438] p-3 rounded-xl border border-white/5 shrink-0">
                  <Phone className="w-6 h-6 text-[#38BDF8]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Physics Teacher</h3>
                  <p className="text-[#A8B7C9] hover:text-[#38BDF8] transition-colors">
                    <a href={`tel:${contactInfo.physicsTacher?.phone || '[Phone Number]'}`}>
                      {contactInfo.physicsTacher?.phone || '[Phone Number]'}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#102438] p-3 rounded-xl border border-white/5 shrink-0">
                  <Phone className="w-6 h-6 text-[#22D3EE]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Chemistry Teacher</h3>
                  <p className="text-[#A8B7C9] hover:text-[#22D3EE] transition-colors">
                    <a href={`tel:${contactInfo.chemistryTeacher?.phone || '[Phone Number]'}`}>
                      {contactInfo.chemistryTeacher?.phone || '[Phone Number]'}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#102438] p-3 rounded-xl border border-white/5 shrink-0">
                  <Mail className="w-6 h-6 text-[#818CF8]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                  <p className="text-[#A8B7C9] hover:text-[#818CF8] transition-colors">
                    <a href={`mailto:${contactInfo.email}`}>
                      {contactInfo.email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#102438] p-3 rounded-xl border border-white/5 shrink-0">
                  <MapPin className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Address</h3>
                  <p className="text-[#A8B7C9]">
                    {contactInfo.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#102438] p-3 rounded-xl border border-white/5 shrink-0">
                  <MessageCircle className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">WhatsApp</h3>
                  <p className="text-[#A8B7C9] hover:text-green-400 transition-colors">
                    <a href={`https://wa.me/${contactInfo.whatsapp?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                      {contactInfo.whatsapp}
                    </a>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">Operating Hours</h3>
              <p className="text-[#A8B7C9]">Mon - Sat: 3:00 PM - 9:00 PM</p>
              <p className="text-[#A8B7C9]">Sun: 9:00 AM - 1:00 PM</p>
            </div>
          </motion.div>

          {/* Right Column: Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-[#102438] rounded-3xl p-8 md:p-12 border border-white/5"
          >
            <h2 className="text-2xl font-bold font-heading mb-6">Send an Enquiry</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#A8B7C9] mb-2">Student Name</label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter student's name"
                    className="w-full bg-[#0D1B2A] border border-white/10 focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] rounded-xl px-4 py-3 text-white placeholder-[#A8B7C9]/50 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#A8B7C9] mb-2">Parent Name</label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    placeholder="Enter parent's name"
                    className="w-full bg-[#0D1B2A] border border-white/10 focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] rounded-xl px-4 py-3 text-white placeholder-[#A8B7C9]/50 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#A8B7C9] mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. +91 9876543210"
                    className="w-full bg-[#0D1B2A] border border-white/10 focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] rounded-xl px-4 py-3 text-white placeholder-[#A8B7C9]/50 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#A8B7C9] mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    className="w-full bg-[#0D1B2A] border border-white/10 focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] rounded-xl px-4 py-3 text-white placeholder-[#A8B7C9]/50 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#A8B7C9] mb-2">Class</label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#0D1B2A] border border-white/10 focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] rounded-xl px-4 py-3 text-white outline-none transition-all appearance-none"
                >
                  <option value="" disabled>Select a class</option>
                  <option value="Class 9">Class 9</option>
                  <option value="Class 10">Class 10</option>
                  <option value="Class 11">Class 11</option>
                  <option value="Class 12">Class 12</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#A8B7C9] mb-3">Subject(s)</label>
                <div className="flex flex-wrap gap-6">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="subject"
                      value="Physics"
                      checked={formData.subject.includes('Physics')}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-white/10 bg-[#0D1B2A] text-[#38BDF8] focus:ring-[#38BDF8] focus:ring-offset-[#102438]"
                    />
                    <span className="text-white group-hover:text-[#38BDF8] transition-colors">Physics</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="subject"
                      value="Chemistry"
                      checked={formData.subject.includes('Chemistry')}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-white/10 bg-[#0D1B2A] text-[#22D3EE] focus:ring-[#22D3EE] focus:ring-offset-[#102438]"
                    />
                    <span className="text-white group-hover:text-[#22D3EE] transition-colors">Chemistry</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#A8B7C9] mb-2">Message (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="How can we help you?"
                  className="w-full bg-[#0D1B2A] border border-white/10 focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] rounded-xl px-4 py-3 text-white placeholder-[#A8B7C9]/50 outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl px-8 py-4 bg-[#38BDF8] hover:bg-[#38BDF8]/90 text-white font-semibold transition-colors duration-300 mt-4"
              >
                Send Enquiry
              </button>
            </form>
          </motion.div>
        </div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="bg-[#102438] rounded-3xl p-8 border border-white/5 h-96 flex items-center justify-center text-center"
        >
          <div>
            <MapPin className="w-16 h-16 text-[#A8B7C9] mx-auto mb-4 opacity-50" />
            <p className="text-2xl text-[#A8B7C9] font-medium">Google Maps will be embedded here</p>
            <p className="text-[#A8B7C9]/70 mt-2">{contactInfo.address}</p>
          </div>
        </motion.div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${contactInfo.whatsapp?.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 z-50 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </a>
    </div>
  );
};

export default Contact;
