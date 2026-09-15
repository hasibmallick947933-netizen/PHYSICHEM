import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Teachers = lazy(() => import('./pages/Teachers'));
const Courses = lazy(() => import('./pages/Courses'));
const Methodology = lazy(() => import('./pages/Methodology'));
const Contact = lazy(() => import('./pages/Contact'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminTeachers = lazy(() => import('./pages/admin/AdminTeachers'));
const AdminCourses = lazy(() => import('./pages/admin/AdminCourses'));
const AdminEnquiries = lazy(() => import('./pages/admin/AdminEnquiries'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#07111F] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-8 h-8 border-2 border-[#38BDF8]/30 border-t-[#38BDF8] rounded-full animate-spin" />
        </div>
        <p className="text-[#A8B7C9] text-sm font-body">Loading...</p>
      </div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      <Suspense fallback={<LoadingScreen />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/methodology" element={<Methodology />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="teachers" element={<AdminTeachers />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="enquiries" element={<AdminEnquiries />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </Suspense>
      {!isAdmin && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
