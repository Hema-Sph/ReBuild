import React, { useState } from 'react';
import {
  Sparkles,
  Upload,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Image as ImageIcon,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MaterialCategory, MaterialCondition, ListingAction, UnitType } from '../types';
import { analyzeMaterialSurplus } from '../services/aiMaterialAnalyzer';

const DEMO_IMAGE_PRESETS = [
  {
    label: 'Ceramic Tiles',
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    category: 'Tiles' as MaterialCategory,
    name: 'Ceramic Floor Tiles (Ivory Glazed 300x300mm)',
    quantity: 500,
    unit: 'pieces' as UnitType,
    condition: 'New / unused' as MaterialCondition,
    description: 'Surplus from high-end corporate office renovation. High compressive strength, anti-skid glaze.',
    price: 8
  },
  {
    label: 'Timber Boards',
    url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
    category: 'Wood' as MaterialCategory,
    name: 'Seasoned Reclaimed Teak Boards (4ft)',
    quantity: 40,
    unit: 'pieces' as UnitType,
    condition: 'Lightly used' as MaterialCondition,
    description: 'De-nailed solid teak wood planks from interior partition revision. Fully straight, dry seasoned.',
    price: 120
  },
  {
    label: 'Cement Bags',
    url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    category: 'Cement' as MaterialCategory,
    name: 'OPC 53 Grade Cement Bags (50kg)',
    quantity: 3,
    unit: 'bags' as UnitType,
    condition: 'New / unused' as MaterialCondition,
    description: 'Unopened sealed bags from column footing casting. Kept dry and elevated.',
    price: 320
  }
];

export const ListSurplusPage: React.FC = () => {
  const { addListing, openListingDetails, setCurrentPage } = useApp();

  // Form states
  const [category, setCategory] = useState<MaterialCategory>('Tiles');
  const [materialName, setMaterialName] = useState<string>('Ceramic Floor Tiles (Ivory Glazed)');
  const [quantity, setQuantity] = useState<number>(500);
  const [unit, setUnit] = useState<UnitType>('pieces');
  const [condition, setCondition] = useState<MaterialCondition>('New / unused');
  const [location, setLocation] = useState<string>('Indiranagar, Bengaluru');
  const [pinCode, setPinCode] = useState<string>('560038');
  const [availableUntil, setAvailableUntil] = useState<string>('2026-10-30');
  const [action, setAction] = useState<ListingAction>('Let AI decide');
  const [pricePerUnit, setPricePerUnit] = useState<number>(8);
  const [description, setDescription] = useState<string>(
    'Leftover surplus tiles from a commercial floor tiling project. Fully intact, clean boxes, no cracks. High quality anti-skid glaze.'
  );
  const [imageUrl, setImageUrl] = useState<string>(
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
  );

  // Analysis result state
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<ReturnType<typeof analyzeMaterialSurplus> | null>(null);
  const [selectedUserAction, setSelectedUserAction] = useState<'Sell' | 'Give' | 'Exchange' | 'Reuse'>('Sell');

  const handleApplyPreset = (preset: (typeof DEMO_IMAGE_PRESETS)[0]) => {
    setCategory(preset.category);
    setMaterialName(preset.name);
    setQuantity(preset.quantity);
    setUnit(preset.unit);
    setCondition(preset.condition);
    setDescription(preset.description);
    setImageUrl(preset.url);
    setPricePerUnit(preset.price);
    setAnalysisResult(null);
  };

  const handleAnalyzeWithAI = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    setTimeout(() => {
      const result = analyzeMaterialSurplus({
        category,
        materialName,
        quantity,
        unit,
        condition,
        description,
        hasImage: !!imageUrl
      });
      setAnalysisResult(result);
      setIsAnalyzing(false);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }, 650);
  };

  const handleFinalListWithAI = (useAIRec: boolean) => {
    const finalActionType = useAIRec ? 'Sell' : (selectedUserAction === 'Reuse' ? 'Give' : selectedUserAction);
    
    const newListing = addListing({
      title: materialName,
      category,
      quantityAvailable: quantity,
      unit,
      condition,
      location,
      pinCode,
      availableUntil,
      actionType: finalActionType as any,
      pricePerUnit: finalActionType === 'Give' ? 0 : pricePerUnit,
      imageUrl,
      description,
      circularityScore: analysisResult?.circularityScore || 90,
      recommendedSecondUse: analysisResult?.recommendedOptions[0]?.description || 'Small-batch local repair',
      isSafetyCritical: category === 'Cement' || category === 'Metal' || category === 'Pipes',
      safetyWarning: analysisResult?.safetyCaution
    });

    openListingDetails(newListing.id);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Heading */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
          <span>Automated Material Intake & Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-sustain-forest tracking-tight">
          What do you have left over?
        </h1>
        <p className="text-xs sm:text-sm text-sustain-mutedText max-w-lg mx-auto">
          List leftover construction batches, tiles, lumber, fixtures, or masonry. ReBuild's AI determines condition and reusability.
        </p>
      </div>

      {/* Quick Demo Pre-fill presets for Hackathon Judges */}
      <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-amber-900 font-bold">
          <Zap className="w-4 h-4 text-amber-600" />
          <span>Quick Preset for Demo:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {DEMO_IMAGE_PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-amber-100 border border-amber-300 font-semibold text-amber-950 transition-colors shadow-2xs"
            >
              Load {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-sustain-border p-6 sm:p-8 shadow-soft">
        <form onSubmit={handleAnalyzeWithAI} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Material Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MaterialCategory)}
                className="w-full text-xs p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-emerald-500 font-medium"
              >
                <option value="Tiles">Tiles</option>
                <option value="Bricks">Bricks</option>
                <option value="Wood">Wood</option>
                <option value="Cement">Cement</option>
                <option value="Sand">Sand</option>
                <option value="Stone">Stone</option>
                <option value="Metal">Metal</option>
                <option value="Pipes">Pipes</option>
                <option value="Doors">Doors</option>
                <option value="Windows">Windows</option>
                <option value="Fixtures">Fixtures</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Material Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Material Name / Title</label>
              <input
                type="text"
                value={materialName}
                onChange={(e) => setMaterialName(e.target.value)}
                placeholder="e.g. Ceramic Floor Tiles (White Glazed)"
                className="w-full text-xs p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-emerald-500 font-medium"
                required
              />
            </div>

            {/* Quantity */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Quantity Available</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="w-full text-xs p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-emerald-500 font-medium"
                required
              />
            </div>

            {/* Unit */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Unit of Measurement</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as UnitType)}
                className="w-full text-xs p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-emerald-500 font-medium"
              >
                <option value="pieces">pieces</option>
                <option value="kg">kg</option>
                <option value="bags">bags</option>
                <option value="meters">meters</option>
                <option value="sq.ft">sq.ft</option>
                <option value="litres">litres</option>
                <option value="other">other</option>
              </select>
            </div>

            {/* Condition */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as MaterialCondition)}
                className="w-full text-xs p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-emerald-500 font-medium"
              >
                <option value="New / unused">New / unused</option>
                <option value="Lightly used">Lightly used</option>
                <option value="Used">Used</option>
                <option value="Damaged">Damaged / salvage</option>
              </select>
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">City / Suburb</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Indiranagar, Bengaluru"
                className="w-full text-xs p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-emerald-500 font-medium"
                required
              />
            </div>

            {/* PIN Code */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">PIN Code</label>
              <input
                type="text"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                placeholder="560038"
                className="w-full text-xs p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-emerald-500 font-medium"
                required
              />
            </div>

            {/* Available Until */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Available Until</label>
              <input
                type="date"
                value={availableUntil}
                onChange={(e) => setAvailableUntil(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-emerald-500 font-medium"
                required
              />
            </div>

            {/* Action Mode */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Desired Action</label>
              <select
                value={action}
                onChange={(e) => setAction(e.target.value as ListingAction)}
                className="w-full text-xs p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-emerald-500 font-medium"
              >
                <option value="Let AI decide">Let AI decide (Recommended)</option>
                <option value="Sell">Sell</option>
                <option value="Give">Give (Free Donation)</option>
                <option value="Exchange">Exchange</option>
              </select>
            </div>

            {/* Price Per Unit */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">
                Price per Unit (₹) {action === 'Give' ? '(Free)' : ''}
              </label>
              <input
                type="number"
                min="0"
                value={pricePerUnit}
                disabled={action === 'Give'}
                onChange={(e) => setPricePerUnit(Math.max(0, Number(e.target.value)))}
                className="w-full text-xs p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-emerald-500 font-medium disabled:opacity-50"
              />
            </div>
          </div>

          {/* Photo Upload & Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-700">Material Photo (File Upload or URL)</label>
              <span className="text-[10px] text-gray-400">Supports device camera or image files</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* File Input */}
              <label className="flex items-center gap-2 p-2.5 bg-gray-50 border border-dashed border-gray-300 hover:border-emerald-500 rounded-xl cursor-pointer transition-colors text-xs text-gray-600 font-medium">
                <Upload className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">Choose from Device / Take Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        if (typeof reader.result === 'string') {
                          setImageUrl(reader.result);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                />
              </label>

              {/* URL Input */}
              <div className="flex gap-2">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Or paste image URL (https://...)"
                  className="flex-1 text-xs p-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-emerald-500 font-mono"
                />
                <div className="w-10 h-10 rounded-xl border overflow-hidden shrink-0 bg-gray-100 flex items-center justify-center">
                  {imageUrl ? (
                    <img src={imageUrl} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">Description & Batch Notes</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide details about original use, how it was stored, and condition..."
              className="w-full text-xs p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-emerald-500 font-medium"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md shadow-emerald-600/20 active:scale-98 transition-smooth flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>AI is Analyzing Material Intrinsic Properties...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Analyze with AI</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* AI MATERIAL ANALYSIS OUTPUT SCREEN (Section 5) */}
      {analysisResult && (
        <div className="bg-gradient-to-br from-white to-emerald-50/50 rounded-2xl border-2 border-emerald-300 p-6 sm:p-8 shadow-card space-y-6 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-emerald-100 gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-extrabold">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>AI MATERIAL ANALYSIS RESULT</span>
              </div>
              <h2 className="text-xl font-bold text-sustain-forest mt-1">
                Detected: {analysisResult.detectedMaterial}
              </h2>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-emerald-200 shadow-xs">
              <span className="text-xs font-bold text-gray-500">Circularity Score:</span>
              <span className="text-lg font-black text-emerald-700">
                {analysisResult.circularityScore}/100
              </span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-xl border border-emerald-100">
              <div className="text-[11px] font-bold text-gray-400 uppercase">Estimated Condition</div>
              <div className="text-sm font-bold text-sustain-forest mt-0.5">
                {analysisResult.estimatedCondition}
              </div>
            </div>
            <div className="p-4 bg-white rounded-xl border border-emerald-100">
              <div className="text-[11px] font-bold text-gray-400 uppercase">Estimated Reusable Batch</div>
              <div className="text-sm font-bold text-sustain-forest mt-0.5">
                {analysisResult.estimatedReusableQuantity}
              </div>
            </div>
            <div className="p-4 bg-white rounded-xl border border-emerald-100">
              <div className="text-[11px] font-bold text-gray-400 uppercase">Primary Recommendation</div>
              <div className="text-sm font-bold text-emerald-700 mt-0.5">
                {analysisResult.recommendedOptions[0].title.split('—')[0]}
              </div>
            </div>
          </div>

          {/* Safety Caution if present */}
          {analysisResult.safetyCaution && (
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold mb-0.5">Safety & Material Verification Notice</strong>
                {analysisResult.safetyCaution}
              </div>
            </div>
          )}

          {/* Recommended Second-Life Options */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-sustain-forest">
              Recommended Second-Life Options (Ranked by Circular Priority)
            </h3>
            <div className="space-y-2.5">
              {analysisResult.recommendedOptions.map((opt) => (
                <div
                  key={opt.tier}
                  className={`p-4 rounded-xl border transition-all ${
                    opt.isBestOption
                      ? 'bg-emerald-50/90 border-emerald-300 ring-1 ring-emerald-400/40'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          opt.isBestOption ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {opt.tier}
                      </span>
                      <span className="text-xs font-bold text-sustain-forest">
                        {opt.title}
                      </span>
                    </div>
                    {opt.isBestOption && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-700 text-white text-[10px] font-black uppercase tracking-wider">
                        Best Option
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-2 pl-8 leading-relaxed">
                    {opt.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* User in Control Selection */}
          <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700">
                You remain in control. Choose your listing action:
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {(['Sell', 'Give', 'Exchange', 'Reuse'] as const).map((act) => (
                <button
                  key={act}
                  type="button"
                  onClick={() => setSelectedUserAction(act)}
                  className={`py-2 px-3 rounded-lg font-bold text-center border transition-all ${
                    selectedUserAction === act
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-400 shadow-xs'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200'
                  }`}
                >
                  {act === 'Sell' ? 'Sell Surplus' : act === 'Give' ? 'Donate Free' : act === 'Exchange' ? 'Exchange' : 'DIY Reuse'}
                </button>
              ))}
            </div>
          </div>

          {/* Actions: List with AI Recommendation vs Choose My Own Action */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleFinalListWithAI(true)}
              className="flex-1 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 active:scale-95 transition-smooth flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>List with AI Recommendation (Sell locally)</span>
            </button>
            <button
              onClick={() => handleFinalListWithAI(false)}
              className="py-3.5 px-6 rounded-xl bg-white hover:bg-gray-50 text-sustain-forest text-xs font-bold border border-gray-300 transition-smooth"
            >
              <span>List with My Choice ({selectedUserAction})</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
