import Link from 'next/link';

interface ReportingChannelsProps {
  campusId: string;
  campusName: string;
}

// Comprehensive "how to report" guidance for a campus. Channels are complementary,
// not alternatives — SafeJew positions itself alongside official reporting, not as
// a replacement for it.
export default function ReportingChannels({ campusId, campusName }: ReportingChannelsProps) {
  return (
    <div className="bg-white border border-cream-200 rounded-lg p-5">
      <p className="font-sans text-xs font-bold uppercase tracking-widest text-gold-500 mb-3">
        Ways to report
      </p>
      <ol className="space-y-3">
        <li className="flex gap-3">
          <span className="flex-none w-6 h-6 rounded-full bg-navy-800 text-white font-sans text-xs font-bold flex items-center justify-center">1</span>
          <div>
            <p className="font-sans text-sm font-semibold text-navy-800">SafeJew, anonymously</p>
            <p className="font-sans text-xs text-gray-600 leading-relaxed">
              Add {campusName} to the community data record. No name or email required.{' '}
              <Link href={`/report?campus=${campusId}`} className="text-navy-600 underline hover:text-navy-800">
                File a report
              </Link>.
            </p>
          </div>
        </li>
        <li className="flex gap-3">
          <span className="flex-none w-6 h-6 rounded-full bg-navy-800 text-white font-sans text-xs font-bold flex items-center justify-center">2</span>
          <div>
            <p className="font-sans text-sm font-semibold text-navy-800">Your school</p>
            <p className="font-sans text-xs text-gray-600 leading-relaxed">
              Report to campus police and the school&apos;s civil-rights, equity, or Title IX office.
              This creates the official record a Title VI complaint can reference.
            </p>
          </div>
        </li>
        <li className="flex gap-3">
          <span className="flex-none w-6 h-6 rounded-full bg-navy-800 text-white font-sans text-xs font-bold flex items-center justify-center">3</span>
          <div>
            <p className="font-sans text-sm font-semibold text-navy-800">Federal: Office for Civil Rights</p>
            <p className="font-sans text-xs text-gray-600 leading-relaxed">
              If the school fails to act, file a Title VI complaint with the U.S. Department of
              Education (see Know Your Rights above).
            </p>
          </div>
        </li>
        <li className="flex gap-3">
          <span className="flex-none w-6 h-6 rounded-full bg-navy-800 text-white font-sans text-xs font-bold flex items-center justify-center">4</span>
          <div>
            <p className="font-sans text-sm font-semibold text-navy-800">ADL</p>
            <p className="font-sans text-xs text-gray-600 leading-relaxed">
              Report to the Anti-Defamation League, which tracks incidents nationally and can offer
              support.{' '}
              <a
                href="https://www.adl.org/report-incident"
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-600 underline hover:text-navy-800"
              >
                adl.org/report-incident
              </a>.
            </p>
          </div>
        </li>
      </ol>
      <p className="font-sans text-xs text-gray-500 mt-4 leading-relaxed">
        In an emergency or if you are in danger, call 911 first. SafeJew is not law enforcement.
      </p>
    </div>
  );
}
