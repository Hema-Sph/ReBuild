import React from 'react';
import {
  Building2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Download,
  PlusCircle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Search,
  Scale
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BusinessDashboardPage: React.FC = () => {
  const {
    listings,
    requests,
    setCurrentPage,
    openListingDetails,
    optimizeListing,
    showToast
  } = useApp();

  // Filter listings held by contractor / business
  const contractorListings = listings.filter(
    (l) => l.sellerType === 'Construction Company' || l.sellerType === 'Contractor' || l.sellerType === 'Builder'
  );

  const totalBusinessKgDiverted = 4120;
  const totalBusinessMatches = 184;
  const totalBusinessDisposalFeesSaved = 142000;

  const handleExportESG = () => {
    showToast('ESG Circular Compliance Report generated and downloaded (PDF/CSV)!', 'success');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-sustain-deep to-sustain-forest text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <Building2 className="w-4 h-4" />
            <span>Commercial Builder & Contractor ESG Suite</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Apex Buildcon Enterprise Portal
          </h1>
          <p className="text-xs text-gray-300 max-w-lg leading-relaxed">
            Manage commercial job-site surplus, monitor disposal risk timelines, match regional repair demand, and audit circular compliance.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 self-start md:self-auto">
          <button
            onClick={() => setCurrentPage('list-surplus')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-smooth"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List Commercial Lot</span>
          </button>
          <button
            onClick={handleExportESG}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-smooth"
          >
            <Download className="w-4 h-4" />
            <span>Export ESG Report</span>
          </button>
        </div>
      </div>

      {/* ESG IMPACT OVERVIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-white border border-sustain-border shadow-soft flex flex-col justify-between">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Commercial Waste Diverted
          </div>
          <div className="text-3xl font-black text-sustain-forest mt-1">
            {totalBusinessKgDiverted.toLocaleString()} kg
          </div>
          <div className="mt-3 text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Exceeds Q3 Green Building Target</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-sustain-border shadow-soft flex flex-col justify-between">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Completed Circular Matches
          </div>
          <div className="text-3xl font-black text-sustain-forest mt-1">
            {totalBusinessMatches}
          </div>
          <div className="mt-3 text-xs text-blue-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Reaching 92% local community buyers</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-sustain-border shadow-soft flex flex-col justify-between">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Avoided Debris Hauling Fees
          </div>
          <div className="text-3xl font-black text-sustain-forest mt-1">
            ₹{(totalBusinessDisposalFeesSaved / 1000).toFixed(0)}k
          </div>
          <div className="mt-3 text-xs text-amber-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Direct logistical cost savings</span>
          </div>
        </div>
      </div>

      {/* AI WASTE RISK SECTION (Section 13) */}
      <div className="bg-amber-50/80 rounded-2xl p-6 sm:p-8 border-2 border-amber-300 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center font-black">
              <AlertTriangle className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                AI Waste Risk Forecaster
              </div>
              <h2 className="text-lg font-bold text-amber-950">
                12 material lots may remain unused across ongoing project sites
              </h2>
            </div>
          </div>
          <div className="px-3 py-1 bg-amber-200/90 text-amber-950 text-xs font-extrabold rounded-full">
            High Disposal Risk
          </div>
        </div>

        <div className="text-xs text-amber-900 leading-relaxed space-y-2">
          <p className="font-semibold text-amber-950">
            AI Recommendation for Enterprise Inventory:
          </p>
          <div className="p-4 bg-white/80 rounded-xl border border-amber-200 space-y-1.5">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>“List these materials within the next 7 days to improve reuse probability by 78%.”</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Break large pallet volumes into micro-batches (5-20 units) to capture residential repair demand.</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => setCurrentPage('list-surplus')}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-colors shadow-2xs"
          >
            List Surplus Batches Now
          </button>
          <button
            onClick={() => setCurrentPage('ai-assistant')}
            className="px-4 py-2 bg-white hover:bg-amber-100 text-amber-900 text-xs font-bold rounded-xl border border-amber-300 transition-colors"
          >
            Ask AI Optimization Advisor
          </button>
        </div>
      </div>

      {/* ACTIVE COMMERCIAL SURPLUS INVENTORY */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-sustain-forest">
            Enterprise Job-site Surplus ({contractorListings.length} lots active)
          </h2>
          <button
            onClick={() => setCurrentPage('marketplace')}
            className="text-xs font-semibold text-emerald-700 hover:underline"
          >
            View Public Marketplace View
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contractorListings.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-sustain-border p-5 shadow-soft space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-16 h-16 rounded-xl object-cover border"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase text-emerald-700">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-bold text-sustain-forest line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="text-xs text-gray-500 mt-0.5">
                      Batch: <strong>{item.quantityAvailable} {item.unit}</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-3 p-2.5 bg-gray-50 rounded-xl text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Unit Price:</span>
                    <span className="font-bold text-gray-800">₹{item.pricePerUnit}/{item.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Circularity Score:</span>
                    <span className="font-bold text-emerald-700">{item.circularityScore}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Days Active:</span>
                    <span className="font-semibold text-gray-700">{item.daysListed} days</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-2 border-t border-gray-100">
                <button
                  onClick={() => openListingDetails(item.id)}
                  className="flex-1 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-sustain-forest text-xs font-semibold transition-colors"
                >
                  Manage Lot
                </button>
                <button
                  onClick={() => optimizeListing(item.id)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-bold border border-emerald-200 transition-colors"
                >
                  Optimize
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
