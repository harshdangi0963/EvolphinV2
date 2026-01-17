import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ANIMATION_EASE } from '../constants';

const ACTIONS = [
  { id: 'create-collection', label: 'Create Collection', icon: 'folder_zip', color: 'text-indigo-400' },
  { id: 'upload-doc', label: 'Upload Document', icon: 'upload_file', color: 'text-emerald-400' },
  { id: 'provision-node', label: 'Provision Node', icon: 'hub', color: 'text-fuchsia-400' },
  { id: 'init-connection', label: 'Initiate Connection', icon: 'link', color: 'text-amber-400' },
];

const QuickActions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ duration: 0.3, ease: ANIMATION_EASE }}
            className="glass-panel p-2 rounded-[24px] min-w-[220px] shadow-2xl overflow-hidden border border-white/10"
          >
            <div className="flex flex-col gap-1">
              {ACTIONS.map((action, idx) => (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-white/5 transition-all group text-left"
                >
                  <span className={`material-symbols-outlined ${action.color} group-hover:scale-110 transition-transform`}>
                    {action.icon}
                  </span>
                  <span className="text-sm font-medium text-nexus-200 group-hover:text-white transition-colors">
                    {action.label}
                  </span>
                </motion.button>
              ))}
            </div>
            
            <div className="mt-2 pt-2 border-t border-white/5 px-4 pb-2">
                <p className="text-[10px] text-nexus-500 font-bold uppercase tracking-widest">Neural Operations</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        layout
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden transition-colors shadow-2xl group ${isOpen ? 'bg-nexus-800' : 'bg-accent-500'}`}
      >
        {/* Border Beam Effect when active */}
        {isOpen && (
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute inset-[-100%] w-[300%] h-[300%]"
                    style={{
                        background: `conic-gradient(from 0deg, transparent 0deg, transparent 300deg, #818cf8 360deg)`,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                />
                <div className="absolute inset-[2px] bg-nexus-800 rounded-[14px]" />
            </div>
        )}
        
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          className={`material-symbols-outlined text-[28px] relative z-10 transition-colors ${isOpen ? 'text-accent-400' : 'text-white'}`}
        >
          {isOpen ? 'close' : 'add'}
        </motion.span>
        
        {/* Subtle Glow */}
        {!isOpen && (
            <div className="absolute inset-0 bg-accent-glow opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-full" />
        )}
      </motion.button>
    </div>
  );
};

export default QuickActions;