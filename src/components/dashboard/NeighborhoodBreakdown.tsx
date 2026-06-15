'use client';

import { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
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

export default function NeighborhoodBreakdown({ data }: NeighborhoodBreakdownProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const top10 = data.slice(0, 10);

  return (
    <ResponsiveContainer width="100%" height={Math.max(180, top10.length * 44)}>
      <BarChart
        data={top10}
        layout="vertical"
        margin={{ top: 4, right: 48, left: 8, bottom: 4 }}
      >
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
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f5f4f0' }} />
        <Bar
          dataKey="count"
          radius={[0, 4, 4, 0]}
          maxBarSize={26}
          onMouseEnter={(_: unknown, index: number) => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          {top10.map((_, index) => (
            <Cell
              key={index}
              fill={activeIndex === index ? '#d97706' : '#0e1855'}
              fillOpacity={activeIndex === index ? 1 : 0.85}
            />
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
