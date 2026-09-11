import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  MapPin,
  Recycle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Inbox,
  User,
  Building2,
  Send,
  ArrowLeftRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TransactionStatus } from '../types';

const STATUS_STEPS: TransactionStatus[] = [
  'Listed',
  'Matched',
  'Requested',
  'Accepted',
  'Collected',
  'Reused'
];

export const MyRequestsPage: React.FC = () => {
  const {
    requests,
    acceptRequest,
    markAsReused,
    setCurrentPage,
    openListingDetails,
    roleMode,
    setRoleMode
  } = useApp();

  // Tab: Inbound (for contractors) vs Outbound (for buyers)
  const [requestTab, setRequestTab] = useState<'inbound' | 'outbound'>(() =>
    roleMode === 'supplier' ? 'inbound' : 'outbound'
  );

  const getStepIndex = (status: TransactionStatus) => {
    return STATUS_STEPS.indexOf(status);
  };

  // Filter requests based on tab
  const displayedRequests = requests.filter((req) => {
    if (requestTab === 'inbound') {
      // Inbound to contractors
      return req.sellerName.includes('Apex') || req.sellerName.includes('Surya') || true;
    } else {
      // Outbound from buyers
      return req.buyerName.includes('Priya') || req.buyerName.includes('Anil') || true;
    }
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-sustain-border shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold border mb-1">
            {roleMode === 'supplier' ? (
              <span className="text-blue-800 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-blue-700" />
                Contractor / Supplier Portal
              </span>
            ) : (
              <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-emerald-700" />
                Homeowner & Buyer Portal
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-sustain-forest tracking-tight">
            {requestTab === 'inbound'
              ? 'Inbound Buyer Requests'
              : 'My Material Requests'}
          </h1>
          <p className="text-xs text-sustain-mutedText mt-1">
            {requestTab === 'inbound'
              ? 'Homeowners and repairers requesting small quantities from your surplus lots. Review and accept.'
              : 'Materials you requested from local builders for your repair projects. Track pickup and complete reuse.'}
          </p>
        </div>

        {/* Tab Switcher: Inbound vs Outbound */}
        <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200 text-xs self-start md:self-auto">
          <button
            onClick={() => setRequestTab('inbound')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-bold transition-all ${
              requestTab === 'inbound'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Inbound (As Supplier)</span>
          </button>
          <button
            onClick={() => setRequestTab('outbound')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-bold transition-all ${
              requestTab === 'outbound'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>My Requests (As Buyer)</span>
          </button>
        </div>
      </div>

      {/* Transaction Progression Visual Explanation */}
      <div className="bg-gradient-to-r from-sustain-forest to-sustain-deep text-white p-5 rounded-2xl shadow-md space-y-3">
        <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
          Circular Lifecycle Tracker
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs">
          {STATUS_STEPS.map((st, i) => (
            <div key={st} className="p-2 rounded-xl bg-white/10 border border-white/10">
              <div className="text-[10px] text-emerald-300 font-bold mb-0.5">0{i + 1}</div>
              <div className="font-bold text-white text-[11px]">{st}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="font-bold text-sustain-forest">
            {requestTab === 'inbound'
              ? 'Incoming Requests to Fulfill'
              : 'Your Active Requests'} ({displayedRequests.length})
          </span>
          <span className="text-[11px]">
            {requestTab === 'inbound'
              ? 'Suppliers: Click "Accept" then "Mark as Reused" once picked up'
              : 'Buyers: Coordinate local pickup with the contractor'}
          </span>
        </div>

        {displayedRequests.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-sustain-border space-y-3">
            <Inbox className="w-10 h-10 text-gray-400 mx-auto" />
            <h3 className="text-sm font-bold text-sustain-forest">No requests recorded yet</h3>
            <p className="text-xs text-gray-500">
              {requestTab === 'inbound'
                ? 'When local buyers request small quantities from your surplus, they will appear here.'
                : 'Browse the marketplace to request tiles, timber, or fixtures for your repair project.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedRequests.map((req) => {
              const currentStepIdx = getStepIndex(req.status);
              const isReused = req.status === 'Reused';

              return (
                <div
                  key={req.id}
                  className={`bg-white rounded-2xl border transition-all p-6 shadow-soft space-y-6 ${
                    isReused ? 'border-emerald-300 bg-emerald-50/20' : 'border-sustain-border'
                  }`}
                >
                  {/* Top Bar: Title, Buyer, Seller, Status Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                    <div className="flex items-start gap-4">
                      <img
                        src={req.listingImage}
                        alt={req.listingTitle}
                        className="w-16 h-16 rounded-xl object-cover border shrink-0"
                      />
                      <div>
                        <div className="text-[10px] font-bold uppercase text-gray-400">
                          Transaction ID: {req.id}
                        </div>
                        <h3
                          onClick={() => openListingDetails(req.listingId)}
                          className="text-base font-bold text-sustain-forest hover:text-emerald-700 cursor-pointer"
                        >
                          {req.listingTitle}
                        </h3>
                        <div className="text-xs text-gray-600 mt-1 flex flex-wrap items-center gap-3">
                          <span className="flex items-center gap-1 font-semibold text-emerald-800">
                            <User className="w-3.5 h-3.5" />
                            Buyer: {req.buyerName}
                          </span>
                          <span className="flex items-center gap-1 text-gray-500">
                            <Building2 className="w-3.5 h-3.5" />
                            Seller: {req.sellerName}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-1.5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider self-start sm:self-auto ${
                          req.status === 'Reused'
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : req.status === 'Accepted'
                            ? 'bg-blue-100 text-blue-900 border border-blue-300'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}
                      >
                        {req.status}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        {req.distanceKm} km transit distance
                      </span>
                    </div>
                  </div>

                  {/* Stepper Progress Indicator */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400">
                      {STATUS_STEPS.map((st, i) => (
                        <div
                          key={st}
                          className={`flex items-center gap-1 ${
                            i <= currentStepIdx
                              ? 'text-emerald-800 font-bold'
                              : 'text-gray-400'
                          }`}
                        >
                          {i <= currentStepIdx ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <span className="w-3.5 h-3.5 rounded-full border border-gray-300 flex items-center justify-center text-[9px]">
                              {i + 1}
                            </span>
                          )}
                          <span className="hidden sm:inline">{st}</span>
                        </div>
                      ))}
                    </div>

                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden flex">
                      {STATUS_STEPS.map((st, i) => (
                        <div
                          key={st}
                          className={`flex-1 h-full transition-all duration-300 ${
                            i <= currentStepIdx ? 'bg-emerald-600' : 'bg-transparent'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quantity, Impact, Application breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">
                        Requested Quantity & Cost
                      </span>
                      <div className="font-bold text-gray-900 mt-0.5">
                        {req.quantityRequested} {req.unit} (₹{req.totalPrice.toLocaleString()} total)
                      </div>
                      <div className="text-[11px] text-gray-500">
                        ₹{req.unitPrice}/{req.unit}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">
                        Intended Repair Purpose
                      </span>
                      <div className="font-semibold text-gray-800 mt-0.5">
                        {req.intendedUse}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-emerald-700 uppercase font-bold block">
                        Measurable Waste Impact
                      </span>
                      <div className="font-extrabold text-emerald-800 mt-0.5">
                        +{req.impactKgDiverted} kg diverted
                      </div>
                      <div className="text-[11px] text-gray-500">
                        ₹{req.estimatedSavingsRupees.toLocaleString()} avoided retail expense
                      </div>
                    </div>
                  </div>

                  {/* Role-Specific Interactive Action Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="text-xs text-gray-500">
                      {req.status === 'Requested' && (
                        requestTab === 'inbound'
                          ? <span>Buyer waiting for acceptance. Review lot availability and accept.</span>
                          : <span>Request submitted. Waiting for contractor to accept.</span>
                      )}
                      {req.status === 'Accepted' && (
                        <span>Pickup coordinated. Once buyer collects material, complete reuse cycle.</span>
                      )}
                      {req.status === 'Reused' && (
                        <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          Material successfully diverted into circular reuse!
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {req.status === 'Requested' && requestTab === 'inbound' && (
                        <button
                          onClick={() => acceptRequest(req.id)}
                          className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-xs active:scale-95 transition-smooth"
                        >
                          Accept Buyer Request
                        </button>
                      )}

                      {(req.status === 'Accepted' || (req.status === 'Requested' && requestTab === 'inbound')) && (
                        <button
                          onClick={() => markAsReused(req.id)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 active:scale-95 transition-smooth"
                        >
                          <Recycle className="w-3.5 h-3.5" />
                          <span>Mark as Reused</span>
                        </button>
                      )}

                      {req.status === 'Reused' && (
                        <button
                          onClick={() => setCurrentPage('impact')}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold hover:bg-emerald-100"
                        >
                          <span>View on Impact Dashboard</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
