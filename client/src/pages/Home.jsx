import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Atom, Users, Target, ArrowRight, ChevronRight, Zap,
  BookOpen, GraduationCap, Check, Sparkles, Beaker
} from 'lucide-react';
import FrameSequenceLanding from '../components/FrameSequenceLanding';
import XwInteractiveShowcase from '../components/XwInteractiveShowcase';
import { subjects, classes, teachers, methodologySteps, benefits, trustPoints } from '../data/siteData';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: 'easeOut' },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } },
  viewport: { once: true, amount: 0.2 },
};

const staggerItem = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function HeroVisual() {
  return (
    <div className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center">
      {/* Outer glow */}
      <div className="absolute inset-0 bg-[#38BDF8]/5 blur-3xl rounded-full" />

      {/* Central atom */}
      <div className="relative w-64 h-64 lg:w-80 lg:h-80">
        {/* Nucleus */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-[#38BDF8] to-[#22D3EE] rounded-full shadow-lg shadow-[#38BDF8]/50 animate-pulse-glow" />

        {/* Orbit 1 */}
        <div className="absolute inset-4 border border-[#38BDF8]/20 rounded-full animate-spin" style={{ animationDuration: '12s' }}>
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#38BDF8] rounded-full shadow-md shadow-[#38BDF8]/50" />
        </div>

        {/* Orbit 2 */}
        <div className="absolute inset-0 border border-[#22D3EE]/15 rounded-full animate-spin" style={{ animationDuration: '18s', animationDirection: 'reverse' }}>
          <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#22D3EE] rounded-full shadow-md shadow-[#22D3EE]/50" />
        </div>

        {/* Orbit 3 */}
        <div className="absolute -inset-6 border border-[#818CF8]/10 rounded-full animate-spin" style={{ animationDuration: '24s' }}>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#818CF8] rounded-full shadow-md shadow-[#818CF8]/50" />
        </div>

        {/* Elliptical orbit */}
        <div className="absolute inset-2 border border-[#38BDF8]/10 rounded-full animate-spin" style={{ animationDuration: '15s', transform: 'rotateX(60deg)' }}>
          <div className="absolute -top-1 left-1/4 w-2 h-2 bg-[#38BDF8]/70 rounded-full" />
        </div>
      </div>

      {/* Floating equations */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-8 right-8 text-[#38BDF8]/30 font-mono text-sm"
      >
        E = mc²
      </motion.div>
      <motion.div
        animate={{ y: [5, -5, 5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-12 left-8 text-[#22D3EE]/25 font-mono text-xs"
      >
        F = ma
      </motion.div>
      <motion.div
        animate={{ y: [-3, 7, -3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 right-4 text-[#818CF8]/20 font-mono text-xs"
      >
        ΔG = ΔH − TΔS
      </motion.div>
      <motion.div
        animate={{ y: [3, -7, 3] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/3 left-4 text-[#38BDF8]/15 font-mono text-xs"
      >
        PV = nRT
      </motion.div>

      {/* Floating glass panels */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-16 -right-4 w-32 h-20 bg-white/3 backdrop-blur-sm border border-white/5 rounded-xl"
      />
      <motion.div
        animate={{ y: [8, -8, 8], rotate: [1, -1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 -left-4 w-24 h-16 bg-white/3 backdrop-blur-sm border border-white/5 rounded-xl"
      />

      {/* Grid background */}
      <div className="absolute inset-0 sci-grid opacity-30 rounded-3xl" />
    </div>
  );
}

function TrustIcon({ type }) {
  const icons = {
    Atom: <Atom className="w-6 h-6" />,
    Users: <Users className="w-6 h-6" />,
    Target: <Target className="w-6 h-6" />,
  };
  return icons[type] || <Sparkles className="w-6 h-6" />;
}

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Frame Sequence Landing */}
      <FrameSequenceLanding />

      {/* ======== XW VIDEO SHOWCASE (Main Website Experience) ======== */}
      <XwInteractiveShowcase />

      {/* ======== TRUST / INTRODUCTION SECTION ======== */}
      <section className="relative py-24 lg:py-32 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Where Concepts Become{' '}
              <span className="text-gradient-blue">Confidence.</span>
            </h2>
            <p className="text-[#A8B7C9] text-lg max-w-2xl mx-auto leading-relaxed">
              At PHYSICHEM, we believe that strong fundamentals create confident learners. Our teaching approach focuses on understanding concepts, solving problems, and building a lasting foundation in science.
            </p>
          </motion.div>

          <motion.div {...staggerContainer} className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {trustPoints.map((point, i) => (
              <motion.div
                key={point.title}
                {...staggerItem}
                className="group relative bg-[#102438] border border-white/5 hover:border-[#38BDF8]/20 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#38BDF8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="relative">
                  <div className="w-14 h-14 bg-[#38BDF8]/10 border border-[#38BDF8]/20 rounded-2xl flex items-center justify-center text-[#38BDF8] mb-6 group-hover:bg-[#38BDF8]/20 transition-colors duration-300">
                    <TrustIcon type={point.icon} />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-white mb-3">
                    {point.title}
                  </h3>
                  <p className="text-[#A8B7C9] text-sm leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ======== SUBJECTS SECTION ======== */}
      <section className="relative py-24 lg:py-32 bg-[#07111F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Two Subjects. One Strong{' '}
              <span className="text-gradient-blue">Foundation.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {subjects.map((subject, i) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.2 }}
                className="group relative bg-[#102438] border border-white/5 hover:border-[#38BDF8]/20 rounded-3xl p-8 lg:p-10 transition-all duration-500 overflow-hidden"
              >
                {/* Background glow */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] transition-opacity duration-500 opacity-20 group-hover:opacity-40 ${
                  subject.color === 'blue' ? 'bg-[#38BDF8]' : 'bg-[#22D3EE]'
                }`} />

                <div className="relative">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                    subject.color === 'blue'
                      ? 'bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[#38BDF8]'
                      : 'bg-[#22D3EE]/10 border border-[#22D3EE]/20 text-[#22D3EE]'
                  }`}>
                    {subject.color === 'blue' ? <Atom className="w-8 h-8" /> : <Beaker className="w-8 h-8" />}
                  </div>

                  <h3 className="font-heading text-3xl font-bold text-white mb-2">{subject.name}</h3>
                  <p className={`text-sm font-medium mb-4 ${
                    subject.color === 'blue' ? 'text-[#38BDF8]' : 'text-[#22D3EE]'
                  }`}>
                    {subject.subtitle}
                  </p>
                  <p className="text-[#A8B7C9] text-sm leading-relaxed mb-6">
                    {subject.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[#A8B7C9]">
                      {subject.tag}
                    </span>
                    <Link
                      to="/courses"
                      className={`inline-flex items-center gap-1 text-sm font-semibold transition-colors duration-300 ${
                        subject.color === 'blue'
                          ? 'text-[#38BDF8] hover:text-[#38BDF8]/80'
                          : 'text-[#22D3EE] hover:text-[#22D3EE]/80'
                      }`}
                    >
                      Explore {subject.name}
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== TEACHERS SECTION ======== */}
      <section className="relative py-24 lg:py-32 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Learn From Dedicated{' '}
              <span className="text-gradient-blue">Subject Experts.</span>
            </h2>
            <p className="text-[#A8B7C9] text-lg max-w-xl mx-auto">
              Two teachers. Two subjects. One commitment to better learning.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {teachers.map((teacher, i) => (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.2 }}
                className="group bg-[#102438] border border-white/5 hover:border-[#38BDF8]/20 rounded-3xl overflow-hidden transition-all duration-500"
              >
                {/* Portrait placeholder */}
                <div className={`h-56 flex items-center justify-center ${
                  teacher.color === 'blue'
                    ? 'bg-gradient-to-br from-[#38BDF8]/10 to-[#0D1B2A]'
                    : 'bg-gradient-to-br from-[#818CF8]/10 to-[#0D1B2A]'
                }`}>
                  <div className={`w-24 h-24 rounded-full border-2 flex items-center justify-center ${
                    teacher.color === 'blue'
                      ? 'border-[#38BDF8]/30 text-[#38BDF8]'
                      : 'border-[#818CF8]/30 text-[#818CF8]'
                  }`}>
                    <span className="font-heading text-3xl font-bold">{teacher.subject[0]}</span>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-heading text-xl font-bold text-white">{teacher.name}</h3>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      teacher.color === 'blue'
                        ? 'bg-[#38BDF8]/10 text-[#38BDF8]'
                        : 'bg-[#818CF8]/10 text-[#818CF8]'
                    }`}>
                      {teacher.subject}
                    </span>
                    <span className="text-xs px-3 py-1 bg-white/5 text-[#A8B7C9] rounded-full">
                      Classes {teacher.classes}
                    </span>
                  </div>
                  <p className="text-[#A8B7C9] text-sm leading-relaxed mb-6">{teacher.bio}</p>
                  <Link
                    to="/teachers"
                    className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${
                      teacher.color === 'blue'
                        ? 'text-[#38BDF8] hover:text-[#38BDF8]/80'
                        : 'text-[#818CF8] hover:text-[#818CF8]/80'
                    }`}
                  >
                    View Profile
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== HOW WE TEACH SECTION ======== */}
      <section className="relative py-24 lg:py-32 bg-[#07111F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Learning That Builds{' '}
              <span className="text-gradient-blue">Understanding.</span>
            </h2>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            {/* Connecting line */}
            <div className="absolute left-8 lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#38BDF8]/30 via-[#22D3EE]/20 to-[#818CF8]/30" />

            {methodologySteps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className={`relative flex items-start gap-6 mb-16 last:mb-0 ${
                  i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Step number */}
                <div className="relative z-10 shrink-0">
                  <div className="w-16 h-16 bg-[#102438] border border-[#38BDF8]/20 rounded-2xl flex items-center justify-center">
                    <span className="font-heading text-2xl font-bold text-gradient-blue">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 bg-[#102438] border border-white/5 rounded-2xl p-6 lg:p-8 ${
                  i % 2 === 0 ? '' : 'lg:text-right'
                }`}>
                  <h3 className="font-heading text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-[#A8B7C9] text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== CLASSES SECTION ======== */}
      <section className="relative py-24 lg:py-32 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Built for Every Stage of{' '}
              <span className="text-gradient-blue">Learning.</span>
            </h2>
          </motion.div>

          <motion.div {...staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {classes.map((cls) => (
              <motion.div
                key={cls.id}
                {...staggerItem}
                className="group bg-[#102438] border border-white/5 hover:border-[#38BDF8]/20 rounded-2xl p-6 lg:p-8 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="text-5xl font-heading font-bold text-gradient-blue mb-4">
                  {String(cls.number).padStart(2, '0')}
                </div>
                <h3 className="font-heading text-lg font-semibold text-white mb-2">{cls.title}</h3>
                <div className="flex gap-2 mb-4">
                  {cls.subjects.map((s) => (
                    <span key={s} className="text-[10px] px-2 py-0.5 bg-[#38BDF8]/10 text-[#38BDF8] rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
                <p className="text-[#A8B7C9] text-sm leading-relaxed mb-6">{cls.description}</p>
                <div className="flex flex-col gap-2">
                  <Link
                    to="/courses"
                    className="w-full text-center text-sm px-4 py-2.5 bg-[#38BDF8] hover:bg-[#38BDF8]/90 text-[#07111F] font-semibold rounded-xl transition-all duration-300"
                  >
                    Enquire Now
                  </Link>
                  <Link
                    to="/courses"
                    className="w-full text-center text-sm px-4 py-2.5 border border-[#38BDF8]/30 text-[#38BDF8] hover:bg-[#38BDF8]/10 font-medium rounded-xl transition-all duration-300"
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ======== WHY CHOOSE SECTION ======== */}
      <section className="relative py-24 lg:py-32 bg-[#07111F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div {...fadeUp}>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Science Is Easier When You{' '}
                <span className="text-gradient-blue">Understand It.</span>
              </h2>
            </motion.div>

            <motion.div {...staggerContainer}>
              <ul className="space-y-5">
                {benefits.map((benefit) => (
                  <motion.li
                    key={benefit}
                    {...staggerItem}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-8 h-8 bg-[#38BDF8]/10 border border-[#38BDF8]/20 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#38BDF8]/20 transition-colors duration-300">
                      <Check className="w-4 h-4 text-[#38BDF8]" />
                    </div>
                    <span className="text-[#A8B7C9] text-base group-hover:text-white transition-colors duration-300">
                      {benefit}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======== FINAL CTA SECTION ======== */}
      <section className="relative py-24 lg:py-32 bg-[#0D1B2A] overflow-hidden">
        {/* Glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#38BDF8]/5 blur-[200px] rounded-full" />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#22D3EE]/5 blur-[150px] rounded-full" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Your Stronger Science Foundation{' '}
              <span className="text-gradient-blue">Starts Here.</span>
            </h2>
            <p className="text-[#A8B7C9] text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Take the next step towards better understanding, stronger concepts, and greater academic confidence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#38BDF8] hover:bg-[#38BDF8]/90 text-[#07111F] font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#38BDF8]/25 hover:-translate-y-0.5"
              >
                Enquire Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[#38BDF8]/30 text-[#38BDF8] hover:bg-[#38BDF8]/10 font-semibold rounded-xl transition-all duration-300"
              >
                Contact Our Teachers
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
