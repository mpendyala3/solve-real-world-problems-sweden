'use client';

import Link from 'next/link';
import { useState } from 'react';

type Language = 'sv' | 'en';

type LegalCopy = {
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  title: string;
  intro: string;
  sections: ReadonlyArray<{
    title: string;
    body: string;
  }>;
};

export function LegalPageContent({
  sv,
  en,
}: {
  sv: LegalCopy;
  en: LegalCopy;
}) {
  const [lang, setLang] = useState<Language>('sv');
  const copy = lang === 'sv' ? sv : en;

  return (
    <main className="legal-page" id="main-content">
      <div className="container legal-wrap">
        <div className="legal-topbar">
          <nav aria-label="Breadcrumb" className="breadcrumb-row">
            <Link href="/">{copy.breadcrumbHome}</Link>
            <span aria-hidden="true">/</span>
            <span>{copy.breadcrumbCurrent}</span>
          </nav>

          <div className="lang-toggle" aria-label="Language toggle">
            <button className={lang === 'sv' ? 'active' : ''} onClick={() => setLang('sv')} type="button">
              SV
            </button>
            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')} type="button">
              EN
            </button>
          </div>
        </div>

        <header className="legal-header">
          <h1>{copy.title}</h1>
          <p>{copy.intro}</p>
        </header>

        {copy.sections.map((section) => (
          <section className="legal-section" key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
