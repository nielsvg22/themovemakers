import Link from 'next/link'
import { getEmailSettings, maskKey } from '@/lib/email/settings'
import { EmailSettingsForm } from '@/components/admin/EmailSettingsForm'

export const dynamic = 'force-dynamic'

export default async function InstellingenPage() {
  const email = await getEmailSettings()
  return (
    <>
      <div className="page-head">
        <div><h1>Instellingen</h1><p>Accounts, e-mail, branding en integraties.</p></div>
      </div>
      <div className="card panel" style={{ marginBottom: 16 }}>
        <div className="page-head" style={{ marginBottom: 10 }}>
          <div><h3 style={{ margin: 0 }}>E-mail (Resend)</h3><p>Bevestigingen naar kandidaten en meldingen naar recruiters.</p></div>
          <Link href="/admin/emails" className="btn ghost">Verzonden mails</Link>
        </div>
        <EmailSettingsForm
          maskedKey={maskKey(email.apiKey)}
          from={email.from}
          notifyTo={email.notifyTo ?? ''}
          testMode={email.testMode}
          testInbox={email.testInbox ?? ''}
        />
      </div>
      <div className="grid connector-grid">
        <div className="card connector"><h3>Organisatie</h3><p>Bedrijfsgegevens, logo en contactinformatie.</p></div>
        <div className="card connector"><h3>Gebruikers &amp; rollen</h3><p>Beheer recruiters en rechten.</p></div>
        <div className="card connector"><h3>Integraties</h3><p>API-keys, webhooks en jobboards.</p><Link href="/admin/publicaties" className="btn primary">Beheer koppelingen</Link></div>
      </div>
    </>
  )
}
