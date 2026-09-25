const partners = ['BAM', 'Heijmans', 'VolkerWessels', 'Strukton', 'SPIE', 'DENYS']

export function PartnerLogos() {
  return (
    <div className="logos">
      {partners.map((p) => <span key={p}>{p}</span>)}
    </div>
  )
}
