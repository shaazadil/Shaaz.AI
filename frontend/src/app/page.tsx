"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { Conversation, Message } from "@/types/chat";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export default function Home() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | number | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Helper to get active conversation
  const activeConversation = conversations.find(c => c.id.toString() === activeConversationId?.toString());
  const activeMessages = activeConversation ? activeConversation.messages : [];

  // Fetch conversations on mount
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await fetch(`${API_URL}/api/conversations`);
        if (res.ok) {
          const data = await res.json();
          // Ensure messages array is present
          const processed = data.map((c: any) => ({ ...c, messages: [] }));
          setConversations(processed);
          
          const savedActiveId = localStorage.getItem('shaaz_active_conversation_id');
          if (savedActiveId && processed.some((c: Conversation) => c.id.toString() === savedActiveId)) {
            setActiveConversationId(savedActiveId);
          } else if (processed.length > 0) {
            setActiveConversationId(processed[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to load conversations:", err);
      } finally {
        setIsLoaded(true);
      }
    };
    fetchConversations();
  }, []);

  // Fetch messages whenever active conversation changes
  useEffect(() => {
    if (!activeConversationId) return;

    // Save active id to local storage
    localStorage.setItem('shaaz_active_conversation_id', activeConversationId.toString());

    const fetchMessages = async () => {
      try {
        const res = await fetch(`${API_URL}/api/conversations/${activeConversationId}/messages`);
        if (res.ok) {
          const messages = await res.json();
          setConversations(prev => prev.map(c => 
            c.id.toString() === activeConversationId.toString() ? { ...c, messages } : c
          ));
        }
      } catch (err) {
        console.error(`Failed to load messages for conversation ${activeConversationId}:`, err);
      }
    };
    fetchMessages();
  }, [activeConversationId]);

  const handleNewChat = async () => {
    try {
      const res = await fetch(`${API_URL}/api/conversations`, {
        method: "POST"
      });
      if (res.ok) {
        const newConversation = await res.json();
        newConversation.messages = [];
        setConversations(prev => [newConversation, ...prev]);
        setActiveConversationId(newConversation.id);
      }
    } catch (err) {
      console.error("Failed to create new chat:", err);
    }
  };

  const handleDeleteConversation = async (id: string | number) => {
    try {
      const res = await fetch(`${API_URL}/api/conversations/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        const filtered = conversations.filter(c => c.id.toString() !== id.toString());
        setConversations(filtered);
        
        if (activeConversationId?.toString() === id.toString()) {
          if (filtered.length > 0) {
            setActiveConversationId(filtered[0].id);
          } else {
            setActiveConversationId(null);
            handleNewChat(); // Create an empty one
          }
        }
      }
    } catch (err) {
      console.error("Failed to delete conversation:", err);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (isTyping) return;
    
    let targetId = activeConversationId;
    
    // Create conversation first if none exists
    if (!targetId) {
      try {
        const res = await fetch(`${API_URL}/api/conversations`, {
          method: "POST"
        });
        if (res.ok) {
          const newConversation = await res.json();
          newConversation.messages = [];
          setConversations(prev => [newConversation, ...prev]);
          setActiveConversationId(newConversation.id);
          targetId = newConversation.id;
        }
      } catch (err) {
        console.error("Failed to create new chat:", err);
        return;
      }
    }

    if (!targetId) return;

    // Save user message to backend
    try {
      const userMsgRes = await fetch(`${API_URL}/api/conversations/${targetId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "user", content })
      });
      
      if (userMsgRes.ok) {
        const savedUserMessage = await userMsgRes.json();
        setConversations(prev => prev.map(conv => {
          if (conv.id.toString() === targetId!.toString()) {
            // Update title on first message
            if (conv.messages.length === 0 || conv.title === "New Chat") {
              const newTitle = content.length > 30 ? content.substring(0, 30) + "..." : content;
              // Fire and forget title update
              fetch(`${API_URL}/api/conversations/${targetId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: newTitle })
              }).catch(console.error);
              return { ...conv, title: newTitle, messages: [...conv.messages, savedUserMessage] };
            }
            return { ...conv, messages: [...conv.messages, savedUserMessage] };
          }
          return conv;
        }));
      }
    } catch (err) {
      console.error("Failed to save user message:", err);
      return;
    }
    
    setIsTyping(true);

    // Get AI response
    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) {
        throw new Error('Backend is unavailable');
      }

      const data = await response.json();
      
      // Save AI message to backend
      const aiMsgRes = await fetch(`${API_URL}/api/conversations/${targetId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "assistant", content: data.reply })
      });

      if (aiMsgRes.ok) {
        const savedAiMessage = await aiMsgRes.json();
        setConversations(prev => prev.map(conv => {
          if (conv.id.toString() === targetId!.toString()) {
            return { ...conv, messages: [...conv.messages, savedAiMessage] };
          }
          return conv;
        }));
      }

    } catch (error) {
      console.error('Error fetching chat response:', error);
      // Fallback local error message (not saved to db as it's an error)
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Error: Unable to reach the Shaaz AI backend. Please make sure it is running.",
      };
      setConversations(prev => prev.map(conv => {
        if (conv.id.toString() === targetId!.toString()) {
          return { ...conv, messages: [...conv.messages, errorMessage] };
        }
        return conv;
      }));
    } finally {
      setIsTyping(false);
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="flex h-screen w-full bg-transparent text-zinc-100 overflow-hidden font-sans">
      <Sidebar 
        conversations={conversations} 
        activeConversationId={activeConversationId?.toString() || null}
        onSelectConversation={(id) => setActiveConversationId(id)}
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
