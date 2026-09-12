import React from 'react';
import { Minus, Plus, Sparkles, Check } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (qty: number) => void;
  maxAvailable: number;
  minAllowed?: number;
  unit: string;
  pricePerUnit: number;
  weightKgPerUnit?: number;
  showQuickPills?: boolean;
  showSlider?: boolean;
  showSummary?: boolean;
  label?: string;
  helperText?: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onChange,
  maxAvailable,
  minAllowed = 1,
  unit,
  pricePerUnit,
  weightKgPerUnit = 1.8,
  showQuickPills = true,
  showSlider = true,
  showSummary = true,
  label = 'Select Custom Quantity You Need',
  helperText
}) => {
  const safeMin = Math.max(1, minAllowed);
  const safeMax = Math.max(safeMin, maxAvailable);

  const handleDecrement = () => {
    if (quantity > safeMin) {
      onChange(Math.max(safeMin, quantity - 1));
    }
  };

  const handleIncrement = () => {
    if (quantity < safeMax) {
      onChange(Math.min(safeMax, quantity + 1));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      onChange(safeMin);
      return;
    }
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      if (num > safeMax) {
        onChange(safeMax);
      } else if (num < 1) {
        onChange(1);
      } else {
        onChange(num);
      }
    }
  };

  // Generate sensible quick-pick pill options based on available stock
  const getPills = () => {
    const candidates: { label: string; qty: number; tag?: string }[] = [];

    // Always include 1 unit
    candidates.push({ label: `1 ${unit}`, qty: 1 });

    if (safeMax >= 5) {
      candidates.push({ label: `5`, qty: 5, tag: 'Patch' });
    }
    if (safeMax >= 12) {
      candidates.push({ label: `12`, qty: 12, tag: 'Repair' });
    }
    if (safeMax >= 25) {
      candidates.push({ label: `25`, qty: 25 });
    }
    if (safeMax >= 50) {
      candidates.push({ label: `50`, qty: 50 });
    }

    // Always offer a "Take All" option if max > 1
    if (safeMax > 1 && !candidates.some((c) => c.qty === safeMax)) {
      candidates.push({ label: `All (${safeMax})`, qty: safeMax, tag: 'Full Lot' });
    }

    return candidates.filter((c) => c.qty <= safeMax);
  };

  const pills = getPills();
  const totalPrice = pricePerUnit * quantity;
  const divertedKg = (quantity * weightKgPerUnit).toFixed(1);
  const remainingInLot = Math.max(0, safeMax - quantity);
  // Average retail markup estimate (retail packaging typically costs 1.6x-2.2x surplus unit price)
  const retailComparison = pricePerUnit > 0 ? Math.round(totalPrice * 1.85) : 150;
  const estimatedSavings = Math.max(0, retailComparison - totalPrice);

  return (
    <div className="space-y-3 bg-gray-50/70 p-4 rounded-2xl border border-gray-200">
      {/* Label and available note */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-black uppercase tracking-wider text-sustain-forest flex items-center gap-1.5">
          <span>{label}</span>
        </label>
        <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md border border-emerald-200">
          Available: <strong>{maxAvailable} {unit}</strong>
        </span>
      </div>

      {helperText && (
        <p className="text-[11px] text-gray-500 leading-tight">{helperText}</p>
      )}

      {/* Stepper + Direct Input */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={quantity <= safeMin}
          className="w-11 h-11 rounded-xl bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-white text-sustain-forest font-black flex items-center justify-center transition-all shadow-xs active:scale-95 shrink-0"
          title="Decrease quantity by 1"
        >
          <Minus className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="relative flex-1">
          <input
            type="number"
            min={safeMin}
            max={safeMax}
            value={quantity}
            onChange={handleInputChange}
            className="w-full text-center text-lg font-black text-sustain-forest py-2.5 px-3 rounded-xl bg-white border-2 border-emerald-500/40 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-all"
            aria-label="Requested quantity"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 pointer-events-none">
            {unit}
          </span>
        </div>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={quantity >= safeMax}
          className="w-11 h-11 rounded-xl bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-white text-sustain-forest font-black flex items-center justify-center transition-all shadow-xs active:scale-95 shrink-0"
          title="Increase quantity by 1"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Range Slider for quick sliding */}
      {showSlider && safeMax > 1 && (
        <div className="pt-1 space-y-1">
          <input
            type="range"
            min={safeMin}
            max={safeMax}
            value={quantity}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-[10px] font-semibold text-gray-400 px-0.5">
            <span>1 {unit} (Minimum)</span>
            <span>{safeMax} {unit} (Take Entire Lot)</span>
          </div>
        </div>
      )}

      {/* Quick-pick Preset Chips */}
      {showQuickPills && pills.length > 1 && (
        <div className="space-y-1.5 pt-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Quick Select Common Quantities:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {pills.map((pill) => {
              const isSelected = quantity === pill.qty;
              return (
                <button
                  key={pill.qty}
                  type="button"
                  onClick={() => onChange(pill.qty)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-bold border transition-all flex items-center gap-1 active:scale-95 ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-400 hover:bg-emerald-50/50'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  <span>{pill.label}</span>
                  {pill.tag && (
                    <span
                      className={`text-[9px] px-1 rounded-sm uppercase tracking-tight ${
                        isSelected
                          ? 'bg-emerald-700 text-emerald-100'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {pill.tag}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Real-Time Live Circular Calculation Box */}
      {showSummary && (
        <div className="p-3 bg-white rounded-xl border border-emerald-200/80 shadow-xs space-y-2 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <span className="font-bold text-gray-700">Order Subtotal:</span>
            <span className="text-base font-black text-emerald-700">
              {pricePerUnit === 0 ? 'FREE GIVEAWAY' : `₹${totalPrice.toLocaleString()}`}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600 pt-0.5">
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Landfill Avoided</span>
              <span className="font-extrabold text-emerald-800">
                +{divertedKg} kg diverted
              </span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Estimated Savings</span>
              <span className="font-bold text-emerald-700">
                ₹{estimatedSavings.toLocaleString()} avoided markup
              </span>
            </div>
          </div>

          {/* Core circularity split-lot callout */}
          <div className="p-2 bg-emerald-50/80 rounded-lg border border-emerald-100 text-[10px] text-emerald-950 flex items-start gap-1.5 leading-snug">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Zero-Waste Split Lot:</strong> You take <strong>{quantity} {unit}</strong>. The remaining <strong>{remainingInLot} {unit}</strong> stays listed in the contractor's inventory for other local renovators.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
