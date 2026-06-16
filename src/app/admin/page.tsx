'use client';

import { useState, useEffect, useCallback } from 'react';

interface PendingReport {
  id: string;
  category: string;
  description: string;
  occurred_at: string;
  neighborhood: string;
  severity: string;
  is_anonymous: boolean;
  reporter_contact: string | null;
  created_at: string;
}

interface CampusRequest {
  id: string;
  name: string;
  city: string;
  state: string;
  website: string | null;
  notes: string | null;
  requester_email: string | null;
  created_at: string;
}

const SEVERITY_COLORS: Record<string, string> = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-amber-100 text-amber-700',
  low: 'bg-green-100 text-green-700',
};

const CATEGORY_LABELS: Record<string, string> = {
  vandalism: 'Vandalism',
  harassment: 'Harassment',
  assault: 'Assault',
  online_threat: 'Online Threat',
  other: 'Other',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [authError, setAuthError] = useState('');
  const [reports, setReports] = useState<PendingReport[]>([]);
  const [campusRequests, setCampusRequests] = useState<CampusRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const fetchPending = useCallback(async (key: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin', {
        headers: { 'x-admin-key': key },
      });
      if (res.status === 401) {
        setAuthError('Incorrect password.');
        setAdminKey('');
        return;
      }
      const data = await res.json();
      setReports(data.reports ?? []);
      setCampusRequests(data.campusRequests ?? []);
    } catch {
      setAuthError('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError('');
    setAdminKey(password);
    fetchPending(password);
  }

  async function handleAction(id: string, action: 'approve' | 'reject', type: 'report' | 'campus_request') {
    setActionLoading(id + action);
    try {
      const res = await fetch('/api/admin', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({ id, action, type }),
      });
      if (!res.ok) throw new Error('Action failed');
      if (type === 'report') {
        setReports((prev) => prev.filter((r) => r.id !== id));
        showToast(action === 'approve' ? 'Report approved — now live on map.' : 'Report rejected.');
      } else {
        setCampusRequests((prev) => prev.filter((r) => r.id !== id));
        showToast(action === 'approve' ? 'Campus request approved.' : 'Campus request dismissed.');
      }
    } catch {
      showToast('Action failed — please try again.');
    } finally {
      setActionLoading(null);
    }
  }

  // Auto-refresh every 60 seconds while logged in
  useEffect(() => {
    if (!adminKey) return;
    const interval = setInterval(() => fetchPending(adminKey), 60_000);
    return () => clearInterval(interval);
  }, [adminKey, fetchPending]);

  if (!adminKey) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
        <div className="bg-white border border-cream-200 rounded-lg shadow-sm p-8 w-full max-w-sm">
          <div className="w-8 h-0.5 bg-gold-500 mb-5" />
          <h1 className="font-serif text-2xl font-bold text-navy-800 mb-1">Admin</h1>
          <p className="font-sans text-sm text-gray-500 mb-6">SafeJew review dashboard</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-sans text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full font-sans text-sm focus:outline-none focus:ring-1 focus:ring-navy-500"
                autoFocus
              />
            </div>
            {authError && (
              <p className="font-sans text-sm text-red-600">{authError}</p>
            )}
            <button
              type="submit"
              disabled={!password}
              className="w-full bg-navy-800 text-white rounded px-4 py-2.5 font-sans text-sm font-semibold hover:bg-navy-700 transition-colors disabled:opacity-40"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 pt-8 pb-16">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-navy-800 text-white px-4 py-2.5 rounded shadow-lg font-sans text-sm">
          {toast}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-2xl font-bold text-navy-800">Review Queue</h1>
            <p className="font-sans text-sm text-gray-500">
              {reports.length} pending report{reports.length !== 1 ? 's' : ''}
              {campusRequests.length > 0 && `, ${campusRequests.length} campus request${campusRequests.length !== 1 ? 's' : ''}`}
            </p>
          </div>
          <button
            onClick={() => fetchPending(adminKey)}
            disabled={loading}
            className="font-sans text-sm text-navy-600 hover:text-navy-800 border border-cream-200 bg-white px-3 py-1.5 rounded transition-colors"
          >
            {loading ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>

        {/* Incident Reports */}
        <section className="mb-10">
          <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
            Incident Reports
          </h2>

          {loading ? (
            <div className="bg-white border border-cream-200 rounded-lg p-8 text-center">
              <p className="font-sans text-sm text-gray-400">Loading…</p>
            </div>
          ) : reports.length === 0 ? (
            <div className="bg-white border border-cream-200 rounded-lg p-8 text-center">
              <p className="font-sans text-sm text-gray-400">No pending reports.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="bg-white border border-cream-200 rounded-lg p-5">
                  <div className="flex flex-wrap items-start gap-2 mb-3">
                    <span className="font-sans text-sm font-semibold text-navy-800">
                      {CATEGORY_LABELS[report.category] ?? report.category}
                    </span>
                    <span className={`font-sans text-xs font-semibold px-2 py-0.5 rounded-full ${SEVERITY_COLORS[report.severity] ?? 'bg-gray-100 text-gray-600'}`}>
                      {report.severity}
                    </span>
                    <span className="font-sans text-xs text-gray-400 ml-auto">
                      Submitted {formatDate(report.created_at)}
                    </span>
                  </div>

                  <p className="font-sans text-sm text-gray-700 leading-relaxed mb-3">
                    {report.description}
                  </p>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-sans text-gray-500 mb-4">
                    <span><strong>Where:</strong> {report.neighborhood}</span>
                    <span><strong>When:</strong> {formatDate(report.occurred_at)}</span>
                    <span>
                      <strong>Reporter:</strong>{' '}
                      {report.is_anonymous
                        ? 'Anonymous'
                        : report.reporter_contact ?? 'No contact provided'}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAction(report.id, 'approve', 'report')}
                      disabled={actionLoading !== null}
                      className="bg-green-600 text-white px-4 py-1.5 rounded font-sans text-sm font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      {actionLoading === report.id + 'approve' ? 'Approving…' : 'Approve'}
                    </button>
                    <button
                      onClick={() => handleAction(report.id, 'reject', 'report')}
                      disabled={actionLoading !== null}
                      className="bg-white border border-red-300 text-red-600 px-4 py-1.5 rounded font-sans text-sm font-semibold hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                      {actionLoading === report.id + 'reject' ? 'Rejecting…' : 'Reject'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Campus Requests */}
        <section>
          <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
            Campus Requests
          </h2>

          {campusRequests.length === 0 ? (
            <div className="bg-white border border-cream-200 rounded-lg p-8 text-center">
              <p className="font-sans text-sm text-gray-400">No pending campus requests.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {campusRequests.map((req) => (
                <div key={req.id} className="bg-white border border-cream-200 rounded-lg p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="font-sans text-sm font-semibold text-navy-800">{req.name}</p>
                      <p className="font-sans text-xs text-gray-500">{req.city}, {req.state}</p>
                    </div>
                    <span className="font-sans text-xs text-gray-400 flex-shrink-0">
                      {formatDate(req.created_at)}
                    </span>
                  </div>
                  {req.website && (
                    <p className="font-sans text-xs text-navy-600 mb-1">{req.website}</p>
                  )}
                  {req.notes && (
                    <p className="font-sans text-sm text-gray-600 mb-2">{req.notes}</p>
                  )}
                  {req.requester_email && (
                    <p className="font-sans text-xs text-gray-400 mb-3">Contact: {req.requester_email}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAction(req.id, 'approve', 'campus_request')}
                      disabled={actionLoading !== null}
                      className="bg-green-600 text-white px-4 py-1.5 rounded font-sans text-sm font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(req.id, 'reject', 'campus_request')}
                      disabled={actionLoading !== null}
                      className="bg-white border border-red-300 text-red-600 px-4 py-1.5 rounded font-sans text-sm font-semibold hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
