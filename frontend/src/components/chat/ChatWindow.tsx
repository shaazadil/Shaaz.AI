"use client";

import React from 'react';
import { ChatInput } from './ChatInput';
import { MessageList } from './MessageList';
import { Message } from '@/types/chat';

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isTyping: boolean;
}

export function ChatWindow({ messages, onSendMessage, isTyping }: ChatWindowProps) {
  return (
    <main className="flex-1 flex flex-col h-[calc(100vh-56px)] md:h-screen relative overflow-hidden bg-transparent">
      <div className="flex-1 overflow-y-auto w-full flex flex-col relative z-0 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        <MessageList messages={messages} isAssistantTyping={isTyping} />
      </div>
      <ChatInput onSendMessage={onSendMessage} disabled={isTyping} />
    </main>
  );
}
