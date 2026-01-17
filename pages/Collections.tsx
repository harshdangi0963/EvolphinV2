import React from 'react';
import { motion } from 'framer-motion';
import { MOCK_COLLECTIONS, ANIMATION_EASE } from '../constants';

const Collections: React.FC = () => {
  return (
    <div className="p-8 md:p-12 w-full max-w-7xl mx-auto">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Collections</h1>
          <p className="text-nexus-400">Knowledge nodes and active streams.</p>
        </div>
        <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined">add</span>
          Provision Node
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_COLLECTIONS.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1, ease: ANIMATION_EASE }}
            className="group relative bg-nexus-900 border border-white/5 rounded-[24px] overflow-hidden hover:border-accent-500/30 transition-colors"
          >
            {/* Cover Image */}
            <div className="h-40 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-nexus-900 to-transparent z-10" />
              <img
                src={item.coverImage}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute top-4 right-4 z-20 bg-nexus-950/60 backdrop-blur px-3 py-1 rounded-full text-xs font-medium border border-white/10 uppercase tracking-wider text-nexus-200">
                {item.type}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-display font-semibold text-white mb-2 group-hover:text-accent-400 transition-colors">
                {item.title}
              </h3>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex -space-x-2">
                  {item.stakeholders.map((sid, i) => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-nexus-900 bg-nexus-800 flex items-center justify-center text-xs overflow-hidden">
                       <img src={`https://picsum.photos/100/100?random=${sid}`} alt="User" />
                     </div>
                  ))}
                </div>
                <span className="text-nexus-500 text-sm">{item.updatedAt}</span>
              </div>

              {/* Neural Relevance Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-nexus-400">Neural Relevance</span>
                  <span className="text-accent-400">{item.relevance}%</span>
                </div>
                <div className="h-1.5 bg-nexus-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.relevance}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Collections;