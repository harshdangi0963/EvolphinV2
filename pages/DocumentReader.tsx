import React from 'react';
import { motion } from 'framer-motion';

const DocumentReader: React.FC = () => {
  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto scrollbar-hide relative bg-nexus-950">
        <div className="max-w-[680px] mx-auto py-20 px-8">
            <header className="mb-12 border-b border-white/5 pb-8">
                <div className="flex items-center gap-2 text-nexus-400 text-sm mb-4 uppercase tracking-widest font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Deep Work Mode
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
                    The Evolution of Neural Interfaces in Enterprise Knowledge
                </h1>
            </header>

            <article className="prose prose-invert prose-lg prose-headings:font-display prose-p:text-nexus-300 prose-p:leading-relaxed">
                <p className="lead text-xl text-nexus-200">
                    As organizations scale, the latency between insight and action often increases. This document explores the architectural shifts required to maintain "Velocity at Scale."
                </p>
                <h3>The Mesh Topology</h3>
                <p>
                    Unlike hierarchical data structures, a mesh topology allows for non-linear traversal of information. By treating every document, message, and transaction as a node with weighted edges, we can compute relevance contextually rather than statically.
                </p>
                <div className="my-8 p-6 bg-nexus-900/50 rounded-2xl border-l-4 border-accent-500 italic text-nexus-200">
                    "Intelligence is not just data accumulation; it is the speed of retrieval relative to the query's intent."
                </div>
                <p>
                    Implementing this requires a shift from keyword-based indexing to semantic vectorization. The <strong>Nexus 4.0</strong> kernel handles this natively, creating a "living" graph that evolves with team usage patterns.
                </p>
                <h3>Contextual Awareness</h3>
                <p>
                    The system anticipates needs based on the user's current "Flow State." If a user is reviewing financial audits, the peripheral mesh promotes related compliance nodes while suppressing creative marketing streams. This is achieved via a dynamic suppression algorithm running on the edge.
                </p>
            </article>
        </div>

        {/* Floating Action Button */}
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-8 right-8 bg-accent-500 hover:bg-accent-400 text-white w-14 h-14 rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.4)] flex items-center justify-center z-50"
        >
            <span className="material-symbols-outlined text-[28px]">auto_mode</span>
        </motion.button>
      </main>

      {/* Contextual Assistant Sidebar */}
      <aside className="w-96 glass-panel border-l border-white/5 hidden xl:flex flex-col p-6 z-20">
        <div className="flex items-center justify-between mb-8">
            <h3 className="font-display font-semibold text-lg">Context Assistant</h3>
            <span className="text-xs bg-white/10 px-2 py-1 rounded text-nexus-300">v4.0</span>
        </div>

        <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <h4 className="text-xs font-bold text-nexus-400 uppercase tracking-wider mb-2">Key Insight</h4>
                <p className="text-sm text-nexus-200">
                    The document proposes a shift from hierarchical to mesh-based knowledge management to reduce information latency.
                </p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <h4 className="text-xs font-bold text-nexus-400 uppercase tracking-wider mb-2">Related Nodes</h4>
                <ul className="space-y-3">
                    <li className="flex items-center gap-3 group cursor-pointer">
                        <span className="material-symbols-outlined text-nexus-500 group-hover:text-accent-400 text-lg">description</span>
                        <span className="text-sm text-nexus-300 group-hover:text-white transition-colors">Q3 System Architecture</span>
                    </li>
                    <li className="flex items-center gap-3 group cursor-pointer">
                        <span className="material-symbols-outlined text-nexus-500 group-hover:text-accent-400 text-lg">person</span>
                        <span className="text-sm text-nexus-300 group-hover:text-white transition-colors">Meeting: Elena R. (Yesterday)</span>
                    </li>
                </ul>
            </div>

            <div className="mt-auto">
                 <button className="w-full py-3 rounded-xl bg-accent-500/10 text-accent-400 border border-accent-500/20 hover:bg-accent-500/20 transition-colors font-medium text-sm flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-lg">summarize</span>
                    Synthesize Findings
                 </button>
            </div>
        </div>
      </aside>
    </div>
  );
};

export default DocumentReader;