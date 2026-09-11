import React from 'react';
import {
  X,
  Building2,
  User,
  Upload,
  Search,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Package,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RoleSelectorModal: React.FC = () => {
  const {
    isRoleModalOpen,
    setIsRoleModalOpen,
    roleMode,
    setRoleMode,
    setCurrentPage
  } = useApp();

  if (!isRoleModalOpen) return null;

  const handleSelect = (mode: 'supplier' | 'buyer') => {
    setRoleMode(mode);
    setIsRoleModalOpen(false);
    if (mode === 'supplier') {
      setCurrentPage('list-surplus');
    } else {
      setCurrentPage('marketplace');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-sustain-border overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-sustain-forest to-sustain-deep p-6 text-white flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              Platform Role Selection
            </span>
            <h2 className="text-xl font-black text-white tracking-tight mt-0.5">
              Select Your ReBuild Experience
            </h2>
            <p className="text-xs text-gray-300 mt-1">
              Separate interfaces tailored for surplus suppliers vs small-batch material buyers.
            </p>
          </div>
          <button
            onClick={() => setIsRoleModalOpen(false)}
            className="text-gray-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: Two Distinct Role Cards */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5 bg-sustain-sand/30">
          {/* Role 1: Contractor / Supplier (Upload Surplus) */}
          <div
            onClick={() => handleSelect('supplier')}
            className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 hover:shadow-card hover:-translate-y-0.5 ${
              roleMode === 'supplier'
                ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/20 shadow-soft'
                : 'bg-white border-gray-200 hover:border-emerald-300'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shadow-xs">
                  <Building2 className="w-6 h-6" />
                </div>
                {roleMode === 'supplier' && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase">
                    Current Active
                  </span>
                )}
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase text-blue-700 tracking-wider">
                  Supply Side
                </span>
                <h3 className="text-lg font-black text-sustain-forest mt-0.5">
                  Contractor / Supplier
                </h3>
                <p className="text-xs text-emerald-800 font-semibold mt-0.5">
                  “I have leftover materials to upload and list”
                </p>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                Construction companies, contractors, builders, and remodelers with surplus batches of tiles, wood, bricks, pipes, or fixtures.
              </p>

              <div className="pt-2 border-t border-gray-100 space-y-1.5 text-[11px] text-gray-700 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>Upload & List Surplus</strong> with AI Material Analyzer</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>Accept Inbound Requests</strong> from local buyers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>AI Waste-Risk Alerts</strong> to avoid landfill fees</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>Enterprise ESG Analytics</strong> reporting</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-3 rounded-xl bg-sustain-forest hover:bg-emerald-800 text-white text-xs font-bold transition-smooth shadow-md flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4 text-emerald-300" />
              <span>Enter Contractor Mode (Upload)</span>
            </button>
          </div>

          {/* Role 2: Buyer / Homeowner (Request Materials) */}
          <div
            onClick={() => handleSelect('buyer')}
            className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 hover:shadow-card hover:-translate-y-0.5 ${
              roleMode === 'buyer'
                ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/20 shadow-soft'
                : 'bg-white border-gray-200 hover:border-emerald-300'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-xs">
                  <User className="w-6 h-6" />
                </div>
                {roleMode === 'buyer' && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase">
                    Current Active
                  </span>
                )}
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase text-amber-700 tracking-wider">
                  Demand Side
                </span>
                <h3 className="text-lg font-black text-sustain-forest mt-0.5">
                  Homeowner / Buyer
                </h3>
                <p className="text-xs text-amber-800 font-semibold mt-0.5">
                  “I need small quantities for home repairs”
                </p>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                Homeowners, carpenters, repair workers, and DIY makers who need small quantities (e.g. 12 tiles) without paying for whole wholesale boxes.
              </p>

              <div className="pt-2 border-t border-gray-100 space-y-1.5 text-[11px] text-gray-700 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>Natural Language Search</strong> for exact repair needs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>Request Small Batches</strong> (12 tiles, 5 planks, etc.)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>AI Match Engine</strong> with proximity scoring</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>Save 60–80%</strong> vs buying retail cartons</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-smooth shadow-md flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4 text-emerald-200" />
              <span>Enter Buyer Mode (Find & Request)</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 text-center text-xs text-gray-500">
          You can toggle between Contractor Mode and Buyer Mode at any time in the navigation header.
        </div>
      </div>
    </div>
  );
};
