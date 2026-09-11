import React, { useState } from 'react';
import {
  X,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Building2,
  User,
  Recycle,
  Scale,
  TrendingUp,
  MapPin,
  ChevronRight,
  Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HeroDemoModal: React.FC = () => {
  const {
    isHeroDemoActive,
    setIsHeroDemoActive,
    setCurrentPage,
    openListingDetails,
    acceptRequest,
    markAsReused,
    requests,
    showToast
  } = useApp();

  const [step, setStep] = useState<number>(1);

  if (!isHeroDemoActive) return null;

  const targetRequest = requests.find((r) => r.listingId === 'mat-001') || requests[0];

  const handleNext = () => {
    if (step < 7) {
      setStep(step + 1);
    } else {
      setIsHeroDemoActive(false);
      setStep(1);
      setCurrentPage('impact');
    }
  };

  const handleExecuteLive = (targetStep: number) => {
    if (targetStep === 2) {
      setIsHeroDemoActive(false);
      openListingDetails('mat-001');
    } else if (targetStep === 3 || targetStep === 4) {
      setIsHeroDemoActive(false);
      setCurrentPage('marketplace');
    } else if (targetStep === 5) {
      if (targetRequest && targetRequest.status === 'Requested') {
        acceptRequest(targetRequest.id);
      }
      setIsHeroDemoActive(false);
      setCurrentPage('my-requests');
    } else if (targetStep === 6) {
      if (targetRequest && targetRequest.status !== 'Reused') {
        markAsReused(targetRequest.id);
      }
      setIsHeroDemoActive(false);
      setCurrentPage('impact');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-sustain-border overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-sustain-forest to-sustain-deep p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Judges Walkthrough
                </span>
                <span className="px-2 py-0.5 text-[10px] font-extrabold bg-amber-400 text-sustain-deep rounded-full">
                  Step {step} of 7
                </span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Hero Demo: 500 Tiles Surplus → 12 Tiles Bathroom Reuse
              </h2>
            </div>
          </div>
          <button
            onClick={() => setIsHeroDemoActive(false)}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-1.5 flex">
          {[1, 2, 3, 4, 5, 6, 7].map((s) => (
            <div
              key={s}
              className={`flex-1 h-full transition-all duration-300 ${
                s <= step ? 'bg-emerald-600' : 'bg-transparent'
              }`}
            />
          ))}
        </div>

        {/* Step Content */}
        <div className="p-6 space-y-5 flex-1 min-h-[340px] flex flex-col justify-center">
          {step === 1 && (
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span>Supply Side: Construction Company (Apex Buildcon)</span>
              </div>
              <h3 className="text-xl font-bold text-sustain-forest">
                1. Contractor Has 500 Leftover Ceramic Tiles
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                After finishing a major commercial office floor tiling project, Apex Buildcon has 500 pristine glazed ivory ceramic tiles (1.8 kg each). Instead of sending them to a landfill or paying demolition disposal fees, they list them on ReBuild.
              </p>
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&q=80"
                  alt="Ceramic tiles"
                  className="w-20 h-20 rounded-lg object-cover border"
                />
                <div className="text-xs space-y-1">
                  <div className="font-bold text-sustain-forest text-sm">Ceramic Floor Tiles (Ivory Glazed)</div>
                  <div className="text-gray-600">Quantity: <strong>500 pieces available</strong></div>
                  <div className="text-gray-600">Location: Indiranagar, Bengaluru (3.4 km)</div>
                  <div className="text-emerald-700 font-bold">Listed at: ₹8 / piece (vs retail ₹25)</div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-800 border border-purple-200">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>AI Material Analyzer & Circular Scoring</span>
              </div>
              <h3 className="text-xl font-bold text-sustain-forest">
                2. AI Analyzes Listing & Recommends "Sell Locally"
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                The ReBuild AI scans the specs: High compressive strength, anti-skid glaze, mint unused condition. It assigns a high <strong>92/100 Circularity Score</strong> and selects the best second-life option.
              </p>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700">AI Detected Material:</span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Glazed Ceramic Floor Tiles</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700">Circularity Score:</span>
                  <span className="text-xs font-extrabold text-emerald-700">92 / 100 (High Reuse Potential)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700">AI Recommended Pathway:</span>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    1. Sell locally in small batches (High demand)
                  </span>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
                <User className="w-4 h-4 text-amber-700" />
                <span>Demand Side: Homeowner (Priya Sharma)</span>
              </div>
              <h3 className="text-xl font-bold text-sustain-forest">
                3. Homeowner Needs Only 12 Tiles for a Bathroom Repair
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                A pipe leak required opening the bathroom floor. Priya only needs 12 tiles. Traditional hardware retailers only sell full cartons of 30 pieces at ₹1,200. She types into ReBuild's natural language search:
              </p>
              <div className="p-4 bg-emerald-950 text-emerald-300 rounded-xl font-mono text-xs shadow-inner flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>“I need around 10–15 tiles for a bathroom repair under ₹500.”</span>
              </div>
              <p className="text-xs text-gray-500">
                AI interprets: <em>Material: Tiles | Quantity: 10–15 | Use: Bathroom repair | Budget: ₹500</em>
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>AI Matching Engine</span>
              </div>
              <h3 className="text-xl font-bold text-sustain-forest">
                4. AI Finds Apex Buildcon's Listing (94% Match!)
              </h3>
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-300 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-base font-black text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    94% AI Match Found
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white text-emerald-800 border border-emerald-300">
                    3.4 km away
                  </span>
                </div>
                <div className="text-xs text-gray-700 space-y-1">
                  <div>✓ <strong>Same Material:</strong> Matching ivory glazed ceramic tiles</div>
                  <div>✓ <strong>Quantity Fits:</strong> 12 tiles requested from 500 available surplus lot</div>
                  <div>✓ <strong>Local Reuse Recommended:</strong> Within 3.4 km, negligible transit emissions</div>
                  <div>✓ <strong>Total Cost:</strong> 12 × ₹8 = <strong>₹96 total</strong> (under ₹500 budget)</div>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Transaction Flow</span>
              </div>
              <h3 className="text-xl font-bold text-sustain-forest">
                5. Buyer Requests 12 Tiles → Seller Accepts
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Priya clicks <strong>"Request 12 Tiles"</strong>. The contractor receives the notification: <em>“An interested buyer needs 12 of your 500 tiles for bathroom repair.”</em>
              </p>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-gray-500 uppercase">Current Request Status</div>
                  <div className="text-sm font-bold text-emerald-700">Accepted & Ready for Pickup</div>
                </div>
                <button
                  onClick={() => handleExecuteLive(5)}
                  className="px-3 py-1.5 text-xs font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View in My Requests
                </button>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
                <Recycle className="w-4 h-4 text-amber-700" />
                <span>Circularity Realized</span>
              </div>
              <h3 className="text-xl font-bold text-sustain-forest">
                6. Material Collected & Marked as "Reused"
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Priya picks up the 12 tiles locally. The transaction status is transitioned to <strong>Reused</strong>. The remaining inventory adjusts to 488 tiles.
              </p>
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Material Saved:</span>
                  <span className="font-bold text-emerald-900">12 ceramic tiles</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight Diverted from Landfill:</span>
                  <span className="font-bold text-emerald-900">21.6 kg diverted</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avoided Retail Cost for Buyer:</span>
                  <span className="font-bold text-emerald-900">₹384 net savings</span>
                </div>
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-sustain-forest">
                7. Live Impact Dashboard Updated!
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Every completed transaction feeds directly into verifiable sustainability metrics. Construction waste was prevented, money was saved, and resources remained in active circular use.
              </p>
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-gray-50 rounded-xl border">
                  <div className="text-base font-extrabold text-emerald-700">+21.6 kg</div>
                  <div className="text-[10px] text-gray-500 uppercase font-semibold">Waste Diverted</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border">
                  <div className="text-base font-extrabold text-blue-700">+1 Match</div>
                  <div className="text-[10px] text-gray-500 uppercase font-semibold">Circular Match</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border">
                  <div className="text-base font-extrabold text-amber-700">+₹384</div>
                  <div className="text-[10px] text-gray-500 uppercase font-semibold">User Savings</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-sustain-border flex items-center justify-between">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className={`px-4 py-2 text-xs font-semibold rounded-lg ${
              step === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            Back
          </button>
          <div className="flex gap-2">
            {step < 7 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-smooth"
              >
                <span>Continue Step {step + 1}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-sustain-forest hover:bg-emerald-800 shadow-md transition-smooth"
              >
                <span>View Full Impact Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
