import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, User, GraduationCap, Briefcase, ArrowRight } from 'lucide-react';
import { teachers } from '../data/siteData';

const Teachers = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#07111F] min-h-screen text-white font-body"
    >
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute right-0 top-20 w-96 h-96 bg-[#38BDF8]/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-[#818CF8]/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 border border-[#38BDF8]/20 rounded-full animate-[spin_6s_linear_infinite]" />
                <div className="absolute inset-2 border border-[#818CF8]/20 rounded-full animate-[spin_8s_linear_infinite_reverse]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <User className="w-8 h-8 text-[#A8B7C9]" />
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 tracking-tight">
              Meet the Minds Behind <span className="bg-gradient-to-r from-[#38BDF8] to-[#22D3EE] bg-clip-text text-transparent">PHYSICHEM.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#A8B7C9] max-w-2xl mx-auto">
              Two teachers. Two subjects. One commitment to better learning.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Profiles */}
      <div className="py-12">
        {teachers.map((teacher, index) => {
          const isPhysics = teacher.subject === 'Physics';
          const isEven = index % 2 === 0;
          
          return (
            <section key={teacher.id} className={`py-24 ${!isEven ? 'bg-[#0D1B2A]' : ''}`}>
              <div className="container mx-auto px-6">
                <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}>
                  
                  {/* Image/Placeholder Column */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="w-full lg:w-1/2 flex justify-center"
                  >
                    <div className={`w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden relative border ${isPhysics ? 'border-[#38BDF8]/20' : 'border-[#818CF8]/20'}`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${isPhysics ? 'from-[#38BDF8]/20 to-[#22D3EE]/5' : 'from-[#818CF8]/20 to-[#38BDF8]/5'}`} />
                      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-9xl font-bold font-heading opacity-50 ${isPhysics ? 'text-[#38BDF8]' : 'text-[#818CF8]'}`}>
                          {teacher.subject.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Content Column */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="w-full lg:w-1/2"
                  >
                    <div className="mb-8">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <span className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${isPhysics ? 'bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/30' : 'bg-[#818CF8]/10 text-[#818CF8] border-[#818CF8]/30'}`}>
                          {teacher.subject}
                        </span>
                        <span className="text-[#A8B7C9] text-sm flex items-center gap-2">
                          <BookOpen className="w-4 h-4" /> Classes {teacher.classes}
                        </span>
                      </div>
                      <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">{teacher.name}</h2>
                      
                      <div className="flex flex-col gap-3 text-[#A8B7C9] mb-8 bg-white/5 p-6 rounded-2xl border border-white/5">
                        <div className="flex items-start gap-3">
                          <GraduationCap className={`w-5 h-5 mt-0.5 ${isPhysics ? 'text-[#38BDF8]' : 'text-[#818CF8]'}`} />
                          <div>
                            <span className="block text-white font-medium">Qualification</span>
                            <span>{teacher.qualification}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Briefcase className={`w-5 h-5 mt-0.5 ${isPhysics ? 'text-[#38BDF8]' : 'text-[#818CF8]'}`} />
                          <div>
                            <span className="block text-white font-medium">Experience</span>
                            <span>{teacher.experience}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-lg text-[#A8B7C9] leading-relaxed mb-8">
                        {teacher.bio}
                      </p>
                    </div>

                    <div className="space-y-8">
                      <div className="relative">
                        <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-full ${isPhysics ? 'bg-gradient-to-b from-[#38BDF8] to-[#22D3EE]' : 'bg-gradient-to-b from-[#818CF8] to-[#38BDF8]'}`} />
                        <div className="pl-6">
                          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                            <Lightbulb className={`w-5 h-5 ${isPhysics ? 'text-[#38BDF8]' : 'text-[#818CF8]'}`} />
                            Teaching Philosophy
                          </h3>
                          <p className="text-[#A8B7C9] italic">"{teacher.philosophy}"</p>
                        </div>
                      </div>

                      <div className="relative">
                        <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-full ${isPhysics ? 'bg-gradient-to-b from-[#38BDF8] to-[#22D3EE]' : 'bg-gradient-to-b from-[#818CF8] to-[#38BDF8]'}`} />
                        <div className="pl-6">
                          <h3 className="text-xl font-bold mb-2">Teaching Approach</h3>
                          <div className="flex flex-wrap gap-2 text-sm text-[#A8B7C9]">
                            {teacher.approach.split('→').map((step, i, arr) => (
                              <React.Fragment key={i}>
                                <span className={`px-3 py-1 rounded-lg bg-white/5 border border-white/10 ${isPhysics ? 'hover:border-[#38BDF8]/50' : 'hover:border-[#818CF8]/50'} transition-colors`}>
                                  {step.trim()}
                                </span>
                                {i < arr.length - 1 && <ArrowRight className="w-4 h-4 self-center text-white/30" />}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-10">
                      <Link to="/contact" className={`inline-flex items-center justify-center rounded-xl px-8 py-4 font-semibold text-white transition-all duration-300 ${isPhysics ? 'bg-[#38BDF8] hover:bg-[#38BDF8]/90' : 'bg-[#818CF8] hover:bg-[#818CF8]/90'}`}>
                        Contact for Enquiry
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* 3. CTA Section */}
      <section className="py-24 bg-[#0D1B2A] relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-8">Begin Your Learning Journey</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="w-full sm:w-auto rounded-xl px-8 py-4 bg-[#38BDF8] hover:bg-[#38BDF8]/90 text-white font-semibold transition-all duration-300">
                Enquire Now
              </Link>
              <Link to="/courses" className="w-full sm:w-auto rounded-xl px-8 py-4 border border-[#38BDF8]/50 text-[#38BDF8] hover:bg-[#38BDF8]/10 font-semibold transition-all duration-300">
                View Classes
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Teachers;
