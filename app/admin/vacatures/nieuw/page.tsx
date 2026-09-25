'use client'

import { useAdminUI } from '@/components/admin/AdminUI'

export default function NieuweVacaturePage() {
  const { openPublish, toast } = useAdminUI()

  return (
    <>
      <div className="page-head">
        <div><h1>Nieuwe vacature</h1><p>Maak een vacature aan en publiceer deze daarna naar de gewenste kanalen.</p></div>
      </div>
      <div className="editor-layout">
        <div className="grid">
          <div className="card panel">
            <h3 className="section-title">Basisinformatie</h3>
            <div className="form-grid">
              <div className="field"><label>Functietitel</label><input defaultValue="Uitvoerder Bouw" /></div>
              <div className="field"><label>Bedrijf</label><select><option>BAM</option><option>Heijmans</option></select></div>
              <div className="field"><label>Locatie</label><input defaultValue="Utrecht" /></div>
              <div className="field"><label>Vakgebied</label><select><option>Bouw</option><option>Civiel</option><option>Techniek</option></select></div>
            </div>
          </div>
          <div className="card panel">
            <h3 className="section-title">Dienstverband &amp; salaris</h3>
            <div className="form-grid">
              <div className="field"><label>Uren per week</label><input defaultValue="32 - 40" /></div>
              <div className="field"><label>Dienstverband</label><select><option>Vast</option><option>Tijdelijk</option></select></div>
              <div className="field"><label>Salaris vanaf</label><input defaultValue="4000" inputMode="numeric" /></div>
              <div className="field"><label>Salaris tot</label><input defaultValue="5500" inputMode="numeric" /></div>
            </div>
          </div>
          <div className="card panel">
            <h3 className="section-title">Vacaturetekst</h3>
            <div className="field"><label>Intro</label><textarea defaultValue="Als Uitvoerder Bouw zorg jij dat projecten veilig, efficiënt en volgens planning worden gerealiseerd." /></div>
            <br />
            <div className="field"><label>Over de functie</label><textarea /></div>
          </div>
        </div>
        <div className="card panel sticky">
          <h3>Status &amp; publicatie</h3>
          <p style={{ color: 'var(--muted)', fontSize: 13 }}>Sla eerst op als concept of publiceer direct naar meerdere kanalen.</p>
          <div className="field"><label>Status</label><select><option>Concept</option><option>Actief</option></select></div>
          <br />
          <button className="btn ghost" style={{ width: '100%', marginBottom: 8 }} onClick={() => toast('Preview geopend')}>Preview</button>
          <button className="btn primary" style={{ width: '100%' }} onClick={openPublish}>Opslaan &amp; publiceren</button>
        </div>
      </div>
    </>
  )
}
