import type { Metadata } from 'next';
import { LegalPageContent } from '../LegalPageContent';
import { absoluteUrl, PAGE_DESCRIPTIONS, PAGE_TITLES } from '../site-config';

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLES.privacy },
  description: PAGE_DESCRIPTIONS.privacy,
  alternates: {
    canonical: absoluteUrl('/privacy/'),
  },
  openGraph: {
    title: PAGE_TITLES.privacy,
    description: PAGE_DESCRIPTIONS.privacy,
    url: absoluteUrl('/privacy/'),
  },
  twitter: {
    title: PAGE_TITLES.privacy,
    description: PAGE_DESCRIPTIONS.privacy,
  },
};

const sv = {
  breadcrumbHome: 'Hem',
  breadcrumbCurrent: 'Integritet',
  title: 'Integritetspolicy',
  intro:
    'Den här webbplatsen är en statisk GitHub Pages-publicering som visar kuraterad research för founders. Vi håller personuppgiftshanteringen minimal och använder inte icke-nödvändiga cookies på den publika sajten som standard.',
  sections: [
    {
      title: 'Vilka uppgifter som behandlas',
      body:
        'Vanliga loggar för webbhotell kan behandlas av GitHub Pages och närliggande infrastrukturleverantörer. Om du kontaktar sajtägaren direkt används informationen du skickar bara för att kunna svara på din förfrågan.',
    },
    {
      title: 'Cookies och spårning',
      body:
        'Sajten sätter för närvarande inte några icke-nödvändiga analys- eller annonscookies. Om integritetspåverkande analysverktyg läggs till senare bör samtyckeskontroller införas innan sådana script körs.',
    },
    {
      title: 'Dina val',
      body:
        'Undvik att dela känsliga personuppgifter via kontaktkanaler. Om du behöver få data borttagen från publikt innehåll eller vill anmäla en integritetsfråga, kontakta sajtägaren och ange relevant URL.',
    },
  ],
} as const;

const en = {
  breadcrumbHome: 'Home',
  breadcrumbCurrent: 'Privacy',
  title: 'Privacy policy',
  intro:
    'This website is a static GitHub Pages deployment that showcases curated founder research. We keep personal data handling minimal and do not run non-essential cookies on the public site by default.',
  sections: [
    {
      title: 'What data is processed',
      body:
        'Standard web hosting logs may be processed by GitHub Pages and related infrastructure providers. If you contact the site owner directly, the information you send is used only to respond to your request.',
    },
    {
      title: 'Cookies and tracking',
      body:
        'The site does not currently set non-essential analytics or advertising cookies. If privacy-impacting analytics are added later, consent controls should be introduced before those scripts run.',
    },
    {
      title: 'Your choices',
      body:
        'Avoid sharing sensitive personal information through contact channels. If you need data removed from public content or want to raise a privacy concern, contact the site owner and include the relevant URL.',
    },
  ],
} as const;

export default function PrivacyPage() {
  return <LegalPageContent sv={sv} en={en} />;
}
