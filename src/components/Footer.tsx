import React from 'react';
import { Recycle, RotateCcw, AlertTriangle, ShieldCheck, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentPage, resetToDemoData } = useApp();

  return (
    <footer className="bg-sustain-deep text-sustain-sand border-t border-sustain-forest/50 mt-20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-sustain-forest/40">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-sustain-deep">
                <Recycle className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">ReBuild</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              AI-powered circular marketplace for surplus construction and renovation materials. Keeping valuable resources in circulation instead of landfills.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Circular Economy Prototype</span>
              </span>
            </div>
          </div>

          {/* Core Cycle */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">The Circular Cycle</h4>
            <ul className="text-xs space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>1. Construction Surplus</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>2. AI Material Analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>3. Best Second-Life Option</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>4. Smart Local Matching</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>5. Measurable Waste Diversion</span>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Explore Platform</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
              <button onClick={() => setCurrentPage('marketplace')} className="text-left hover:text-emerald-300 transition-colors">Find Materials</button>
              <button onClick={() => setCurrentPage('list-surplus')} className="text-left hover:text-emerald-300 transition-colors">List Surplus</button>
              <button onClick={() => setCurrentPage('ai-assistant')} className="text-left hover:text-emerald-300 transition-colors">AI Advisor</button>
              <button onClick={() => setCurrentPage('impact')} className="text-left hover:text-emerald-300 transition-colors">Impact Dashboard</button>
              <button onClick={() => setCurrentPage('my-materials')} className="text-left hover:text-emerald-300 transition-colors">My Surplus</button>
              <button onClick={() => setCurrentPage('business-dashboard')} className="text-left hover:text-emerald-300 transition-colors">Business ESG</button>
            </div>
            <div className="pt-2">
              <button
                onClick={resetToDemoData}
                className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 underline underline-offset-4"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Hackathon Seed Data</span>
              </button>
            </div>
          </div>

          {/* Safety Notice & Quality Advisory */}
          <div className="space-y-3 bg-sustain-forest/40 p-4 rounded-xl border border-sustain-moss/40">
            <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Safety & Quality Advisory</span>
            </div>
            <p className="text-[11px] text-gray-300 leading-relaxed">
              Condition and suitability must be verified before use. ReBuild does not certify materials for structural or safety-critical applications (such as load-bearing steel, structural columns, or gas plumbing).
            </p>
            <p className="text-[10px] text-gray-400">
              All environmental statistics and kg diverted metrics are transparent estimates calculated from item unit weights.
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© 2026 ReBuild — AI Circular Construction Surplus Platform. Built for Sustainability Hackathon.</p>
          <div className="flex items-center gap-1 text-gray-400">
            <span>Powering local circular construction with</span>
            <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
            <span>AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
