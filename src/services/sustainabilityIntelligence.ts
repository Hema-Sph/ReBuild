import { MaterialCategory } from '../types';

/**
 * Sustainability intelligence calculations:
 * Computes transport impact, estimated waste diverted, and retail savings.
 */

// Average weight reference (kg) per unit for common materials
export const CATEGORY_UNIT_WEIGHTS_KG: Record<MaterialCategory, number> = {
  Tiles: 1.8,       // ~1.8 kg per piece
  Bricks: 2.6,      // ~2.6 kg per standard clay brick
  Wood: 4.2,        // ~4.2 kg per 4ft plank
  Cement: 50.0,     // 50 kg bag
  Sand: 25.0,       // 25 kg bag
  Stone: 14.0,      // ~14 kg per slab or kg
  Metal: 7.2,       // ~7.2 kg per section
  Pipes: 1.4,       // ~1.4 kg per 3m piece
  Doors: 24.0,      // ~24 kg solid timber door
  Windows: 11.5,    // ~11.5 kg frame
  Fixtures: 0.9,    // ~0.9 kg brass faucet
  Other: 2.0        // ~2.0 kg generic unit
};

// Estimated new retail purchase markup (e.g. buying a whole box of tiles instead of 12)
export const ESTIMATED_RETAIL_BOX_SAVINGS_RATIO = 2.4;

export interface SustainabilityAnalysis {
  status: 'LOCAL_RECOMMENDED' | 'DISTANCE_WARNING' | 'MODERATE';
  headline: string;
  explanation: string;
  kgDivertedEstimate: number;
  savingsEstimateRupees: number;
  avoidedNewDemandKg: number;
  transitKm: number;
}

export function evaluateSustainabilityBenefit(params: {
  category: MaterialCategory;
  quantity: number;
  unitPrice: number;
  distanceKm: number;
  weightKgPerUnit?: number;
}): SustainabilityAnalysis {
  const { category, quantity, unitPrice, distanceKm, weightKgPerUnit } = params;

  const unitWeight = weightKgPerUnit || CATEGORY_UNIT_WEIGHTS_KG[category] || 2.0;
  const kgDivertedEstimate = Number((quantity * unitWeight).toFixed(1));

  // If homeowner buys a retail box of 20-30 tiles just to get 12, surplus virgin demand avoided is higher
  const avoidedNewDemandKg = Number((kgDivertedEstimate * 1.35).toFixed(1));

  // Retail savings estimate: retail cost is roughly 2.5-3x second-life surplus cost
  const baseCost = unitPrice > 0 ? unitPrice * quantity : quantity * 25;
  const savingsEstimateRupees = Math.round(baseCost * 1.8);

  let status: 'LOCAL_RECOMMENDED' | 'DISTANCE_WARNING' | 'MODERATE' = 'LOCAL_RECOMMENDED';
  let headline = 'Local Reuse Strongly Recommended';
  let explanation = `Because this material is available nearby (${distanceKm.toFixed(1)} km), reuse provides a strong net circular benefit compared to manufacturing and shipping new retail materials.`;

  if (distanceKm > 50) {
    status = 'DISTANCE_WARNING';
    headline = 'Distance Logistics Advisory';
    explanation = `This material is located ${distanceKm.toFixed(1)} km away. Long haul single-item transport can increase transport footprint. Consider finding a closer supplier or consolidating with existing shipping routes.`;
  } else if (distanceKm > 15) {
    status = 'MODERATE';
    headline = 'Moderate Transit Distance';
    explanation = `Located ${distanceKm.toFixed(1)} km away. Combining collection with a routine commute is recommended to preserve maximum circular benefits.`;
  }

  return {
    status,
    headline,
    explanation,
    kgDivertedEstimate,
    savingsEstimateRupees,
    avoidedNewDemandKg,
    transitKm: distanceKm
  };
}
