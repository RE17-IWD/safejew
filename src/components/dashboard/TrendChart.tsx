'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  TooltipProps,
} from 'recharts';

interface TrendChartProps {
  data: Array<{ month: string; count: number }>;
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

export default function TrendChart({ data }: TrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
        <CartesianGrid strokeDasharray="4 4" stroke="#ede9e2" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontFamily: 'var(--font-inter)', fontSize: 11, fill: '#9ca3af' }}
          axisLine={false}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          tick={{ fontFamily: 'var(--font-inter)', fontSize: 11, fill: '#9ca3af' }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
          width={32}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#1e3a5f"
          strokeWidth={2}
          dot={{ r: 3, fill: '#1e3a5f', strokeWidth: 0 }}
          activeDot={{ r: 5, fill: '#1e3a5f', strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
