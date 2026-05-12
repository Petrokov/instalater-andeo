import type { Metadata } from 'next'

const sections = [
  {
    title: '1. Kontakt podaci voditelja obrade',
    items: [
      'Naziv: Petrokov d.o.o.',
      'Sjedište: Mrkšina ulica 52D, 10000 Zagreb',
      'E-mail: petrokov@petrokov.hr',
      'Telefonski kontakt: +385 1 6473 111',
      'Predstavnik u EU: nije primjenjivo',
    ],
  },
  {
    title: '2. Službenik za zaštitu podataka',
    body: 'Petrokov d.o.o. trenutno nema imenovanog službenika za zaštitu podataka jer to nije zakonski obvezno za navedenu obradu.',
  },
  {
    title: '3. Svrhe i pravna osnova obrade',
    body: 'Podaci se prikupljaju isključivo putem kontakt obrasca u svrhu:',
    items: [
      'prijave za sudjelovanje u humanitarnom projektu,',
      'komunikacije s korisnicima,',
      'planiranja i organizacije akcije obnove,',
      'slanja informacija putem newslettera (uz privolu).',
    ],
    after: 'Pravna osnova za obradu je privola ispitanika prema članku 6. stavku 1. točki (a) i (b) GDPR-a.',
  },
  {
    title: '4. Kategorije osobnih podataka',
    body: 'Prikupljaju se sljedeći podaci:',
    items: ['Ime i prezime', 'E-mail adresa', 'Slike kupaonice (koje se dobrovoljno dostavljaju uz prijavu)'],
  },
  {
    title: '5. Primatelji osobnih podataka',
    body: 'Petrokov d.o.o. ne dijeli osobne podatke korisnika s trećim osobama. Partneri i suradnici pozivaju se na uključivanje u projekt bez uvida u osobne podatke korisnika.',
  },
  {
    title: '6. Prijenos podataka u treće zemlje',
    body: 'Ne vršimo prijenos osobnih podataka u treće zemlje ili međunarodne organizacije.',
  },
  {
    title: '7. Razdoblje pohrane podataka',
    body: 'Osobni podaci prikupljeni putem kontakt obrasca čuvaju se najdulje do kraja 2026. godine, odnosno do zaključenja humanitarne akcije.',
  },
  {
    title: '8. Legitimni interes',
    body: 'Vaše osobne podatke obrađujemo temeljem legitimnog interesa u smislu članka 6. stavka 1. točke (a), (b) i (f) Opće uredbe, u svrhu:',
    items: [
      'humanitarnog projekta renoviranja kupaonice odabranog primatelja donacije sa specifikacijama prema ugovoru koji se s istim ima sklopiti.',
    ],
  },
  {
    title: '9. Prava ispitanika',
    body: 'Korisnici imaju pravo:',
    items: [
      'zatražiti pristup svojim osobnim podacima,',
      'zatražiti ispravak netočnih podataka,',
      'zatražiti brisanje svojih podataka,',
      'zatražiti ograničenje obrade,',
      'uputiti prigovor na obradu,',
      'zatražiti prijenos podataka drugom voditelju obrade.',
    ],
    after: 'Za ostvarenje svojih prava možete nas kontaktirati putem e-maila: petrokov@petrokov.hr',
  },
  {
    title: '10. Povlačenje privole',
    body: 'Ako se obrada temelji na privoli, imate pravo u bilo kojem trenutku povući svoju privolu bez utjecaja na zakonitost obrade koja je temeljena na privoli prije njenog povlačenja.',
  },
  {
    title: '11. Pravo na pritužbu nadzornom tijelu',
    body: 'Ukoliko smatrate da je došlo do povrede vaših prava, imate pravo podnijeti pritužbu Agenciji za zaštitu osobnih podataka (AZOP):',
    items: ['www.azop.hr', 'Selska cesta 136, 10000 Zagreb'],
  },
  {
    title: '12. Izvor osobnih podataka',
    body: 'Svi podaci prikupljaju se isključivo izravno od korisnika putem obrasca na web stranici. Ne koristimo javne izvore niti podatke trećih strana.',
  },
  {
    title: '13. Korištenje kolačića (cookies)',
    items: [
      'na službenim internetskim stranicama voditelja obrade koriste se tzv. kolačići (cookies) - tekstualne datoteke koje na računalo korisnika smješta internetski poslužitelj (server), putem kojeg davatelj usluge pristupa Internetu (ISP) prikazuje web stranicu.',
      'kolačići nastaju kada preglednik na uređaju korisnika učita posjećeno mrežno odredište, koje potom šalje podatke pregledniku te izrađuje tekstualnu datoteku (kolačić). Preglednik dohvaća i šalje kolačić na poslužitelj internetske stranice prilikom povratka korisnika na njega.',
      'na našim stranicma koriste se tehnički kolačići (obavezni kolačići, ne mogu se isključiti) koji su nužni za funkcioniranje Internet mjesta',
    ],
  },
  {
    title: '14. Sigurnost osobnih podataka',
    items: [
      'Prikupljamo i obrađujemo osobne podatke na način kojim se osigurava odgovarajuća sigurnost i povjerljivost u njihovoj obradi te omogućavanje učinkovite primjene načela zaštite podataka, smanjenje količine podataka, opseg njihove obrade, razdoblje pohrane i njihovu dostupnost.',
      'Poduzimamo sve odgovarajuće tehničke i organizacijske mjere zaštite kako bi spriječili slučajno ili nezakonito uništavanje, gubitak, izmjene, neovlašteno korištenje, otkrivanje uvid ili pristup podatcima.',
      'Uprava i radnici voditelja obrade dužni su kao profesionalnu tajnu odnosno kao drugu odgovarajuću vrstu tajne, sukladno zakonu kojim se uređuje tajnost podataka, čuvati sve osobne i druge povjerljive podatke koje saznaju u obavljanju svojih dužnosti.',
    ],
  },
]

export const metadata: Metadata = {
  title: 'Pravila korištenja i privatnosti - Instalater Anđeo',
  description: 'Politika privatnosti i pravila korištenja za web stranicu projekta Instalater Anđeo.',
}

export default function PravilaKoristenjaIPrivatnostiPage() {
  return (
    <main className="bg-[#f9f7f2] pt-[clamp(96px,12vw,140px)] pb-[clamp(64px,8vw,110px)] px-[5%]">
      <article className="max-w-[880px] mx-auto">
        <header className="mb-10">
          <p className="text-[12px] font-bold tracking-[0.16em] uppercase text-gold mb-4">
            Pravila korištenja i privatnosti
          </p>
          <h1 className="text-[clamp(30px,4vw,54px)] font-extrabold leading-[1.1] text-dark mb-5">
            Politika privatnosti - Petrokov Anđeo
          </h1>
          <p className="text-[clamp(15px,1.2vw,18px)] leading-[1.8] text-secondary">
            Petrokov d.o.o., Mrkšina ulica 52D, 10000 Zagreb, OIB: 42599613313, kao voditelj obrade osobnih podataka,
            posvećen je zaštiti privatnosti korisnika web stranice projekta Instalater Anđeo. Sve obrade osobnih
            podataka provode se u skladu s Uredbom (EU) 2016/679 (GDPR) i Zakonom o provedbi Opće uredbe o zaštiti
            podataka.
          </p>
        </header>

        <div className="bg-white rounded-[20px] px-[clamp(22px,4vw,48px)] py-[clamp(28px,4vw,52px)] shadow-[0_2px_18px_rgba(0,0,0,0.06)]">
          {sections.map((section) => (
            <section key={section.title} className="border-t border-[#e8e8e8] first:border-t-0 py-7 first:pt-0 last:pb-0">
              <h2 className="text-[clamp(18px,2vw,24px)] font-extrabold leading-[1.25] text-dark mb-4">
                {section.title}
              </h2>
              {section.body && (
                <p className="text-[15px] leading-[1.8] text-secondary mb-4">
                  {section.body}
                </p>
              )}
              {section.items && (
                <ul className="list-disc pl-5 flex flex-col gap-2 text-[15px] leading-[1.75] text-secondary">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.after && (
                <p className="text-[15px] leading-[1.8] text-secondary mt-4">
                  {section.after}
                </p>
              )}
            </section>
          ))}
        </div>
      </article>
    </main>
  )
}
