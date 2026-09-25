/** URL van de gedeelde jobfeed, zoals bij een jobboard aan te melden. Geen server-only import: ook bruikbaar vanuit connectors die in tests draaien. */
export function jobFeedUrl() {
  const explicit = process.env.NEXT_PUBLIC_APP_URL
  const base = explicit
    ? explicit.replace(/\/$/, '')
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000'
  return `${base}/api/jobfeeds/vacatures.xml`
}
