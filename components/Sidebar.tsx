import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS, ANIMATION_EASE } from '../constants';

const Sidebar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  return (
    <motion.aside
      className="fixed left-0 top-0 h-full z-50 glass-panel border-r border-white/5 flex flex-col py-6"
      initial={{ width: '80px' }}
      animate={{ width: isHovered ? '240px' : '80px' }}
      transition={{ duration: 0.4, ease: ANIMATION_EASE }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="px-6 mb-12 flex items-center gap-4 overflow-hidden whitespace-nowrap">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
          <span className="material-symbols-outlined text-white text-[18px]">hub</span>
        </div>
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="font-display font-bold text-xl tracking-tight text-white"
            >
              Nexus OS
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={`relative flex items-center h-12 px-3 rounded-2xl transition-colors duration-200 group overflow-hidden ${
                isActive ? 'bg-white/10 text-white' : 'text-nexus-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute left-0 w-1 h-6 bg-accent-500 rounded-r-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className={`material-symbols-outlined text-[24px] shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                {item.icon}
              </span>
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                    className="ml-4 font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          );
        })}
      </nav>

      <div className="px-4 mt-auto">
        <button className="w-full flex items-center h-12 px-3 rounded-2xl text-nexus-400 hover:text-white hover:bg-white/5 transition-colors group">
           <span className="material-symbols-outlined text-[24px] shrink-0">settings</span>
           <AnimatePresence>
                {isHovered && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="ml-4 font-medium whitespace-nowrap"
                  >
                    Settings
                  </motion.span>
                )}
              </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;