'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  LabelList,
  TooltipProps,
} from 'recharts';

interface NeighborhoodBreakdownProps {
  data: Array<{ neighborhood: string; count: number }>;
}

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-white border border-cream-200 rounded shadow-sm px-3 py-2 font-sans text-xs">
      <p className="font-semibold text-navy-800 mb-0.5">{label}</p>
      <p className="text-gray-600">
        {payload[0].value}{' '}
        {(payload[0].value as number) === 1 ? 'incident' : 'incidents'}
      </p>
    </div>
  );
}

export default function NeighborhoodBreakdown({ data }: NeighborhoodBreakdownProps) {
  return (
    <ResponsiveContainer width="100%" height={Math.max(180, data.length * 44)}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 4, right: 48, left: 8, bottom: 4 }}
      >
        <CartesianGrid strokeDasharray="4 4" stroke="#ede9e2" horizontal={false} />
        <XAxis
          type="number"
          tick={{ fontFamily: 'var(--font-inter)', fontSize: 11, fill: '#9ca3af' }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <YAxis
          type="category"
          dataKey="neighborhood"
          width={120}
          tick={{ fontFamily: 'var(--font-inter)', fontSize: 12, fill: '#374151' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f0f4f8' }} />
        <Bar dataKey="count" radius={[0, 3, 3, 0]} maxBarSize={28}>
          {data.map((_, index) => (
            <Cell key={index} fill="#1e3a5f" />
          ))}
          <LabelList
            dataKey="count"
            position="right"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 11,
              fill: '#6b7280',
              fontWeight: 600,
            }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
