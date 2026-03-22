'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  createdAt: string;
}

interface Conversation {
  id: string;
  participants: string[];
  bookingId?: string;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: number;
}

interface MessagesProps {
  conversationId: string;
  currentUserId: string;
  otherUser: {
    id: string;
    name: string;
    avatar: string;
  };
}

export function ChatMessages({ conversationId, currentUserId, otherUser }: MessagesProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchMessages = useCallback(async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversationId', conversationId)
      .order('createdAt', { ascending: true });

    if (!error && data) {
      setMessages(data as Message[]);
    }
    setLoading(false);
  }, [conversationId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMessages();

    const interval = setInterval(fetchMessages, 5000);

    return () => clearInterval(interval);
  }, [fetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const { error } = await supabase
      .from('messages')
      .insert({
        conversationId,
        senderId: currentUserId,
        text: newMessage,
      });

    if (!error) {
      setNewMessage('');
      fetchMessages();
      
      await supabase
        .from('conversations')
        .update({
          lastMessage: newMessage,
          lastMessageAt: new Date().toISOString(),
        })
        .eq('id', conversationId);
    }
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          <div className="text-center text-[#6b6b6b] py-4">Loading...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-[#6b6b6b] py-4">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg) => {
            const isSent = msg.senderId === currentUserId;
            return (
              <div key={msg.id} className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-lg ${
                    isSent
                      ? 'bg-[#e85d04] text-white rounded-br-none'
                      : 'bg-[#f0ede8] text-[#222] rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className={`text-xs mt-1 ${isSent ? 'text-white/70' : 'text-[#6b6b6b]'}`}>
                    {formatTime(msg.createdAt)}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-[#d4d0c8]">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border-2 border-[#d4d0c8] rounded-full focus:outline-none focus:border-[#e85d04]"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-2 bg-[#e85d04] text-white rounded-full hover:bg-[#d14f00] transition-colors disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

export function ConversationList({
  conversations,
  currentUserId,
  onSelect,
  selectedId,
}: {
  conversations: Conversation[];
  currentUserId: string;
  onSelect: (id: string) => void;
  selectedId?: string;
}) {
  const getOtherParticipant = (participants: string[]) => {
    return participants.find(p => p !== currentUserId);
  };

  const formatTime = (date?: string) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="overflow-y-auto">
      {conversations.map((conv) => {
        const otherId = getOtherParticipant(conv.participants);
        return (
          <button
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={`w-full p-4 text-left border-b border-[#d4d0c8] hover:bg-[#f0ede8] transition-colors ${
              selectedId === conv.id ? 'bg-[#f0ede8]' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-[#e85d04] rounded-full flex items-center justify-center text-white font-medium">
                  {otherId?.slice(0, 2).toUpperCase()}
                </div>
                {conv.unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#e85d04] text-white text-xs rounded-full flex items-center justify-center">
                    {conv.unreadCount}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-[#222]">User</p>
                  <span className="text-xs text-[#6b6b6b]">
                    {formatTime(conv.lastMessageAt)}
                  </span>
                </div>
                <p className="text-sm text-[#6b6b6b] truncate">{conv.lastMessage || 'No messages'}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
