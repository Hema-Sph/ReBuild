import React, { useState } from 'react';
import {
  X,
  Send,
  MessageSquare,
  Building2,
  User,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MessageCenterModal: React.FC = () => {
  const {
    isMessageCenterOpen,
    setIsMessageCenterOpen,
    messages,
    sendMessage,
    activeMessageListingId,
    openMessageCenter,
    listings,
    roleMode
  } = useApp();

  const [inputMessage, setInputMessage] = useState<string>('');

  if (!isMessageCenterOpen) return null;

  // Distinct listings present in messages or active listing
  const activeId = activeMessageListingId || (messages.length > 0 ? messages[messages.length - 1].listingId : listings[0]?.id);
  const currentListing = listings.find((l) => l.id === activeId) || listings[0];

  // Group messages for the current listing
  const currentThread = messages.filter((m) => m.listingId === currentListing?.id);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !currentListing) return;

    sendMessage(
      currentListing.id,
      currentListing.title,
      roleMode === 'buyer' ? currentListing.sellerName : 'Priya Sharma (Buyer)',
      inputMessage.trim()
    );
    setInputMessage('');
  };

  const handleQuickTemplate = (template: string) => {
    setInputMessage(template);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-sustain-border overflow-hidden flex flex-col h-[600px] max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-sustain-forest text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                  Circular Materials Message Center
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-700/80 text-[10px] font-bold">
                  {roleMode === 'buyer' ? 'Chat with Contractor' : 'Chat with Buyer'}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                {currentListing ? currentListing.title : 'Pickup Coordination'}
              </h3>
            </div>
          </div>
          <button
            onClick={() => setIsMessageCenterOpen(false)}
            className="text-gray-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Listing Mini Bar */}
        {currentListing && (
          <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200 flex items-center justify-between text-xs gap-3 shrink-0">
            <div className="flex items-center gap-2 truncate">
              <img
                src={currentListing.imageUrl}
                alt={currentListing.title}
                className="w-8 h-8 rounded-lg object-cover border"
              />
              <div className="truncate">
                <span className="font-bold text-sustain-forest block truncate">
                  {currentListing.sellerName}
                </span>
                <span className="text-[10px] text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  {currentListing.location.split(',')[0]} ({currentListing.distanceKm} km away)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 text-[11px]">
              <div className="text-right">
                <span className="text-gray-400 block text-[9px] uppercase font-bold">Available</span>
                <span className="font-bold text-emerald-700">
                  {currentListing.quantityAvailable} {currentListing.unit}
                </span>
              </div>
              {currentListing.sellerPhone && (
                <a
                  href={`tel:${currentListing.sellerPhone}`}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-gray-300 hover:border-emerald-500 text-gray-700 font-semibold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">{currentListing.sellerPhone}</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Conversation Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-gray-50/50">
          {currentThread.length === 0 ? (
            <div className="text-center py-12 text-xs text-gray-400 space-y-2">
              <MessageSquare className="w-8 h-8 mx-auto text-gray-300" />
              <p>No messages yet for this material batch.</p>
              <p className="text-[11px] text-gray-400">
                Ask about pickup timing, exact lot condition, or site access!
              </p>
            </div>
          ) : (
            currentThread.map((msg) => {
              const isMine =
                (roleMode === 'buyer' && msg.senderRole === 'buyer') ||
                (roleMode === 'supplier' && msg.senderRole === 'supplier');

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-[10px] text-gray-400 px-1">
                    <span className="font-bold text-gray-600">{msg.senderName}</span>
                    <span>•</span>
                    <span>
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                      isMine
                        ? 'bg-emerald-600 text-white rounded-br-xs'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Quick Question Chips */}
        <div className="px-4 py-2 bg-white border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto text-[11px] shrink-0 no-scrollbar">
          <span className="text-[10px] font-bold uppercase text-gray-400 shrink-0">Quick Ask:</span>
          <button
            type="button"
            onClick={() => handleQuickTemplate('Hi! Is this surplus batch available for pickup today?')}
            className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-emerald-50 hover:text-emerald-800 border border-gray-200 text-gray-600 transition-colors whitespace-nowrap shrink-0"
          >
            Pickup today?
          </button>
          <button
            type="button"
            onClick={() => handleQuickTemplate('Can I inspect and take only 12 pieces from this lot?')}
            className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-emerald-50 hover:text-emerald-800 border border-gray-200 text-gray-600 transition-colors whitespace-nowrap shrink-0"
          >
            Split lot confirmation
          </button>
          <button
            type="button"
            onClick={() => handleQuickTemplate('What are your site gate hours and pickup address?')}
            className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-emerald-50 hover:text-emerald-800 border border-gray-200 text-gray-600 transition-colors whitespace-nowrap shrink-0"
          >
            Gate hours & address
          </button>
        </div>

        {/* Compose Input Form */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex gap-2 shrink-0">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message to coordinate pickup or material specs..."
            className="flex-1 text-xs p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-emerald-500 font-medium"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-600/20 active:scale-95 transition-smooth flex items-center justify-center gap-1.5 shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
