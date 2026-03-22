'use client';

import { useState } from 'react';
import { conversations, messages, users, bookings } from '@/lib/data';

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');

  const getOtherUser = (participantIds: string[]) => {
    const otherId = participantIds.find(id => id !== '1');
    return users.find(u => u.id === otherId);
  };

  const conversationMessages = messages.filter(m => m.conversationId === activeConversation.id);
  const otherUser = getOtherUser(activeConversation.participants);
  const booking = bookings.find(b => b.id === activeConversation.bookingId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    alert(`Message sent: ${newMessage}`);
    setNewMessage('');
  };

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <div className="bg-[#1a1a1a] py-6">
        <div className="container-main">
          <h1 className="text-2xl text-white" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
            Messages
          </h1>
        </div>
      </div>

      <div className="container-main py-6">
        <div className="bg-white border-2 border-[#d4d0c8] rounded-lg overflow-hidden" style={{ height: 'calc(100vh - 220px)', minHeight: '500px' }}>
          <div className="grid md:grid-cols-3 h-full">
            <div className="border-r border-[#d4d0c8]">
              <div className="p-4 border-b border-[#d4d0c8]">
                <input 
                  type="text" 
                  placeholder="Search messages..." 
                  className="w-full px-4 py-2 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04] text-sm"
                />
              </div>
              
              <div className="overflow-y-auto" style={{ height: 'calc(100% - 60px)' }}>
                {conversations.map((conv) => {
                  const user = getOtherUser(conv.participants);
                  return (
                    <button
                      key={conv.id}
                      onClick={() => setActiveConversation(conv)}
                      className={`w-full p-4 text-left border-b border-[#d4d0c8] hover:bg-[#f0ede8] transition-colors ${
                        activeConversation.id === conv.id ? 'bg-[#f0ede8]' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img 
                            src={user?.avatar} 
                            alt={user?.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          {conv.unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#e85d04] text-white text-xs rounded-full flex items-center justify-center">
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-[#222]">{user?.name}</p>
                            <span className="text-xs text-[#6b6b6b]">
                              {new Date(conv.lastMessageAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-[#6b6b6b] truncate">{conv.lastMessage}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col">
              <div className="p-4 border-b border-[#d4d0c8] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={otherUser?.avatar} 
                    alt={otherUser?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-[#222]">{otherUser?.name}</p>
                    {booking && (
                      <p className="text-xs text-[#6b6b6b]">
                        Booking: {booking.startDate} - {booking.endDate}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-[#f0ede8] rounded-full transition-colors">
                    <svg className="w-5 h-5 text-[#6b6b6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-[#f0ede8] rounded-full transition-colors">
                    <svg className="w-5 h-5 text-[#6b6b6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ height: 'calc(100% - 130px)' }}>
                {conversationMessages.map((msg) => {
                  const isSent = msg.senderId === '1';
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
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 border-t border-[#d4d0c8]">
                <form onSubmit={handleSend} className="flex gap-2">
                  <button type="button" className="p-2 hover:bg-[#f0ede8] rounded-full transition-colors">
                    <svg className="w-5 h-5 text-[#6b6b6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <input 
                    type="text" 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..." 
                    className="flex-1 px-4 py-2 border-2 border-[#d4d0c8] rounded-full focus:outline-none focus:border-[#e85d04]"
                  />
                  <button 
                    type="submit"
                    className="p-2 bg-[#e85d04] text-white rounded-full hover:bg-[#d14f00] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
