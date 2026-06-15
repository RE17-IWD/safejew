interface StatsCardProps {
  label: string;
  value: string | number;
  change?: string;
  positive?: boolean;
}

export default function StatsCard({ label, value, change, positive }: StatsCardProps) {
  return (
    <div className="bg-white border border-cream-100 rounded-lg px-6 py-5 flex flex-col gap-1 shadow-sm">
      <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gray-400">
        {label}
      </p>
      <div className="flex items-end gap-2 mt-1">
        <p className="font-serif text-3xl font-bold text-navy-800 leading-none">
          {value}
        </p>
        {positive !== undefined && (
          <span
            className="mb-0.5 inline-block w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: positive ? '#059669' : '#dc2626' }}
            aria-hidden="true"
          />
        )}
      </div>
      {change && (
        <p
          className={[
            'font-sans text-xs font-medium mt-0.5',
            positive === true
              ? 'text-green-600'
              : positive === false
              ? 'text-red-500'
              : 'text-gray-500',
          ].join(' ')}
        >
          {change}
        </p>
      )}
    </div>
  );
}
