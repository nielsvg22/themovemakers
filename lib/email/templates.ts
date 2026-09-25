import 'server-only'

const esc = (s: string | null | undefined) =>
  (s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

export function siteUrl() {
  const explicit = process.env.NEXT_PUBLIC_APP_URL
  if (explicit) return explicit.replace(/\/$/, '')
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  return 'http://localhost:3000'
}

/** Basislayout in de kleuren van The Move Maker (navy + lime), e-mailvriendelijk met tabellen en inline stijl. */
function layout(title: string, body: string, cta?: { label: string; href: string }) {
  return `<!doctype html><html lang="nl"><body style="margin:0;background:#f4f7fa;font-family:Arial,Helvetica,sans-serif;color:#10212b">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fa;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden">
<tr><td style="background:#071b2a;padding:22px 28px">
  <span style="display:inline-block;background:#d6ff55;color:#071b2a;font-weight:900;font-style:italic;border-radius:8px;padding:6px 10px;font-size:16px">M</span>
  <span style="color:#ffffff;font-weight:900;font-size:15px;letter-spacing:-.3px;margin-left:8px">THE <span style="color:#d6ff55">MOVE</span> MAKER</span>
</td></tr>
<tr><td style="padding:28px">
  <h1 style="margin:0 0 14px;font-size:22px;line-height:1.25;color:#071b2a">${esc(title)}</h1>
  ${body}
  ${cta ? `<p style="margin:24px 0 0"><a href="${cta.href}" style="display:inline-block;background:#d6ff55;color:#071b2a;font-weight:800;text-decoration:none;border-radius:10px;padding:12px 18px">${esc(cta.label)}</a></p>` : ''}
</td></tr>
<tr><td style="padding:18px 28px;border-top:1px solid #e5eaed;color:#6f7f89;font-size:12px">
  The Move Maker · Recruitment voor bouw, civiel en techniek · Apeldoorn<br>Je ontvangt deze e-mail naar aanleiding van je aanvraag via onze website.
</td></tr></table></td></tr></table></body></html>`
}

const p = (html: string) => `<p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#40515b">${html}</p>`

const steps = (items: string[]) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 4px">${items
    .map(
      (t, i) =>
        `<tr><td valign="top" style="padding:6px 12px 6px 0"><span style="display:inline-block;width:26px;height:26px;line-height:26px;text-align:center;border-radius:50%;background:#071b2a;color:#fff;font-size:12px;font-weight:700">${i + 1}</span></td><td style="padding:8px 0;font-size:14px;color:#40515b">${t}</td></tr>`
    )
    .join('')}</table>`

type Source = 'cv_check' | 'kennismaking' | 'open_sollicitatie' | 'sollicitatie'

const intro: Record<Source, (vacancy?: string) => string> = {
  sollicitatie: (v) => `Bedankt voor je sollicitatie${v ? ` op de vacature <b>${esc(v)}</b>` : ''}. We hebben je gegevens en cv goed ontvangen.`,
  cv_check: (v) => `Bedankt dat je je cv met ons deelt${v ? ` (naar aanleiding van <b>${esc(v)}</b>)` : ''}. We hebben je gegevens goed ontvangen.`,
  kennismaking: () => 'Bedankt voor je aanvraag voor een korte kennismaking. We hebben je gegevens goed ontvangen.',
  open_sollicitatie: () => 'Bedankt voor je open sollicitatie. We hebben je gegevens goed ontvangen.',
}

const subjects: Record<Source, (vacancy?: string) => string> = {
  sollicitatie: (v) => `We hebben je sollicitatie ontvangen${v ? `: ${v}` : ''}`,
  cv_check: () => 'We hebben je cv ontvangen',
  kennismaking: () => 'Je aanvraag voor een korte kennismaking',
  open_sollicitatie: () => 'We hebben je open sollicitatie ontvangen',
}

export function candidateConfirmation(source: Source, firstName: string, vacancyTitle?: string) {
  const next =
    source === 'kennismaking'
      ? ['We bekijken je gegevens en ervaring.', 'Lijkt er een goede match te zijn? Dan bellen we je om een moment voor een telefonisch gesprek van ongeveer 15 minuten af te stemmen.', 'Samen bepalen we of er een passende vervolgstap is.']
      : ['Een recruiter bekijkt je profiel, meestal binnen twee werkdagen.', 'Sluit je achtergrond aan? Dan nemen we contact op voor een korte kennismaking.', 'Daarna bespreken we samen de vervolgstappen.']
  return {
    subject: subjects[source](vacancyTitle),
    html: layout(
      `Bedankt, ${firstName}!`,
      p(intro[source](vacancyTitle)) +
        `<h2 style="margin:18px 0 6px;font-size:15px;color:#071b2a">Wat gebeurt er nu?</h2>` +
        steps(next) +
        p('We nemen contact op als je achtergrond aansluit. Heb je in de tussentijd een vraag? Beantwoord deze e-mail gerust.'),
      { label: 'Bekijk meer vacatures', href: `${siteUrl()}/vacatures` }
    ),
  }
}

const sourceName: Record<Source, string> = {
  sollicitatie: 'Nieuwe sollicitatie',
  cv_check: 'Nieuwe cv-check',
  kennismaking: 'Aanvraag korte kennismaking',
  open_sollicitatie: 'Nieuwe open sollicitatie',
}

export function recruiterNotification(
  source: Source,
  c: { id: string; firstName: string; lastName: string; email: string; phone?: string | null; city?: string | null; sector?: string | null; currentRole?: string | null; yearsExperience?: string | null; callPreference?: string | null; motivation?: string | null },
  vacancyTitle?: string,
  hasCv?: boolean
) {
  const rows: [string, string | null | undefined][] = [
    ['Vacature', vacancyTitle],
    ['E-mail', c.email],
    ['Telefoon', c.phone],
    ['Woonplaats', c.city],
    ['Vakgebied', c.sector],
    ['Huidige functie', c.currentRole],
    ['Ervaring', c.yearsExperience],
    ['Voorkeur kennismaking', c.callPreference],
    ['Cv', hasCv ? 'Bijgevoegd (bekijk in de admin)' : 'Geen'],
  ]
  const table = `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;margin:4px 0 12px">${rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:6px 0;color:#6f7f89;width:40%">${k}</td><td style="padding:6px 0;color:#10212b"><b>${esc(v)}</b></td></tr>`)
    .join('')}</table>`
  return {
    subject: `${sourceName[source]}: ${c.firstName} ${c.lastName}${vacancyTitle ? ` (${vacancyTitle})` : ''}`,
    html: layout(
      `${sourceName[source]}: ${c.firstName} ${c.lastName}`,
      table + (c.motivation ? p(`<i>“${esc(c.motivation)}”</i>`) : '') + p('Het profiel staat in de admin op <b>Te beoordelen</b>.'),
      { label: 'Profiel beoordelen', href: `${siteUrl()}/admin/kandidaten/${c.id}` }
    ),
  }
}

export function leadConfirmation(kind: 'RECRUITMENT_SCAN' | 'CONTACT', firstName: string) {
  const scan = kind === 'RECRUITMENT_SCAN'
  return {
    subject: scan ? 'Je aanvraag voor een gratis recruitmentscan' : 'We hebben je bericht ontvangen',
    html: layout(
      `Bedankt, ${firstName}!`,
      p(scan ? 'Bedankt voor je aanvraag voor een gratis recruitmentscan. We kijken naar je vacature, doelgroep en aanpak.' : 'Bedankt voor je bericht.') +
        p('We nemen binnen twee werkdagen contact met je op.')
    ),
  }
}

export function leadNotification(kind: 'RECRUITMENT_SCAN' | 'CONTACT', l: { name: string; email: string; phone?: string; companyName?: string; vacancyTitle?: string; challenge?: string }) {
  const title = kind === 'RECRUITMENT_SCAN' ? 'Nieuwe recruitmentscan' : 'Nieuw contactbericht'
  const rows = [['Naam', l.name], ['Bedrijf', l.companyName], ['E-mail', l.email], ['Telefoon', l.phone], ['Functie / onderwerp', l.vacancyTitle]]
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:6px 0;color:#6f7f89;width:40%">${k}</td><td style="padding:6px 0"><b>${esc(v)}</b></td></tr>`)
    .join('')
  return {
    subject: `${title}: ${l.companyName ?? l.name}`,
    html: layout(title, `<table role="presentation" style="width:100%;font-size:14px">${rows}</table>` + (l.challenge ? p(esc(l.challenge)) : ''), { label: 'Bekijk in de admin', href: `${siteUrl()}/admin/bedrijven` }),
  }
}

export function testEmail() {
  return {
    subject: 'Testmail van The Move Maker',
    html: layout('De e-mailkoppeling werkt', p('Dit is een testmail vanuit de admin. Resend is goed ingesteld.')),
  }
}
