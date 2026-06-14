'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Incident } from '@/types';
import StatsCard from '@/components/dashboard/StatsCard';
import TrendChart from '@/components/dashboard/TrendChart';
import CategoryBreakdown from '@/components/dashboard/CategoryBreakdown';
import NeighborhoodBreakdown from '@/components/dashboard/NeighborhoodBreakdown';

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function monthKey(date: Date): string {
  return `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

export default function DashboardPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchIncidents() {
      try {
        const res = await fetch('/api/incidents?status=verified');
        if (res.ok) {
          const data = await res.json();
          setIncidents(Array.isArray(data) ? data : (data.incidents ?? []));
        }
      } catch {
        // Demo mode — leave incidents empty
      } finally {
        setIsLoading(false);
      }
    }
    fetchIncidents();
  }, []);

  const {
    totalIncidents,
    thisMonth,
    lastMonth,
    momChange,
    momPositive,
    monthlyData,
    categoryData,
    neighborhoodData,
  } = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const thisMonthCount = incidents.filter((inc) => {
      const d = new Date(inc.occurred_at);
      return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
    }).length;

    const lastMonthDate = new Date(currentYear, currentMonth - 1, 1);
    const lastMonthCount = incidents.filter((inc) => {
      const d = new Date(inc.occurred_at);
      return (
        d.getFullYear() === lastMonthDate.getFullYear() &&
        d.getMonth() === lastMonthDate.getMonth()
      );
    }).length;

    let momChangeStr = 'N/A';
    let momPos: boolean | undefined;
    if (lastMonthCount > 0) {
      const pct = ((thisMonthCount - lastMonthCount) / lastMonthCount) * 100;
      const sign = pct >= 0 ? '+' : '';
      momChangeStr = `${sign}${pct.toFixed(0)}% vs last month`;
      momPos = pct <= 0; // fewer incidents = positive
    }

    // Build monthly series: Jan 2024 through current month
    const start = new Date(2024, 0, 1);
    const seriesMap: Record<string, number> = {};
    const cursor = new Date(start);
    while (
      cursor.getFullYear() < currentYear ||
      (cursor.getFullYear() === currentYear && cursor.getMonth() <= currentMonth)
    ) {
      seriesMap[monthKey(cursor)] = 0;
      cursor.setMonth(cursor.getMonth() + 1);
    }
    incidents.forEach((inc) => {
      const d = new Date(inc.occurred_at);
      const k = monthKey(d);
      if (k in seriesMap) seriesMap[k] = (seriesMap[k] ?? 0) + 1;
    });
    const monthly = Object.entries(seriesMap).map(([month, count]) => ({ month, count }));

    // Category breakdown
    const catMap: Record<string, number> = {};
    incidents.forEach((inc) => {
      catMap[inc.category] = (catMap[inc.category] ?? 0) + 1;
    });
    const categories = Object.entries(catMap)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);

    // Neighborhood breakdown (top 10)
    const nbrMap: Record<string, number> = {};
    incidents.forEach((inc) => {
      nbrMap[inc.neighborhood] = (nbrMap[inc.neighborhood] ?? 0) + 1;
    });
    const neighborhoods = Object.entries(nbrMap)
      .map(([neighborhood, count]) => ({ neighborhood, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      totalIncidents: incidents.length,
      thisMonth: thisMonthCount,
      lastMonth: lastMonthCount,
      momChange: momChangeStr,
      momPositive: momPos,
      monthlyData: monthly,
      categoryData: categories,
      neighborhoodData: neighborhoods,
    };
  }, [incidents]);

  return (
    <>
      {/* Page header */}
      <section className="bg-navy-800 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-10 h-0.5 bg-gold-500 mb-5" aria-hidden="true" />
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight">
            Analytics Dashboard
          </h1>
          <p className="mt-3 text-base text-blue-100/70 font-sans max-w-xl leading-relaxed">
            Verified incident data across Greater Los Angeles, updated as reports are
            reviewed and confirmed by our team.
          </p>
        </div>
      </section>

      <section className="bg-cream-50 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Demo banner */}
          <div className="border border-amber-300 bg-amber-50 rounded-lg px-6 py-4">
            <p className="font-sans text-sm text-amber-900 leading-relaxed">
              <strong>Demo mode:</strong> The dashboard below shows live-aggregated data
              from the database when connected. In demo mode without Supabase credentials,
              charts will be empty or show placeholder values.
            </p>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <p className="font-sans text-sm text-gray-400">Loading incident data...</p>
            </div>
          )}

          {!isLoading && (
            <>
              {/* Stats row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard label="Total Incidents" value={totalIncidents} />
                <StatsCard label="This Month" value={thisMonth} />
                <StatsCard label="Last Month" value={lastMonth} />
                <StatsCard
                  label="Month-over-Month"
                  value={momChange}
                  positive={momPositive}
                />
              </div>

              {/* Incident Trend */}
              <div className="bg-white border border-cream-200 rounded-lg shadow-sm p-6">
                <h2 className="font-serif text-lg font-semibold text-navy-800 mb-1">
                  Incident Trend
                </h2>
                <p className="font-sans text-xs text-gray-400 mb-5">
                  Verified incidents per month, January 2024 to present
                </p>
                {monthlyData.length > 0 ? (
                  <TrendChart data={monthlyData} />
                ) : (
                  <div className="h-[280px] flex items-center justify-center">
                    <p className="font-sans text-sm text-gray-400">No data available</p>
                  </div>
                )}
              </div>

              {/* Category + Neighborhood breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-cream-200 rounded-lg shadow-sm p-6">
                  <h2 className="font-serif text-lg font-semibold text-navy-800 mb-1">
                    Incidents by Category
                  </h2>
                  <p className="font-sans text-xs text-gray-400 mb-5">
                    Breakdown of verified incidents by type
                  </p>
                  {categoryData.length > 0 ? (
                    <CategoryBreakdown data={categoryData} />
                  ) : (
                    <div className="h-[180px] flex items-center justify-center">
                      <p className="font-sans text-sm text-gray-400">No data available</p>
                    </div>
                  )}
                </div>

                <div className="bg-white border border-cream-200 rounded-lg shadow-sm p-6">
                  <h2 className="font-serif text-lg font-semibold text-navy-800 mb-1">
                    Top Neighborhoods
                  </h2>
                  <p className="font-sans text-xs text-gray-400 mb-5">
                    Top 10 neighborhoods by verified incident count
                  </p>
                  {neighborhoodData.length > 0 ? (
                    <NeighborhoodBreakdown data={neighborhoodData} />
                  ) : (
                    <div className="h-[180px] flex items-center justify-center">
                      <p className="font-sans text-sm text-gray-400">No data available</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Roadmap card */}
              <div className="bg-white border border-cream-200 rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="font-serif text-lg font-semibold text-navy-800">
                        Predictive Risk Modeling
                      </h2>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-sans text-xs font-semibold bg-cream-100 text-gray-500 border border-cream-200 uppercase tracking-wide">
                        Planned
                      </span>
                    </div>
                    <p className="font-sans text-sm text-gray-600 leading-relaxed max-w-2xl">
                      A machine-learning model for incident risk forecasting is planned for
                      a future release. It will analyze historical patterns to identify
                      elevated-risk windows and geographic clusters before incidents occur,
                      enabling community organizations and campus security teams to
                      allocate resources proactively.
                    </p>
                    <p className="font-sans text-xs text-gray-400 mt-3 font-medium uppercase tracking-wide">
                      Roadmap — not yet available
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
