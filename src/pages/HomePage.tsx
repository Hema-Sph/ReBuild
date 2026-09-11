import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  PlusCircle,
  Search,
  Recycle,
  CheckCircle2,
  TrendingUp,
  Scale,
  Building2,
  Users,
  ShieldCheck,
  PlayCircle,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HomePage: React.FC = () => {
  const {
    setCurrentPage,
    platformStats,
    listings,
    openListingDetails,
    setSearchQuery,
    setIsHeroDemoActive,
    roleMode,
    setRoleMode
  } = useApp();

  const [heroSearchInput, setHeroSearchInput] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearchInput.trim()) {
      setSearchQuery(heroSearchInput.trim());
      setCurrentPage('marketplace');
    } else {
      setCurrentPage('marketplace');
    }
  };

  const featuredListings = listings.slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* EXPLICIT ROLE SELECTOR CARDS (Contractor vs Buyer) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-2">
        <div className="text-center mb-4">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            Select Your Role to Personalize the Platform
          </span>
          <h2 className="text-lg sm:text-xl font-black text-sustain-forest mt-2">
            Are you uploading surplus or looking to buy small quantities?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Option 1: Contractor / Supplier */}
          <div
            onClick={() => setRoleMode('supplier')}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
              roleMode === 'supplier'
                ? 'bg-blue-50/90 border-blue-600 ring-2 ring-blue-500/20 shadow-md'
                : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              roleMode === 'supplier' ? 'bg-blue-700 text-white shadow-xs' : 'bg-blue-100 text-blue-800'
            }`}>
              <Building2 className="w-6 h-6" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">I am a Supplier</span>
                {roleMode === 'supplier' && (
                  <span className="px-2 py-0.5 rounded-full bg-blue-700 text-white text-[10px] font-black uppercase">
                    Active
                  </span>
                )}
              </div>
              <h3 className="text-base font-black text-sustain-forest">Contractor / Builder</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                I have leftover tiles, timber, bricks, or cement to <strong>upload, list, and sell</strong>.
              </p>
              <div className="pt-2 text-[11px] font-bold text-blue-700 flex items-center gap-1">
                <span>Upload & Manage Surplus Lots</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Option 2: Buyer / Homeowner */}
          <div
            onClick={() => setRoleMode('buyer')}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
              roleMode === 'buyer'
                ? 'bg-emerald-50/90 border-emerald-600 ring-2 ring-emerald-500/20 shadow-md'
                : 'bg-white border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              roleMode === 'buyer' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-emerald-100 text-emerald-800'
            }`}>
              <Users className="w-6 h-6" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">I am a Buyer</span>
                {roleMode === 'buyer' && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase">
                    Active
                  </span>
                )}
              </div>
              <h3 className="text-base font-black text-sustain-forest">Homeowner / Repairer</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                I need a small quantity (e.g. 12 tiles) to <strong>request and reuse</strong>.
              </p>
              <div className="pt-2 text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                <span>Find & Request Small Batches</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HERO SECTION DYNAMIC TO ROLE */}
      <section className="relative pt-4 sm:pt-8 pb-8 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6">
          {/* CONTRACTOR SPECIFIC HERO */}
          {roleMode === 'supplier' ? (
            <div className="space-y-6 animate-in fade-in">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-900 border border-blue-300 text-xs font-bold shadow-xs">
                <Building2 className="w-4 h-4 text-blue-700" />
                <span>Contractor & Enterprise Surplus Portal (Apex Buildcon)</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-sustain-forest tracking-tight leading-[1.12]">
                Turn job-site surplus into <br className="hidden sm:inline" />
                <span className="text-blue-700 underline decoration-blue-400 decoration-wavy decoration-2">
                  revenue and zero waste.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-sustain-mutedText max-w-3xl mx-auto font-normal leading-relaxed">
                ReBuild empowers contractors and builders to upload leftover materials, get instant AI circularity analysis, avoid disposal dump fees, and match local buyers.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
                <button
                  onClick={() => setCurrentPage('list-surplus')}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold shadow-lg shadow-blue-700/20 hover:scale-[1.02] active:scale-95 transition-smooth"
                >
                  <PlusCircle className="w-5 h-5 text-blue-200" />
                  <span>Upload Surplus Material Now</span>
                </button>

                <button
                  onClick={() => setCurrentPage('my-materials')}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-sustain-forest text-sm font-bold border border-sustain-border shadow-sm hover:scale-[1.02] active:scale-95 transition-smooth"
                >
                  <Recycle className="w-5 h-5 text-emerald-600" />
                  <span>My Surplus Lots & AI Waste Risk</span>
                </button>

                <button
                  onClick={() => setCurrentPage('business-dashboard')}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-blue-50 text-blue-900 text-sm font-bold border border-blue-200 hover:bg-blue-100 transition-smooth"
                >
                  <Scale className="w-5 h-5 text-blue-600" />
                  <span>Enterprise ESG Analytics</span>
                </button>

                <button
                  onClick={() => setIsHeroDemoActive(true)}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-extrabold shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-smooth"
                >
                  <PlayCircle className="w-5 h-5 fill-white text-amber-500" />
                  <span>30s Hero Demo Flow</span>
                </button>
              </div>
            </div>
          ) : (
            /* BUYER SPECIFIC HERO */
            <div className="space-y-6 animate-in fade-in">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-900 border border-emerald-300 text-xs font-bold shadow-xs">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>Homeowner & Repair Small-Batch Marketplace</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-sustain-forest tracking-tight leading-[1.12]">
                Buy only what you need. <br className="hidden sm:inline" />
                <span className="text-emerald-700 underline decoration-emerald-400 decoration-wavy decoration-2">
                  Save 60–80% on home repairs.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-sustain-mutedText max-w-3xl mx-auto font-normal leading-relaxed">
                Need only 12 tiles, 5 bricks, or a short PVC pipe? Don't buy a whole 50-piece carton at retail. ReBuild matches you with local contractors with exact leftovers.
              </p>

              {/* Natural language instant search prompt in Hero */}
              <form
                onSubmit={handleHeroSearch}
                className="mt-6 max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-xl shadow-sustain-forest/5 border border-sustain-border flex flex-col sm:flex-row items-center gap-2"
              >
                <div className="flex items-center gap-2.5 px-3 flex-1 w-full">
                  <Search className="w-5 h-5 text-emerald-600 shrink-0" />
                  <input
                    type="text"
                    value={heroSearchInput}
                    onChange={(e) => setHeroSearchInput(e.target.value)}
                    placeholder="Try: “I need 12 white bathroom tiles under ₹500”"
                    className="w-full py-2 text-sm bg-transparent text-sustain-darkText focus:outline-none placeholder:text-gray-400 font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-smooth shadow-md flex items-center justify-center gap-2 shrink-0"
                >
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  <span>Smart Search</span>
                </button>
              </form>

              {/* Quick query pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-sustain-mutedText">
                <span className="font-semibold text-gray-500">Popular Repair Needs:</span>
                <button
                  onClick={() => {
                    setSearchQuery('I need around 10–15 tiles for a bathroom repair under ₹500');
                    setCurrentPage('marketplace');
                  }}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-emerald-50 border border-gray-200 text-sustain-forest hover:border-emerald-300 transition-colors font-medium text-[11px]"
                >
                  Bathroom repair (12 tiles)
                </button>
                <button
                  onClick={() => {
                    setSearchQuery('20 wooden boards for shop renovation');
                    setCurrentPage('marketplace');
                  }}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-emerald-50 border border-gray-200 text-sustain-forest hover:border-emerald-300 transition-colors font-medium text-[11px]"
                >
                  20 wooden boards
                </button>
                <button
                  onClick={() => {
                    setSearchQuery('50 bricks for garden wall');
                    setCurrentPage('marketplace');
                  }}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-emerald-50 border border-gray-200 text-sustain-forest hover:border-emerald-300 transition-colors font-medium text-[11px]"
                >
                  50 bricks for garden
                </button>
              </div>

              {/* Primary CTA buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
                <button
                  onClick={() => setCurrentPage('marketplace')}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-lg shadow-emerald-600/20 hover:scale-[1.02] active:scale-95 transition-smooth"
                >
                  <Search className="w-5 h-5 text-emerald-200" />
                  <span>Find Materials Near You</span>
                </button>

                <button
                  onClick={() => setCurrentPage('ai-assistant')}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-sustain-forest text-sm font-bold border border-sustain-border shadow-sm hover:scale-[1.02] active:scale-95 transition-smooth"
                >
                  <HelpCircle className="w-5 h-5 text-emerald-600" />
                  <span>Ask AI Advisor</span>
                </button>

                <button
                  onClick={() => setIsHeroDemoActive(true)}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-extrabold shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-smooth"
                >
                  <PlayCircle className="w-5 h-5 fill-white text-amber-500" />
                  <span>30s Hero Demo Flow</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* VISUAL CIRCULAR FLOW */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-sustain-deep via-sustain-forest to-emerald-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Closed-Loop System
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 text-white tracking-tight">
              The ReBuild Circular Flow
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-2">
              Transforming leftover construction batches into high-demand small repair resources.
            </p>
          </div>

          {/* Flow Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-smooth flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center font-black text-sm mb-3">
                  01
                </div>
                <h3 className="text-base font-bold text-white mb-1">BUILD</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Construction and remodeling projects inevitably order surplus buffers to prevent downtime.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-semibold text-emerald-300">
                10-20% avg batch buffer
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-smooth flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-black text-sm mb-3">
                  02
                </div>
                <h3 className="text-base font-bold text-white mb-1">SURPLUS</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Remaining materials like tiles, wood, pipes, and fixtures sit in warehouses or risk disposal.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-semibold text-amber-300">
                Potential waste lot
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 hover:bg-emerald-500/25 transition-smooth flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-400 text-sustain-deep flex items-center justify-center font-black text-sm mb-3">
                  03
                </div>
                <h3 className="text-base font-bold text-white mb-1">REBUILD AI</h3>
                <p className="text-xs text-gray-200 leading-relaxed">
                  AI analyzes condition, scores circularity (0-100), and matches small-batch buyers nearby.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-semibold text-emerald-200">
                AI Match & Optimization
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-smooth flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-lime-400/20 text-lime-300 flex items-center justify-center font-black text-sm mb-3">
                  04
                </div>
                <h3 className="text-base font-bold text-white mb-1">NEXT USER</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Homeowner or artisan reuses exact small quantity. Waste is diverted, costs cut by 60%.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-semibold text-lime-300">
                Zero landfill impact
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM IMPACT STATISTICS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Scale className="w-3.5 h-3.5 text-emerald-600" />
            <span>Measurable Circular Impact (Live Platform Demo Data)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-sustain-forest mt-2">
            Every transaction prevents physical waste
          </h2>
          <p className="text-xs text-gray-500 mt-1 max-w-lg mx-auto">
            Metrics dynamically update when transactions are completed. Clearly labelled as verified platform estimates.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Stat 1 */}
          <div className="p-6 rounded-2xl bg-white border border-sustain-border shadow-soft flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <Scale className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-sustain-forest">
              {platformStats.totalKgDiverted.toLocaleString()} kg
            </div>
            <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mt-1">
              Waste Diverted
            </div>
            <div className="text-[11px] text-gray-400 mt-1">
              Material prevented from dumps
            </div>
          </div>

          {/* Stat 2 */}
          <div className="p-6 rounded-2xl bg-white border border-sustain-border shadow-soft flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
              <Recycle className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-sustain-forest">
              {platformStats.totalKgRecirculated.toLocaleString()} kg
            </div>
            <div className="text-xs font-bold text-blue-800 uppercase tracking-wider mt-1">
              Material Recirculated
            </div>
            <div className="text-[11px] text-gray-400 mt-1">
              Active circular life-extension
            </div>
          </div>

          {/* Stat 3 */}
          <div className="p-6 rounded-2xl bg-white border border-sustain-border shadow-soft flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-sustain-forest">
              {platformStats.successfulMatches.toLocaleString()}
            </div>
            <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mt-1">
              Reuse Matches
            </div>
            <div className="text-[11px] text-gray-400 mt-1">
              Local supplier & buyer pairs
            </div>
          </div>

          {/* Stat 4 */}
          <div className="p-6 rounded-2xl bg-white border border-sustain-border shadow-soft flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center mb-3">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-sustain-forest">
              ₹{(platformStats.totalUserSavingsRupees / 100000).toFixed(1)}L
            </div>
            <div className="text-xs font-bold text-green-800 uppercase tracking-wider mt-1">
              User Savings
            </div>
            <div className="text-[11px] text-gray-400 mt-1">
              Avoided retail markup expenses
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => setCurrentPage('impact')}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 underline underline-offset-4"
          >
            <span>Explore deep impact metrics and category breakdowns</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* HOW REBUILD WORKS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
            Simplicity by Design
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-sustain-forest mt-1">
            How ReBuild Works
          </h2>
          <p className="text-sm text-gray-600 mt-2 max-w-lg mx-auto">
            From listing leftover construction surplus to local handover in four straightforward steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-2xl border border-sustain-border shadow-soft flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 font-extrabold text-sm flex items-center justify-center mb-4">
                Step 1
              </div>
              <h3 className="text-lg font-bold text-sustain-forest mb-2">List</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Upload a photo and details of your surplus construction material in less than 60 seconds.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-emerald-700 font-semibold">
              Sell, Give, or Exchange
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-2xl border border-sustain-border shadow-soft flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-800 font-extrabold text-sm flex items-center justify-center mb-4">
                Step 2
              </div>
              <h3 className="text-lg font-bold text-sustain-forest mb-2">AI Understands</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                AI identifies the material, condition, calculates a circularity score, and maps 5 second-life pathways.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-purple-700 font-semibold">
              Circularity Score 0-100
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-2xl border border-sustain-border shadow-soft flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 font-extrabold text-sm flex items-center justify-center mb-4">
                Step 3
              </div>
              <h3 className="text-lg font-bold text-sustain-forest mb-2">AI Matches</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                The platform matches nearby buyers looking for small batches using natural language search.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-blue-700 font-semibold">
              Local radius & carbon scoring
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-6 rounded-2xl border border-sustain-border shadow-soft flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-lime-50 text-lime-800 font-extrabold text-sm flex items-center justify-center mb-4">
                Step 4
              </div>
              <h3 className="text-lg font-bold text-sustain-forest mb-2">Reuse</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                The material reaches its next user instead of becoming waste. Impact dashboard records kg diverted.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-lime-700 font-semibold">
              Verifiable waste diversion
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED MARKETPLACE PREVIEW */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <span>Nearby Surplus Inventory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-sustain-forest mt-2">
              Featured Surplus Ready for Immediate Reuse
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('marketplace')}
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
          >
            <span>View all 15 listings</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredListings.map((listing) => (
            <div
              key={listing.id}
              onClick={() => openListingDetails(listing.id)}
              className="bg-white rounded-2xl border border-sustain-border shadow-soft overflow-hidden hover:shadow-card hover:-translate-y-1 transition-smooth cursor-pointer flex flex-col"
            >
              <div className="relative h-44 overflow-hidden bg-gray-100">
                <img
                  src={listing.imageUrl}
                  alt={listing.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-extrabold text-sustain-forest border border-white/50">
                  {listing.category}
                </div>
                <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-emerald-900/85 backdrop-blur-md text-[10px] font-bold text-emerald-200 border border-emerald-500/30">
                  Score: {listing.circularityScore}/100
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-sustain-forest line-clamp-1">
                    {listing.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {listing.quantityAvailable} {listing.unit} available • {listing.condition}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {listing.distanceKm} km away • {listing.location.split(',')[0]}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-extrabold text-sustain-forest">
                      {listing.pricePerUnit === 0 ? 'FREE' : `₹${listing.pricePerUnit}/${listing.unit}`}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-0.5">
                    <span>Details</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROMPT CALLOUT FOR JUDGES / DEMO */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-6">
        <div className="bg-amber-50 rounded-2xl p-6 sm:p-8 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-200/70 text-amber-900 text-xs font-bold">
              <PlayCircle className="w-4 h-4 text-amber-700" />
              <span>Hackathon Evaluation Scenario</span>
            </div>
            <h3 className="text-xl font-bold text-amber-950">
              Experience the 30-Second Hero Circular Flow
            </h3>
            <p className="text-xs text-amber-800/80 max-w-xl leading-relaxed">
              Witness how Apex Buildcon's 500 surplus tiles are analyzed by AI, matched to Priya's 12-tile bathroom repair request, accepted, and recorded on the live Impact Dashboard.
            </p>
          </div>
          <button
            onClick={() => setIsHeroDemoActive(true)}
            className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md shadow-amber-600/20 whitespace-nowrap transition-smooth active:scale-95"
          >
            Launch 30s Demo Modal
          </button>
        </div>
      </section>
    </div>
  );
};
