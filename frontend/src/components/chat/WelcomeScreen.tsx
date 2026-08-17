import React from 'react';
import Image from 'next/image';

const SUGGESTIONS = [
  {
    title: 'Explain something',
    description: 'Get simple, clear explanations on complex topics',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
  },
  {
    title: 'Debug my code',
    description: 'Find errors and improve your codebase',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
  },
  {
    title: 'Help me study',
    description: 'Summaries, notes, and practice questions',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
  },
  {
    title: 'Brainstorm an idea',
    description: 'Turn your thoughts into real possibilities',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21h6"/><path d="M12 21v-3"/><path d="M12 4a5 5 0 0 1 5 5c0 2-1 3.5-2 5.5s-2 2-2 3.5"/><path d="M7 9a5 5 0 0 1 5-5"/></svg>
  }
];

export function WelcomeScreen() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-4xl mx-auto w-full">
      <div className="mb-12 text-center">
        <div className="w-16 h-16 relative rounded-2xl mx-auto mb-6 overflow-hidden shadow-[0_0_30px_rgba(128,90,213,0.2)]">
          <Image src="/logo.jpg" alt="Shaaz AI Logo" fill className="object-cover" priority />
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-zinc-100 mb-3 tracking-tight">
          Shaaz <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">AI</span>
        </h1>
        <p className="text-lg text-zinc-400 font-medium">Your AI study buddy, coding partner, and creative collaborator.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {SUGGESTIONS.map((item, idx) => (
          <button 
            key={idx}
            className="flex flex-col items-start p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/60 hover:bg-zinc-800/50 hover:border-zinc-700 transition-all text-left group"
          >
            <div className="mb-3 text-indigo-400 group-hover:text-indigo-300 transition-colors">
              {item.icon}
            </div>
            <h3 className="font-semibold text-zinc-200 mb-1">{item.title}</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">{item.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
