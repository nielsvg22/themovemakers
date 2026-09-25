/**
 * URL van de jobfeed, zoals bij een jobboard aan te melden. Elk board krijgt zijn eigen
 * URL (?channel=...), zodat de feed alleen de vacatures toont die voor dát kanaal zijn
 * gepubliceerd — uitvinken in de "Publiceer"-modal verwijdert de vacature dan ook echt
 * uit de feed van dat specifieke board.
 * Geen server-only import: ook bruikbaar vanuit connectors die in tests draaien.
 */
export function jobFeedUrl(channel?: string) {
  const explicit = process.env.NEXT_PUBLIC_APP_URL
  const base = explicit
    ? explicit.replace(/\/$/, '')
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000'
  return `${base}/api/jobfeeds/vacatures.xml${channel ? `?channel=${channel}` : ''}`
}
