import { ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28BFE', '#FF6699', '#FF4444', '#00B8D9'];

export default function PieChart({ data, dataKey }: { data: any[]; dataKey: string }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <RePieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey={dataKey}
          cx="50%"
          cy="50%"
          outerRadius={60}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RePieChart>
    </ResponsiveContainer>
  );
}
