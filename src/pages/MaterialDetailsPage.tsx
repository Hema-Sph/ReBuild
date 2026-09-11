import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Send,
  MessageSquare,
  Clock,
  CheckCircle2,
  Share2,
  Phone,
  Layers,
  Scale,
  Building2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { evaluateSustainabilityBenefit } from '../services/sustainabilityIntelligence';

export const MaterialDetailsPage: React.FC = () => {
  const {
    selectedListingId,
    listings,
    setCurrentPage,
    createRequest,
    showToast,
    roleMode,
    setRoleMode,
    optimizeListing
  } = useApp();

  const listing = listings.find((l) => l.id === selectedListingId) || listings[0];

  // Request modal state
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestQty, setRequestQty] = useState<number>(12);
  const [intendedUse, setIntendedUse] = useState<string>('Small bathroom floor tile replacement');

  // Seller contact modal state
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState<string>('Hi, is this surplus batch still available for local pickup today?');

  if (!listing) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-sustain-forest">Listing not found</h2>
        <button
          onClick={() => setCurrentPage('marketplace')}
          className="mt-4 text-xs font-bold text-emerald-700 underline"
        >
          Return to Marketplace
        </button>
      </div>
    );
  }

  const sustainability = evaluateSustainabilityBenefit({
    category: listing.category,
    quantity: requestQty,
    unitPrice: listing.pricePerUnit,
    distanceKm: listing.distanceKm,
    weightKgPerUnit: listing.weightKgPerUnit
  });

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    createRequest(listing.id, requestQty, intendedUse);
    setIsRequestModalOpen(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Message sent to ${listing.sellerName}!`, 'info');
    setIsContactModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Back button */}
      <button
        onClick={() => setCurrentPage('marketplace')}
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-sustain-forest transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Marketplace</span>
      </button>

      {/* Main Hero Card */}
      <div className="bg-white rounded-3xl border border-sustain-border shadow-soft overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Image side */}
        <div className="lg:col-span-6 relative h-80 lg:h-auto min-h-[380px] bg-gray-100">
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-1.5">
            <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-extrabold text-sustain-forest border border-gray-200">
              {listing.category}
            </span>
            {listing.actionType === 'Give' && (
              <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-black uppercase">
                FREE GIVEAWAY
              </span>
            )}
            {listing.actionType === 'Exchange' && (
              <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-black uppercase">
                EXCHANGE
              </span>
            )}
          </div>

          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-sustain-deep/90 backdrop-blur-md text-emerald-300 text-xs font-black border border-emerald-500/40">
            Circularity Score: {listing.circularityScore}/100
          </div>
        </div>

        {/* Details side */}
        <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                {listing.sellerType} • Listed {listing.daysListed} days ago
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-sustain-forest mt-1 tracking-tight leading-snug">
                {listing.title}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-3xl font-black text-sustain-forest">
                {listing.pricePerUnit === 0
                  ? 'FREE'
                  : `₹${listing.pricePerUnit}`}
                {listing.pricePerUnit > 0 && (
                  <span className="text-xs font-medium text-gray-500"> /{listing.unit}</span>
                )}
              </div>
              <div className="text-xs px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold">
                {listing.quantityAvailable} {listing.unit} available
              </div>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-gray-100 text-xs">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Condition</span>
                <span className="font-bold text-gray-800">{listing.condition}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Location</span>
                <span className="font-bold text-gray-800 truncate block">
                  {listing.location.split(',')[0]} ({listing.distanceKm} km)
                </span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Seller</span>
                <span className="font-bold text-gray-800">{listing.sellerName}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Min Lot</span>
                <span className="font-bold text-gray-800">{listing.minQuantityAllowed} {listing.unit}</span>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              {listing.description}
            </p>
          </div>

          {/* Action CTAs: Dedicated by Role */}
          <div className="space-y-3 pt-4">
            {roleMode === 'buyer' ? (
              <div className="space-y-2">
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsRequestModalOpen(true)}
                    className="flex-1 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 active:scale-95 transition-smooth flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Request Material (Select Qty)</span>
                  </button>
                  <button
                    onClick={() => setIsContactModalOpen(true)}
                    className="px-4 py-3.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold transition-smooth flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Message Seller</span>
                  </button>
                </div>
                <p className="text-[10px] text-center text-gray-400">
                  Buyer Mode: Request exact small batch without buying full wholesale boxes.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-950 space-y-2">
                  <div className="font-bold flex items-center gap-1.5 text-blue-900">
                    <Building2 className="w-4 h-4 text-blue-700" />
                    <span>Contractor / Supplier Mode Active</span>
                  </div>
                  <p className="text-[11px] text-blue-800">
                    You are viewing this lot as a contractor. To request small-batch materials for a personal repair project, switch to Buyer Mode.
                  </p>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => {
                        setRoleMode('buyer');
                        setIsRequestModalOpen(true);
                      }}
                      className="px-3.5 py-2 rounded-lg bg-blue-700 text-white text-xs font-bold hover:bg-blue-800 transition-colors shadow-xs"
                    >
                      Switch to Buyer Mode & Request
                    </button>
                    {listing.sellerName.includes('Apex') && (
                      <button
                        onClick={() => optimizeListing(listing.id)}
                        className="px-3.5 py-2 rounded-lg bg-white border border-blue-300 text-blue-900 text-xs font-bold hover:bg-blue-50 transition-colors"
                      >
                        Optimize Lot (AI Discount)
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid: Material Lifecycle + Sustainability Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Material Lifecycle */}
        <div className="bg-white rounded-2xl p-6 border border-sustain-border shadow-soft space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Layers className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-sustain-forest">
              Material Lifecycle
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-[10px] font-bold text-gray-400 uppercase block">Original Use</span>
              <div className="text-gray-800 font-semibold mt-0.5">{listing.originalUse}</div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <span className="text-[10px] font-bold text-emerald-700 uppercase block">Current Status</span>
              <div className="text-emerald-950 font-bold mt-0.5">
                Surplus (Ready for second-life matching)
              </div>
            </div>

            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
              <span className="text-[10px] font-bold text-blue-700 uppercase block">Recommended Second Use</span>
              <div className="text-blue-950 font-semibold mt-0.5">
                {listing.recommendedSecondUse}
              </div>
            </div>

            <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
              <span className="text-[10px] font-bold text-purple-700 uppercase block">Estimated Lifespan Extension</span>
              <div className="text-purple-950 font-semibold mt-0.5">
                {listing.potentialLifespanExtension}
              </div>
            </div>
          </div>
        </div>

        {/* Sustainability Intelligence & Circularity Score */}
        <div className="bg-white rounded-2xl p-6 border border-sustain-border shadow-soft space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-sustain-forest">
                  Circularity & Sustainability
                </h3>
              </div>
              <span className="text-base font-black text-emerald-700">
                {listing.circularityScore} / 100
              </span>
            </div>

            <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
              “This platform score estimates reuse potential based on condition, local demand, quantity and material characteristics. It is not an industry certification.”
            </p>

            {/* Sustainability Badge */}
            <div className="mt-4 p-4 rounded-xl border space-y-2 bg-emerald-50/80 border-emerald-200 text-xs">
              <div className="flex items-center gap-2 font-bold text-emerald-900">
                {sustainability.status === 'DISTANCE_WARNING' ? (
                  <>
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>{sustainability.headline}</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>LOCAL REUSE RECOMMENDED</span>
                  </>
                )}
              </div>
              <p className="text-[11px] text-gray-700 leading-relaxed">
                {sustainability.explanation}
              </p>
            </div>

            {/* Safety Warning if critical */}
            {listing.isSafetyCritical && (
              <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Safety Verification Notice:</strong>
                  <span>{listing.safetyWarning}</span>
                </div>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Estimated Weight: {listing.weightKgPerUnit} kg/{listing.unit}</span>
            <span className="text-emerald-700 font-semibold">Zero Landfill Goal</span>
          </div>
        </div>
      </div>

      {/* REQUEST MODAL */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-sustain-border overflow-hidden">
            <div className="p-5 bg-sustain-forest text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Create Surplus Request
              </span>
              <h3 className="text-base font-bold text-white mt-1">
                {listing.title}
              </h3>
            </div>

            <form onSubmit={handleSendRequest} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 flex justify-between">
                  <span>Quantity You Need ({listing.unit})</span>
                  <span className="text-gray-400 font-normal">Available: {listing.quantityAvailable}</span>
                </label>
                <input
                  type="number"
                  min={listing.minQuantityAllowed}
                  max={listing.quantityAvailable}
                  value={requestQty}
                  onChange={(e) => setRequestQty(Math.max(1, Number(e.target.value)))}
                  className="w-full text-sm p-3 rounded-xl border border-gray-200 bg-gray-50 font-bold focus:bg-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">
                  Intended Application / Repair Purpose
                </label>
                <textarea
                  rows={2}
                  value={intendedUse}
                  onChange={(e) => setIntendedUse(e.target.value)}
                  placeholder="e.g. 12 tiles for bathroom repair..."
                  className="w-full text-xs p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs space-y-1">
                <div className="flex justify-between font-semibold text-emerald-950">
                  <span>Estimated Total:</span>
                  <span>₹{(listing.pricePerUnit * requestQty).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] text-gray-600">
                  <span>Potential Waste Diverted:</span>
                  <span className="font-bold text-emerald-800">
                    {(requestQty * listing.weightKgPerUnit).toFixed(1)} kg
                  </span>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsRequestModalOpen(false)}
                  className="w-1/2 py-2.5 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONTACT MODAL */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-sustain-border overflow-hidden">
            <div className="p-5 bg-sustain-forest text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Direct Message Seller
              </span>
              <h3 className="text-base font-bold text-white mt-1">
                {listing.sellerName}
              </h3>
            </div>

            <form onSubmit={handleSendMessage} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Message</label>
                <textarea
                  rows={3}
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Seller Phone: {listing.sellerPhone || '+91 98765 43210'}</span>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(false)}
                  className="w-1/2 py-2.5 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
