import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Eye, Calculator, FlaskConical, RotateCcw, HelpCircle, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { methodologySteps } from '../data/siteData';

const Methodology = () => {
  const methodCards = [
    {
      title: 'Concept-First Learning',
      description: 'Every topic begins with understanding the core idea.',
      icon: Lightbulb,
      color: 'text-yellow-400',
    },
    {
      title: 'Visual Explanations',
      description: 'Diagrams, illustrations, and real-world examples make complex topics simple.',
      icon: Eye,
      color: 'text-[#38BDF8]',
    },
    {
      title: 'Numerical Problem-Solving',
      description: 'Step-by-step practice with progressively challenging problems.',
      icon: Calculator,
      color: 'text-emerald-400',
    },
    {
      title: 'Chemical Reaction Understanding',
      description: 'Breaking down reactions, mechanisms, and equations clearly.',
      icon: FlaskConical,
      color: 'text-[#22D3EE]',
    },
    {
      title: 'Practice & Revision',
      description: 'Regular practice sessions and structured revision schedules.',
      icon: RotateCcw,
      color: 'text-[#818CF8]',
    },
    {
      title: 'Doubt Support',
      description: 'Open environment for questions and clarification.',
      icon: HelpCircle,
      color: 'text-rose-400',
    },
    {
      title: 'Examination Preparation',
      description: 'Focused preparation for school and board examinations.',
      icon: Award,
      color: 'text-amber-400',
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#07111F] text-white pt-24 pb-16 overflow-hidden"
    >
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-24 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-heading font-bold mb-6 tracking-tight"
        >
          <span className="block text-white mb-2">More Than Memorization.</span>
          <span className="block bg-gradient-to-r from-[#38BDF8] to-[#22D3EE] bg-clip-text text-transparent">
            Real Understanding.
          </span>
        </motion.h1>
      </section>

      {/* Timeline Section */}
      <section className="container mx-auto px-6 mb-32 relative">
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#38BDF8] to-[#22D3EE] transform md:-translate-x-1/2 opacity-30"></div>
        
        <div className="space-y-16">
          {methodologySteps.map((step, index) => (
            <motion.div 
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-5px] md:left-[50%] w-3 h-3 bg-[#38BDF8] rounded-full transform md:-translate-x-[50%] mt-8 md:mt-0 shadow-[0_0_15px_rgba(56,189,248,0.8)] border-2 border-[#07111F] z-10"></div>
              
              <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                <span className="text-6xl font-heading font-bold bg-gradient-to-br from-white/20 to-white/5 bg-clip-text text-transparent select-none block mb-4">
                  {step.number}
                </span>
                <h3 className="text-3xl font-bold mb-4 text-white">{step.title}</h3>
                <p className="text-xl text-[#38BDF8] mb-3">{step.description}</p>
                <p className="text-[#A8B7C9] leading-relaxed">{step.detail}</p>
              </div>
              <div className="hidden md:block w-1/2"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Methodology Cards Grid */}
      <section className="container mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">Our Teaching Pillars</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {methodCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: (index % 3) * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-[#102438]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#38BDF8]/30 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <card.icon className={`w-7 h-7 ${card.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{card.title}</h3>
              <p className="text-[#A8B7C9]">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#102438] rounded-3xl p-12 border border-white/5 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#38BDF8]/5 to-[#22D3EE]/5 pointer-events-none"></div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-8 relative z-10">
            Experience Our Teaching Approach
          </h2>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 px-10 py-5 bg-[#38BDF8] hover:bg-[#38BDF8]/90 text-white text-lg font-bold rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] hover:-translate-y-1 relative z-10"
          >
            Enquire Now
            <ArrowRight className="w-6 h-6" />
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Methodology;
