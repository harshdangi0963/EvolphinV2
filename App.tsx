import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import ParticleMesh from './components/ParticleMesh';
import QuickActions from './components/QuickActions';
import Home from './pages/Home';
import Collections from './pages/Collections';
import DocumentReader from './pages/DocumentReader';
import Collaborators from './pages/Collaborators';
import History from './pages/History';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, filter: 'blur(10px)' }}
    animate={{ opacity: 1, filter: 'blur(0px)' }}
    exit={{ opacity: 0, filter: 'blur(10px)' }}
    transition={{ duration: 0.3 }}
    className="w-full h-full"
  >
    {children}
  </motion.div>
);

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/collections" element={<PageWrapper><Collections /></PageWrapper>} />
        <Route path="/reader" element={<PageWrapper><DocumentReader /></PageWrapper>} />
        <Route path="/team" element={<PageWrapper><Collaborators /></PageWrapper>} />
        <Route path="/history" element={<PageWrapper><History /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <div className="flex h-screen w-screen bg-nexus-950 text-nexus-200 overflow-hidden font-sans selection:bg-accent-500/30 selection:text-white">
      {/* Background Layer */}
      <ParticleMesh />
      
      <HashRouter>
        {/* Navigation Layer */}
        <Sidebar />
        
        {/* Global Action Layer */}
        <QuickActions />
        
        {/* Main Content Layer */}
        <main className="flex-1 ml-[80px] h-full relative z-10 overflow-hidden">
             <AnimatedRoutes />
        </main>
      </HashRouter>
    </div>
  );
};

export default App;