import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ViewMode, SearchFilter } from '../types';
import { ANIMATION_EASE, SEARCH_PLACEHOLDERS, ASK_AI_PLACEHOLDERS, SEARCH_FILTERS } from '../constants';

interface SearchConsoleProps {
  onSearch: (query: string, mode: ViewMode) => void;
  isLoading: boolean;
  expanded?: boolean;
}

const SearchConsole: React.FC<SearchConsoleProps> = ({ onSearch, isLoading, expanded = false }) => {
  const [mode, setMode] = useState<ViewMode>(ViewMode.SEARCH);
  const [query, setQuery] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [activeFilter, setActiveFilter] = useState<SearchFilter>('All');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const texts = mode === ViewMode.SEARCH ? SEARCH_PLACEHOLDERS : ASK_AI_PLACEHOLDERS;
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      const currentText = texts[textIndex];
      const speed = isDeleting ? 30 : Math.random() * (120 - 60) + 60;

      if (!isDeleting && charIndex <= currentText.length) {
        setPlaceholder(currentText.substring(0, charIndex));
        charIndex++;
      } else if (isDeleting && charIndex >= 0) {
        setPlaceholder(currentText.substring(0, charIndex));
        charIndex--;
      }

      if (charIndex === currentText.length + 1) {
        isDeleting = true;
        timeout = setTimeout(type, 2000);
      } else if (charIndex === -1) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        timeout = setTimeout(type, 500);
      } else {
        timeout = setTimeout(type, speed);
      }
    };

    timeout = setTimeout(type, 500);
    return () => clearTimeout(timeout);
  }, [mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query, mode);
      setQuery(''); // Clear on successful fire
    }
  };

  const accentColor = mode === ViewMode.ASK_AI ? '#c084fc' : '#6366f1';

  return (
    <div className={`relative w-full max-w-2xl mx-auto transition-all duration-300 ${expanded ? 'scale-100' : 'scale-95'}`}>
      
      {/* Laser Border - Single Beam */}
      <div className="absolute -inset-[1px] rounded-[24px] overflow-hidden pointer-events-none">
         <motion.div
            className="absolute inset-[-50%] w-[200%] h-[200%]"
            style={{
                background: `conic-gradient(from 0deg, transparent 0deg, transparent 330deg, ${accentColor} 360deg)`,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
         />
         <div className="absolute inset-[1px] bg-nexus-900 rounded-[23px]" />
      </div>

      <div className="relative z-10 bg-nexus-900/60 backdrop-blur-2xl rounded-[24px] border border-white/5 shadow-xl flex flex-col overflow-hidden">
        <form onSubmit={handleSubmit} className="flex flex-col relative">
          
          <div className="flex items-center px-5 h-14 sm:h-16">
             <motion.span
                key={mode}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`material-symbols-outlined text-2xl mr-4 ${mode === ViewMode.ASK_AI ? 'text-fuchsia-400' : 'text-accent-400'}`}
              >
                {mode === ViewMode.ASK_AI ? 'auto_awesome' : 'search'}
              </motion.span>

            <div className="relative flex-1 h-full flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                disabled={isLoading}
                className="w-full bg-transparent border-none outline-none text-base sm:text-lg text-white placeholder-transparent font-medium"
              />
              {!query && (
                <div className="absolute inset-0 flex items-center pointer-events-none opacity-40">
                  <span className="text-nexus-400 text-base sm:text-lg font-normal truncate">
                    {placeholder}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
                {isLoading ? (
                    <span className="material-symbols-outlined text-accent-400 animate-spin text-xl">progress_activity</span>
                ) : (
                    <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/5">
                        <button
                            type="button"
                            onClick={() => setMode(ViewMode.SEARCH)}
                            className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${mode === ViewMode.SEARCH ? 'bg-accent-500 text-white shadow-lg' : 'text-nexus-500 hover:text-nexus-300'}`}
                        >
                            Search
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode(ViewMode.ASK_AI)}
                            className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${mode === ViewMode.ASK_AI ? 'bg-fuchsia-600 text-white shadow-lg' : 'text-nexus-500 hover:text-nexus-300'}`}
                        >
                            Ask AI
                        </button>
                    </div>
                )}
            </div>
          </div>
          
          {mode === ViewMode.SEARCH && (
            <div className="px-5 pb-3 border-t border-white/5 pt-2 flex gap-3 overflow-x-auto scrollbar-hide">
              {SEARCH_FILTERS.map(f => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveFilter(f)}
                  className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${activeFilter === f ? 'text-accent-400' : 'text-nexus-600 hover:text-nexus-400'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SearchConsole;