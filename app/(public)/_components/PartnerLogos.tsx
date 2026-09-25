export function PartnerLogos() {
  const partners = ['BAM', 'Heijmans', 'VolkerWessels', 'Strukton', 'SPIE', 'DENYS']

  return (
    <section className="py-12 border-t border-line" aria-labelledby="partners-title">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-6 text-[#60707a] font-black text-2xl opacity-85">
          {partners.map((partner) => (
            <span key={partner}>{partner}</span>
          ))}
        </div>
      </div>
    </section>
  )
}