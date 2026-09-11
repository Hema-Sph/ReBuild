import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  PlusCircle,
  Tag,
  Filter,
  X,
  Send,
  Eye,
  ArrowUpDown,
  Building2,
  Inbox
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MaterialCategory, MaterialListing } from '../types';
import {
  parseNaturalLanguageQuery,
  searchAndRankListings
} from '../services/aiMatchingEngine';

const CATEGORIES: { id: MaterialCategory | 'ALL'; label: string }[] = [
  { id: 'ALL', label: 'All Materials' },
  { id: 'Tiles', label: 'Tiles' },
  { id: 'Bricks', label: 'Bricks' },
  { id: 'Wood', label: 'Wood & Timber' },
  { id: 'Cement', label: 'Cement' },
  { id: 'Sand', label: 'Sand' },
  { id: 'Stone', label: 'Stone & Granite' },
  { id: 'Metal', label: 'Metal & Steel' },
  { id: 'Pipes', label: 'Pipes & CPVC' },
  { id: 'Doors', label: 'Doors' },
  { id: 'Windows', label: 'Windows' },
  { id: 'Fixtures', label: 'Sanitary Fixtures' },
  { id: 'Other', label: 'Other & Paint' },
];

export const MarketplacePage: React.FC = () => {
  const {
    listings,
    openListingDetails,
    searchQuery,
    setSearchQuery,
    createRequest,
    setCurrentPage,
    roleMode,
    setRoleMode,
    setIsRoleModalOpen
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<MaterialCategory | 'ALL'>('ALL');
  const [selectedCondition, setSelectedCondition] = useState<string | 'ALL'>('ALL');
  const [selectedAction, setSelectedAction] = useState<string | 'ALL'>('ALL');
  const [maxDistance, setMaxDistance] = useState<number>(50);
  const [onlyFree, setOnlyFree] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'match' | 'distance' | 'price' | 'circularity'>('match');

  // Quick Request Modal State
  const [requestingItem, setRequestingItem] = useState<MaterialListing | null>(null);
  const [requestQty, setRequestQty] = useState<number>(1);
  const [requestIntendedUse, setRequestIntendedUse] = useState<string>('');

  // Natural Language Parsed Interpretation
  const parsedQuery = useMemo(() => {
    return parseNaturalLanguageQuery(searchQuery);
  }, [searchQuery]);

  const hasActiveQuery = searchQuery.trim().length > 0;

  // Filter & Rank listings
  const filteredAndRanked = useMemo(() => {
    let results = searchAndRankListings(
      listings,
      searchQuery,
      selectedCategory,
      selectedCondition,
      maxDistance,
      onlyFree ? 'Give' : selectedAction
    );

    if (sortBy === 'distance') {
      results.sort((a, b) => a.listing.distanceKm - b.listing.distanceKm);
    } else if (sortBy === 'price') {
      results.sort((a, b) => a.listing.pricePerUnit - b.listing.pricePerUnit);
    } else if (sortBy === 'circularity') {
      results.sort((a, b) => b.listing.circularityScore - a.listing.circularityScore);
    }

    return results;
  }, [
    listings,
    searchQuery,
    selectedCategory,
    selectedCondition,
    maxDistance,
    onlyFree,
    selectedAction,
    sortBy
  ]);

  const handleOpenRequest = (listing: MaterialListing, e: React.MouseEvent) => {
    e.stopPropagation();
    setRequestingItem(listing);
    // If the parsed query extracted a specific quantity, default to it
    const defaultQty = parsedQuery.quantityMax || parsedQuery.quantityMin || 1;
    setRequestQty(Math.min(listing.quantityAvailable, Math.max(listing.minQuantityAllowed, defaultQty)));
    setRequestIntendedUse(parsedQuery.intendedUse || 'Small repair / DIY renovation');
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (requestingItem) {
      createRequest(requestingItem.id, requestQty, requestIntendedUse);
      setRequestingItem(null);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedCondition('ALL');
    setSelectedAction('ALL');
    setMaxDistance(50);
    setOnlyFree(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sustain-border shadow-soft space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold border mb-1">
              {roleMode === 'supplier' ? (
                <span className="text-blue-800 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  Contractor Catalog View
                </span>
              ) : (
                <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Homeowner & Repair Buyer Mode
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-sustain-forest tracking-tight">
              {roleMode === 'supplier'
                ? 'Regional Surplus Materials Catalog'
                : 'Find materials near you'}
            </h1>
            <p className="text-xs text-sustain-mutedText mt-1">
              {roleMode === 'supplier'
                ? 'Check regional supply pricing, market demand, and see how your listings appear to local buyers.'
                : 'Source exact small batches (e.g. 12 tiles) from contractors without buying full retail cartons.'}
            </p>
          </div>

          {/* Role-specific header button */}
          {roleMode === 'supplier' ? (
            <button
              onClick={() => setCurrentPage('list-surplus')}
              className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-md shadow-blue-700/20 transition-smooth"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Upload New Surplus Batch</span>
            </button>
          ) : (
            <button
              onClick={() => setCurrentPage('my-requests')}
              className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-smooth"
            >
              <Inbox className="w-4 h-4" />
              <span>View My Requests</span>
            </button>
          )}
        </div>

        {/* Role Helper Banner */}
        <div className={`p-3 rounded-xl text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 border ${
          roleMode === 'supplier'
            ? 'bg-blue-50/70 border-blue-200 text-blue-900'
            : 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
        }`}>
          <span>
            {roleMode === 'supplier'
              ? '🏗️ You are in Contractor / Supplier Mode. Your focus is uploading and managing surplus.'
              : '🛒 You are in Buyer Mode. Click "Request" on any card to request a small quantity (e.g. 10–15 tiles).'}
          </span>
          <button
            onClick={() => setIsRoleModalOpen(true)}
            className="underline font-bold text-xs hover:opacity-80 self-start sm:self-auto"
          >
            Switch to {roleMode === 'supplier' ? 'Buyer Mode' : 'Contractor Mode'}
          </button>
        </div>

        {/* Natural language search bar */}
        <div className="relative">
          <div className="flex items-center bg-sustain-sand rounded-xl p-2 border border-sustain-border focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
            <Search className="w-5 h-5 text-gray-400 ml-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Natural Language Search: e.g. “I need around 10–15 tiles for a bathroom repair under ₹500”"
              className="w-full px-3 py-1.5 text-sm bg-transparent text-sustain-darkText placeholder:text-gray-400 focus:outline-none font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 hover:bg-gray-200 rounded-lg text-gray-500 mr-2"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* AI Interpretation Box if query is active */}
        {hasActiveQuery && (
          <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs space-y-2 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                AI Query Interpretation
              </span>
              <span className="text-[11px] font-semibold text-emerald-700">
                Found {filteredAndRanked.length} potential matches
              </span>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px]">
              {parsedQuery.category && (
                <span className="px-2.5 py-1 bg-white rounded-md border border-emerald-200 font-semibold text-sustain-forest">
                  Category: <strong>{parsedQuery.category}</strong>
                </span>
              )}
              {parsedQuery.quantityMin && (
                <span className="px-2.5 py-1 bg-white rounded-md border border-emerald-200 font-semibold text-sustain-forest">
                  Quantity: <strong>{parsedQuery.quantityMin}{parsedQuery.quantityMax ? `–${parsedQuery.quantityMax}` : ''} units</strong>
                </span>
              )}
              {parsedQuery.intendedUse && (
                <span className="px-2.5 py-1 bg-white rounded-md border border-emerald-200 font-semibold text-sustain-forest">
                  Application: <strong>{parsedQuery.intendedUse}</strong>
                </span>
              )}
              {parsedQuery.budgetMax && (
                <span className="px-2.5 py-1 bg-white rounded-md border border-emerald-200 font-semibold text-sustain-forest">
                  Budget: <strong>Up to ₹{parsedQuery.budgetMax.toLocaleString()}</strong>
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Filters Sidebar + Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-sustain-border shadow-soft space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-xs font-extrabold uppercase tracking-wider text-sustain-forest flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filters
              </span>
              <button
                onClick={handleResetFilters}
                className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700">Material Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as MaterialCategory | 'ALL')}
                className="w-full text-xs p-2 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-emerald-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700">Condition</label>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-emerald-500"
              >
                <option value="ALL">Any Condition</option>
                <option value="New / unused">New / unused</option>
                <option value="Lightly used">Lightly used</option>
                <option value="Used">Used</option>
                <option value="Damaged">Damaged / for salvage</option>
              </select>
            </div>

            {/* Distance Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-700">
                <span>Max Distance</span>
                <span className="text-emerald-700">{maxDistance} km</span>
              </div>
              <input
                type="range"
                min="2"
                max="150"
                step="2"
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>2 km (Hyperlocal)</span>
                <span>150 km (Regional)</span>
              </div>
            </div>

            {/* Action Type (Sell / Give / Exchange) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700">Transaction Type</label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {['ALL', 'Sell', 'Give', 'Exchange'].map((action) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => setSelectedAction(action)}
                    className={`py-1.5 px-2 rounded-lg font-medium text-center transition-all ${
                      selectedAction === action
                        ? 'bg-emerald-100 text-emerald-900 font-bold border border-emerald-300'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {action === 'ALL' ? 'All Types' : action}
                  </button>
                ))}
              </div>
            </div>

            {/* Only Free Giveaway Toggle */}
            <div className="pt-2 border-t border-gray-100">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700 select-none">
                <input
                  type="checkbox"
                  checked={onlyFree}
                  onChange={(e) => setOnlyFree(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 accent-emerald-600"
                />
                <span>Free Giveaway Only (₹0)</span>
              </label>
            </div>

            {/* Sort Dropdown */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                <ArrowUpDown className="w-3 h-3" />
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full text-xs p-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none"
              >
                <option value="match">AI Smart Match Score</option>
                <option value="distance">Proximity (Closest first)</option>
                <option value="price">Price (Lowest first)</option>
                <option value="circularity">Circularity Score (Highest)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Listings Result Grid */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between text-xs text-gray-500 pb-1">
            <span>
              Showing <strong>{filteredAndRanked.length}</strong> available materials
            </span>
            {hasActiveQuery && (
              <span className="font-semibold text-emerald-800">
                Sorted by AI match score
              </span>
            )}
          </div>

          {filteredAndRanked.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-sustain-border space-y-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-sustain-forest">No surplus matches found</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Try widening your distance radius, removing specific keywords, or check back soon as builders list new lots daily.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndRanked.map(({ listing, matchScore, fitReasons, sustainabilityStatus }) => (
                <div
                  key={listing.id}
                  onClick={() => openListingDetails(listing.id)}
                  className="bg-white rounded-2xl border border-sustain-border shadow-soft overflow-hidden hover:shadow-card hover:-translate-y-1 transition-smooth cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    {/* Image & Badges */}
                    <div className="relative h-44 overflow-hidden bg-gray-100">
                      <img
                        src={listing.imageUrl}
                        alt={listing.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                      />
                      <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold text-sustain-forest border border-gray-200">
                          {listing.category}
                        </span>
                        {listing.actionType === 'Give' && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[9px] font-black uppercase">
                            FREE
                          </span>
                        )}
                        {listing.actionType === 'Exchange' && (
                          <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white text-[9px] font-black uppercase">
                            EXCHANGE
                          </span>
                        )}
                      </div>

                      {/* Circularity Score Badge */}
                      <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-emerald-950/90 text-emerald-200 text-[10px] font-extrabold border border-emerald-500/40">
                        Score: {listing.circularityScore}/100
                      </div>

                      {/* AI Match Badge (if active query or match > 80%) */}
                      {hasActiveQuery && (
                        <div className="absolute bottom-2 left-2.5 px-2.5 py-1 rounded-md bg-emerald-600 text-white text-[11px] font-black shadow-md flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{matchScore}% Match</span>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-4 space-y-2.5">
                      <div>
                        <h3 className="text-sm font-bold text-sustain-forest line-clamp-1 group-hover:text-emerald-700 transition-colors">
                          {listing.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {listing.quantityAvailable} {listing.unit} available • {listing.condition}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{listing.location.split(',')[0]}</span>
                        <span className="font-bold text-emerald-800">({listing.distanceKm} km)</span>
                      </div>

                      {/* Sustainability Tag */}
                      {sustainabilityStatus === 'LOCAL_RECOMMENDED' && (
                        <div className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 inline-block">
                          🌱 Local Reuse Recommended
                        </div>
                      )}
                      {sustainabilityStatus === 'DISTANCE_WARNING' && (
                        <div className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-1 rounded border border-amber-200 inline-block">
                          ⚠️ Long Transit Advisory ({listing.distanceKm} km)
                        </div>
                      )}

                      {/* Match Reasons snippet if search query active */}
                      {hasActiveQuery && fitReasons.length > 0 && (
                        <div className="pt-1 text-[11px] text-gray-500 space-y-0.5">
                          <div className="font-semibold text-gray-700">Why this match:</div>
                          <ul className="text-[10px] text-gray-600 list-disc list-inside">
                            {fitReasons.slice(0, 2).map((r, i) => (
                              <li key={i} className="truncate">{r}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-4 pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-xs font-black text-sustain-forest">
                        {listing.pricePerUnit === 0
                          ? 'FREE'
                          : `₹${listing.pricePerUnit}/${listing.unit}`}
                      </div>
                      <div className="text-[10px] text-gray-400">
                        {listing.sellerType}
                      </div>
                    </div>

                    <div className="flex gap-1.5">
                      {roleMode === 'buyer' ? (
                        <button
                          onClick={(e) => handleOpenRequest(listing, e)}
                          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-smooth shadow-xs active:scale-95 flex items-center gap-1"
                        >
                          <Send className="w-3 h-3" />
                          <span>Request</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => openListingDetails(listing.id)}
                          className="px-3.5 py-1.5 rounded-lg bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200 text-xs font-bold transition-smooth"
                        >
                          <span>{listing.sellerName.includes('Apex') ? 'Manage Lot' : 'View Specs'}</span>
                        </button>
                      )}
                      <button
                        onClick={() => openListingDetails(listing.id)}
                        className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
                        title="View full specs"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* QUICK REQUEST MODAL */}
      {requestingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-sustain-border overflow-hidden">
            <div className="p-5 bg-sustain-forest text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Request Material
                </span>
                <h3 className="text-base font-bold text-white line-clamp-1">
                  {requestingItem.title}
                </h3>
              </div>
              <button
                onClick={() => setRequestingItem(null)}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitRequest} className="p-6 space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <img
                  src={requestingItem.imageUrl}
                  alt={requestingItem.title}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div className="text-xs space-y-0.5">
                  <div className="font-bold text-sustain-forest">{requestingItem.title}</div>
                  <div className="text-gray-500">
                    Surplus batch size: <strong>{requestingItem.quantityAvailable} {requestingItem.unit}</strong>
                  </div>
                  <div className="text-emerald-700 font-semibold">
                    {requestingItem.pricePerUnit === 0
                      ? 'Free material'
                      : `₹${requestingItem.pricePerUnit} / ${requestingItem.unit}`}
                  </div>
                </div>
              </div>

              {/* Quantity Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 flex justify-between">
                  <span>Quantity You Need ({requestingItem.unit})</span>
                  <span className="text-gray-400 font-normal">
                    Max: {requestingItem.quantityAvailable}
                  </span>
                </label>
                <input
                  type="number"
                  min={requestingItem.minQuantityAllowed}
                  max={requestingItem.quantityAvailable}
                  value={requestQty}
                  onChange={(e) => setRequestQty(Math.max(1, Number(e.target.value)))}
                  className="w-full text-sm p-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-emerald-500 font-semibold"
                  required
                />
                <p className="text-[11px] text-gray-500">
                  Total price: <strong>₹{(requestingItem.pricePerUnit * requestQty).toLocaleString()}</strong>
                </p>
              </div>

              {/* Intended Use Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">
                  Intended Application / Repair Need
                </label>
                <textarea
                  rows={2}
                  value={requestIntendedUse}
                  onChange={(e) => setRequestIntendedUse(e.target.value)}
                  placeholder="e.g. Bathroom repair to replace broken tiles after plumbing fix"
                  className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              {/* Safety notice for critical items */}
              {requestingItem.isSafetyCritical && (
                <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 flex items-start gap-2 text-[11px] text-amber-800">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{requestingItem.safetyWarning}</span>
                </div>
              )}

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setRequestingItem(null)}
                  className="w-1/2 py-2.5 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-md flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
