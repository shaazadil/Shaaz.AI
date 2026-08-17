import React from 'react';
import { WelcomeScreen } from './WelcomeScreen';
import { ChatInput } from './ChatInput';

export function ChatWindow() {
  return (
    <main className="flex-1 flex flex-col h-[calc(100vh-56px)] md:h-screen relative overflow-hidden bg-transparent">
      <div className="flex-1 overflow-y-auto w-full flex flex-col relative z-0">
        <WelcomeScreen />
      </div>
      <ChatInput />
    </main>
  );
}
