import React from 'react';
import {
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  PlusCircle,
  Clock,
  Trash2,
  ArrowRight,
  TrendingDown,
  Eye,
  Inbox,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MyMaterialsPage: React.FC = () => {
  const {
    listings,
    requests,
    optimizeListing,
    openListingDetails,
    setCurrentPage,
    acceptRequest,
    markAsReused
  } = useApp();

  // Find any listing with high waste risk (e.g. daysListed >= 14 with 0 requests)
  const atRiskListings = listings.filter(
    (item) => item.daysListed >= 14 && item.requestsCount === 0
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-sustain-border shadow-soft">
        <div>
          <h1 className="text-2xl font-black text-sustain-forest tracking-tight">
            My Surplus Inventory
          </h1>
          <p className="text-xs text-sustain-mutedText mt-1">
            Track listed surplus, manage incoming requests, and prevent materials from becoming waste.
          </p>
        </div>
        <button
          onClick={() => setCurrentPage('list-surplus')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-smooth self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>List New Surplus</span>
        </button>
      </div>

      {/* AI WASTE-RISK FEATURE (Section 14) */}
      {atRiskListings.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>AI Waste-Risk Monitor — Immediate Action Recommended</span>
          </div>

          {atRiskListings.map((riskItem) => (
            <div
              key={riskItem.id}
              className="bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-6 shadow-sm space-y-4 animate-in fade-in"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <img
                    src={riskItem.imageUrl}
                    alt={riskItem.title}
                    className="w-16 h-16 rounded-xl object-cover border border-amber-200 shrink-0"
                  />
                  <div>
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-900 text-[10px] font-black uppercase">
                      <AlertTriangle className="w-3 h-3 text-amber-700" />
                      MATERIAL AT RISK
                    </div>
                    <h3 className="text-base font-bold text-amber-950 mt-1">
                      “Your {riskItem.quantityAvailable} leftover {riskItem.title.toLowerCase()} have been listed for {riskItem.daysListed} days and have received no requests.”
                    </h3>
                    <p className="text-xs text-amber-800/80 mt-1">
                      High probability of disposal or water damage if not moved within the next 7 days.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => optimizeListing(riskItem.id)}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold shadow-md transition-smooth active:scale-95 shrink-0 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Optimize Listing</span>
                </button>
              </div>

              {/* AI Strategic Recommendations */}
              <div className="p-4 bg-white/80 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-2">
                <div className="font-bold text-[11px] text-amber-900 uppercase">
                  AI Optimization Strategy:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-amber-900/90">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Reduce unit price by 20% to spark builder interest</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Allow small partial lots (from 1 unit) for DIYers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Offer free donation to community vocational workshops</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Tag alternative applications: bookshelves & garden edging</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Surplus Inventory Listings Table / Cards */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-sustain-forest">
          Active Surplus Material Lots ({listings.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item) => {
            const hasRequests = item.requestsCount > 0;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-sustain-border shadow-soft overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-40 bg-gray-100">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 text-[10px] font-bold text-sustain-forest">
                      {item.category}
                    </div>
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-200 text-[10px] font-bold">
                      Circularity: {item.circularityScore}/100
                    </div>
                    {item.daysListed >= 14 && item.requestsCount === 0 && (
                      <div className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded-md bg-amber-500 text-white text-[10px] font-extrabold">
                        ⚠️ High Waste Risk
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-bold text-sustain-forest line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Available: <strong>{item.quantityAvailable} {item.unit}</strong> • {item.condition}
                    </p>
                    <div className="text-xs text-emerald-700 font-bold">
                      {item.pricePerUnit === 0 ? 'FREE GIVEAWAY' : `₹${item.pricePerUnit} / ${item.unit}`}
                    </div>

                    <div className="pt-2 flex items-center justify-between text-[11px] text-gray-500 border-t border-gray-100">
                      <span>Listed {item.daysListed} days ago</span>
                      <span className="font-semibold text-emerald-800">
                        {item.requestsCount} {item.requestsCount === 1 ? 'request' : 'requests'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-2 border-t border-gray-100 flex gap-2">
                  <button
                    onClick={() => openListingDetails(item.id)}
                    className="flex-1 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-sustain-forest text-xs font-semibold border border-gray-200 transition-colors"
                  >
                    View Details
                  </button>
                  {item.daysListed >= 14 && item.requestsCount === 0 && (
                    <button
                      onClick={() => optimizeListing(item.id)}
                      className="px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors shadow-2xs"
                    >
                      Optimize
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
