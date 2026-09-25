import { Metadata } from 'next'

interface PageHeroProps {
  title: string
  subtitle: string
  eyebrow?: string
  image?: string
}

export function PageHero({ title, subtitle, eyebrow, image }: PageHeroProps) {
  return (
    <div className="bg-navy text-white relative overflow-hidden" aria-labelledby="page-title">
      {image && (
        <>
          <img
            src={image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/20" />
        </>
      )}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        {eyebrow && (
          <p className="text-xs font-extrabold uppercase tracking-wider text-lime/80 mb-4">
            {eyebrow}
          </p>
        )}
        <h1 id="page-title" className="font-black tracking-tight text-4xl md:text-5xl lg:text-6xl mb-4">
          {title}
        </h1>
        <p className="text-[#c7d6dd] text-lg max-w-2xl">{subtitle}</p>
      </div>
    </div>
  )
}