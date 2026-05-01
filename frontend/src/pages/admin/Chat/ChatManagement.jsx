import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Paperclip, Smile, CheckCircle2, ArrowLeft, MessageSquare } from 'lucide-react';

const MOCK_CONVERSATIONS = [
  { id: 1, user: { name: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=1', status: 'online' }, lastMessage: 'Can you help me with my booking?', timestamp: '10:30 AM', unread: 2 },
  { id: 2, user: { name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?u=2', status: 'offline' }, lastMessage: 'Thank you so much!', timestamp: 'Yesterday', unread: 0 },
  { id: 3, user: { name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?u=3', status: 'online' }, lastMessage: 'Is the Ha Long tour available next week?', timestamp: 'Yesterday', unread: 0 },
];

const MOCK_MESSAGES = {
  1: [
    { id: 1, sender: 'user', text: 'Hi, I need some help.', timestamp: '10:28 AM' },
    { id: 2, sender: 'admin', text: 'Hello John! How can I assist you today?', timestamp: '10:29 AM' },
    { id: 3, sender: 'user', text: 'Can you help me with my booking?', timestamp: '10:30 AM' },
  ],
  2: [
    { id: 1, sender: 'admin', text: 'Your refund has been processed successfully.', timestamp: 'Yesterday' },
    { id: 2, sender: 'user', text: 'Thank you so much!', timestamp: 'Yesterday' },
  ],
  3: [
    { id: 1, sender: 'user', text: 'Is the Ha Long tour available next week?', timestamp: 'Yesterday' },
  ],
};

const ChatManagement = () => {
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [activeChatId, setActiveChatId] = useState(null);
  const [search, setSearch] = useState('');
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const activeChat = conversations.find(c => c.id === activeChatId);
  const activeMessages = activeChatId ? (messages[activeChatId] || []) : [];

  const filteredConversations = conversations.filter(c => 
    c.user.name.toLowerCase().includes(search.toLowerCase()) || 
    c.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeChatId) {
      scrollToBottom();
      // Mark as read when opened
      setConversations(prev => prev.map(c => c.id === activeChatId ? { ...c, unread: 0 } : c));
    }
  }, [activeChatId, messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeChatId) return;

    const newMessage = {
      id: Date.now(),
      sender: 'admin',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMessage]
    }));

    setConversations(prev => prev.map(c => 
      c.id === activeChatId ? { ...c, lastMessage: inputText, timestamp: newMessage.timestamp } : c
    ));

    setInputText('');
  };

  return (
    <div className="h-[calc(100vh-80px-48px)] flex flex-col animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-4 flex justify-between items-center shrink-0">
        <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
          Chat Management
        </h1>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex min-h-0">
        
        {/* ─── Left Panel: Conversations List ──────────────────────────────────────── */}
        <div className={`w-full md:w-80 lg:w-96 border-r border-gray-100 flex flex-col shrink-0 ${activeChatId ? 'hidden md:flex' : 'flex'}`}>
          {/* Search */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map(conv => (
              <button 
                key={conv.id}
                onClick={() => setActiveChatId(conv.id)}
                className={`w-full p-4 flex items-start gap-3 border-b border-gray-50 transition-colors text-left ${activeChatId === conv.id ? 'bg-[#fcfaf9]' : 'hover:bg-gray-50'}`}
              >
                <div className="relative shrink-0">
                  <img src={conv.user.avatar} alt={conv.user.name} className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${conv.user.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-bold text-slate-800 truncate">{conv.user.name}</h3>
                    <span className="text-[10px] font-semibold text-gray-400 whitespace-nowrap ml-2">{conv.timestamp}</span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
                    {conv.unread > 0 && (
                      <span className="shrink-0 bg-[#e0455d] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
            {filteredConversations.length === 0 && (
              <div className="p-8 text-center text-sm text-gray-400">
                No conversations found.
              </div>
            )}
          </div>
        </div>

        {/* ─── Right Panel: Chat Content ───────────────────────────────────────────── */}
        <div className={`flex-1 flex flex-col min-w-0 ${!activeChatId ? 'hidden md:flex bg-gray-50 items-center justify-center' : 'flex'}`}>
          {!activeChatId ? (
            <div className="text-center text-gray-400">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm font-medium">Select a conversation to start chatting</p>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="h-16 border-b border-gray-100 flex items-center justify-between px-6 shrink-0 bg-white">
                <div className="flex items-center gap-3">
                  <button className="md:hidden p-2 -ml-2 text-gray-400 hover:text-gray-600" onClick={() => setActiveChatId(null)}>
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="relative">
                    <img src={activeChat.user.avatar} alt={activeChat.user.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                    <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${activeChat.user.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-800">{activeChat.user.name}</h2>
                    <p className="text-xs font-semibold text-gray-500 capitalize">{activeChat.user.status}</p>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded-md text-xs font-bold transition-colors">
                  <CheckCircle2 className="w-4 h-4" /> <span className="hidden sm:inline">Mark Resolved</span>
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 bg-[#fafafa]">
                <div className="space-y-4">
                  {activeMessages.map(msg => {
                    const isAdmin = msg.sender === 'admin';
                    return (
                      <div key={msg.id} className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                          isAdmin 
                            ? 'bg-[#7C4A4A] text-white rounded-br-sm shadow-sm' 
                            : 'bg-white border border-gray-100 text-slate-700 rounded-bl-sm shadow-sm'
                        }`}>
                          {msg.text}
                        </div>
                        <span className="text-[10px] font-semibold text-gray-400 mt-1 mx-1">
                          {msg.timestamp}
                        </span>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                  <button type="button" className="p-2 text-gray-400 hover:text-[#7C4A4A] transition-colors shrink-0">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <div className="flex-1 relative">
                    <input 
                      type="text" 
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Type your message..." 
                      className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-100 rounded-full text-sm text-slate-700 outline-none focus:border-[#7C4A4A] focus:bg-white transition-all"
                    />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#7C4A4A] transition-colors">
                      <Smile className="w-5 h-5" />
                    </button>
                  </div>
                  <button 
                    type="submit" 
                    disabled={!inputText.trim()}
                    className="w-10 h-10 rounded-full bg-[#7C4A4A] flex items-center justify-center text-white shrink-0 hover:bg-[#633b3b] disabled:opacity-50 disabled:hover:bg-[#7C4A4A] transition-all shadow-md active:scale-95"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default ChatManagement;
