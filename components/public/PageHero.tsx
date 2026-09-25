import { ReactNode } from 'react'

interface PageHeroProps {
  title: ReactNode
  subtitle?: ReactNode
  eyebrow?: string
  breadcrumbs?: ReactNode
  image?: string
  titleSize?: number
}

/** De donkere paginakop uit het design (.page-hero), optioneel met achtergrondfoto. */
export function PageHero({ title, subtitle, eyebrow, breadcrumbs, image, titleSize = 56 }: PageHeroProps) {
  return (
    <div className={`page-hero${image ? ' with-image' : ''}`}>
      {image && <img src={image} alt="" />}
      <div className="container">
        {breadcrumbs && <div className="breadcrumbs">{breadcrumbs}</div>}
        {eyebrow && <div className="eyebrow light">{eyebrow}</div>}
        <h1 style={{ fontSize: titleSize }}>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  )
}
