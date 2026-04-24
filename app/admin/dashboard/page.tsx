"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const LineChart = dynamic(() => import('../../../components/admin/LineChart'), { ssr: false });
const PieChart = dynamic(() => import('../../../components/admin/PieChart'), { ssr: false });

export default function DashboardPage() {
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

  if (error) return <div style={{ color: 'red', padding: 32 }}>{error}</div>;
  if (!data) return <div style={{ padding: 32 }}>Loading...</div>;

  return (
    <div style={{ padding: 32 }}>
      <h1>Analytics Dashboard</h1>
      <div style={{ margin: '24px 0' }}>
        <strong>Total Visitors:</strong> {data.totalVisitors} <br />
        <strong>Unique Visitors Today:</strong> {data.uniqueToday}
      </div>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 350 }}>
          <h2>Page Views (Last 30 Days)</h2>
          <LineChart data={data.pageViewsOverTime} />
        </div>
        <div style={{ flex: 1, minWidth: 350 }}>
          <h2>Device Type</h2>
          <PieChart data={data.deviceSpread} dataKey="device_type" />
          <h2>Browser</h2>
          <PieChart data={data.browserSpread} dataKey="browser" />
          <h2>Country</h2>
          <PieChart data={data.countrySpread} dataKey="country" />
        </div>
      </div>
      <div style={{ marginTop: 32 }}>
        <h2>Top Pages</h2>
        <ul>
          {data.topPages.map((p: any) => (
            <li key={p.page_path}>{p.page_path} — {p.views} views</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
