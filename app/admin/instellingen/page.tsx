import Link from 'next/link'

export default function InstellingenPage() {
  return (
    <>
      <div className="page-head">
        <div><h1>Instellingen</h1><p>Accounts, gebruikers, branding en integraties.</p></div>
      </div>
      <div className="grid connector-grid">
        <div className="card connector"><h3>Organisatie</h3><p>Bedrijfsgegevens, logo en contactinformatie.</p></div>
        <div className="card connector"><h3>Gebruikers &amp; rollen</h3><p>Beheer recruiters en rechten.</p></div>
        <div className="card connector"><h3>Integraties</h3><p>API-keys, webhooks en jobboards.</p><Link href="/admin/publicaties" className="btn primary">Beheer koppelingen</Link></div>
      </div>
    </>
  )
}
