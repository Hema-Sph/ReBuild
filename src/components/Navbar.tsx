import React, { useState } from 'react';
import {
  Recycle,
  PlusCircle,
  Sparkles,
  Layers,
  BarChart3,
  User,
  Menu,
  X,
  Building2,
  Inbox,
  Briefcase,
  PlayCircle,
  Search,
  Upload,
  ArrowLeftRight,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import { useApp, NavigationPage } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    roleMode,
    setRoleMode,
    setIsRoleModalOpen,
    requests,
    setIsHeroDemoActive,
    messages,
    openMessageCenter
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Count pending or active requests
  const pendingRequestsCount = requests.filter(
    (r) => r.status === 'Requested' || r.status === 'Accepted'
  ).length;

  // Dedicated Nav Items based on Role Mode!
  const supplierNavItems: { id: NavigationPage; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'home', label: 'Home', icon: <Building2 className="w-4 h-4" /> },
    { id: 'list-surplus', label: 'Upload Surplus', icon: <Upload className="w-4 h-4 text-emerald-600" /> },
    { id: 'my-materials', label: 'My Surplus Lots', icon: <Recycle className="w-4 h-4" /> },
    { id: 'my-requests', label: 'Inbound Buyer Requests', icon: <Inbox className="w-4 h-4" />, badge: pendingRequestsCount },
    { id: 'business-dashboard', label: 'Enterprise ESG', icon: <Briefcase className="w-4 h-4 text-blue-600" /> },
    { id: 'marketplace', label: 'Marketplace View', icon: <Layers className="w-4 h-4" /> },
    { id: 'profile', label: 'Contractor Profile', icon: <User className="w-4 h-4" /> },
  ];

  const buyerNavItems: { id: NavigationPage; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'home', label: 'Home', icon: <Building2 className="w-4 h-4" /> },
    { id: 'marketplace', label: 'Find Materials', icon: <Search className="w-4 h-4 text-emerald-600" /> },
    { id: 'my-requests', label: 'My Requests', icon: <Inbox className="w-4 h-4" />, badge: pendingRequestsCount },
    { id: 'ai-assistant', label: 'AI Advisor', icon: <Sparkles className="w-4 h-4 text-purple-600" /> },
    { id: 'impact', label: 'Impact Dashboard', icon: <BarChart3 className="w-4 h-4 text-emerald-600" /> },
    { id: 'profile', label: 'Buyer Profile', icon: <User className="w-4 h-4" /> },
  ];

  const currentNavItems = roleMode === 'supplier' ? supplierNavItems : buyerNavItems;

  const handleNavClick = (page: NavigationPage) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sustain-border shadow-xs">
      {/* Top Prominent Role Mode Indicator Bar */}
      <div className={`py-1 px-4 text-center text-xs font-bold transition-all flex items-center justify-between ${
        roleMode === 'supplier'
          ? 'bg-gradient-to-r from-blue-900 via-sustain-forest to-emerald-950 text-white'
          : 'bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-900 text-white'
      }`}>
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            {roleMode === 'supplier' ? (
              <span className="flex items-center gap-1.5 text-blue-200">
                <Building2 className="w-3.5 h-3.5" />
                <span className="uppercase text-[10px] tracking-wider text-blue-300 font-extrabold">Active Role:</span>
                <strong>Contractor / Supplier Mode (Apex Buildcon)</strong> — Upload & Manage Surplus
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-emerald-200">
                <User className="w-3.5 h-3.5" />
                <span className="uppercase text-[10px] tracking-wider text-emerald-300 font-extrabold">Active Role:</span>
                <strong>Homeowner / Buyer Mode (Priya Sharma)</strong> — Find & Request Small Quantities
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-gray-300 hidden sm:inline">Need to switch?</span>
            <button
              onClick={() => setIsRoleModalOpen(true)}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 hover:bg-white/30 text-[11px] text-white font-bold transition-colors"
            >
              <ArrowLeftRight className="w-3 h-3" />
              <span>Switch to {roleMode === 'supplier' ? 'Buyer Mode' : 'Contractor Mode'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Tagline */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-sustain-forest flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-smooth">
              <Recycle className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-sustain-forest tracking-tight">ReBuild</span>
                <span className={`px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full border ${
                  roleMode === 'supplier'
                    ? 'bg-blue-100 text-blue-900 border-blue-300'
                    : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                }`}>
                  {roleMode === 'supplier' ? 'Supplier Portal' : 'Buyer Portal'}
                </span>
              </div>
              <p className="text-[11px] font-medium text-sustain-mutedText hidden sm:block">
                “Buy only what you need. Sell what you don’t.”
              </p>
            </div>
          </div>

          {/* Desktop Nav Items (Filtered by Role!) */}
          <nav className="hidden lg:flex items-center space-x-1">
            {currentNavItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-smooth relative ${
                    isActive
                      ? roleMode === 'supplier'
                        ? 'bg-blue-50 text-blue-900 border border-blue-200 shadow-xs'
                        : 'bg-emerald-50 text-emerald-900 border border-emerald-200 shadow-xs'
                      : 'text-sustain-darkText/80 hover:text-emerald-700 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge ? (
                    <span className="ml-1 w-4 h-4 flex items-center justify-center text-[10px] font-bold text-white bg-amber-600 rounded-full">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Message Center Button */}
            <button
              onClick={() => openMessageCenter()}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-smooth shadow-xs"
              title="Open Contractor-Buyer Direct Message Center"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Messages</span>
              {messages.length > 0 && (
                <span className="w-4 h-4 flex items-center justify-center text-[10px] font-bold text-white bg-emerald-600 rounded-full">
                  {messages.length}
                </span>
              )}
            </button>

            {/* 30s Hero Demo button */}
            <button
              onClick={() => setIsHeroDemoActive(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 hover:bg-amber-200 transition-smooth shadow-xs"
              title="Run 30-Second Hackathon Demo Walkthrough"
            >
              <PlayCircle className="w-4 h-4 text-amber-700 fill-amber-300" />
              <span>30s Hero Demo</span>
            </button>

            {/* Quick 1-Click Role Switcher Pill */}
            <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200 text-xs">
              <button
                onClick={() => setRoleMode('supplier')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold text-xs transition-all ${
                  roleMode === 'supplier'
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Contractor Mode: Upload & sell surplus materials"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Contractor</span>
              </button>
              <button
                onClick={() => setRoleMode('buyer')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold text-xs transition-all ${
                  roleMode === 'buyer'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Buyer Mode: Find and request small quantities"
              >
                <User className="w-3.5 h-3.5" />
                <span>Buyer</span>
              </button>
            </div>

            {/* Primary Action CTA (Customized per Role!) */}
            {roleMode === 'supplier' ? (
              <button
                onClick={() => handleNavClick('list-surplus')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 shadow-md shadow-blue-700/20 active:scale-95 transition-smooth"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Surplus</span>
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('marketplace')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 active:scale-95 transition-smooth"
              >
                <Search className="w-4 h-4" />
                <span>Find Materials</span>
              </button>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              onClick={() => openMessageCenter()}
              className="relative p-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200"
              title="Message Center"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              {messages.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-[9px] font-bold text-white bg-emerald-600 rounded-full">
                  {messages.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsRoleModalOpen(true)}
              className="px-2 py-1 text-[11px] font-bold rounded-lg border bg-gray-100 text-gray-800"
            >
              {roleMode === 'supplier' ? '🏗️ Contractor' : '🛒 Buyer'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-sustain-darkText hover:bg-gray-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-sustain-border px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-700">Select Mode:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setRoleMode('supplier')}
                className={`px-3 py-1 text-xs rounded-lg font-bold ${
                  roleMode === 'supplier' ? 'bg-blue-700 text-white' : 'bg-white text-gray-700 border'
                }`}
              >
                Contractor (Upload)
              </button>
              <button
                onClick={() => setRoleMode('buyer')}
                className={`px-3 py-1 text-xs rounded-lg font-bold ${
                  roleMode === 'buyer' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700 border'
                }`}
              >
                Buyer (Request)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {currentNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold text-left ${
                  currentPage === item.id
                    ? 'bg-emerald-100 text-emerald-900 font-bold border border-emerald-300'
                    : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge ? (
                  <span className="ml-auto w-4 h-4 flex items-center justify-center text-[10px] font-bold text-white bg-amber-600 rounded-full">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </div>

          <div className="pt-2">
            {roleMode === 'supplier' ? (
              <button
                onClick={() => handleNavClick('list-surplus')}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload New Surplus Batch</span>
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('marketplace')}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Search Surplus Materials Near Me</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
