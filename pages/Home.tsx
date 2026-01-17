import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchConsole from '../components/SearchConsole';
import FlipClock from '../components/FlipClock';
import { ViewMode, ChatTurn, AIResponse } from '../types';
import { executeQuery } from '../services/geminiService';

const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 8);
    return () => clearInterval(timer);
  }, [text]);
  return <span className="whitespace-pre-line leading-relaxed">{displayedText}</span>;
};

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sessionMode, setSessionMode] = useState<'IDLE' | 'SEARCH' | 'CHAT'>('IDLE');
  const [chatHistory, setChatHistory] = useState<ChatTurn[]>([]);
  const [searchResults, setSearchResults] = useState<AIResponse | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  const handleSearch = async (query: string, mode: ViewMode) => {
    if (!query.trim()) return;

    setIsLoading(true);
    if (mode === ViewMode.SEARCH) {
      setSessionMode('SEARCH');
      setChatHistory([]); // Clear chat if switching to search
      try {
        const result = await executeQuery(query, mode);
        setSearchResults(result);
      } catch (e) { console.error(e); }
    } else {
      setSessionMode('CHAT');
      setSearchResults(null); // Clear search if switching to chat
      const newTurn: ChatTurn = {
        id: Date.now().toString(),
        query: query,
        response: null,
        timestamp: Date.now()
      };
      setChatHistory(prev => [...prev, newTurn]);
      try {
        const result = await executeQuery(query, mode);
        setChatHistory(prev => prev.map(t => t.id === newTurn.id ? { ...t, response: result } : t));
      } catch (e) { console.error(e); }
    }
    setIsLoading(false);
  };

  const reset = () => {
    setSessionMode('IDLE');
    setChatHistory([]);
    setSearchResults(null);
    setIsLoading(false);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-nexus-950 text-nexus-200 mesh-bg transition-colors duration-1000">
      
      {/* Top Navigation Bar (Minimal) */}
      <AnimatePresence>
        {sessionMode !== 'IDLE' && (
          <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="shrink-0 h-14 border-b border-white/5 px-6 flex items-center justify-between z-40 bg-nexus-950/50 backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black tracking-[0.2em] text-nexus-500 uppercase">Neural Session</span>
              <div className="h-1 w-1 rounded-full bg-accent-500 animate-pulse" />
            </div>
            <button 
              onClick={reset}
              className="text-[10px] font-bold text-nexus-400 hover:text-white transition-colors tracking-widest uppercase flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">close</span>
              Reset Workspace
            </button>
          </motion.header>
        )}
      </AnimatePresence>

      <main className="flex-1 relative flex flex-col overflow-hidden">
        
        {/* Scrollable Container for Chat or Search Results */}
        <div 
          ref={scrollRef}
          className={`flex-1 overflow-y-auto scrollbar-hide px-6 py-8 ${sessionMode === 'CHAT' ? 'pb-32' : ''}`}
        >
          <div className="max-w-3xl mx-auto w-full">
            
            {/* IDLE HERO */}
            <AnimatePresence>
              {sessionMode === 'IDLE' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-[60vh] flex flex-col items-center justify-center text-center"
                >
                  <FlipClock />
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.5 }}
                    className="mt-12 w-full max-w-xl"
                  >
                    <SearchConsole onSearch={handleSearch} isLoading={isLoading} expanded />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SEARCH VIEW */}
            {sessionMode === 'SEARCH' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-4 space-y-8">
                <SearchConsole onSearch={handleSearch} isLoading={isLoading} expanded />
                
                <AnimatePresence mode="wait">
                  {searchResults && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-1 gap-3"
                    >
                      <div className="text-[10px] font-bold text-nexus-500 uppercase tracking-widest mb-2 px-1">
                        Results for: <span className="text-nexus-300">"{searchResults.query}"</span>
                      </div>
                      {searchResults.data?.map((item, idx) => (
                        <motion.div 
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all cursor-pointer group flex items-center justify-between"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-nexus-400 group-hover:text-accent-400 transition-colors">
                              <span className="material-symbols-outlined">{item.type === 'document' ? 'description' : 'hub'}</span>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-white group-hover:text-accent-400 transition-colors">{item.title}</div>
                              <div className="text-[10px] text-nexus-500 uppercase tracking-tight mt-0.5">{item.type} • {item.updatedAt}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] font-mono text-nexus-500">{item.relevance}% relevance</div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* CHAT VIEW */}
            {sessionMode === 'CHAT' && (
              <div className="space-y-10 pt-4 pb-20">
                {chatHistory.map((turn, idx) => (
                  <motion.div 
                    key={turn.id} 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* User Prompt */}
                    <div className="flex justify-end">
                      <div className="max-w-[85%] px-5 py-3 rounded-2xl bg-white/5 border border-white/5 text-nexus-100 text-sm">
                        {turn.query}
                      </div>
                    </div>

                    {/* AI Answer */}
                    <div className="flex gap-4">
                      <div className="w-7 h-7 rounded-full bg-accent-500/20 border border-accent-500/30 flex items-center justify-center shrink-0 mt-1">
                        <span className="material-symbols-outlined text-accent-400 text-sm">auto_awesome</span>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="text-nexus-200 text-base leading-relaxed">
                          {turn.response ? (
                            <TypewriterText text={turn.response.content} />
                          ) : (
                            <div className="flex gap-1 items-center py-2">
                              <span className="w-1 h-1 bg-nexus-500 rounded-full animate-bounce" />
                              <span className="w-1 h-1 bg-nexus-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                              <span className="w-1 h-1 bg-nexus-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                            </div>
                          )}
                        </div>
                        {turn.response?.followUps && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {turn.response.followUps.map((f, i) => (
                              <button 
                                key={i}
                                onClick={() => handleSearch(f, ViewMode.ASK_AI)}
                                className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[11px] text-nexus-400 hover:text-white hover:border-white/30 transition-all"
                              >
                                {f}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CHAT DOCK (Only in Chat Mode) */}
        <AnimatePresence>
          {sessionMode === 'CHAT' && (
            <motion.div 
              initial={{ y: 100 }} 
              animate={{ y: 0 }} 
              exit={{ y: 100 }}
              className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-nexus-950 via-nexus-950 to-transparent pt-12 z-50"
            >
              <div className="max-w-3xl mx-auto">
                <SearchConsole onSearch={handleSearch} isLoading={isLoading} expanded />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
};

export default Home;