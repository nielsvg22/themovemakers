import Link from 'next/link'
import { getEmailSettings, maskKey } from '@/lib/email/settings'
import { getServerSession } from 'next-auth'
import { EmailSettingsForm } from '@/components/admin/EmailSettingsForm'
import { ActionButton, AdminForm } from '@/components/admin/Forms'
import { changePassword, createUser, deleteUser } from '@/app/admin/manage-actions'
import { authOptions } from '@/lib/auth/config'
import { prisma } from '@/lib/db/prisma'
import { dateLabel } from '@/lib/admin/labels'

export const dynamic = 'force-dynamic'

export default async function InstellingenPage() {
  const [email, session, users] = await Promise.all([
    getEmailSettings(),
    getServerSession(authOptions),
    prisma.user.findMany({ orderBy: { createdAt: 'asc' }, select: { id: true, name: true, email: true, role: true, createdAt: true } }),
  ])
  const isAdmin = session?.user.role === 'ADMIN'
  return (
    <>
      <div className="page-head">
        <div><h1>Instellingen</h1><p>E-mail, gebruikers, je account en integraties.</p></div>
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
      <div className="card panel" style={{ marginBottom: 16, overflowX: 'auto' }}>
        <h3>Gebruikers &amp; rollen</h3>
        <table className="table">
          <thead><tr><th>Naam</th><th>E-mail</th><th>Rol</th><th>Sinds</th><th /></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td><b>{u.name ?? '—'}</b>{u.id === session?.user.id && <small style={{ color: 'var(--muted)' }}> (jij)</small>}</td>
                <td>{u.email}</td>
                <td><span className={`badge ${u.role === 'ADMIN' ? 'b-purple' : 'b-blue'}`}>{u.role === 'ADMIN' ? 'Administrator' : 'Recruiter'}</span></td>
                <td>{dateLabel(u.createdAt)}</td>
                <td style={{ textAlign: 'right' }}>
                  {isAdmin && u.id !== session?.user.id && (
                    <ActionButton action={deleteUser.bind(null, u.id)} confirm={`Account van ${u.name ?? u.email} verwijderen?`} done="Gebruiker verwijderd" className="btn soft">Verwijderen</ActionButton>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isAdmin ? (
          <div style={{ marginTop: 16 }}>
            <h4 style={{ margin: '0 0 10px' }}>Gebruiker toevoegen</h4>
            <AdminForm action={createUser} submitLabel="Gebruiker toevoegen">
              <div className="form-grid">
                <div className="field"><label htmlFor="u-name">Naam</label><input id="u-name" name="name" required /></div>
                <div className="field"><label htmlFor="u-email">E-mail</label><input id="u-email" name="email" type="email" required /></div>
                <div className="field"><label htmlFor="u-pass">Tijdelijk wachtwoord</label><input id="u-pass" name="password" type="password" minLength={10} required autoComplete="new-password" /></div>
                <div className="field">
                  <label htmlFor="u-role">Rol</label>
                  <select id="u-role" name="role" defaultValue="RECRUITER"><option value="RECRUITER">Recruiter</option><option value="ADMIN">Administrator</option></select>
                </div>
              </div>
            </AdminForm>
          </div>
        ) : (
          <p style={{ margin: '12px 0 0', color: 'var(--muted)', fontSize: 13 }}>Alleen een administrator kan gebruikers toevoegen.</p>
        )}
      </div>
      <div className="grid connector-grid">
        <div className="card panel">
          <h3>Wachtwoord wijzigen</h3>
          <AdminForm action={changePassword} submitLabel="Wachtwoord wijzigen">
            <div className="field"><label htmlFor="pw-current">Huidig wachtwoord</label><input id="pw-current" name="current" type="password" required autoComplete="current-password" /></div>
            <div className="field"><label htmlFor="pw-next">Nieuw wachtwoord</label><input id="pw-next" name="next" type="password" minLength={10} required autoComplete="new-password" /></div>
            <div className="field"><label htmlFor="pw-confirm">Herhaal nieuw wachtwoord</label><input id="pw-confirm" name="confirm" type="password" minLength={10} required autoComplete="new-password" /></div>
          </AdminForm>
        </div>
        <div className="card connector"><h3>Integraties</h3><p>Jobboards, feeds en publicatiekanalen.</p><Link href="/admin/publicaties" className="btn primary">Beheer koppelingen</Link></div>
        <div className="card connector"><h3>E-mailtemplates</h3><p>Standaardteksten voor mails aan kandidaten.</p><Link href="/admin/templates" className="btn ghost">Templates beheren</Link></div>
      </div>
    </>
  )
}
