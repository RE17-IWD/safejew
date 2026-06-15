'use client';

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

interface CategoryBreakdownProps {
  data: Array<{ category: string; count: number }>;
}

const CATEGORY_COLORS: Record<string, string> = {
  harassment: '#1d2f8f',
  vandalism: '#d97706',
  online_threat: '#4a5cf5',
  assault: '#dc2626',
  other: '#6b7280',
};

function categoryColor(cat: string): string {
  return CATEGORY_COLORS[cat] ?? '#0e1855';
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

function formatCategory(cat: string): string {
  return cat
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

export default function CategoryBreakdown({ data }: CategoryBreakdownProps) {
  const formatted = data.map((d) => ({ ...d, label: formatCategory(d.category) }));

  return (
    <ResponsiveContainer width="100%" height={Math.max(180, formatted.length * 44)}>
      <BarChart
        data={formatted}
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
          dataKey="label"
          width={112}
          tick={{ fontFamily: 'var(--font-inter)', fontSize: 12, fill: '#374151' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f5f4f0' }} />
        <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={26}>
          {formatted.map((entry, index) => (
            <Cell key={index} fill={categoryColor(entry.category)} />
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
