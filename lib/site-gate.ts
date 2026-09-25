/**
 * Simpele, gratis alternatief voor Vercel's (betaalde) Password Protection: de hele
 * publieke site achter één gedeeld wachtwoord, terwijl de jobboard-feeds en de admin
 * (die zijn eigen login heeft) gewoon bereikbaar blijven. Alleen actief zolang
 * SITE_GATE_PASSWORD is ingesteld; ontbreekt die env var, dan is de site gewoon open.
 */
export const SITE_GATE_COOKIE = 'tmm_site_access'

/** Paden die nooit achter het wachtwoord zitten. */
export function isGateExempt(pathname: string) {
  return (
    pathname === '/site-gate' ||
    // Alle API-routes hebben (waar nodig) hun eigen requireStaff-check; de admin heeft
    // zijn eigen login. Beide moeten bereikbaar blijven zonder eerst langs het gate-scherm
    // te hoeven, anders werkt de admin (die het gate-scherm nooit ziet) niet meer.
    pathname.startsWith('/api/') ||
    pathname.startsWith('/admin') ||
    pathname === '/login' ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    pathname === '/icon.svg' ||
    pathname === '/opengraph-image'
  )
}

export function isGateEnabled() {
  return Boolean(process.env.SITE_GATE_PASSWORD)
}

export function gateCookieMatches(value: string | undefined) {
  const expected = process.env.SITE_GATE_TOKEN
  return Boolean(expected && value === expected)
}
