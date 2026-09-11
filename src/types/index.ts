export type MaterialCategory =
  | 'Tiles'
  | 'Bricks'
  | 'Wood'
  | 'Cement'
  | 'Sand'
  | 'Stone'
  | 'Metal'
  | 'Pipes'
  | 'Doors'
  | 'Windows'
  | 'Fixtures'
  | 'Other';

export type MaterialCondition =
  | 'New / unused'
  | 'Lightly used'
  | 'Used'
  | 'Damaged';

export type ListingAction = 'Sell' | 'Give' | 'Exchange' | 'Let AI decide';

export type UnitType =
  | 'pieces'
  | 'kg'
  | 'bags'
  | 'meters'
  | 'sq.ft'
  | 'litres'
  | 'other';

export type SellerType =
  | 'Construction Company'
  | 'Contractor'
  | 'Builder'
  | 'Renovation Worker'
  | 'Homeowner'
  | 'Small Business';

export interface MaterialListing {
  id: string;
  title: string;
  category: MaterialCategory;
  description: string;
  imageUrl: string;
  quantityAvailable: number;
  minQuantityAllowed: number;
  unit: UnitType;
  condition: MaterialCondition;
  location: string;
  pinCode: string;
  distanceKm: number;
  pricePerUnit: number; // 0 for Give / Exchange
  actionType: 'Sell' | 'Give' | 'Exchange';
  exchangeWish?: string;
  circularityScore: number; // 0-100
  sellerName: string;
  sellerType: SellerType;
  sellerPhone?: string;
  originalUse: string;
  currentStatus: 'Surplus' | 'Reserved' | 'Reused';
  recommendedSecondUse: string;
  potentialLifespanExtension: string;
  weightKgPerUnit: number; // For verifiable waste diversion calculations
  daysListed: number; // For AI Waste-Risk identification (>14 days with 0 requests)
  requestsCount: number;
  isSafetyCritical?: boolean;
  safetyWarning?: string;
  availableUntil: string;
  createdAt: string;
}

export type TransactionStatus =
  | 'Listed'
  | 'Matched'
  | 'Requested'
  | 'Accepted'
  | 'Collected'
  | 'Reused';

export interface MaterialRequest {
  id: string;
  listingId: string;
  listingTitle: string;
  listingImage: string;
  sellerName: string;
  buyerName: string;
  buyerRole: string;
  buyerLocation: string;
  quantityRequested: number;
  unit: UnitType;
  unitPrice: number;
  totalPrice: number;
  intendedUse: string;
  status: TransactionStatus;
  requestedAt: string;
  acceptedAt?: string;
  collectedAt?: string;
  reusedAt?: string;
  distanceKm: number;
  impactKgDiverted: number;
  estimatedSavingsRupees: number;
  avoidedNewPurchaseDemandKg: number;
}

export interface AIAnalysisResult {
  detectedMaterial: string;
  estimatedCondition: MaterialCondition;
  estimatedReusableQuantity: string;
  circularityScore: number;
  recommendedOptions: {
    tier: number;
    title: string;
    description: string;
    isBestOption?: boolean;
    action: 'Sell' | 'Give' | 'Exchange' | 'Reuse' | 'Repurpose' | 'Recycle';
  }[];
  safetyCaution?: string;
}

export interface ParsedSearchQuery {
  rawQuery: string;
  category?: MaterialCategory;
  materialKeyword?: string;
  quantityMin?: number;
  quantityMax?: number;
  budgetMax?: number;
  intendedUse?: string;
  maxDistanceKm?: number;
}

export interface SearchMatchResult {
  listing: MaterialListing;
  matchScore: number; // 0-100%
  fitReasons: string[];
  distanceKm: number;
  sustainabilityStatus: 'LOCAL_RECOMMENDED' | 'DISTANCE_WARNING' | 'MODERATE';
  sustainabilityExplanation: string;
  estimatedTotalCost: number;
  compatibleQuantity: number;
}

export interface PlatformImpactStats {
  totalKgDiverted: number;
  successfulMatches: number;
  totalKgRecirculated: number;
  totalUserSavingsRupees: number;
  potentialDemandAvoidedKg: number;
}

export interface UserBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface PersonalImpactStats {
  kgRecirculated: number;
  successfulMatches: number;
  savingsRupees: number;
  badges: UserBadge[];
}
