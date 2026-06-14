interface StatsCardProps {
  label: string;
  value: string | number;
  change?: string;
  positive?: boolean;
}

export default function StatsCard({ label, value, change, positive }: StatsCardProps) {
  return (
    <div className="bg-white border border-cream-200 rounded-lg px-6 py-5 flex flex-col gap-1 shadow-sm">
      <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gray-400">
        {label}
      </p>
      <p className="font-serif text-3xl font-bold text-navy-800 leading-none mt-1">
        {value}
      </p>
      {change && (
        <p
          className={[
            'font-sans text-xs font-medium mt-1',
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
