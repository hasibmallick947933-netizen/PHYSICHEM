import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Target, Compass, BookOpen, Atom, ArrowRight } from 'lucide-react';
import { teachers } from '../data/siteData';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#07111F] min-h-screen text-white font-body"
    >
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Subtle sci-grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 tracking-tight">
              Built on <span className="bg-gradient-to-r from-[#38BDF8] to-[#22D3EE] bg-clip-text text-transparent">Strong Concepts</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#A8B7C9] max-w-2xl mx-auto">
              Physics & Chemistry coaching rooted in understanding, not memorization.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. About Section */}
      <section className="py-24 bg-[#0D1B2A]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-4xl font-bold font-heading mb-6">Who We Are</h2>
              <p className="text-[#A8B7C9] text-lg leading-relaxed mb-6">
                PHYSICHEM is a dedicated coaching centre specializing exclusively in Physics and Chemistry for Classes 9 through 12. We believe that true academic excellence comes from a profound grasp of core principles.
              </p>
              <p className="text-[#A8B7C9] text-lg leading-relaxed">
                Our approach shifts the focus from rote learning to conceptual clarity, enabling students to tackle complex problems with confidence and curiosity.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative h-80 flex justify-center items-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#38BDF8]/10 to-[#818CF8]/10 rounded-3xl backdrop-blur-sm border border-white/5" />
              {/* Decorative scientific visual */}
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 border-2 border-[#38BDF8]/30 rounded-full animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-0 border-2 border-[#22D3EE]/30 rounded-full rotate-45 animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute inset-0 border-2 border-[#818CF8]/30 rounded-full -rotate-45 animate-[spin_20s_linear_infinite]" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#38BDF8] to-[#818CF8] w-8 h-8 rounded-full shadow-[0_0_30px_rgba(56,189,248,0.5)]" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 hover:border-[#38BDF8]/30 hover:-translate-y-1 transition-all duration-300"
            >
              <Target className="w-12 h-12 text-[#38BDF8] mb-6" />
              <h3 className="text-2xl font-bold font-heading mb-4">Our Mission</h3>
              <p className="text-[#A8B7C9] text-lg leading-relaxed">
                To provide clear, concept-focused coaching that helps students truly understand Physics and Chemistry.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 hover:border-[#22D3EE]/30 hover:-translate-y-1 transition-all duration-300"
            >
              <Compass className="w-12 h-12 text-[#22D3EE] mb-6" />
              <h3 className="text-2xl font-bold font-heading mb-4">Our Vision</h3>
              <p className="text-[#A8B7C9] text-lg leading-relaxed">
                To build confident learners who see science as fascinating, not frightening.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Teaching Philosophy */}
      <section className="py-32 bg-[#0D1B2A] relative overflow-hidden">
        <div className="absolute -top-24 -right-24 text-[20rem] text-white/[0.02] font-heading font-bold select-none leading-none">"</div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-medium leading-tight mb-8">
              We believe that when students understand the <span className="text-[#38BDF8]">"why"</span> behind a concept, the <span className="text-[#22D3EE]">"how"</span> becomes natural.
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#38BDF8] to-[#22D3EE] mx-auto rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* 5. Why Conceptual Learning Matters */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">Why Conceptual Learning Matters</h2>
            <p className="text-[#A8B7C9] text-lg">Moving beyond rote memorization to true mastery.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-[#102438] p-8 rounded-2xl border border-white/5 hover:border-[#38BDF8]/30 hover:-translate-y-1 transition-all duration-300"
            >
              <Brain className="w-10 h-10 text-[#38BDF8] mb-6" />
              <h3 className="text-xl font-bold mb-3">Deep Understanding</h3>
              <p className="text-[#A8B7C9]">Grasp the fundamental laws and principles instead of engaging in surface-level memorization.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.1 }}
              className="bg-[#102438] p-8 rounded-2xl border border-white/5 hover:border-[#22D3EE]/30 hover:-translate-y-1 transition-all duration-300"
            >
              <BookOpen className="w-10 h-10 text-[#22D3EE] mb-6" />
              <h3 className="text-xl font-bold mb-3">Problem-Solving Skills</h3>
              <p className="text-[#A8B7C9]">Learn to apply your knowledge to solve any unfamiliar question or numerical challenge.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.2 }}
              className="bg-[#102438] p-8 rounded-2xl border border-white/5 hover:border-[#818CF8]/30 hover:-translate-y-1 transition-all duration-300"
            >
              <Atom className="w-10 h-10 text-[#818CF8] mb-6" />
              <h3 className="text-xl font-bold mb-3">Long-Term Retention</h3>
              <p className="text-[#A8B7C9]">Concepts stick in your memory naturally, whereas mere formulas are easily forgotten.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Subject Experts Preview */}
      <section className="py-24 bg-[#0D1B2A]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">Meet Our Experts</h2>
            <p className="text-[#A8B7C9] text-lg">Guided by dedicated educators.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teachers.map((teacher, index) => (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center hover:border-white/20 transition-all duration-300"
              >
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${teacher.subject === 'Physics' ? 'from-[#38BDF8]/20 to-[#22D3EE]/10 text-[#38BDF8]' : 'from-[#818CF8]/20 to-[#38BDF8]/10 text-[#818CF8]'} flex items-center justify-center text-4xl font-bold mb-6 border border-white/10`}>
                  {teacher.subject.charAt(0)}
                </div>
                <h3 className="text-2xl font-bold font-heading mb-2">{teacher.name}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-sm mb-4 bg-white/5 ${teacher.subject === 'Physics' ? 'text-[#38BDF8]' : 'text-[#818CF8]'}`}>
                  {teacher.subject}
                </span>
                <p className="text-[#A8B7C9] mb-8">{teacher.bio.substring(0, 80)}...</p>
                <Link
                  to="/teachers"
                  className="inline-flex items-center text-sm font-medium hover:text-[#38BDF8] transition-colors mt-auto"
                >
                  View Full Profile <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#38BDF8]/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-8">Ready to Build a Stronger Foundation?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="w-full sm:w-auto rounded-xl px-8 py-4 bg-[#38BDF8] hover:bg-[#38BDF8]/90 text-white font-semibold transition-all duration-300">
                Enquire Now
              </Link>
              <Link to="/courses" className="w-full sm:w-auto rounded-xl px-8 py-4 border border-[#38BDF8]/50 text-[#38BDF8] hover:bg-[#38BDF8]/10 font-semibold transition-all duration-300">
                Explore Courses
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
