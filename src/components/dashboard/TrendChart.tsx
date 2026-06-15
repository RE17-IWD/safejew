'use client';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
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
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        padding: '8px 14px',
        boxShadow: '0 2px 8px rgba(14,24,85,0.10)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 11,
          fontWeight: 600,
          color: '#0e1855',
          marginBottom: 2,
        }}
      >
        {label}
      </p>
      <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#374151' }}>
        {payload[0].value}{' '}
        {(payload[0].value as number) === 1 ? 'incident' : 'incidents'}
      </p>
    </div>
  );
}

export default function TrendChart({ data }: TrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
        <defs>
          <linearGradient id="navyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1d2f8f" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#1d2f8f" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
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
        <Area
          type="monotone"
          dataKey="count"
          stroke="#0e1855"
          strokeWidth={2}
          fill="url(#navyGradient)"
          dot={{ r: 3, fill: '#0e1855', strokeWidth: 0 }}
          activeDot={{ r: 5, fill: '#d97706', strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
