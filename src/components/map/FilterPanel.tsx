'use client';

import { useState } from 'react';
import type { IncidentFilters, IncidentCategory, IncidentSeverity, IncidentSource } from '@/types';

interface FilterPanelProps {
  filters: IncidentFilters;
  onChange: (filters: IncidentFilters) => void;
  incidentCount: number;
}

const ALL_CATEGORIES: { value: IncidentCategory; label: string }[] = [
  { value: 'vandalism', label: 'Vandalism' },
  { value: 'harassment', label: 'Harassment' },
  { value: 'assault', label: 'Assault' },
  { value: 'online_threat', label: 'Online Threat' },
  { value: 'other', label: 'Other' },
];

const ALL_SEVERITIES: { value: IncidentSeverity; label: string }[] = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

const ALL_SOURCES: { value: IncidentSource; label: string }[] = [
  { value: 'community', label: 'Community Reports' },
  { value: 'ADL', label: 'ADL' },
  { value: 'LAPD', label: 'LAPD' },
  { value: 'CSI', label: 'CSI' },
  { value: 'FBI', label: 'FBI' },
];

const DEFAULT_FILTERS: IncidentFilters = {
  categories: ALL_CATEGORIES.map((c) => c.value),
  severities: ALL_SEVERITIES.map((s) => s.value),
  sources: ALL_SOURCES.map((s) => s.value),
  dateFrom: null,
  dateTo: null,
  campusId: null,
};

function toggleItem<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
}

export default function FilterPanel({ filters, onChange, incidentCount }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryChange = (cat: IncidentCategory) => {
    onChange({ ...filters, categories: toggleItem(filters.categories, cat) });
  };

  const handleSeverityChange = (sev: IncidentSeverity) => {
    onChange({ ...filters, severities: toggleItem(filters.severities, sev) });
  };

  const handleSourceChange = (src: IncidentSource) => {
    onChange({ ...filters, sources: toggleItem(filters.sources, src) });
  };

  const handleDateFrom = (val: string) => {
    onChange({ ...filters, dateFrom: val || null });
  };

  const handleDateTo = (val: string) => {
    onChange({ ...filters, dateTo: val || null });
  };

  const handleReset = () => {
    onChange(DEFAULT_FILTERS);
  };

  const panelContent = (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 flex-none">
        <span className="text-sm font-sans font-semibold text-gray-900">Filters</span>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-navy-100 text-navy-700">
          {incidentCount}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
        {/* Category */}
        <fieldset>
          <legend className="text-xs font-sans font-bold text-gray-700 uppercase tracking-wide mb-2">
            Category
          </legend>
          <div className="space-y-1.5">
            {ALL_CATEGORIES.map(({ value, label }) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(value)}
                  onChange={() => handleCategoryChange(value)}
                  className="w-3.5 h-3.5 rounded border-gray-300 text-navy-600 focus:ring-navy-500 focus:ring-offset-0"
                  style={{ accentColor: '#1e3a5f' }}
                />
                <span className="text-sm font-sans text-gray-700 group-hover:text-gray-900">
                  {label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Severity */}
        <fieldset>
          <legend className="text-xs font-sans font-bold text-gray-700 uppercase tracking-wide mb-2">
            Severity
          </legend>
          <div className="space-y-1.5">
            {ALL_SEVERITIES.map(({ value, label }) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.severities.includes(value)}
                  onChange={() => handleSeverityChange(value)}
                  className="w-3.5 h-3.5 rounded border-gray-300 focus:ring-offset-0"
                  style={{ accentColor: '#1e3a5f' }}
                />
                <span className="text-sm font-sans text-gray-700 group-hover:text-gray-900">
                  {label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Source */}
        <fieldset>
          <legend className="text-xs font-sans font-bold text-gray-700 uppercase tracking-wide mb-2">
            Source
          </legend>
          <div className="space-y-1.5">
            {ALL_SOURCES.map(({ value, label }) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.sources.includes(value)}
                  onChange={() => handleSourceChange(value)}
                  className="w-3.5 h-3.5 rounded border-gray-300 focus:ring-offset-0"
                  style={{ accentColor: '#1e3a5f' }}
                />
                <span className="text-sm font-sans text-gray-700 group-hover:text-gray-900">
                  {label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Date Range */}
        <fieldset>
          <legend className="text-xs font-sans font-bold text-gray-700 uppercase tracking-wide mb-2">
            Date Range
          </legend>
          <div className="space-y-2">
            <div>
              <label className="block text-xs font-sans text-gray-500 mb-1">From</label>
              <input
                type="date"
                value={filters.dateFrom ?? ''}
                onChange={(e) => handleDateFrom(e.target.value)}
                className="w-full text-xs font-sans border border-gray-300 rounded px-2 py-1.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-navy-500 focus:border-navy-500"
              />
            </div>
            <div>
              <label className="block text-xs font-sans text-gray-500 mb-1">To</label>
              <input
                type="date"
                value={filters.dateTo ?? ''}
                onChange={(e) => handleDateTo(e.target.value)}
                className="w-full text-xs font-sans border border-gray-300 rounded px-2 py-1.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-navy-500 focus:border-navy-500"
              />
            </div>
          </div>
        </fieldset>
      </div>

      {/* Reset */}
      <div className="px-4 py-3 border-t border-gray-200 flex-none">
        <button
          onClick={handleReset}
          className="w-full text-xs font-sans font-medium text-navy-600 border border-navy-300 rounded px-3 py-2 hover:bg-navy-50 transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-navy-500"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden absolute top-2 left-2 z-[500] bg-white border border-gray-200 rounded shadow-md px-3 py-1.5 text-xs font-sans font-medium text-gray-700 flex items-center gap-1.5"
        onClick={() => setIsOpen((o) => !o)}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
        </svg>
        Filters
        <span className="bg-navy-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">
          {incidentCount}
        </span>
      </button>

      {/* Desktop sidebar */}
      <div className="hidden md:flex w-64 flex-none flex-col border-r border-gray-200 bg-white h-full">
        {panelContent}
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-0 left-0 z-[600] w-72 h-full bg-white border-r border-gray-200 shadow-lg flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <span className="text-sm font-sans font-semibold text-gray-900">Filters</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">{panelContent}</div>
        </div>
      )}
    </>
  );
}
