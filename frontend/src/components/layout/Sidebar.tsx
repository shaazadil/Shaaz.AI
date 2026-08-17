import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';

export function Sidebar() {
  return (
    <aside className="w-[280px] hidden md:flex flex-col h-screen border-r border-zinc-800/60 bg-[#09090b]/40 backdrop-blur-md text-zinc-300">
      <div className="p-4 flex items-center gap-3 border-b border-zinc-800/40">
        <div className="w-8 h-8 relative rounded overflow-hidden shadow-[0_0_15px_rgba(128,90,213,0.3)]">
          <Image src="/logo.jpg" alt="Shaaz AI Logo" fill className="object-cover" />
        </div>
        <span className="font-semibold text-zinc-100 text-lg tracking-wide">Shaaz AI</span>
      </div>

      <div className="p-4">
        <Button className="w-full justify-start gap-2" variant="secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          New Chat
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-4">
        <div className="mb-6">
          <h3 className="px-2 text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">Today</h3>
          <div className="space-y-1">
            {['Explain React Hooks', 'Write a Python script', 'Debug sorting algorithm'].map((item, i) => (
              <button key={i} className="w-full text-left px-2 py-2 text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 rounded-md transition-colors truncate">
                {item}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="px-2 text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">Yesterday</h3>
          <div className="space-y-1">
            {['Refactor database schema', 'CSS Grid layout ideas'].map((item, i) => (
              <button key={i} className="w-full text-left px-2 py-2 text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 rounded-md transition-colors truncate">
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-zinc-800/60 mt-auto">
        <button className="flex items-center gap-3 w-full hover:bg-zinc-800/50 p-2 rounded-md transition-colors text-left">
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-medium text-zinc-300">
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-200 truncate">User Profile</p>
            <p className="text-xs text-zinc-500 truncate">Free Plan</p>
          </div>
        </button>
      </div>
    </aside>
  );
}
