import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface PrijavaEmailData {
  vrsta: 'trebam' | 'zelim'
  ime: string
  email: string
  telefon?: string
  grad: string
  poruka: string
  fotografije?: string[]
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function escapeAttr(value: string) {
  return escapeHtml(value).replaceAll('`', '&#96;')
}

export async function sendPrijavaNotification(data: PrijavaEmailData) {
  const label = data.vrsta === 'trebam' ? 'Trebam pomoć' : 'Želim pomoći'
  const safeIme = escapeHtml(data.ime)
  const safeEmail = escapeHtml(data.email)
  const safeEmailAttr = escapeAttr(data.email)
  const safeTelefon = data.telefon ? escapeHtml(data.telefon) : '-'
  const safeGrad = escapeHtml(data.grad)
  const safePoruka = escapeHtml(data.poruka)

  const photoLinks = data.fotografije?.length
    ? data.fotografije
        .map((url, i) => `<a href="${escapeAttr(url)}" style="color:#c5a059">Fotografija ${i + 1}</a>`)
        .join(' &nbsp;&middot;&nbsp; ')
    : '<em style="color:#999">Nema fotografija</em>'

  const html = `
<!DOCTYPE html>
<html lang="hr">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#f5f4f1;font-family:sans-serif">
  <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
    <div style="background:#1a1610;padding:28px 32px">
      <p style="margin:0;color:#c5a059;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase">Instalater Anđeo</p>
      <h1 style="margin:8px 0 0;color:#fff;font-size:20px;font-weight:800">Nova prijava: ${label}</h1>
    </div>
    <div style="padding:28px 32px">
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:8px 0;color:#888;width:120px">Ime</td><td style="padding:8px 0;color:#1a1610;font-weight:600">${safeIme}</td></tr>
        <tr><td style="padding:8px 0;color:#888">Email</td><td style="padding:8px 0"><a href="mailto:${safeEmailAttr}" style="color:#c5a059">${safeEmail}</a></td></tr>
        <tr><td style="padding:8px 0;color:#888">Telefon</td><td style="padding:8px 0;color:#1a1610">${safeTelefon}</td></tr>
        <tr><td style="padding:8px 0;color:#888">Grad</td><td style="padding:8px 0;color:#1a1610">${safeGrad}</td></tr>
      </table>
      <div style="margin-top:20px;padding:16px;background:#f9f8f5;border-radius:10px">
        <p style="margin:0 0 6px;color:#888;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em">Poruka</p>
        <p style="margin:0;color:#1a1610;font-size:14px;line-height:1.7;white-space:pre-wrap">${safePoruka}</p>
      </div>
      ${data.vrsta === 'trebam' ? `
      <div style="margin-top:16px">
        <p style="margin:0 0 8px;color:#888;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em">Fotografije</p>
        <p style="margin:0;font-size:14px">${photoLinks}</p>
      </div>` : ''}
    </div>
    <div style="padding:16px 32px;background:#f9f8f5;border-top:1px solid #ebebeb">
      <p style="margin:0;font-size:12px;color:#aaa">Prijava primljena automatski &middot; instalaterandeo.hr</p>
    </div>
  </div>
</body>
</html>`

  await resend.emails.send({
    from: 'Instalater Anđeo <noreply@instalaterandeo.hr>',
    to: 'tin.lojen@petrokov.hr',
    subject: `Nova prijava: ${label} - ${data.ime} (${data.grad})`,
    html,
  })
}

export async function sendPrijavaConfirmation(data: { ime: string; email: string; vrsta: 'trebam' | 'zelim' }) {
  const label = data.vrsta === 'trebam' ? 'trebam pomoć' : 'želim pomoći'
  const safeIme = escapeHtml(data.ime)

  const html = `
<!DOCTYPE html>
<html lang="hr">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#f5f4f1;font-family:sans-serif">
  <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
    <div style="background:#1a1610;padding:28px 32px">
      <p style="margin:0;color:#c5a059;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase">Instalater Anđeo</p>
      <h1 style="margin:8px 0 0;color:#fff;font-size:20px;font-weight:800">Hvala na prijavi, ${safeIme}!</h1>
    </div>
    <div style="padding:28px 32px">
      <p style="margin:0 0 16px;color:#1a1610;font-size:15px;line-height:1.7">
        Primili smo vašu prijavu (<strong>${label}</strong>) i javit ćemo vam se u najkraćem mogućem roku.
      </p>
      <p style="margin:0;color:#1a1610;font-size:15px;line-height:1.7">
        Hvala što ste nam se obratili. Svaka prijava za nas je važna i obradit ćemo je s pažnjom.
      </p>
      <div style="margin-top:28px;padding:16px 20px;background:#f9f8f5;border-radius:10px;border-left:3px solid #c5a059">
        <p style="margin:0;color:#888;font-size:13px;line-height:1.6">
          Ako imate pitanja, možete nas kontaktirati odgovorom na ovaj email ili putem web stranice.
        </p>
      </div>
    </div>
    <div style="padding:16px 32px;background:#f9f8f5;border-top:1px solid #ebebeb">
      <p style="margin:0;font-size:12px;color:#aaa">Instalater Anđeo &middot; instalaterandeo.hr</p>
    </div>
  </div>
</body>
</html>`

  await resend.emails.send({
    from: 'Instalater Anđeo <noreply@instalaterandeo.hr>',
    to: data.email,
    subject: 'Primili smo vašu prijavu - Instalater Anđeo',
    html,
  })
}
