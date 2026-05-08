import { readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8')
    .split(/\r?\n/)
    .filter((line) => line && !line.trimStart().startsWith('#'))
    .map((line) => {
      const index = line.indexOf('=')
      return [line.slice(0, index), line.slice(index + 1)]
    })
)

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
)

const projects = [
  {
    title: 'Petrokov Anđeo',
    slug: 'petrokov-andeo',
    short_description:
      'Kako je nastao projekt koji povezuje majstore, partnere i donatore kako bi obiteljima u potrebi vratio siguran i dostojanstven prostor za svakodnevni život.',
    description:
      'Petrokov Anđeo nastao je iz jednostavnog pitanja: što možemo napraviti konkretno, brzo i ljudski za obitelji kojima je kupaonica postala svakodnevna prepreka, a ne mjesto sigurnosti? Odgovor se pretvorio u humanitarnu inicijativu koja okuplja instalatere, partnere, donatore i ljude iz zajednice oko jednog cilja: obnoviti kupaonice onima kojima je pomoć najpotrebnija, bez naknade i bez dodatnog izlaganja njihove privatnosti.\n\nProjekt ne počinje s velikim obećanjima, nego s prijavom, razgovorom i procjenom stvarne situacije. Svaka priča se promatra diskretno i pojedinačno. Kada se potvrdi potreba, Petrokov koordinira majstore, materijal, logistiku i partnere. Najčešće se radi vikendom, u ritmu koji najmanje opterećuje obitelj, s jasnim ciljem da prostor nakon obnove bude siguran, funkcionalan i dostojanstven.\n\nOno što Petrokov Anđeo čini posebnim nije samo nova keramika, sanitarije ili instalacije. Posebna je mreža ljudi koji vjeruju da se povjerenje gradi djelima. Instalater koji pokloni svoje vrijeme, partner koji donira materijal, susjed koji prijavi obitelj u potrebi i tim koji sve poveže dio su iste priče. Zato ovaj projekt nije klasična kampanja, nego živi dokaz da zajednica može reagirati toplo, stručno i konkretno.\n\nSvaka završena obnova znači manje straha od pada, lakše održavanje higijene, više privatnosti i osjećaj da netko nije zaboravljen. Petrokov Anđeo zato obnavlja kupaonice, ali vraća puno više od toga: mir u domu, osjećaj normalnosti i vjeru da pomoć može doći s poštovanjem.',
    cover_image: '/hero-bg.png',
    gallery_images: ['/hero-bg.png', '/uploads/inst-and-img.png'],
    category: 'ostalo',
    location: 'Hrvatska',
    project_date: '2024-12-01',
    services: [
      'Organizacija humanitarnih obnova',
      'Koordinacija majstora i partnera',
      'Donacija materijala i logistike',
      'Diskretna procjena prijava',
    ],
    is_featured: true,
    participants: [],
    partners: [],
  },
  {
    title: 'Nova kupaonica za obitelj kojoj je pomoć stigla u pravi trenutak',
    slug: 'nova-kupaonica-za-obitelj',
    short_description:
      'Obitelj koja je godinama odgađala nužnu obnovu dobila je sigurnu, toplu i funkcionalnu kupaonicu zahvaljujući majstorima volonterima i partnerima projekta.',
    description:
      'Kada je stigla prijava za ovu obitelj, bilo je jasno da se ne radi o estetskoj obnovi, nego o prostoru koji je svakodnevni život činio težim nego što bi trebao biti. Kupaonica je bila dotrajala, instalacije nesigurne, a korištenje prostora posebno zahtjevno za djecu i starije članove kućanstva. Obitelj je obnovu godinama odgađala jer su prednost uvijek imali osnovni troškovi, škola, režije i sve ono što se ne može preskočiti.\n\nNakon razgovora i procjene, ekipa Petrokov Anđela okupila je majstore i partnere koji su preuzeli materijal, radove i organizaciju. Uklonjene su stare obloge i dotrajali elementi, provjerene su instalacije, uređen je prostor za tuširanje i postavljena nova sanitarna oprema. Posebna pažnja posvećena je tome da kupaonica bude jednostavna za održavanje, sigurna za svakodnevno korištenje i dovoljno izdržljiva za obiteljski ritam.\n\nNajvažniji trenutak nije bio završni detalj, nego tišina nakon prvog pogleda na gotov prostor. Umjesto brige oko curenja, vlage i nesigurnih površina, obitelj je dobila kupaonicu u koju može ući bez straha. Djeca su dobila topliji i uredniji početak dana, roditelji manje svakodnevnog pritiska, a dom jednu stvar manje koja ih podsjeća na ono što ne mogu sami.\n\nOva priča pokazuje zašto projekt postoji. Pomoć ne mora biti velika da bi promijenila život, ali mora biti konkretna. Kada se znanje majstora, materijal partnera i povjerenje zajednice spoje na pravom mjestu, rezultat nije samo obnovljena kupaonica. Rezultat je osjećaj da obitelj ponovno ima prostor koji ih podržava.',
    cover_image: '/uploads/inst-and-img.png',
    gallery_images: ['/uploads/inst-and-img.png', '/hero-bg.png'],
    category: 'kupaonica',
    location: 'Zagreb',
    project_date: '2026-05-01',
    services: [
      'Demontaža dotrajalih elemenata',
      'Provjera i prilagodba instalacija',
      'Postavljanje tuš zone',
      'Ugradnja sanitarne opreme',
      'Završno uređenje kupaonice',
    ],
    is_featured: false,
    participants: [],
    partners: [],
  },
]

for (const project of projects) {
  const { error } = await supabase
    .from('projects')
    .upsert(project, { onConflict: 'slug' })

  if (error) {
    console.error(`Failed to upsert ${project.slug}: ${error.message}`)
    process.exitCode = 1
  } else {
    console.log(`Upserted ${project.slug}`)
  }
}
