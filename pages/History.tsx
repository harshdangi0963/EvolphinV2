import React from 'react';
import { motion } from 'framer-motion';
import { MOCK_HISTORY } from '../constants';

const History: React.FC = () => {
  return (
    <div className="p-8 md:p-12 w-full max-w-5xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-display font-bold text-white mb-2">Temporal Ledger</h1>
        <p className="text-nexus-400">Version history and diff tracking.</p>
      </header>

      <div className="space-y-8 relative">
        {/* Timeline Line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-white/5 z-0" />

        {MOCK_HISTORY.map((entry, index) => (
            <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative z-10 pl-12"
            >
                <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-nexus-900 border border-white/10 flex items-center justify-center shadow-lg">
                    <span className="material-symbols-outlined text-nexus-400 text-sm">history</span>
                </div>

                <div className="bg-nexus-900/50 border border-white/5 rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/2">
                        <div className="flex items-center gap-3">
                             <span className="text-sm font-bold text-white">{entry.user}</span>
                             <span className="text-xs text-nexus-500">• {entry.timestamp}</span>
                        </div>
                        <span className="text-sm text-nexus-300 italic">{entry.action}</span>
                    </div>
                    <div className="p-6 font-mono text-sm leading-relaxed text-nexus-300 bg-nexus-950/30">
                        {entry.diffs.map((diff, i) => (
                            <span
                                key={i}
                                className={`${
                                    diff.type === 'add' ? 'bg-emerald-500/20 text-emerald-200' :
                                    diff.type === 'remove' ? 'bg-rose-500/20 text-rose-200 line-through decoration-rose-500/50' :
                                    ''
                                }`}
                            >
                                {diff.content}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        ))}
      </div>
    </div>
  );
};

export default History;