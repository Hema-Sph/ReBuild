import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  MaterialListing,
  MaterialRequest,
  PlatformImpactStats,
  PersonalImpactStats,
  SellerType
} from '../types';
import {
  INITIAL_LISTINGS,
  INITIAL_REQUESTS,
  INITIAL_PLATFORM_STATS,
  INITIAL_USER_BADGES
} from '../data/seedData';
import { evaluateSustainabilityBenefit } from '../services/sustainabilityIntelligence';

export type NavigationPage =
  | 'home'
  | 'marketplace'
  | 'list-surplus'
  | 'ai-assistant'
  | 'material-details'
  | 'my-materials'
  | 'my-requests'
  | 'impact'
  | 'profile'
  | 'business-dashboard';

export type AppRoleMode = 'supplier' | 'buyer';

interface AppContextType {
  currentPage: NavigationPage;
  setCurrentPage: (page: NavigationPage) => void;
  selectedListingId: string | null;
  openListingDetails: (id: string) => void;
  listings: MaterialListing[];
  requests: MaterialRequest[];
  platformStats: PlatformImpactStats;
  personalStats: PersonalImpactStats;
  userRole: SellerType;
  setUserRole: (role: SellerType) => void;
  roleMode: AppRoleMode;
  setRoleMode: (mode: AppRoleMode) => void;
  isRoleModalOpen: boolean;
  setIsRoleModalOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  addListing: (listingData: Partial<MaterialListing>) => MaterialListing;
  optimizeListing: (id: string) => void;
  createRequest: (listingId: string, quantity: number, intendedUse: string) => MaterialRequest | null;
  acceptRequest: (requestId: string) => void;
  markAsReused: (requestId: string) => void;
  resetToDemoData: () => void;
  isHeroDemoActive: boolean;
  setIsHeroDemoActive: (active: boolean) => void;
  toast: { message: string; type: 'success' | 'info' | 'warning' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_LISTINGS = 'rebuild_listings_v1';
const STORAGE_KEY_REQUESTS = 'rebuild_requests_v1';
const STORAGE_KEY_STATS = 'rebuild_stats_v1';
const STORAGE_KEY_PERSONAL = 'rebuild_personal_v1';
const STORAGE_KEY_ROLE_MODE = 'rebuild_role_mode_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [selectedListingId, setSelectedListingId] = useState<string | null>('mat-001');
  const [roleMode, setRoleModeState] = useState<AppRoleMode>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ROLE_MODE);
    return (saved as AppRoleMode) || 'supplier';
  });
  const [userRole, setUserRole] = useState<SellerType>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ROLE_MODE);
    return saved === 'buyer' ? 'Homeowner' : 'Contractor';
  });
  const [isRoleModalOpen, setIsRoleModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isHeroDemoActive, setIsHeroDemoActive] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const setRoleMode = (mode: AppRoleMode) => {
    setRoleModeState(mode);
    localStorage.setItem(STORAGE_KEY_ROLE_MODE, mode);
    if (mode === 'supplier') {
      setUserRole('Contractor');
      showToast('Switched to Contractor Mode: You can upload and manage surplus lots.', 'info');
    } else {
      setUserRole('Homeowner');
      showToast('Switched to Buyer Mode: You can search and request small-quantity materials.', 'info');
    }
  };

  // Initialize from LocalStorage or seed defaults
  const [listings, setListings] = useState<MaterialListing[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LISTINGS);
    return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
  });

  const [requests, setRequests] = useState<MaterialRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_REQUESTS);
    return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
  });

  const [platformStats, setPlatformStats] = useState<PlatformImpactStats>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_STATS);
    return saved ? JSON.parse(saved) : INITIAL_PLATFORM_STATS;
  });

  const [personalStats, setPersonalStats] = useState<PersonalImpactStats>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PERSONAL);
    return saved ? JSON.parse(saved) : {
      kgRecirculated: 248,
      successfulMatches: 14,
      savingsRupees: 8400,
      badges: INITIAL_USER_BADGES
    };
  });

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LISTINGS, JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(platformStats));
  }, [platformStats]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PERSONAL, JSON.stringify(personalStats));
  }, [personalStats]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  };

  const openListingDetails = (id: string) => {
    setSelectedListingId(id);
    setCurrentPage('material-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addListing = (data: Partial<MaterialListing>): MaterialListing => {
    const newId = `mat-${Date.now().toString().slice(-4)}`;
    const newListing: MaterialListing = {
      id: newId,
      title: data.title || 'Surplus Material',
      category: data.category || 'Other',
      description: data.description || 'Surplus construction material in good condition.',
      imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      quantityAvailable: Number(data.quantityAvailable) || 10,
      minQuantityAllowed: 1,
      unit: data.unit || 'pieces',
      condition: data.condition || 'New / unused',
      location: data.location || 'Bengaluru Central',
      pinCode: data.pinCode || '560001',
      distanceKm: Number((Math.random() * 6 + 1.5).toFixed(1)),
      pricePerUnit: Number(data.pricePerUnit) || 0,
      actionType: data.actionType || 'Sell',
      exchangeWish: data.exchangeWish,
      circularityScore: data.circularityScore || 90,
      sellerName: data.sellerName || (userRole === 'Contractor' ? 'Apex Buildcon' : 'Priya Sharma'),
      sellerType: userRole,
      sellerPhone: '+91 98765 43210',
      originalUse: data.originalUse || 'Recent construction project surplus',
      currentStatus: 'Surplus',
      recommendedSecondUse: data.recommendedSecondUse || 'Local small-scale repair & DIY',
      potentialLifespanExtension: data.potentialLifespanExtension || '~10–15 years',
      weightKgPerUnit: data.weightKgPerUnit || 2.0,
      daysListed: 0,
      requestsCount: 0,
      isSafetyCritical: data.isSafetyCritical,
      safetyWarning: data.safetyWarning,
      availableUntil: data.availableUntil || '2026-11-30',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setListings((prev) => [newListing, ...prev]);
    showToast(`Successfully listed "${newListing.title}"! AI analysis applied.`, 'success');
    return newListing;
  };

  const optimizeListing = (id: string) => {
    setListings((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const discountPrice = Math.max(0, Math.round(item.pricePerUnit * 0.8));
          return {
            ...item,
            pricePerUnit: discountPrice,
            minQuantityAllowed: 1, // Allow smaller quantities
            daysListed: 1, // Reset stale counter
            circularityScore: Math.min(98, item.circularityScore + 6)
          };
        }
        return item;
      })
    );
    showToast('Listing optimized! Price discounted by 20% and lot size reduced to 1 unit.', 'success');
  };

  const createRequest = (
    listingId: string,
    quantity: number,
    intendedUse: string
  ): MaterialRequest | null => {
    const target = listings.find((l) => l.id === listingId);
    if (!target) return null;

    const sustainability = evaluateSustainabilityBenefit({
      category: target.category,
      quantity,
      unitPrice: target.pricePerUnit,
      distanceKm: target.distanceKm,
      weightKgPerUnit: target.weightKgPerUnit
    });

    const newRequest: MaterialRequest = {
      id: `req-${Date.now().toString().slice(-4)}`,
      listingId: target.id,
      listingTitle: target.title,
      listingImage: target.imageUrl,
      sellerName: target.sellerName,
      buyerName: userRole === 'Homeowner' ? 'Priya Sharma (You)' : 'Ramesh Patel (Homeowner)',
      buyerRole: userRole === 'Homeowner' ? 'Homeowner' : 'Local Repairer',
      buyerLocation: 'Indiranagar 100ft Rd, Bengaluru',
      quantityRequested: quantity,
      unit: target.unit,
      unitPrice: target.pricePerUnit,
      totalPrice: target.pricePerUnit * quantity,
      intendedUse: intendedUse || 'Small repair / DIY project',
      status: 'Requested',
      requestedAt: new Date().toISOString(),
      distanceKm: target.distanceKm,
      impactKgDiverted: sustainability.kgDivertedEstimate,
      estimatedSavingsRupees: sustainability.savingsEstimateRupees,
      avoidedNewPurchaseDemandKg: sustainability.avoidedNewDemandKg
    };

    setRequests((prev) => [newRequest, ...prev]);

    // Update listing requests count
    setListings((prev) =>
      prev.map((l) => (l.id === listingId ? { ...l, requestsCount: l.requestsCount + 1 } : l))
    );

    showToast(`Request sent for ${quantity} ${target.unit} of "${target.title}"!`, 'success');
    return newRequest;
  };

  const acceptRequest = (requestId: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === requestId ? { ...r, status: 'Accepted', acceptedAt: new Date().toISOString() } : r
      )
    );
    showToast('Request accepted! Buyer has been notified with collection instructions.', 'success');
  };

  const markAsReused = (requestId: string) => {
    let completedReq: MaterialRequest | undefined;

    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === requestId) {
          completedReq = {
            ...r,
            status: 'Reused',
            collectedAt: r.collectedAt || new Date().toISOString(),
            reusedAt: new Date().toISOString()
          };
          return completedReq;
        }
        return r;
      })
    );

    if (completedReq) {
      const divertedKg = completedReq.impactKgDiverted;
      const savings = completedReq.estimatedSavingsRupees;
      const avoidedKg = completedReq.avoidedNewPurchaseDemandKg;

      // Update global platform metrics
      setPlatformStats((prev) => ({
        ...prev,
        totalKgDiverted: Number((prev.totalKgDiverted + divertedKg).toFixed(1)),
        successfulMatches: prev.successfulMatches + 1,
        totalKgRecirculated: Number((prev.totalKgRecirculated + divertedKg).toFixed(1)),
        totalUserSavingsRupees: prev.totalUserSavingsRupees + savings,
        potentialDemandAvoidedKg: Number((prev.potentialDemandAvoidedKg + avoidedKg).toFixed(1))
      }));

      // Update personal metrics & badges
      setPersonalStats((prev) => {
        const updatedKg = prev.kgRecirculated + divertedKg;
        const updatedBadges = prev.badges.map((b) => {
          if (b.id === 'badge-5' && !b.unlocked) {
            return { ...b, unlocked: true, unlockedAt: new Date().toISOString().split('T')[0] };
          }
          return b;
        });

        return {
          kgRecirculated: Number(updatedKg.toFixed(1)),
          successfulMatches: prev.successfulMatches + 1,
          savingsRupees: prev.savingsRupees + savings,
          badges: updatedBadges
        };
      });

      // Deduct quantity from original listing
      setListings((prev) =>
        prev.map((l) => {
          if (l.id === completedReq?.listingId) {
            const remaining = Math.max(0, l.quantityAvailable - completedReq.quantityRequested);
            return {
              ...l,
              quantityAvailable: remaining,
              currentStatus: remaining === 0 ? 'Reused' : l.currentStatus
            };
          }
          return l;
        })
      );

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 110,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#10B981', '#15803D', '#4ADE80', '#059669', '#FBBF24']
        });
      } catch {
        // Fallback gracefully if canvas-confetti is not supported
      }

      showToast(
        `🎉 Reuse complete! +${divertedKg} kg diverted from waste, ₹${savings.toLocaleString()} saved!`,
        'success'
      );
    }
  };

  const resetToDemoData = () => {
    localStorage.removeItem(STORAGE_KEY_LISTINGS);
    localStorage.removeItem(STORAGE_KEY_REQUESTS);
    localStorage.removeItem(STORAGE_KEY_STATS);
    localStorage.removeItem(STORAGE_KEY_PERSONAL);
    setListings(INITIAL_LISTINGS);
    setRequests(INITIAL_REQUESTS);
    setPlatformStats(INITIAL_PLATFORM_STATS);
    setPersonalStats({
      kgRecirculated: 248,
      successfulMatches: 14,
      savingsRupees: 8400,
      badges: INITIAL_USER_BADGES
    });
    showToast('Platform reset to original hackathon demo data!', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedListingId,
        openListingDetails,
        listings,
        requests,
        platformStats,
        personalStats,
        userRole,
        setUserRole,
        roleMode,
        setRoleMode,
        isRoleModalOpen,
        setIsRoleModalOpen,
        searchQuery,
        setSearchQuery,
        addListing,
        optimizeListing,
        createRequest,
        acceptRequest,
        markAsReused,
        resetToDemoData,
        isHeroDemoActive,
        setIsHeroDemoActive,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
