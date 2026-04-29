"use client";
import React, { Suspense, useEffect, useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Users, UserCheck, Activity, MousePointerClick, Globe, List } from 'lucide-react';

const LineChart = dynamic(() => import('../../../components/admin/LineChart'), { ssr: false });
const PieChart = dynamic(() => import('../../../components/admin/PieChart'), { ssr: false });

function DashboardContent() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const adminId = searchParams.get('id');

  useEffect(() => {
    if (!adminId) {
      setError('Missing admin id');
      return;
    }
    fetch(`/api/analytics?id=${adminId}`)
      .then(res => res.json())
      .then(json => {
        if (json.error) setError(json.error);
        else setData(json);
      })
      .catch(() => setError('Failed to fetch analytics'));
  }, [adminId]);

  const totalPageViewsLast30Days = useMemo(() => {
    if (!data?.pageViewsOverTime) return 0;
    return data.pageViewsOverTime.reduce((acc: number, curr: any) => acc + curr.views, 0);
  }, [data]);

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-6 py-4 rounded-lg">
        {error}
      </div>
    </div>
  );
  
  if (!data) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <Activity className="w-8 h-8 text-indigo-500 animate-spin" />
        <p className="text-gray-400 font-mono text-sm tracking-widest uppercase">Loading Analytics</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Analytics Dashboard</h1>
            <p className="text-gray-400 text-sm">Track your portfolio traffic and visitor insights.</p>
          </div>
          <div className="text-xs font-mono text-gray-500 bg-gray-900 px-3 py-1.5 rounded border border-gray-800">
            ID: {adminId?.slice(0, 8)}...
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-medium">Total Visitors</h3>
              <Users className="w-5 h-5 text-indigo-400" />
            </div>
            <p className="text-3xl font-bold text-white">{data.totalVisitors.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">All-time unique visitors</p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-medium">Unique Today</h3>
              <UserCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-3xl font-bold text-white">{data.uniqueToday.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">Visitors in the last 24h</p>
          </div>
          
          {/* Card 3 */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-medium">30-Day Page Views</h3>
              <Activity className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-3xl font-bold text-white">{totalPageViewsLast30Days.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">Total hits across all pages</p>
          </div>
        </div>

        {/* Main Chart */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-semibold text-white">Traffic Overview</h2>
            <select className="bg-gray-950 border border-gray-800 text-xs text-gray-300 rounded px-2 py-1 outline-none">
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
             <LineChart data={data.pageViewsOverTime} />
          </div>
        </div>

        {/* Breakdown Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-sm font-semibold text-gray-300 mb-6 flex items-center gap-2">
              <MousePointerClick className="w-4 h-4 text-gray-500" />
              Device Types
            </h2>
            <PieChart data={data.deviceSpread} dataKey="device_type" />
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-sm font-semibold text-gray-300 mb-6 flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-500" />
              Browsers
            </h2>
            <PieChart data={data.browserSpread} dataKey="browser" />
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-sm font-semibold text-gray-300 mb-6 flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-500" />
              Top Countries
            </h2>
            <PieChart data={data.countrySpread} dataKey="country" />
          </div>
        </div>

        {/* Top Pages Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-white">Top Pages</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-400">
              <thead className="bg-gray-950/50 text-xs text-gray-500 uppercase font-mono">
                <tr>
                  <th className="px-6 py-4 font-semibold">Page Path</th>
                  <th className="px-6 py-4 font-semibold text-right">Views</th>
                  <th className="px-6 py-4 font-semibold w-24">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {data.topPages.length > 0 ? data.topPages.map((p: any, idx: number) => (
                  <tr key={p.page_path} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-300">{p.page_path}</td>
                    <td className="px-6 py-4 text-right text-white">{p.views.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      {/* Fake sparkline/bar for visual flair */}
                      <div className="w-full h-1.5 bg-gray-800 rounded overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 rounded" 
                          style={{ width: `${Math.max(5, (p.views / data.topPages[0].views) * 100)}%` }} 
                        />
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                      No page views recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Recent Visits Log */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden mt-8">
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <List className="w-5 h-5 text-indigo-400" />
              Live Traffic Log
            </h2>
            <span className="text-xs text-gray-500 bg-gray-950 border border-gray-800 px-2 py-1 rounded">Last 50 Visits</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-400">
              <thead className="bg-gray-950/50 text-xs text-gray-500 uppercase font-mono">
                <tr>
                  <th className="px-6 py-4 font-semibold">Time</th>
                  <th className="px-6 py-4 font-semibold">Page Visited</th>
                  <th className="px-6 py-4 font-semibold">Location</th>
                  <th className="px-6 py-4 font-semibold">Device & Browser</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {data.recentViews && data.recentViews.length > 0 ? data.recentViews.map((visit: any, idx: number) => {
                  // Format the timestamp nicely
                  const visitDate = new Date(visit.visited_at);
                  const formattedTime = visitDate.toLocaleString('en-US', { 
                    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                  });
                  // Format the location (City, Country)
                  const location = [visit.city, visit.country].filter(Boolean).join(', ') || 'Unknown Location';
                  
                  return (
                    <tr key={`visit-${idx}`} className="hover:bg-gray-800/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300 font-mono text-xs">{formattedTime}</td>
                      <td className="px-6 py-4 text-indigo-300 font-medium">{visit.page_path}</td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-600" />
                        {location}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-gray-300">{visit.device_type || 'Desktop'} — {visit.os || 'Unknown OS'}</span>
                          <span className="text-xs text-gray-500">{visit.browser || 'Unknown Browser'}</span>
                        </div>
                      </td>
                    </tr>
                  );
                }) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No recent visits recorded.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-indigo-500">
        <Activity className="w-8 h-8 animate-spin" />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
