"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { Conversation } from '@/types/chat';

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onDeleteConversation: (id: string) => void;
}

export function Sidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation
}: SidebarProps) {
  // eslint-disable-next-line react-hooks/purity
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  
  const today = conversations.filter(c => now - c.createdAt < oneDay);
  const previous = conversations.filter(c => now - c.createdAt >= oneDay);

  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setMenuOpenId(null);
    if (menuOpenId) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpenId]);

  // Handle escape for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setConfirmDeleteId(null);
        setMenuOpenId(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderConversationItem = (c: Conversation) => (
    <div 
      key={c.id} 
      onClick={() => onSelectConversation(c.id)}
      className={`w-full flex items-center justify-between px-2 py-2 text-sm rounded-md transition-colors cursor-pointer group relative ${c.id === activeConversationId ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}
    >
      <span className="truncate flex-1 pr-2">{c.title}</span>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setMenuOpenId(menuOpenId === c.id ? null : c.id);
        }}
        className={`p-1 rounded hover:bg-zinc-700/50 transition-opacity flex-shrink-0 ${menuOpenId === c.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
        aria-label="Conversation options"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
      </button>

      {menuOpenId === c.id && (
        <div 
          className="absolute right-2 top-8 w-32 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg py-1 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="w-full text-left px-3 py-1.5 text-sm text-red-400 hover:bg-zinc-700 hover:text-red-300 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setConfirmDeleteId(c.id);
              setMenuOpenId(null);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <aside className="w-[280px] hidden md:flex flex-col h-screen border-r border-zinc-800/60 bg-[#09090b]/40 backdrop-blur-md text-zinc-300">
        <div className="p-4 flex items-center gap-3 border-b border-zinc-800/40">
          <div className="w-8 h-8 relative rounded overflow-hidden shadow-[0_0_15px_rgba(128,90,213,0.3)]">
            <Image src="/logo.jpg" alt="Shaaz AI Logo" fill className="object-cover" />
          </div>
          <span className="font-semibold text-zinc-100 text-lg tracking-wide">Shaaz AI</span>
        </div>

        <div className="p-4">
          <Button className="w-full justify-start gap-2" variant="secondary" onClick={onNewChat}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            New Chat
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-4">
          {today.length > 0 && (
            <div className="mb-6">
              <h3 className="px-2 text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">Today</h3>
              <div className="space-y-1">
                {today.map(renderConversationItem)}
              </div>
            </div>
          )}
          {previous.length > 0 && (
            <div>
              <h3 className="px-2 text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">Previous</h3>
              <div className="space-y-1">
                {previous.map(renderConversationItem)}
              </div>
            </div>
          )}
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

      {confirmDeleteId && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setConfirmDeleteId(null)}
        >
          <div 
            className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg shadow-xl max-w-sm w-full mx-4"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <h2 className="text-lg font-semibold text-zinc-100 mb-2">Delete Chat?</h2>
            <p className="text-sm text-zinc-400 mb-6">
              This will permanently delete the conversation and all of its messages. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  onDeleteConversation(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
                className="px-4 py-2 text-sm font-medium bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 rounded-md transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
