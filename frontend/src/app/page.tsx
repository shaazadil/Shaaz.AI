"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { Conversation, Message } from "@/types/chat";

export default function Home() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const savedConversations = localStorage.getItem('shaaz_conversations');
    const savedActiveId = localStorage.getItem('shaaz_active_conversation_id');
    
    if (savedConversations) {
      try {
        const parsed = JSON.parse(savedConversations);
        setConversations(parsed);
        if (savedActiveId && parsed.some((c: Conversation) => c.id === savedActiveId)) {
          setActiveConversationId(savedActiveId);
        } else if (parsed.length > 0) {
          setActiveConversationId(parsed[0].id);
        }
      } catch (e) {
        console.error('Failed to parse conversations', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage whenever conversations change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('shaaz_conversations', JSON.stringify(conversations));
    }
  }, [conversations, isLoaded]);

  // Save active conversation id whenever it changes
  useEffect(() => {
    if (isLoaded && activeConversationId) {
      localStorage.setItem('shaaz_active_conversation_id', activeConversationId);
    }
  }, [activeConversationId, isLoaded]);

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

  const handleSendMessage = async (content: string) => {
    if (isTyping) return; // Prevent duplicate submissions
    
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

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) {
        throw new Error('Backend is unavailable');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply,
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
    } catch (error) {
      console.error('Error fetching chat response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Error: Unable to reach the Shaaz AI backend. Please make sure it is running.",
      };
      setConversations(prev => prev.map(conv => {
        if (conv.id === targetId) {
          return {
            ...conv,
            messages: [...conv.messages, errorMessage]
          };
        }
        return conv;
      }));
    } finally {
      setIsTyping(false);
    }
  };

  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const activeMessages = activeConversation ? activeConversation.messages : [];

  if (!isLoaded) return null;

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
