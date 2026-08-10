interface TitleVIPanelProps {
  campusName?: string;
}

// Static, factual civil-rights information. The three external links are
// verified reachable (see src/lib/campuses.ts convention). This is general
// information, not legal advice.
export default function TitleVIPanel({ campusName }: TitleVIPanelProps) {
  return (
    <div className="bg-white border border-cream-200 rounded-lg p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold-500">
          Know Your Rights
        </span>
        <span className="font-sans text-[10px] font-semibold uppercase tracking-wide text-navy-600 bg-navy-50 border border-navy-100 rounded px-1.5 py-0.5">
          Title VI
        </span>
      </div>

      <p className="font-sans text-sm text-gray-700 leading-relaxed">
        Title VI of the Civil Rights Act of 1964 prohibits discrimination based on race, color,
        or national origin at any school that receives federal funding. The U.S. Department of
        Education&apos;s Office for Civil Rights (OCR) has affirmed that this protects students who
        face antisemitic harassment based on shared Jewish ancestry or ethnic identity
        {campusName ? `, including at ${campusName}` : ''}.
      </p>
      <p className="font-sans text-sm text-gray-700 leading-relaxed mt-3">
        If a school fails to address a hostile environment, you can file a complaint with OCR,
        separately from any campus or police report. Complaints generally must be filed within
        <span className="whitespace-nowrap"> 180 days</span> of the incident.
      </p>

      <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-4">
        <a
          href="https://www.ed.gov/laws-and-policy/civil-rights-laws/file-complaint/ocr-discrimination-complaint-form"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-navy-800 text-white px-4 py-2 rounded font-sans text-sm font-semibold hover:bg-navy-700 transition-colors"
        >
          File an OCR complaint
        </a>
        <a
          href="https://www.ed.gov/laws-and-policy/civil-rights-laws/title-vi/title-vi-key-issues/discrimination-based-shared-ancestry-or-ethnic-characteristics"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center border border-navy-200 text-navy-700 px-4 py-2 rounded font-sans text-sm font-semibold hover:bg-cream-50 transition-colors"
        >
          OCR shared-ancestry guidance
        </a>
        <a
          href="https://notoleranceforantisemitism.adl.org/resources/tools-and-strategies/know-your-rights-title-vi-factsheet"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center border border-navy-200 text-navy-700 px-4 py-2 rounded font-sans text-sm font-semibold hover:bg-cream-50 transition-colors"
        >
          ADL &ldquo;Know Your Rights&rdquo;
        </a>
      </div>

      <p className="font-sans text-xs text-gray-400 mt-3">
        General information, not legal advice.
      </p>
    </div>
  );
}
