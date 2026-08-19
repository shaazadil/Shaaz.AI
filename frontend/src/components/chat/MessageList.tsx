"use client";

import React, { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { Message } from '@/types/chat';
import { WelcomeScreen } from './WelcomeScreen';

interface MessageListProps {
  messages: Message[];
  isAssistantTyping: boolean;
}

export function MessageList({ messages, isAssistantTyping }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAssistantTyping]);

  if (messages.length === 0) {
    return <WelcomeScreen />;
  }

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto p-4 md:px-6 pt-6 pb-32">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      
      {isAssistantTyping && (
        <div className="flex w-full mb-6 justify-start">
          <div className="bg-zinc-800/80 border border-zinc-700/50 text-zinc-100 rounded-2xl rounded-bl-sm px-5 py-4 shadow-sm flex items-center space-x-2 h-[52px]">
            <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      )}
      <div ref={bottomRef} className="h-4" />
    </div>
  );
}
