import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Check, Clock, IndianRupee, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { classes } from '../data/siteData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Courses = () => {
  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#07111F] text-white pt-24 pb-16"
    >
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-20 text-center">
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-6xl font-heading font-bold mb-6"
        >
          Find Your Path to <br/>
          <span className="bg-gradient-to-r from-[#38BDF8] to-[#22D3EE] bg-clip-text text-transparent">
            Better Understanding.
          </span>
        </motion.h1>
        <motion.p 
          variants={itemVariants}
          className="text-xl text-[#A8B7C9] max-w-2xl mx-auto"
        >
          Physics & Chemistry courses designed for Classes 9–12.
        </motion.p>
      </section>

      {/* Courses Grid */}
      <section className="container mx-auto px-6 mb-24">
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {classes.map((cls, index) => (
            <motion.div 
              key={cls.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-[#102438] rounded-2xl p-8 border border-white/5 hover:border-[#38BDF8]/30 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-[#38BDF8]/10 rounded-full blur-3xl group-hover:bg-[#38BDF8]/20 transition-all duration-500"></div>
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <h2 className="text-3xl font-heading font-bold text-white mb-2">{cls.title}</h2>
                  <div className="flex gap-2">
                    {cls.subjects.map(subject => (
                      <span key={subject} className={`text-xs px-3 py-1 rounded-full bg-white/5 border ${subject === 'Physics' ? 'border-[#38BDF8]/30 text-[#38BDF8]' : 'border-[#22D3EE]/30 text-[#22D3EE]'}`}>
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-6xl font-bold bg-gradient-to-br from-white/20 to-white/5 bg-clip-text text-transparent select-none">
                  {cls.number < 10 ? `0${cls.number}` : cls.number}
                </span>
              </div>

              <p className="text-[#A8B7C9] mb-8 relative z-10">{cls.description}</p>

              <div className="space-y-4 mb-8 relative z-10">
                {cls.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-8 pb-8 border-b border-white/10 relative z-10">
                <div className="flex items-center gap-3 text-[#A8B7C9] text-sm">
                  <Clock className="w-4 h-4 text-[#818CF8]" />
                  <span>[Timings to be announced]</span>
                </div>
                <div className="flex items-center gap-3 text-[#A8B7C9] text-sm">
                  <IndianRupee className="w-4 h-4 text-[#818CF8]" />
                  <span>[Contact for fee details]</span>
                </div>
              </div>

              <div className="flex gap-4 relative z-10">
                <Link to="/contact" className="flex-1 text-center py-3 rounded-xl bg-[#38BDF8] hover:bg-[#38BDF8]/90 text-white font-semibold transition-colors duration-300">
                  Enquire Now
                </Link>
                <Link to="/contact" className="flex-1 text-center py-3 rounded-xl border border-[#38BDF8]/50 text-[#38BDF8] hover:bg-[#38BDF8]/10 transition-colors duration-300">
                  Learn More
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Comparison Table Section */}
      <section className="container mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="bg-[#102438] rounded-2xl border border-white/5 p-8 overflow-x-auto"
        >
          <h3 className="text-2xl font-heading font-bold mb-8 text-center">Curriculum Overview</h3>
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 px-6 text-[#A8B7C9] font-medium">Features</th>
                <th className="py-4 px-6 text-center text-white font-semibold">Foundation (9-10)</th>
                <th className="py-4 px-6 text-center text-white font-semibold">Advanced (11-12)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-6 text-gray-300">Core Concepts</td>
                <td className="py-4 px-6 text-center"><Check className="w-5 h-5 text-[#38BDF8] mx-auto" /></td>
                <td className="py-4 px-6 text-center"><Check className="w-5 h-5 text-[#38BDF8] mx-auto" /></td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-6 text-gray-300">Numerical Practice</td>
                <td className="py-4 px-6 text-center"><Check className="w-5 h-5 text-[#38BDF8] mx-auto" /></td>
                <td className="py-4 px-6 text-center"><Check className="w-5 h-5 text-[#38BDF8] mx-auto" /></td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-6 text-gray-300">Board Preparation</td>
                <td className="py-4 px-6 text-center"><Check className="w-5 h-5 text-[#38BDF8] mx-auto" /></td>
                <td className="py-4 px-6 text-center"><Check className="w-5 h-5 text-[#38BDF8] mx-auto" /></td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="py-4 px-6 text-gray-300">Competitive Edge</td>
                <td className="py-4 px-6 text-center text-[#A8B7C9] text-sm">Basics</td>
                <td className="py-4 px-6 text-center"><Check className="w-5 h-5 text-[#38BDF8] mx-auto" /></td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="bg-gradient-to-b from-[#102438] to-[#0D1B2A] rounded-3xl p-12 border border-white/10"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Not sure which class to join?</h2>
          <p className="text-[#A8B7C9] mb-8 max-w-xl mx-auto">
            Get in touch with us to discuss your academic goals and find the right learning path.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#38BDF8] hover:bg-[#38BDF8]/90 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]">
            Contact Us
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Courses;
