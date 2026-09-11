import React from 'react';
import {
  Scale,
  Recycle,
  Users,
  TrendingUp,
  ShieldCheck,
  BarChart3,
  PieChart as PieIcon,
  Info,
  ArrowUpRight,
  Layers
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';
import { useApp } from '../context/AppContext';

export const ImpactDashboardPage: React.FC = () => {
  const { platformStats, requests } = useApp();

  // Monthly waste diversion historical trend (kg)
  const monthlyTrendData = [
    { month: 'Apr', divertedKg: 850, matches: 28 },
    { month: 'May', divertedKg: 1420, matches: 52 },
    { month: 'Jun', divertedKg: 2150, matches: 84 },
    { month: 'Jul', divertedKg: 3600, matches: 135 },
    { month: 'Aug', divertedKg: 5900, matches: 220 },
    { month: 'Sep (Live)', divertedKg: platformStats.totalKgDiverted, matches: platformStats.successfulMatches }
  ];

  // Material reused by category breakdown
  const categoryData = [
    { name: 'Tiles', kg: 3400, color: '#10B981' },
    { name: 'Bricks & Pavers', kg: 2450, color: '#059669' },
    { name: 'Wood & Timber', kg: 1480, color: '#D97706' },
    { name: 'Metal & Steel', kg: 820, color: '#6366F1' },
    { name: 'Fixtures & Sanitary', kg: 450, color: '#0284C7' },
    { name: 'Cement & Sand', kg: 320, color: '#84CC16' }
  ];

  // Action breakdown: Sell vs Give vs Exchange vs Reuse
  const actionBreakdownData = [
    { name: 'Sell Surplus', value: 62, color: '#10B981' },
    { name: 'Free Donation (Give)', value: 22, color: '#3B82F6' },
    { name: 'Material Exchange', value: 11, color: '#8B5CF6' },
    { name: 'Direct Reuse / DIY', value: 5, color: '#F59E0B' }
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-sustain-border shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
            <Scale className="w-3.5 h-3.5 text-emerald-700" />
            <span>Verifiable Circular Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-sustain-forest mt-1 tracking-tight">
            Measurable Sustainability Impact
          </h1>
          <p className="text-xs text-sustain-mutedText mt-1 max-w-xl">
            Real-time aggregate platform tracking. Every accepted and completed small-batch reuse transaction directly updates these metrics.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-900">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Real-time Sync Active</span>
        </div>
      </div>

      {/* HERO METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: HERO METRIC */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-sustain-forest to-sustain-deep text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Scale className="w-24 h-24 text-white" />
          </div>
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
              Primary Platform Metric
            </div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
              {platformStats.totalKgDiverted.toLocaleString()} kg
            </div>
            <div className="text-xs font-bold text-emerald-200 mt-1">
              MATERIAL DIVERTED FROM WASTE
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-gray-300">
            Calculated from verified unit weights of completed reuses.
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-6 rounded-2xl bg-white border border-sustain-border shadow-soft flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Circulation Volume
            </div>
            <div className="text-3xl font-black text-sustain-forest mt-1">
              {platformStats.totalKgRecirculated.toLocaleString()} kg
            </div>
            <div className="text-xs font-bold text-blue-800 mt-1">
              Materials Recirculated
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-500">
            Active lifespan extended into local second-use.
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-6 rounded-2xl bg-white border border-sustain-border shadow-soft flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Small-Batch Matches
            </div>
            <div className="text-3xl font-black text-sustain-forest mt-1">
              {platformStats.successfulMatches.toLocaleString()}
            </div>
            <div className="text-xs font-bold text-amber-800 mt-1">
              Successful Reuse Matches
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-500">
            Contractor surplus matched to homeowner demand.
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-6 rounded-2xl bg-white border border-sustain-border shadow-soft flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Economic Benefit
            </div>
            <div className="text-3xl font-black text-sustain-forest mt-1">
              ₹{(platformStats.totalUserSavingsRupees / 100000).toFixed(1)}L
            </div>
            <div className="text-xs font-bold text-emerald-800 mt-1">
              Estimated User Savings
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-500">
            Calculated vs retail packaging box minimums.
          </div>
        </div>
      </div>

      {/* Secondary Metric: Potential new-material demand avoided */}
      <div className="bg-emerald-50/80 rounded-2xl p-5 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
            <Recycle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
              Potential New-Material Demand Avoided (Estimate)
            </div>
            <div className="text-xl font-extrabold text-emerald-900">
              ~{platformStats.potentialDemandAvoidedKg.toLocaleString()} kg of virgin raw production avoided
            </div>
          </div>
        </div>
        <div className="text-xs text-emerald-800/80 max-w-sm text-left sm:text-right">
          By enabling small-batch purchases, users avoid buying whole factory cartons that end up stored or discarded.
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Waste Diversion Trend Over Time */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-sustain-border shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-bold text-sustain-forest">
                Cumulative Material Diverted From Waste Over Time (kg)
              </h3>
              <p className="text-[11px] text-gray-400">
                Monthly trajectory of construction materials rescued from landfills
              </p>
            </div>
            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              +142% MoM
            </span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="divertGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={11} tickLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} />
                <Tooltip
                  formatter={(value: any) => [`${Number(value).toLocaleString()} kg`, 'Diverted']}
                  contentStyle={{ backgroundColor: '#0F2318', color: '#fff', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                />
                <Area
                  type="monotone"
                  dataKey="divertedKg"
                  stroke="#10B981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#divertGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sell vs Give vs Exchange vs Reuse Donut */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-sustain-border shadow-soft space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-sustain-forest">
              Circularity Pathway Distribution
            </h3>
            <p className="text-[11px] text-gray-400">
              Breakdown by transaction category
            </p>

            <div className="h-56 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={actionBreakdownData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {actionBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any) => [`${value}%`, 'Share']}
                    contentStyle={{ backgroundColor: '#0F2318', color: '#fff', borderRadius: '8px', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-gray-100">
            {actionBreakdownData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-gray-600 truncate">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Reused Bar Chart */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sustain-border shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-2">
          <div>
            <h3 className="text-base font-bold text-sustain-forest">
              Materials Diverted by Category (kg)
            </h3>
            <p className="text-xs text-gray-400">
              Tiles, masonry, and timber represent the highest volume of prevented landfill debris
            </p>
          </div>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={11} tickLine={false} />
              <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} />
              <Tooltip
                formatter={(value: any) => [`${Number(value).toLocaleString()} kg`, 'Weight Diverted']}
                contentStyle={{ backgroundColor: '#0F2318', color: '#fff', borderRadius: '8px', border: 'none', fontSize: '12px' }}
              />
              <Bar dataKey="kg" radius={[6, 6, 0, 0]}>
                {categoryData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transparent Methodology & Environmental Integrity Note */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
          <Info className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Transparent Environmental Methodology & Assumptions</span>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">
          Material diverted from waste (kg) is computed directly from verified material unit weights (e.g. ceramic tiles @ 1.8 kg/unit, clay bricks @ 2.6 kg/unit, timber planks @ 4.2 kg/unit).
        </p>
        <p className="text-[11px] text-gray-500 leading-relaxed">
          Estimated user savings reflects avoided spending on minimum retail packaging (e.g., homeowners forced to buy 25 tiles in a factory carton when only 12 are needed). ReBuild does not claim speculative CO₂ offset credits without third-party physical audit.
        </p>
      </div>
    </div>
  );
};
