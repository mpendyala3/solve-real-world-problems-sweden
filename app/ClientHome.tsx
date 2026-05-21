'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { calculateProblemScores, categories, categoryOrder, type CategoryId, type Language, type ProblemTuple, type ScoreBreakdown } from './site-data';
import { absoluteUrl, SITE_NAME } from './site-config';

type ProblemPresentation = {
  title: string;
  description: string;
  exactSources: readonly string[];
  sourceFamilies: string[];
  scores: ScoreBreakdown;
};

type SearchResult = {
  id: string;
  categoryId: CategoryId;
  categoryName: string;
  item: ProblemPresentation;
  rank: number;
  relevance: number;
};

type TopProblemCard = {
  categoryName: string;
  question: string;
};

type HeroSignal = {
  icon: 'check' | 'person' | 'spark';
  value: string;
  label: string;
};

const copy = {
  sv: {
    brandName: 'Lös verkliga problem',
    brandSub: 'Sverige-först problem intelligence',
    navInsights: 'Insikter',
    navTop10: 'Top 10',
    navAllProblems: 'Alla problem',
    navMethod: 'Metod',
    navMission: 'Mission',
    navArchitecture: 'Arkitektur',
    navPrivacy: 'Integritet',
    heroEyebrow: '',
    heroTitle: 'Lös verkliga problem',
    heroBody: '',
    heroSignals: [
      { icon: 'check', value: '200', label: 'verifierade problem' },
      { icon: 'person', value: 'från 50k personer', label: 'och växer' },
      { icon: 'spark', value: 'AI-driven', label: 'kuratering' },
    ] satisfies readonly HeroSignal[],
    heroPrimary: 'Visa mig top problems',
    heroSecondary: 'Bläddra i alla kategorier',
    proofLabel: 'Vad du tittar på',
    proofItems: [
      ['20', 'kuraterade kategorier'],
      ['200', 'utvalda problem'],
      ['SV / EN', 'bilingual upplevelse'],
    ],
    insightsLabel: 'Utvalda signaler',
    insightsTitle: 'Några av de mest byggbara Sverige-signalerna just nu',
    swipeEyebrow: 'Top 10 pain points',
    swipeTitle: 'Top 10 pain points',
    swipeBody: '',
    swipeHint: 'Svep',
    previousCard: 'Föregående kort',
    nextCard: 'Nästa kort',
    insightsBody:
      'Inte ett klagomålsflöde. Inte trendjakt. Ett mer koncentrerat urval av återkommande friktion där människor, hushåll och organisationer faktiskt behöver bättre lösningar.',
    browserEyebrow: '',
    browserTitle: '',
    browserBody: '',
    filterLabel: 'Filtrera efter',
    categoryLabel: 'Kategori',
    currentView: 'Aktiv vy',
    allProblemsLabel: 'Alla problem',
    problems: 'Problem',
    score: 'Score',
    industry: 'Kategori',
    explanation: 'Kort förklaring',
    signalFamilies: 'Signaltyper',
    exactSources: 'Källa',
    whyThisMatters: 'Varför det är relevant',
    whyThisMattersBody:
      'Problemet återkommer i tillräckligt många sammanhang för att peka på verklig efterfrågan, men är samtidigt tillräckligt avgränsat för att kunna omsättas i en konkret produkt eller tjänst.',
    methodLabel: 'Hur vi tänker',
    methodTitle: 'Mer opportunity intelligence, mindre provokation',
    methodBody:
      'Startsidan ska kännas mer som en kuraterad founder-resurs än som ett arkiv av klagomål. Därför lyfter vi framför allt behov, koordinationsluckor, förutsägbarhet, tillgång och användbarhet.',
    methodCards: [
      ['Genuina behov', 'Problem formuleras som återkommande friktion med praktiska konsekvenser.'],
      ['Kulturell precision', 'Språket ska vara tydligt och sant utan att bli onödigt spetsigt eller anklagande.'],
      ['Byggbar riktning', 'Varje rad ska hjälpa en founder att se vart en lösning skulle kunna börja.'],
    ],
    missionLabel: 'Vårt uppdrag',
    missionTitle: 'Börja där möjligheten finns',
    missionBody:
      'Varje samhälle har friktion. Här är Sveriges — de återkommande luckorna, vardagsfrustrationerna och utrymmena där något bättre väntar på att byggas.',
    ctaLabel: 'Nästa steg',
    ctaTitle: 'Bygg runt verklig efterfrågan',
    ctaBody:
      'Utforska kategorierna, hitta ett område där behovet återkommer och använd det som utgångspunkt för en mer fokuserad produktidé.',
    footerLeft: 'Lös verkliga problem — Sverige-först problem intelligence',
    footerRight: 'Kuraterat för verklig efterfrågan, inte för startup-teater.',
    rank: 'Rank',
    severity: 'Severity Score',
    tam: 'TAM Score',
    whitespace: 'Whitespace Score',
    trygghet: 'Trygghet Score',
    open: 'Öppna',
    close: 'Stäng',
    searchLabel: '',
    searchPlaceholder: 'Sök efter bostad, vård, betalningar, pendling…',
    searchHint: '',
    searchResultsTitle: 'Sökresultat',
    searchResultsNone: 'Ingen tydlig träff ännu. Testa bredare ord eller byt språk.',
    searchResultsCount: 'träffar',
    clearSearch: 'Rensa',
    routeLabel: 'Aktiv route',
    featuredLabel: 'Utvald kategori',
    backToTop: 'Till toppen',
    browseLabel: 'Fler sidor',
    privacyLink: 'Integritetspolicy',
    termsLink: 'Villkor',
    prototypeLink: 'Prototype',
    architectureLink: 'Arkitektur',
  },
  en: {
    brandName: 'Solve real-world problems',
    brandSub: 'Sweden-first problem intelligence',
    navInsights: 'Insights',
    navTop10: 'Top 10',
    navAllProblems: 'All problems',
    navMethod: 'Method',
    navMission: 'Mission',
    navArchitecture: 'Architecture',
    navPrivacy: 'Privacy',
    heroEyebrow: '',
    heroTitle: 'Solve real-world problems',
    heroBody: '',
    heroSignals: [
      { icon: 'check', value: '200', label: 'verified problems' },
      { icon: 'person', value: 'from 50k people', label: 'and counting' },
      { icon: 'spark', value: 'AI-powered', label: 'curation' },
    ] satisfies readonly HeroSignal[],
    heroPrimary: 'Show Me Top Pain Points',
    heroSecondary: 'Browse All Categories',
    proofLabel: 'What you are looking at',
    proofItems: [
      ['20', 'curated categories'],
      ['200', 'selected problems'],
      ['SV / EN', 'bilingual experience'],
    ],
    insightsLabel: 'Featured signals',
    insightsTitle: 'A few of the most buildable Sweden signals right now',
    swipeEyebrow: 'Top 10 pain points',
    swipeTitle: 'Top 10 pain points',
    swipeBody: '',
    swipeHint: 'Swipe',
    previousCard: 'Previous card',
    nextCard: 'Next card',
    insightsBody:
      'Not a complaint feed. Not trend-chasing. A tighter selection of recurring friction where people, households, and organizations genuinely need better solutions.',
    browserEyebrow: '',
    browserTitle: '',
    browserBody: '',
    filterLabel: 'Filter by',
    categoryLabel: 'Category',
    currentView: 'Current view',
    allProblemsLabel: 'All problems',
    problems: 'Problem',
    score: 'Score',
    industry: 'Category',
    explanation: 'Short explanation',
    signalFamilies: 'Signal families',
    exactSources: 'Source',
    whyThisMatters: 'Why it matters',
    whyThisMattersBody:
      'The issue appears often enough across real contexts to signal demand, yet remains specific enough to be translated into a concrete product or service direction.',
    methodLabel: 'How we think',
    methodTitle: 'More opportunity intelligence, less provocation',
    methodBody:
      'The homepage should feel more like a curated founder resource than a complaint archive. So we emphasize unmet needs, coordination gaps, predictability, access, and usability.',
    methodCards: [
      ['Genuine needs', 'Problems are framed as recurring friction with practical downstream consequences.'],
      ['Cultural precision', 'The language should stay honest and specific without sounding accusatory or inflammatory.'],
      ['Buildable direction', 'Each row should help a founder see where a solution could realistically begin.'],
    ],
    missionLabel: 'Our mission',
    missionTitle: 'Start where the opportunity is',
    missionBody:
      'Every society has friction. These are Sweden’s — the recurring gaps, the everyday frustrations, the spaces where something better is waiting to be built.',
    ctaLabel: 'Next move',
    ctaTitle: 'Build around real demand',
    ctaBody:
      'Explore the categories, find an area where need repeats, and use it as the starting point for a sharper product direction.',
    footerLeft: 'Solve real-world problems — Sweden-first problem intelligence',
    footerRight: 'Curated for real demand, not startup theatre.',
    rank: 'Rank',
    severity: 'Severity Score',
    tam: 'TAM Score',
    whitespace: 'Whitespace Score',
    trygghet: 'Trygghet Score',
    open: 'Open',
    close: 'Close',
    searchLabel: '',
    searchPlaceholder: 'Search housing, care, payments, commuting…',
    searchHint: '',
    searchResultsTitle: 'Search results',
    searchResultsNone: 'No clear match yet. Try broader keywords or switch language.',
    searchResultsCount: 'results',
    clearSearch: 'Clear',
    routeLabel: 'Current route',
    featuredLabel: 'Featured category',
    backToTop: 'Back to top',
    browseLabel: 'More pages',
    privacyLink: 'Privacy policy',
    termsLink: 'Terms',
    prototypeLink: 'Prototype',
    architectureLink: 'Architecture',
  },
} as const;

const topProblemCardRefs: CategoryId[] = [
  'public-sector-welfare',
  'housing-real-estate',
  'healthtech',
  'elder-care',
  'greentech-sustainability',
  'integration-immigration',
  'consumer-services',
  'home-services',
  'fintech-payments',
  'logistics-delivery-infrastructure',
];

const topProblemQuestions: Record<Language, Record<CategoryId, string>> = {
  sv: {
    'public-sector-welfare': 'Varför är beslut i ersättningsärenden så svåra att förutse?',
    'housing-real-estate': 'Varför är kötiden till trygga hyresrätter fortfarande så lång?',
    healthtech: 'Varför är det så svårt att få en tid i primärvården i rätt tid?',
    'elder-care': 'Varför tappar hemtjänsten kontinuitet så ofta?',
    'greentech-sustainability': 'Varför är elkostnader fortfarande så svåra att förutse?',
    'integration-immigration': 'Varför tar vägen till fungerande svenska så lång tid?',
    'consumer-services': 'Varför är det fortfarande så krångligt att säga upp abonnemang?',
    'home-services': 'Varför är slutkostnaden för renoveringar så svår att lita på?',
    'fintech-payments': 'Varför stänger BankID-beroende fortfarande ute vissa användare?',
    'logistics-delivery-infrastructure': 'Varför hamnar paket fortfarande på opraktiska utlämningsställen?',
    'mobility-micromobility': 'Varför är vardagspendling fortfarande så svår att lita på?',
    'b2b-services': 'Varför är småföretags administrativa verktyg fortfarande så splittrade?',
    saas: 'Varför är affärsmjukvara fortfarande så tung att införa och använda?',
    edtech: 'Varför är det fortfarande svårt att hitta lärverktyg som verkligen passar vardagen?',
    'food-beverage': 'Varför är det fortfarande så svårt att fatta enkla, trygga matbeslut i vardagen?',
    ecommerce: 'Varför känns e-handelsreturer fortfarande så onödigt krångliga?',
    'cold-climate-seasonal': 'Varför skapar vintervardagen fortfarande så mycket friktion i Sverige?',
    'health-wellness-personal-care': 'Varför är egenvård och välmående fortfarande så svårt att följa upp i vardagen?',
    'travel-experiences': 'Varför är resor och upplevelser fortfarande så svåra att planera med trygghet?',
    'outdoor-friluftsliv': 'Varför är det fortfarande svårt att göra friluftsliv enkelt och tillgängligt för fler?',
  },
  en: {
    'public-sector-welfare': 'Why are benefit decisions so hard to predict?',
    'housing-real-estate': 'Why are rental housing queues still so long?',
    healthtech: 'Why is it so hard to get a primary care appointment in time?',
    'elder-care': 'Why does home care lose continuity so often?',
    'greentech-sustainability': 'Why are electricity costs still so hard to predict?',
    'integration-immigration': 'Why does the path to functional Swedish take so long?',
    'consumer-services': 'Why is cancelling subscriptions still so frustrating?',
    'home-services': 'Why are final renovation costs so hard to trust?',
    'fintech-payments': 'Why does BankID dependence still exclude some users?',
    'logistics-delivery-infrastructure': 'Why do parcels still end up at inconvenient pickup points?',
    'mobility-micromobility': 'Why is everyday commuting still so hard to trust?',
    'b2b-services': 'Why are small-business admin tools still so fragmented?',
    saas: 'Why is business software still so heavy to adopt and use?',
    edtech: 'Why is it still hard to find learning tools that fit everyday reality?',
    'food-beverage': 'Why is it still hard to make simple, confident food decisions every day?',
    ecommerce: 'Why do ecommerce returns still feel so unnecessarily painful?',
    'cold-climate-seasonal': 'Why does winter life in Sweden still create so much friction?',
    'health-wellness-personal-care': 'Why is everyday self-care still so hard to stay on top of?',
    'travel-experiences': 'Why are trips and experiences still so hard to plan with confidence?',
    'outdoor-friluftsliv': 'Why is it still hard to make outdoor life feel simple and accessible for more people?',
  },
};

const titleOverrides = {
  sv: {
    'Långa handläggningstider för ersättningar': 'Svårt att förutse tid till beslut i välfärdsärenden',
    'Svårt att nå handläggare': 'Svårt att få tydliga uppdateringar under pågående ärenden',
    'Offentlig upphandling missar användarbehov': 'Offentligt upphandlade tjänster kan vara svåra att anpassa till vardagliga användarbehov',
    'Kontroll mot bidragsfusk skapar felaktig misstänkliggörning': 'Verifieringskrav i ersättningsärenden upplevs som svåra att förstå och hantera',
    'Otillgängligt myndighetsspråk': 'Viktig samhällsinformation kan vara svår att förstå för olika användargrupper',
    'Bostadsdiskriminering och svag tillgång till hyresmarknaden': 'Svår väg till stabil tillgång på hyresmarknaden för nyanlända och hushåll utan etablerade referenser',
    'Utrikes födda kvinnor står längre från arbetsmarknaden': 'Många utrikes födda kvinnor möter flera samtidiga hinder till arbete',
    'BankID-beroende stänger ute vissa användare': 'Viktiga tjänster kräver digital identifiering som inte fungerar lika väl för alla användare',
    'Kvinnors hälsobesvär avfärdas eller fördröjs': 'Vissa kvinnorelaterade hälsobesvär får sen eller ojämn väg till diagnos och stöd',
  },
  en: {
    'Long benefit processing times': 'Decision timing in welfare cases is hard to predict',
    'Difficulty reaching public case officers': 'It is hard to get clear updates during ongoing public cases',
    'Public procurement misses user needs': 'Publicly procured services can be hard to adapt to everyday user needs',
    'Welfare fraud controls create false suspicion': 'Verification requirements in benefit cases can be difficult to understand and manage',
    'Inaccessible public information language': 'Important public information can be difficult for different user groups to understand',
    'Housing discrimination and weak rental access': 'Stable rental access remains difficult for newcomers and households without established references',
    'Immigrant women face labor-market exclusion': 'Many foreign-born women face several overlapping barriers to work',
    'BankID dependence excludes some users': 'Essential services depend on digital identity tools that do not work equally well for all users',
    'Women’s health complaints are dismissed or delayed': 'Some women’s health conditions still face slow or uneven paths to diagnosis and support',
  },
} as const;

const descriptionOverrides = {
  sv: {
    'Långa handläggningstider för ersättningar': 'Många hushåll behöver bättre förutsägbarhet kring när beslut, utbetalning och nästa steg i ersättningsärenden faktiskt kommer.',
    'Svårt att nå handläggare': 'Användare behöver tydligare status, enklare kontaktvägar och bättre överblick under pågående ärenden.',
    'Kontroll mot bidragsfusk skapar felaktig misstänkliggörning': 'Det finns ett återkommande behov av att göra kontroller, intyg och verifieringssteg mer begripliga och mindre belastande för legitima användare.',
    'Otillgängligt myndighetsspråk': 'Det finns ett tydligt behov av enklare, mer inkluderande och mer situationsanpassad samhällsinformation.',
    'Bostadsdiskriminering och svag tillgång till hyresmarknaden': 'Många hushåll behöver en tydligare och tryggare väg in i hyresmarknaden när referenser, kötid eller etablering saknas.',
    'BankID-beroende stänger ute vissa användare': 'Viktiga tjänster blir svåra att nå för personer som saknar rätt identitetshandlingar, smartphone eller trygg digital vana.',
  },
  en: {
    'Long benefit processing times': 'Many households need better predictability around when decisions, payments, and next steps in benefit cases will actually happen.',
    'Difficulty reaching public case officers': 'Users need clearer status visibility, simpler contact paths, and better orientation during ongoing cases.',
    'Welfare fraud controls create false suspicion': 'There is recurring demand for making checks, documentation, and verification steps easier to understand and less burdensome for legitimate users.',
    'Inaccessible public information language': 'There is a clear need for simpler, more inclusive, and more situation-aware public information.',
    'Housing discrimination and weak rental access': 'Many households need a clearer and safer path into the rental market when references, queue time, or establishment are limited.',
    'BankID dependence excludes some users': 'Essential services become hard to access for people who lack the right identity documents, a smartphone, or confident digital habits.',
  },
} as const;

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function levenshtein(a: string, b: string) {
  if (a === b) return 0;
  if (!a) return b.length;
  if (!b) return a.length;
  const matrix = Array.from({ length: b.length + 1 }, (_, idx) => [idx]);
  for (let idx = 0; idx <= a.length; idx += 1) {
    matrix[0][idx] = idx;
  }
  for (let row = 1; row <= b.length; row += 1) {
    for (let col = 1; col <= a.length; col += 1) {
      const cost = a[col - 1] === b[row - 1] ? 0 : 1;
      matrix[row][col] = Math.min(
        matrix[row - 1][col] + 1,
        matrix[row][col - 1] + 1,
        matrix[row - 1][col - 1] + cost,
      );
    }
  }
  return matrix[b.length][a.length];
}

function sourceFamily(tag: string, lang: Language) {
  const lower = tag.toLowerCase();

  if (['reddit', 'flashback', 'trustpilot', 'reco', 'linkedin'].some((token) => lower.includes(token))) {
    return lang === 'sv' ? 'Community- och marknadssignaler' : 'Community and market signals';
  }

  if (['arn', 'hallå konsument', 'konsumentverket'].some((token) => lower.includes(token))) {
    return lang === 'sv' ? 'Konsumentskydd & klagomålsdata' : 'Consumer protection and complaint data';
  }

  if (
    [
      '1177',
      'arbetsförmedlingen',
      'boverket',
      'digg',
      'ehalsomyndigheten',
      'energimyndigheten',
      'folkhälsomyndigheten',
      'försäkringskassan',
      'imy',
      'ivo',
      'konkurrensverket',
      'lakemedelsverket',
      'livsmedelsverket',
      'migrationsverket',
      'msb',
      'naturvardsverket',
      'polisen',
      'postnord',
      'pts',
      'riksbank',
      'scb',
      'sj.se',
      'skr',
      'skatteverket',
      'skolverket',
      'socialstyrelsen',
      'trafikverket',
      'transportstyrelsen',
      'upphandlingsmyndigheten',
      'uhr',
      'do.se',
    ].some((token) => lower.includes(token))
  ) {
    return lang === 'sv' ? 'Offentliga & institutionella signaler' : 'Public and institutional signals';
  }

  return lang === 'sv' ? 'Bransch- och expertsignaler' : 'Sector and expert signals';
}

function formatScoreOutOfTen(value: number) {
  return Number.isInteger(value) ? `${value}` : value.toFixed(1);
}

function presentProblem(lang: Language, categoryId: CategoryId, rank: number, tuple: ProblemTuple): ProblemPresentation {
  const [rawTitle, rawDescription, exactSources] = tuple;
  const title = titleOverrides[lang][rawTitle as keyof (typeof titleOverrides)[typeof lang]] ?? rawTitle;
  const description =
    descriptionOverrides[lang][rawTitle as keyof (typeof descriptionOverrides)[typeof lang]] ?? rawDescription;
  const sourceFamilies = Array.from(new Set(exactSources.map((tag) => sourceFamily(tag, lang)))).slice(0, 3);
  const scores = calculateProblemScores(categoryId, rank, tuple);

  return {
    title,
    description,
    exactSources,
    sourceFamilies,
    scores,
  };
}

function fuzzyScore(query: string, categoryName: string, item: ProblemPresentation) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return 0;

  const title = normalizeText(item.title);
  const description = normalizeText(item.description);
  const category = normalizeText(categoryName);
  const exactSources = normalizeText(item.exactSources.join(' '));
  const haystack = `${title} ${description} ${category} ${exactSources}`;

  if (haystack.includes(normalizedQuery)) return 120;

  const words = haystack.split(' ').filter(Boolean);
  const queryWords = normalizedQuery.split(' ').filter(Boolean);
  let score = 0;

  for (const term of queryWords) {
    if (title.includes(term)) score += 30;
    else if (description.includes(term)) score += 18;
    else if (category.includes(term)) score += 14;
    else if (words.some((word) => word.startsWith(term) || term.startsWith(word))) score += 10;
    else {
      const closeWord = words.some((word) => word.length > 3 && levenshtein(word, term) <= 2);
      if (closeWord) score += 7;
    }
  }

  return score;
}

function pageSchema(lang: Language) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: lang === 'sv' ? 'Lös verkliga problem' : 'Solve real-world problems',
    url: absoluteUrl('/'),
    inLanguage: lang === 'sv' ? 'sv-SE' : 'en',
    about: 'Sweden-first founder opportunity intelligence',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: absoluteUrl('/'),
    },
  };
}

export function HomePage({ routeLabel }: { routeLabel?: string }) {
  const [lang, setLang] = useState<Language>('sv');
  const [current, setCurrent] = useState<CategoryId>(categoryOrder[0]);
  const [expanded, setExpanded] = useState(-1);
  const [query, setQuery] = useState('');
  const [activeTopCard, setActiveTopCard] = useState(0);
  const categoryButtonRefs = useRef<Partial<Record<CategoryId, HTMLButtonElement | null>>>({});
  const topCardGesture = useRef<{
    startX: number;
    startY: number;
    deltaX: number;
    deltaY: number;
    mode: 'idle' | 'locked' | 'swipe' | 'scroll';
  }>({
    startX: 0,
    startY: 0,
    deltaX: 0,
    deltaY: 0,
    mode: 'idle',
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const searchTerm = new URLSearchParams(window.location.search).get('q');
    if (searchTerm) setQuery(searchTerm);
  }, []);

  useEffect(() => {
    categoryButtonRefs.current[current]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  }, [current]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    scrollToTop();
    const frame = window.requestAnimationFrame(scrollToTop);
    window.addEventListener('load', scrollToTop);
    window.addEventListener('pageshow', scrollToTop);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('load', scrollToTop);
      window.removeEventListener('pageshow', scrollToTop);
    };
  }, []);

  const text = copy[lang];
  const renderHeroSignalIcon = (icon: HeroSignal['icon']) => {
    if (icon === 'check') {
      return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="19" />
          <path d="M15.5 24.5L22 31L33 18.5" />
        </svg>
      );
    }

    if (icon === 'person') {
      return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="17" r="6.5" />
          <path d="M14.5 35.5C14.5 28.9 18.75 25.5 24 25.5C29.25 25.5 33.5 28.9 33.5 35.5" />
          <circle cx="24" cy="24" r="19" />
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="19" />
        <path d="M24 12.5C24 19.25 28.75 24 35.5 24C28.75 24 24 28.75 24 35.5C24 28.75 19.25 24 12.5 24C19.25 24 24 19.25 24 12.5Z" />
      </svg>
    );
  };

  const category = categories[current];
  const categoryMeta = category[lang];
  const categoryItems = category.items.map((item, index) => presentProblem(lang, current, index + 1, item[lang]));
  const categoryRows = [
    categoryOrder.filter((_, idx) => idx % 2 === 0),
    categoryOrder.filter((_, idx) => idx % 2 === 1),
  ];

  const topProblemCards = useMemo<TopProblemCard[]>(
    () =>
      topProblemCardRefs.map((id) => ({
        categoryName: categories[id][lang].name,
        question: topProblemQuestions[lang][id],
      })),
    [lang],
  );

  const searchResults = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return [] as SearchResult[];

    const results: SearchResult[] = [];

    categoryOrder.forEach((id) => {
      const meta = categories[id][lang];
      categories[id].items.forEach((entry, index) => {
        const item = presentProblem(lang, id, index + 1, entry[lang]);
        const relevance = fuzzyScore(trimmed, meta.name, item);
        if (relevance > 0) {
          results.push({
            id: `${id}-${index}`,
            categoryId: id,
            categoryName: meta.name,
            item,
            rank: index + 1,
            relevance,
          });
        }
      });
    });

    return results.sort((a, b) => b.relevance - a.relevance || b.item.scores.score - a.item.scores.score).slice(0, 12);
  }, [lang, query]);

  const showingSearch = query.trim().length > 0;

  const homePageSchema = useMemo(() => JSON.stringify(pageSchema(lang)), [lang]);

  const cycleTopCard = (direction: 1 | -1) => {
    setActiveTopCard((currentIndex) => (currentIndex + direction + topProblemCards.length) % topProblemCards.length);
  };

  const visibleTopCards = topProblemCards.slice(activeTopCard, activeTopCard + 5);
  if (visibleTopCards.length < 5) {
    visibleTopCards.push(...topProblemCards.slice(0, 5 - visibleTopCards.length));
  }

  return (
    <>
      <header className="nav-shell" id="home">
        <div className="container">
          <nav aria-label="Primary">
            <a className="brand" href="#home" aria-label={text.brandName}>
              <div className="brand-mark" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="32" cy="32" r="28" className="brand-ring" />
                  <path
                    d="M20 27.5C20 18.9 25.6 13 32 13C38.4 13 44 18.9 44 27.5C44 33 41.3 37.1 37.7 40.4C35.8 42.2 34.5 44 34 46H30C29.5 44 28.2 42.2 26.3 40.4C22.7 37.1 20 33 20 27.5Z"
                    className="brand-bulb"
                  />
                  <path d="M24 45.5H40" className="brand-detail" />
                  <path d="M26 50H38" className="brand-detail" />
                  <path d="M29 24L32.5 27.5L38 21.5" className="brand-detail brand-check" />
                  <path d="M32 9V13" className="brand-accent" />
                  <path d="M46 16L43 19" className="brand-accent" />
                  <path d="M18 16L21 19" className="brand-accent" />
                </svg>
              </div>
            </a>

            <div className="nav-links">
              <a href="#top-10-problems">{text.navTop10}</a>
              <a href="#all-problems">{text.navAllProblems}</a>
              <a href="#method">{text.navMethod}</a>
              <a href="#mission">{text.navMission}</a>
              <Link href="/architecture/">{text.navArchitecture}</Link>
            </div>

            <div className="nav-actions">
              <div className="lang-toggle" aria-label="Language toggle">
                <button className={lang === 'sv' ? 'active' : ''} onClick={() => setLang('sv')} type="button">
                  SV
                </button>
                <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')} type="button">
                  EN
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <main className="home-page" id="main-content">
        <section className="hero-shell">
          <div className="container hero-grid">
            <div className="hero-copy">
              <h1>
                {lang === 'en' ? (
                  <>
                    <span className="hero-title-line">Solve</span>
                    <span className="hero-title-line">Real-world</span>
                    <span className="hero-title-line">Problems</span>
                  </>
                ) : (
                  text.heroTitle
                )}
              </h1>
              <p>{text.heroBody}</p>
              <div className="hero-signals" aria-label="Hero highlights">
                {text.heroSignals.map((item) => (
                  <div className="hero-signal-row" key={`${item.icon}-${item.value}`}>
                    <div className="hero-signal-icon" aria-hidden="true">
                      {renderHeroSignalIcon(item.icon)}
                    </div>
                    <div className="hero-signal-copy">
                      <strong>{item.value}</strong>
                      <span>{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hero-actions">
                <a className="btn primary" href="#top-10-problems">
                  {text.heroPrimary}
                </a>
                <a className="btn ghost" href="#all-problems">
                  {text.heroSecondary}
                </a>
              </div>
            </div>

          </div>
        </section>

        <section className="top-problems-section" id="top-10-problems">
          <div className="container top-problems-wrap">
            <div className="section-head top-problems-head">
              <h2>{text.swipeTitle}</h2>
              {text.swipeBody ? <p>{text.swipeBody}</p> : null}
            </div>

            <div className="top-problems-mobile" aria-label={text.swipeTitle}>
              <div
                className="top-card-stack"
                onTouchStart={(event) => {
                  const touch = event.touches[0];
                  if (!touch) return;
                  topCardGesture.current = {
                    startX: touch.clientX,
                    startY: touch.clientY,
                    deltaX: 0,
                    deltaY: 0,
                    mode: 'locked',
                  };
                }}
                onTouchMove={(event) => {
                  const touch = event.touches[0];
                  if (!touch) return;

                  const gesture = topCardGesture.current;
                  gesture.deltaX = touch.clientX - gesture.startX;
                  gesture.deltaY = touch.clientY - gesture.startY;

                  const absX = Math.abs(gesture.deltaX);
                  const absY = Math.abs(gesture.deltaY);

                  if (gesture.mode === 'scroll') {
                    return;
                  }

                  if (absY > 72 && absY > absX * 1.35) {
                    gesture.mode = 'scroll';
                    return;
                  }

                  if (absX > 12 && absX >= absY) {
                    gesture.mode = 'swipe';
                  }

                  if (gesture.mode === 'locked' || gesture.mode === 'swipe') {
                    event.preventDefault();
                  }
                }}
                onTouchEnd={(event) => {
                  const touch = event.changedTouches[0];
                  if (!touch) return;

                  const gesture = topCardGesture.current;
                  const deltaX = touch.clientX - gesture.startX;
                  const deltaY = touch.clientY - gesture.startY;

                  if (gesture.mode !== 'scroll' && Math.abs(deltaX) > 36 && Math.abs(deltaX) > Math.abs(deltaY)) {
                    cycleTopCard(deltaX < 0 ? 1 : -1);
                  }

                  topCardGesture.current = {
                    startX: 0,
                    startY: 0,
                    deltaX: 0,
                    deltaY: 0,
                    mode: 'idle',
                  };
                }}
                onTouchCancel={() => {
                  topCardGesture.current = {
                    startX: 0,
                    startY: 0,
                    deltaX: 0,
                    deltaY: 0,
                    mode: 'idle',
                  };
                }}
              >
                {[...visibleTopCards].reverse().map((card, reversedIndex) => {
                  const depth = visibleTopCards.length - 1 - reversedIndex;

                  return (
                    <article className={`top-problem-card depth-${depth}`} key={`${card.categoryName}-${card.question}`}>
                      <span className="top-problem-pill">{card.categoryName}</span>
                      <h3>{card.question}</h3>
                    </article>
                  );
                })}
              </div>

              <div className="top-card-controls">
                <button aria-label={text.previousCard} className="top-card-arrow" onClick={() => cycleTopCard(-1)} type="button">
                  ‹
                </button>
                <span>{text.swipeHint}</span>
                <button aria-label={text.nextCard} className="top-card-arrow" onClick={() => cycleTopCard(1)} type="button">
                  ›
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="problem-browser" id="all-problem-browser">
          <div className="container browser-wrap">
            <div className="browser-grid" id="all-problems">
              <aside className="filter-panel">
                <div className="filter-head">
                  <span className="filter-kicker">⌁ {text.filterLabel}</span>
                  <strong>{text.categoryLabel}</strong>
                </div>

                <div className="filter-list" role="tablist" aria-label={text.categoryLabel}>
                  {categoryRows.map((row, rowIdx) => (
                    <div className="filter-row" key={`row-${rowIdx}`}>
                      {row.map((id) => {
                        const active = id === current;
                        return (
                          <button
                            key={id}
                            className={`filter-option ${active ? 'active' : ''}`}
                            ref={(node) => {
                              categoryButtonRefs.current[id] = node;
                            }}
                            onClick={() => {
                              setCurrent(id);
                              setExpanded(-1);
                            }}
                            role="tab"
                            aria-selected={active}
                            type="button"
                          >
                            <span className="check-box" aria-hidden="true">
                              {active ? '✓' : ''}
                            </span>
                            <span>{categories[id][lang].name}</span>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </aside>

              <section className="problem-panel" aria-label={categoryMeta.name}>
                <div className="browser-title-inline">
                  <div>
                    <h3>{categoryMeta.name}</h3>
                    <p>{categoryMeta.subtitle}</p>
                  </div>
                </div>

                <div className="problem-table">
                  <div className="problem-table-head">
                    <span>{text.problems}</span>
                    <span>{text.score}</span>
                    <span>{text.industry}</span>
                    <span />
                  </div>

                  <div className="problem-table-body">
                    {categoryItems.map((item, idx) => {
                      const isOpen = expanded === idx;
                      return (
                        <article className={`problem-row ${isOpen ? 'open' : ''}`} key={`${current}-${idx}`}>
                            <div
                              className="problem-row-main"
                              role="button"
                              tabIndex={0}
                              aria-expanded={isOpen}
                              aria-label={isOpen ? text.close : text.open}
                              onClick={() => setExpanded(isOpen ? -1 : idx)}
                              onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                  event.preventDefault();
                                  setExpanded(isOpen ? -1 : idx);
                                }
                              }}
                            >
                              <div className="problem-question-block">
                                <h4>{item.title}</h4>
                              </div>
                              <div className="problem-score">{item.scores.score}</div>
                              <div className="problem-industry">{categoryMeta.name}</div>
                              <button
                                className="expand-btn"
                                type="button"
                                aria-expanded={isOpen}
                                aria-label={isOpen ? text.close : text.open}
                                onClick={() => setExpanded(isOpen ? -1 : idx)}
                              >
                                <span>{isOpen ? '–' : '+'}</span>
                              </button>
                            </div>

                            {isOpen ? (
                              <div className="problem-expand">
                                <div className="expand-copy">
                                  <p>{item.description}</p>
                                </div>
                                <div className="score-grid">
                                  <div className="score-metric">
                                    <span>{text.severity}</span>
                                    <strong>{formatScoreOutOfTen(item.scores.severity)}/10</strong>
                                  </div>
                                  <div className="score-metric">
                                    <span>{text.tam}</span>
                                    <strong>{formatScoreOutOfTen(item.scores.tam)}/10</strong>
                                  </div>
                                  <div className="score-metric">
                                    <span>{text.whitespace}</span>
                                    <strong>{formatScoreOutOfTen(item.scores.whitespace)}/10</strong>
                                  </div>
                                  <div className="score-metric">
                                    <span>{text.trygghet}</span>
                                    <strong>{formatScoreOutOfTen(item.scores.trygghet)}/10</strong>
                                  </div>
                                </div>
                                <div className="expand-note">
                                  <span className="expand-label">{text.exactSources}</span>
                                  <p>{item.exactSources.join(' · ')}</p>
                                </div>
                              </div>
                            ) : null}
                          </article>
                        );
                      })}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>

        <section className="mission-band" id="mission">
          <div className="container mission-grid">
            <article className="mission-card">
              <span className="label">{text.missionLabel}</span>
              <h2>{text.missionTitle}</h2>
              <p>{text.missionBody}</p>
            </article>
          </div>
        </section>

        <footer>
          <div className="container footer-grid">
            <nav aria-label={text.browseLabel}>
              <div className="footer-links">
                <Link href="/privacy/">{text.privacyLink}</Link>
                <Link href="/terms/">{text.termsLink}</Link>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window === 'undefined') return;
                    window.history.replaceState(null, '', '#home');
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                  }}
                >
                  {text.backToTop}
                </button>
              </div>
            </nav>
          </div>
        </footer>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: homePageSchema }} />
    </>
  );
}
