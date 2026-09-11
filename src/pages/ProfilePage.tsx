import React from 'react';
import {
  User,
  Recycle,
  Award,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Building2,
  Scale,
  ShieldCheck,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SellerType } from '../types';

export const ProfilePage: React.FC = () => {
  const {
    personalStats,
    userRole,
    setUserRole,
    requests,
    resetToDemoData,
    setCurrentPage
  } = useApp();

  const completedRequests = requests.filter((r) => r.status === 'Reused');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sustain-border shadow-soft flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-600 to-sustain-forest text-white flex items-center justify-center font-black text-2xl shadow-md shadow-emerald-700/20">
            {userRole === 'Contractor' ? 'AB' : 'PS'}
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-black text-sustain-forest tracking-tight">
                {userRole === 'Contractor' ? 'Apex Buildcon Ltd' : 'Priya Sharma'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-300">
                Verified Circular Member
              </span>
            </div>
            <p className="text-xs text-gray-500 flex items-center justify-center sm:justify-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Indiranagar, Bengaluru • Active since March 2026</span>
            </p>
            <p className="text-xs text-sustain-mutedText">
              {userRole === 'Contractor'
                ? 'Commercial interior contractor & project surplus supplier'
                : 'Eco-conscious homeowner & DIY repair enthusiast'}
            </p>
          </div>
        </div>

        {/* Role Toggle Selector */}
        <div className="bg-gray-50 p-3 rounded-2xl border border-gray-200 text-xs space-y-2 w-full sm:w-auto">
          <span className="text-[10px] font-bold uppercase text-gray-400 block text-center sm:text-left">
            Active Simulator Profile
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setUserRole('Contractor')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                userRole === 'Contractor'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border'
              }`}
            >
              Contractor (Apex)
            </button>
            <button
              onClick={() => setUserRole('Homeowner')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                userRole === 'Homeowner'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border'
              }`}
            >
              Homeowner (Priya)
            </button>
          </div>
        </div>
      </div>

      {/* YOUR CIRCULAR IMPACT (Section 12) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-emerald-600" />
          <h2 className="text-base font-extrabold uppercase tracking-wider text-sustain-forest">
            Your Circular Impact
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-sustain-border shadow-soft text-center sm:text-left">
            <div className="text-[10px] font-bold text-gray-400 uppercase">Materials Recirculated</div>
            <div className="text-3xl font-black text-sustain-forest mt-1">
              {personalStats.kgRecirculated} kg
            </div>
            <div className="text-xs text-emerald-700 font-semibold mt-1">
              Kept out of municipal landfills
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-sustain-border shadow-soft text-center sm:text-left">
            <div className="text-[10px] font-bold text-gray-400 uppercase">Successful Matches</div>
            <div className="text-3xl font-black text-sustain-forest mt-1">
              {personalStats.successfulMatches}
            </div>
            <div className="text-xs text-blue-700 font-semibold mt-1">
              Direct supplier & buyer handoffs
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-sustain-border shadow-soft text-center sm:text-left">
            <div className="text-[10px] font-bold text-gray-400 uppercase">Estimated Financial Savings</div>
            <div className="text-3xl font-black text-sustain-forest mt-1">
              ₹{personalStats.savingsRupees.toLocaleString()}
            </div>
            <div className="text-xs text-amber-700 font-semibold mt-1">
              Saved vs retail batch packages
            </div>
          </div>
        </div>
      </div>

      {/* CIRCULAR GAMIFICATION BADGES */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sustain-border shadow-soft space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-sustain-forest flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Earned Circular Badges</span>
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Milestones achieved through active local reuse and waste mitigation.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            {personalStats.badges.filter((b) => b.unlocked).length} / {personalStats.badges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {personalStats.badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-xl border transition-all flex items-start gap-3 ${
                badge.unlocked
                  ? 'bg-emerald-50/60 border-emerald-300'
                  : 'bg-gray-50/60 border-gray-200 opacity-60'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  badge.unlocked
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                <Award className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-sustain-forest">{badge.title}</h4>
                  {badge.unlocked && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  )}
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  {badge.description}
                </p>
                {badge.unlockedAt && (
                  <span className="text-[10px] text-emerald-800 font-semibold block pt-0.5">
                    Unlocked on {badge.unlockedAt}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RECENT VERIFIED REUSE ACTIVITY */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sustain-border shadow-soft space-y-4">
        <h3 className="text-base font-bold text-sustain-forest">
          Recent Circular Activity
        </h3>

        <div className="space-y-3 text-xs">
          {completedRequests.length > 0 ? (
            completedRequests.map((req) => (
              <div
                key={req.id}
                className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={req.listingImage}
                    alt={req.listingTitle}
                    className="w-10 h-10 rounded-lg object-cover border"
                  />
                  <div>
                    <span className="font-bold text-sustain-forest">{req.listingTitle}</span>
                    <p className="text-gray-500 text-[11px]">
                      {req.quantityRequested} {req.unit} used for {req.intendedUse}
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <span className="font-extrabold text-emerald-700">+{req.impactKgDiverted} kg diverted</span>
                  <p className="text-gray-400 text-[10px]">{req.reusedAt?.split('T')[0] || 'Recently'}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No completed reuse transactions yet.</p>
          )}
        </div>
      </div>

      {/* Seed Reset Option */}
      <div className="pt-4 text-center">
        <button
          onClick={resetToDemoData}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset all hackathon test data to initial seed values</span>
        </button>
      </div>
    </div>
  );
};
