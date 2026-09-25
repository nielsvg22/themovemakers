import { ImageResponse } from 'next/og'

export const alt = 'The Move Maker — Recruitment voor bouw, civiel & techniek'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#071b2a', color: '#fff', padding: 72, fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 16, background: '#d6ff55', color: '#071b2a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, fontWeight: 900 }}>M</div>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 30, fontWeight: 900, lineHeight: 0.9 }}>
            <span>THE</span><span style={{ color: '#d6ff55' }}>MOVE</span><span>MAKER</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 76, fontWeight: 900, lineHeight: 1.05, letterSpacing: -3 }}>
          <span>De schakel tussen</span>
          <span style={{ color: '#d6ff55' }}>talent en vooruitgang</span>
        </div>
        <div style={{ fontSize: 26, color: '#a9bbc5' }}>Recruitment voor bouw, civiel &amp; techniek</div>
      </div>
    ),
    size
  )
}
