import React from 'react';
import { motion } from 'framer-motion';
import { MOCK_COLLABORATORS } from '../constants';

const Collaborators: React.FC = () => {
  return (
    <div className="p-8 md:p-12 w-full max-w-7xl mx-auto">
      <header className="mb-12">
          <h1 className="text-4xl font-display font-bold text-white mb-2">Intelligence Mesh</h1>
          <p className="text-nexus-400">Active neural operators and their current states.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_COLLABORATORS.map((user, index) => (
            <motion.div
                key={user.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-nexus-900/50 border border-white/5 rounded-3xl p-6 flex items-center gap-6 hover:bg-nexus-800/50 transition-colors cursor-pointer group"
            >
                <div className="relative">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-nexus-800">
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-nexus-900 ${
                        user.status === 'online' ? 'bg-emerald-500' :
                        user.status === 'flow' ? 'bg-fuchsia-500' : 'bg-nexus-500'
                    }`}>
                        {user.status === 'online' && (
                            <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></span>
                        )}
                         {user.status === 'flow' && (
                            <span className="absolute inset-0 rounded-full bg-fuchsia-500 animate-pulse opacity-75"></span>
                        )}
                    </div>
                </div>

                <div className="flex-1">
                    <h3 className="text-lg font-bold text-white font-display">{user.name}</h3>
                    <p className="text-sm text-nexus-400">{user.role}</p>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 text-[10px] uppercase tracking-wider font-semibold text-nexus-300">
                        {user.status}
                    </div>
                </div>

                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-white/10 text-white hover:bg-accent-500">
                    <span className="material-symbols-outlined text-[20px]">hub</span>
                </button>
            </motion.div>
        ))}

        {/* Initiate Connection Card */}
         <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="border-2 border-dashed border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center gap-4 hover:border-white/20 transition-colors cursor-pointer text-nexus-400 hover:text-white"
        >
             <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                 <span className="material-symbols-outlined">add_link</span>
             </div>
             <span className="font-medium">Initiate Connection</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Collaborators;