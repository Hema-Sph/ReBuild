import React, { useState } from 'react';
import {
  Sparkles,
  HelpCircle,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  Send,
  PlusCircle,
  ThumbsUp,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ASSISTANT_PRESETS, AssistantAdvice } from '../services/aiMaterialAnalyzer';
import { calculateRoomMaterialEstimate } from '../services/aiMatchingEngine';

export const AiAssistantPage: React.FC = () => {
  const { setCurrentPage, setSearchQuery } = useApp();

  const [inputQuery, setInputQuery] = useState<string>('');
  const [activeAdvice, setActiveAdvice] = useState<AssistantAdvice | null>(ASSISTANT_PRESETS[0]);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [activeEstimateQuery, setActiveEstimateQuery] = useState<string | null>(null);

  const handleSelectPreset = (preset: AssistantAdvice) => {
    setInputQuery(preset.userPrompt);
    setActiveAdvice(preset);
    setActiveEstimateQuery(null);
  };

  const handleConsultAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    setIsThinking(true);
    setTimeout(() => {
      const lower = inputQuery.toLowerCase();

      // Check if user is asking for a room area calculation (e.g. "I want tiles for a 100sq room")
      const isAreaQuery =
        lower.includes('sq') ||
        lower.includes('sqft') ||
        lower.includes('room') ||
        lower.includes('square') ||
        /\d+\s*(?:x|\*|by)\s*\d+/.test(lower);

      if (isAreaQuery) {
        // Extract room area
        let area = 100; // default to 100 if unspecified
        const dimMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:x|\*|by)\s*(\d+(?:\.\d+)?)/);
        if (dimMatch) {
          area = Math.round(parseFloat(dimMatch[1]) * parseFloat(dimMatch[2]));
        } else {
          const areaMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:sq\s*ft|sqft|sq\.?\s*ft|square\s*feet|sqm|sq\s*room|sq)/);
          if (areaMatch) {
            area = Math.round(parseFloat(areaMatch[1]));
          }
        }

        const isWood = lower.includes('wood') || lower.includes('timber') || lower.includes('plank');
        const isBrick = lower.includes('brick') || lower.includes('paver');
        const cat = isWood ? 'Wood' : isBrick ? 'Bricks' : 'Tiles';
        
        const est = calculateRoomMaterialEstimate(cat, area, isWood ? 'wood' : isBrick ? 'brick' : 'tile');
        setActiveEstimateQuery(inputQuery);

        const areaAdvice: AssistantAdvice = {
          id: 'area-calc-advice',
          userPrompt: inputQuery,
          category: `Civil Engineering Estimator (${area} sq.ft Room)`,
          headline: `Requirement for ${area} sq.ft Room: ~${est.recommendedQuantity} ${est.unit} & ${est.auxiliaryMaterials[0].split('(')[0]}`,
          assessmentSteps: [
            `Net Surface Area Coverage: Exactly ${est.baseQuantity} ${est.unit} needed for ${area} sq.ft floor area.`,
            `Cutting & Corner Wastage Margin: +${est.wastageBufferPercent}% standard allowance (${est.recommendedQuantity - est.baseQuantity} ${est.unit}) for wall cuts, diagonal alignment, and minor transit breakage. Total recommended = ${est.recommendedQuantity} ${est.unit}.`,
            `Adhesive / Mortar Requirement: ${est.auxiliaryMaterials[0]}.`,
            `Grout / Joint Sealant: ${est.auxiliaryMaterials[1] || 'Surface finishing membrane'}.`
          ],
          reuseOptions: [
            {
              title: `Source from Local Surplus (~₹${est.estimatedSurplusCostRupees.toLocaleString()})`,
              desc: `Buy ${est.recommendedQuantity} pieces from contractor surplus. Save ~₹${(est.estimatedRetailCostRupees - est.estimatedSurplusCostRupees).toLocaleString()} compared to buying whole commercial crates at retail.`,
              priority: 'High'
            },
            {
              title: 'Keep 5 Pieces as Maintenance Spares',
              desc: 'Store 5 spare pieces in a dry indoor shelf so you have exact batch-matched replacements if plumbing repairs are ever needed.',
              priority: 'Medium'
            },
            {
              title: 'Zero-Waste Cut Pieces Reuse',
              desc: 'Tile cuts or edge trimmings can be repurposed into garden pot edging, mosaic crafts, or walkway mosaic inserts.',
              priority: 'Alternative'
            }
          ],
          safetyAdvisory:
            'Subfloor must be completely level, dry, and free of moisture before tiling. ReBuild materials should be inspected prior to pickup.',
          avoidActions: [
            'Do not mix different shade lot numbers within the same room without dry-laying first.',
            'Never dispose of adhesive wash water down residential storm drains.'
          ]
        };

        setActiveAdvice(areaAdvice);
        setIsThinking(false);
        return;
      }

      // Find matching preset or generate dynamic advisory
      let matched = ASSISTANT_PRESETS.find(
        (p) =>
          lower.includes(p.category.toLowerCase().split(' ')[0]) ||
          lower.includes(p.userPrompt.toLowerCase().slice(0, 15))
      );

      if (!matched) {
        matched = {
          id: 'dyn-advice',
          userPrompt: inputQuery,
          category: 'Surplus Construction Asset',
          headline: 'High Feasibility for Circular Resale or Local Repair Exchange',
          assessmentSteps: [
            'Inspect material for moisture intrusion, surface defects, or dimensional warping.',
            'Document approximate unit count, weight, and manufacturer batch specifications.',
            'Store off bare ground in sheltered indoor conditions to prevent degradation.'
          ],
          reuseOptions: [
            {
              title: 'List on ReBuild Local Exchange (Recommended)',
              desc: 'Homeowners and small contractors actively seek small lots to avoid purchasing whole packages.',
              priority: 'High'
            },
            {
              title: 'Donate to Community Workshop or Vocational School',
              desc: 'Trade schools and community centers frequently require materials for hands-on apprenticeship training.',
              priority: 'Medium'
            },
            {
              title: 'Repurpose for Secondary Non-Critical Storage / Shelving',
              desc: 'Adapt into utility racks, workshop dividers, or backyard landscaping accents.',
              priority: 'Alternative'
            }
          ],
          safetyAdvisory:
            'Condition and suitability must be verified before use. ReBuild does not certify materials for structural or safety-critical applications.',
          avoidActions: [
            'Do not mix with general mixed demolition debris in open dumpsters.',
            'Never dispose of chemical or synthetic construction materials via open burning.'
          ]
        };
      }

      setActiveAdvice(matched);
      setActiveEstimateQuery(null);
      setIsThinking(false);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold border border-purple-300">
          <Sparkles className="w-3.5 h-3.5 text-purple-700" />
          <span>Circular Economy Decision Assistant</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-sustain-forest tracking-tight">
          Not sure what to do with your surplus?
        </h1>
        <p className="text-xs sm:text-sm text-sustain-mutedText max-w-lg mx-auto">
          Describe any construction, masonry, or renovation leftover. ReBuild's AI provides practical reuse pathways, quality checks, and safety guidance.
        </p>
      </div>

      {/* Interactive Assistant Input */}
      <div className="bg-white rounded-2xl border border-sustain-border p-6 shadow-soft space-y-4">
        <form onSubmit={handleConsultAI} className="space-y-3">
          <label className="text-xs font-bold text-gray-700 block">
            Ask AI: Describe what leftover materials you have
          </label>
          <div className="relative">
            <textarea
              rows={3}
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="e.g. I have 3 bags of unused cement left after construction..."
              className="w-full text-xs p-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-emerald-500 font-medium"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <div className="text-[11px] text-gray-500 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Prioritizes practical reuse over disposal</span>
            </div>
            <button
              type="submit"
              disabled={isThinking}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 active:scale-95 transition-smooth flex items-center justify-center gap-2"
            >
              {isThinking ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Evaluating Circular Options...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Ask AI Assistant</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Suggested Quick Prompts */}
        <div className="pt-3 border-t border-gray-100">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
            Try Asking About Common Surplus Materials:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ASSISTANT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`p-2.5 rounded-xl text-left text-xs border transition-all ${
                  activeAdvice?.id === preset.id
                    ? 'bg-emerald-50 border-emerald-300 font-bold text-sustain-forest shadow-2xs'
                    : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'
                }`}
              >
                <div className="text-[10px] font-extrabold uppercase text-emerald-700">
                  {preset.category}
                </div>
                <div className="truncate mt-0.5">{preset.userPrompt}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI ADVISORY OUTPUT CARD */}
      {activeAdvice && (
        <div className="bg-white rounded-2xl border border-sustain-border p-6 sm:p-8 shadow-card space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-50 text-purple-800 text-[11px] font-extrabold">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>AI CIRCULAR ADVICE</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-sustain-forest mt-1.5">
                {activeAdvice.headline}
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold self-start sm:self-auto">
              {activeAdvice.category}
            </span>
          </div>

          {/* Step 1: Pre-Reuse Material Assessment */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-sustain-forest flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Step 1: Check Material Suitability & Storage Conditions</span>
            </h3>
            <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100 space-y-2 text-xs text-gray-700">
              {activeAdvice.assessmentSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-900 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Ranked Reuse Pathways */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-sustain-forest">
              Step 2: Practical Reuse Options (Prioritized)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {activeAdvice.reuseOptions.map((opt, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 flex flex-col justify-between space-y-2"
                >
                  <div>
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase mb-2 ${
                        opt.priority === 'High'
                          ? 'bg-emerald-100 text-emerald-800'
                          : opt.priority === 'Medium'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {opt.priority} Priority
                    </span>
                    <h4 className="text-xs font-bold text-sustain-forest leading-snug">
                      {opt.title}
                    </h4>
                    <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                      {opt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Safety Advisory for Critical Items */}
          {activeAdvice.safetyAdvisory && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-extrabold text-amber-950 uppercase text-[11px] tracking-wide">
                  Crucial Safety & Regulatory Caution
                </div>
                <p className="leading-relaxed">{activeAdvice.safetyAdvisory}</p>
                <p className="text-[10px] text-amber-700 font-semibold">
                  “Verify material condition and suitability with a qualified professional before structural use.”
                </p>
              </div>
            </div>
          )}

          {/* Actions to Avoid */}
          <div className="space-y-2 bg-red-50/50 p-4 rounded-xl border border-red-100 text-xs text-red-900">
            <div className="font-bold text-[11px] text-red-800 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              <span>Environmental Pitfalls to Avoid:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-red-700 pl-1">
              {activeAdvice.avoidActions.map((avoid, i) => (
                <li key={i}>{avoid}</li>
              ))}
            </ul>
          </div>

          {/* Action CTA: Turn Advice into Listing or Find Matching Batches */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100">
            <div className="text-xs text-gray-500">
              {activeEstimateQuery
                ? 'Ready to source this estimated batch from local contractors?'
                : 'Ready to find a nearby recipient for this material?'}
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              {activeEstimateQuery && (
                <button
                  onClick={() => {
                    setSearchQuery(activeEstimateQuery);
                    setCurrentPage('marketplace');
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow-md shadow-purple-700/20 active:scale-95 transition-smooth flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Browse Matched Lots in Marketplace</span>
                </button>
              )}
              <button
                onClick={() => setCurrentPage('list-surplus')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 active:scale-95 transition-smooth flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>List This Surplus Material</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
