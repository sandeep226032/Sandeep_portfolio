import { ResponsiveContainer, LineChart as ReLineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function LineChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReLineChart data={data} margin={{ top: 16, right: 16, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
        <XAxis 
          dataKey="date" 
          stroke="#64748b" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
          dy={10} 
        />
        <YAxis 
          allowDecimals={false} 
          stroke="#64748b" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
        />
        <Tooltip 
          contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', color: '#f8fafc' }}
          itemStyle={{ color: '#818cf8' }}
        />
        <Line 
          type="monotone" 
          dataKey="views" 
          stroke="#818cf8" 
          strokeWidth={3} 
          dot={{ r: 4, fill: '#0f172a', stroke: '#818cf8', strokeWidth: 2 }} 
          activeDot={{ r: 6, fill: '#818cf8', stroke: '#0f172a' }}
        />
      </ReLineChart>
    </ResponsiveContainer>
  );
}
