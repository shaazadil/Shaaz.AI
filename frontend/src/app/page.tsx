"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { Conversation, Message } from "@/types/chat";

export default function Home() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const handleNewChat = () => {
    const newId = Date.now().toString();
    const newConversation: Conversation = {
      id: newId,
      title: "New Chat",
      messages: [],
      createdAt: Date.now()
    };
    
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newId);
  };

  const handleDeleteConversation = (id: string) => {
    const filtered = conversations.filter(c => c.id !== id);
    
    if (activeConversationId === id) {
      if (filtered.length > 0) {
        setActiveConversationId(filtered[0].id);
      } else {
        const newId = Date.now().toString();
        const newConversation: Conversation = {
          id: newId,
          title: "New Chat",
          messages: [],
          createdAt: Date.now()
        };
        filtered.unshift(newConversation);
        setActiveConversationId(newId);
      }
    }
    setConversations(filtered);
  };

  const handleSendMessage = (content: string) => {
    let targetId = activeConversationId;
    
    // If no active conversation, create one implicitly
    if (!targetId) {
      const newId = Date.now().toString();
      targetId = newId;
      const title = content.length > 30 ? content.substring(0, 30) + "..." : content;
      const newConversation: Conversation = {
        id: newId,
        title,
        messages: [],
        createdAt: Date.now()
      };
      setConversations(prev => [newConversation, ...prev]);
      setActiveConversationId(newId);
    }
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === targetId) {
        // Update title if it's the first message and it was just "New Chat"
        let newTitle = conv.title;
        if (conv.messages.length === 0 || conv.title === "New Chat") {
          newTitle = content.length > 30 ? content.substring(0, 30) + "..." : content;
        }
        return {
          ...conv,
          title: newTitle,
          messages: [...conv.messages, userMessage]
        };
      }
      return conv;
    }));
    
    setIsTyping(true);

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I'm a simulated local AI. You said: "${content}"\n\nThis is just a mock response for now to demonstrate the UI!`,
      };
      
      setConversations(prev => prev.map(conv => {
        if (conv.id === targetId) {
          return {
            ...conv,
            messages: [...conv.messages, assistantMessage]
          };
        }
        return conv;
      }));
      setIsTyping(false);
    }, 1500);
  };

  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const activeMessages = activeConversation ? activeConversation.messages : [];

  return (
    <div className="flex h-screen w-full bg-transparent text-zinc-100 overflow-hidden font-sans">
      <Sidebar 
        conversations={conversations} 
        activeConversationId={activeConversationId}
        onSelectConversation={setActiveConversationId}
        onNewChat={handleNewChat}
        onDeleteConversation={handleDeleteConversation}
      />
      <div className="flex-1 flex flex-col h-full min-w-0">
        <Topbar />
        <ChatWindow 
          messages={activeMessages} 
          onSendMessage={handleSendMessage} 
          isTyping={isTyping} 
        />
      </div>
    </div>
  );
}
