import React from 'react';
import Image from 'next/image';
import { IconButton } from '../ui/IconButton';

export function Topbar() {
  return (
    <header className="h-14 flex items-center justify-between px-4 border-b border-zinc-800/40 sticky top-0 bg-[#09090b]/80 backdrop-blur-md z-10">
      <div className="flex items-center gap-2 md:hidden">
         <div className="w-7 h-7 relative rounded overflow-hidden shadow-[0_0_10px_rgba(128,90,213,0.3)]">
          <Image src="/logo.jpg" alt="Shaaz AI Logo" fill className="object-cover" />
        </div>
        <span className="font-semibold text-zinc-100">Shaaz AI</span>
      </div>
      <div className="hidden md:block">
        <span className="text-sm font-medium text-zinc-400">New Chat</span>
      </div>
      <div className="flex items-center gap-2">
        <IconButton aria-label="Settings">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        </IconButton>
      </div>
    </header>
  );
}
