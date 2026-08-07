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
  LabelList,
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
          border: '1px solid #e4eaf3',
          borderRadius: 10,
          padding: '9px 14px',
          boxShadow: '0 8px 24px rgba(10,31,68,0.12)',
        }}
      >
        <p style={{ fontFamily: 'var(--font-jakarta)', fontSize: 11, fontWeight: 700, color: '#1a56db', marginBottom: 2, letterSpacing: '0.02em' }}>
          {label}
        </p>
        <p style={{ fontFamily: 'var(--font-jakarta)', fontSize: 13, fontWeight: 600, color: '#0a1f44' }}>
          {(payload[0].value as number).toLocaleString()} {unitLabel}
        </p>
      </div>
    );
  };
}

export default function AnnualBarChart({
  data,
  unitLabel = 'incidents',
  height = 280,
}: AnnualBarChartProps) {
  const latestYear = data.length ? data[data.length - 1].year : null;
  const Tip = makeTooltip(unitLabel);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 22, right: 16, left: 0, bottom: 4 }}>
        <defs>
          <linearGradient id="sjBarActive" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3f74ff" />
            <stop offset="100%" stopColor="#1a56db" />
          </linearGradient>
          <linearGradient id="sjBarMuted" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#cbd9f2" />
            <stop offset="100%" stopColor="#e6eefb" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#eef2f8" vertical={false} />
        <XAxis
          dataKey="year"
          tick={{ fontFamily: 'var(--font-jakarta)', fontSize: 12, fill: '#697588' }}
          axisLine={false}
          tickLine={false}
          dy={4}
        />
        <YAxis
          tick={{ fontFamily: 'var(--font-jakarta)', fontSize: 11, fill: '#97a1b2' }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
          width={44}
          tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`)}
        />
        <Tooltip content={<Tip />} cursor={{ fill: 'rgba(26,86,219,0.05)' }} />
        <Bar
          dataKey="value"
          radius={[6, 6, 0, 0]}
          maxBarSize={62}
          animationDuration={900}
          animationEasing="ease-out"
        >
          <LabelList
            dataKey="value"
            position="top"
            formatter={(v: number) => v.toLocaleString()}
            style={{ fontFamily: 'var(--font-jakarta)', fontSize: 11, fontWeight: 700, fill: '#0a1f44' }}
          />
          {data.map((d) => (
            <Cell key={d.year} fill={d.year === latestYear ? 'url(#sjBarActive)' : 'url(#sjBarMuted)'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
