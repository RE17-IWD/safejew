'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  TooltipProps,
} from 'recharts';
import type { AnnualPoint } from '@/data/hate-crime-stats';

interface AnnualBarChartProps {
  data: AnnualPoint[];
  /** Noun shown in the tooltip, e.g. "incidents" or "hate crimes". */
  unitLabel?: string;
  /** Height in px. */
  height?: number;
}

function makeTooltip(unitLabel: string) {
  return function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
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
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 600, color: '#0e1855', marginBottom: 2 }}>
          {label}
        </p>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#374151' }}>
          {(payload[0].value as number).toLocaleString()} {unitLabel}
        </p>
      </div>
    );
  };
}

export default function AnnualBarChart({
  data,
  unitLabel = 'incidents',
  height = 260,
}: AnnualBarChartProps) {
  const latestYear = data.length ? data[data.length - 1].year : null;
  const Tip = makeTooltip(unitLabel);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
        <XAxis
          dataKey="year"
          tick={{ fontFamily: 'var(--font-inter)', fontSize: 11, fill: '#9ca3af' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontFamily: 'var(--font-inter)', fontSize: 11, fill: '#9ca3af' }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
          width={44}
          tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`)}
        />
        <Tooltip content={<Tip />} cursor={{ fill: 'rgba(14,24,85,0.04)' }} />
        <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={64}>
          {data.map((d) => (
            <Cell key={d.year} fill={d.year === latestYear ? '#0e1855' : '#c7cbe6'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
