import type { Metadata } from 'next';
import { LegalPageContent } from '../LegalPageContent';
import { absoluteUrl, PAGE_DESCRIPTIONS, PAGE_TITLES } from '../site-config';

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLES.terms },
  description: PAGE_DESCRIPTIONS.terms,
  alternates: {
    canonical: absoluteUrl('/terms/'),
  },
  openGraph: {
    title: PAGE_TITLES.terms,
    description: PAGE_DESCRIPTIONS.terms,
    url: absoluteUrl('/terms/'),
  },
  twitter: {
    title: PAGE_TITLES.terms,
    description: PAGE_DESCRIPTIONS.terms,
  },
};

const sv = {
  breadcrumbHome: 'Hem',
  breadcrumbCurrent: 'Villkor',
  title: 'Användarvillkor',
  intro:
    'Solve real-world problems Sweden är en informativ webbplats. Innehållet är tänkt att inspirera produktidéer och research, inte att ge juridisk, medicinsk, finansiell eller regulatorisk rådgivning.',
  sections: [
    {
      title: 'Användning av innehåll',
      body:
        'Du får hänvisa till den publika webbplatsen för diskussion och intern research, men du bör själv verifiera relevanta antaganden innan du bygger produkter, gör investeringar eller fattar compliance-känsliga beslut.',
    },
    {
      title: 'Inga garantier',
      body:
        'Sajten tillhandahålls i befintligt skick. Även om projektet strävar efter att vara evidensdrivet och aktuellt finns ingen garanti för att varje insikt, poängsättning eller källhänvisning alltid är fullständig eller uppdaterad.',
    },
    {
      title: 'Ansvarsfull användning',
      body:
        'Använd inte webbplatsen på sätt som försöker skada, överbelasta, skrapa aggressivt eller feltolka det publicerade innehållet. Respektera tillämplig lag, plattformsvillkor och normer för källhänvisning.',
    },
  ],
} as const;

const en = {
  breadcrumbHome: 'Home',
  breadcrumbCurrent: 'Terms',
  title: 'Terms of use',
  intro:
    'Solve real-world problems Sweden is an informational website. Its content is intended to inspire product thinking and research, not to provide legal, medical, financial, or regulatory advice.',
  sections: [
    {
      title: 'Content usage',
      body:
        'You may reference the public website for discussion and internal research, but you should independently verify any assumptions before building products, making investments, or taking compliance-sensitive action.',
    },
    {
      title: 'No warranties',
      body:
        'The site is provided as-is. While the project aims to stay evidence-led and current, no guarantee is made that every insight, score, or source reference is complete or up to date at all times.',
    },
    {
      title: 'Responsible use',
      body:
        'Do not use this website in ways that attempt to damage, overload, scrape abusively, or misrepresent the published content. Respect applicable law, platform terms, and source attribution norms.',
    },
  ],
} as const;

export default function TermsPage() {
  return <LegalPageContent sv={sv} en={en} />;
}
