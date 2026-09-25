import Link from 'next/link'

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="The Move Maker - Home">
      <div className="brand-mark">M</div>
      <div>THE<br /><span className="move">MOVE</span><br />MAKER</div>
    </Link>
  )
}
