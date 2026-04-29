import { ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#818cf8', '#34d399', '#fbbf24', '#f87171', '#c084fc', '#f472b6', '#ef4444', '#2dd4bf'];

export default function PieChart({ data, dataKey }: { data: any[]; dataKey: string }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <RePieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey={dataKey}
          cx="50%"
          cy="45%"
          outerRadius={80}
          innerRadius={45} /* Makes it a donut chart */
          paddingAngle={3}
          stroke="none"
          label={false} /* Turned off standard labels to keep it clean */
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', color: '#f8fafc' }}
          itemStyle={{ color: '#fff' }}
        />
        <Legend 
          verticalAlign="bottom" 
          height={36} 
          iconType="circle"
          wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}
        />
      </RePieChart>
    </ResponsiveContainer>
  );
}
