import React from 'react';
import { IconButton } from '../ui/IconButton';

export function ChatInput() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:px-6 md:pb-6 relative z-10 bg-gradient-to-t from-[#09090b] via-[#09090b] to-transparent pt-8">
      <div className="relative flex items-end w-full rounded-3xl bg-zinc-900/80 border border-zinc-800 focus-within:border-zinc-700 focus-within:ring-1 focus-within:ring-zinc-700 shadow-xl transition-all">
        
        <div className="p-2 md:p-3">
          <IconButton aria-label="Attach file">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
          </IconButton>
        </div>

        <textarea 
          placeholder="Ask Shaaz anything..."
          className="flex-1 max-h-48 min-h-[56px] py-4 bg-transparent text-zinc-100 placeholder:text-zinc-500 resize-none focus:outline-none focus:ring-0 text-[15px]"
          rows={1}
        />

        <div className="p-2 md:p-3">
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black hover:bg-zinc-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
      <div className="text-center mt-3">
        <p className="text-[11px] text-zinc-500 font-medium">Shaaz AI can make mistakes. Consider verifying important information.</p>
      </div>
    </div>
  );
}
