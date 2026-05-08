export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'NGO'],
  '@id': 'https://instalaterandeo.hr/#organization',
  name: 'Instalater Anđeo',
  alternateName: 'Petrokov Anđeo',
  description:
    'Humanitarni projekt obnove kupaonica za obitelji i pojedince kojima je pomoć najpotrebnija. Petrokov d.o.o. organizira volontere, instalatere i partnere za besplatnu obnovu kupaonica diljem Hrvatske.',
  url: 'https://instalaterandeo.hr',
  logo: {
    '@type': 'ImageObject',
    url: 'https://instalaterandeo.hr/logo.png',
  },
  image: 'https://instalaterandeo.hr/hero-bg.png',
  sameAs: [
    'https://www.facebook.com/Petrokov.hr',
    'https://www.instagram.com/petrokov_hrvatska/',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+385-1-4000-000',
    email: 'andeo@petrokov.hr',
    contactType: 'customer support',
    availableLanguage: { '@type': 'Language', name: 'Croatian' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Zagreb',
    addressCountry: 'HR',
  },
  areaServed: [
    { '@type': 'City', name: 'Zagreb' },
    { '@type': 'City', name: 'Osijek' },
    { '@type': 'City', name: 'Split' },
    { '@type': 'City', name: 'Đakovo' },
    { '@type': 'City', name: 'Pula' },
  ],
  parentOrganization: {
    '@type': 'Corporation',
    name: 'Petrokov d.o.o.',
    taxID: '42599613313',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Zagreb',
      addressCountry: 'HR',
    },
  },
  numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 1 },
  foundingDate: '2024',
  knowsAbout: [
    'humanitarni rad',
    'obnova kupaonica',
    'instalaterski radovi',
    'volonterstvo',
    'donacije',
  ],
}

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Kako mogu prijaviti kandidata za obnovu kupaonice?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Kandidata možete prijaviti putem kontakt forme na našoj stranici. Odaberite tab "Trebam pomoć" i popunite obrazac s imenom, emailom, gradom i opisom situacije. Priložite minimalno 3 fotografije kupaonice.',
      },
    },
    {
      '@type': 'Question',
      name: 'Tko može dobiti besplatnu obnovu kupaonice?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pomoć je namijenjena starijim osobama, obiteljima u teškim situacijama i pojedincima koji žive bez osnovnih sanitarnih uvjeta. Svaka prijava se razmatra individualno i diskretno.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kako se mogu uključiti kao volonter ili donator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Možete se uključiti kao instalater volonter (poklon jednog vikenda), donator (novčana donacija ili materijal), poslovni partner (donacija opreme ili ekspertize) ili dijeljenjem priče na društvenim mrežama. Kontaktirajte nas putem forme i odaberite "Želim pomoći".',
      },
    },
    {
      '@type': 'Question',
      name: 'U kojim gradovima djeluje Instalater Anđeo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Projekt trenutno djeluje u 4 grada u Hrvatskoj: Zagreb, Osijek, Split i Đakovo. U tijeku je planiranje proširenja na cijelu Hrvatsku.',
      },
    },
    {
      '@type': 'Question',
      name: 'Koliko obnova je Instalater Anđeo dosad realizirao?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Do sada je realizirano više od 5 obnova kupaonica uz podršku više od 20 partnera i donatora. Svaki projekt financiran je donacijama i volonterskim radom.',
      },
    },
    {
      '@type': 'Question',
      name: 'Je li prijava diskretna i povjerljiva?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Da. Sve prijave su u potpunosti diskretne i povjerljive. Podaci se koriste isključivo u svrhu obrade prijave i ne dijele se s trećim stranama.',
      },
    },
  ],
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://instalaterandeo.hr/#website',
  name: 'Instalater Anđeo',
  url: 'https://instalaterandeo.hr',
  inLanguage: 'hr-HR',
  publisher: { '@id': 'https://instalaterandeo.hr/#organization' },
}
