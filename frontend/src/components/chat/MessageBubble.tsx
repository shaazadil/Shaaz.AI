import React from 'react';

import { Message } from '@/types/chat';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-3.5 text-[15px] leading-relaxed
          ${isUser 
            ? 'bg-zinc-100 text-zinc-900 rounded-br-sm' 
            : 'bg-zinc-800/80 border border-zinc-700/50 text-zinc-100 rounded-bl-sm shadow-sm'
          }
        `}
      >
        <div className="whitespace-pre-wrap break-words">{message.content}</div>
      </div>
    </div>
  );
}
