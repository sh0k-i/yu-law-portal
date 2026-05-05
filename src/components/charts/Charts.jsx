export const SquiggleChart = ({ w = 320, h = 110, color = 'var(--ink)', points }) => {
  const pts = points || [60, 50, 70, 55, 80, 65, 90, 75, 70, 90, 100]
  const max = Math.max(...pts)
  const min = Math.min(...pts)
  const stepX = w / (pts.length - 1)
  const path = pts
    .map((p, i) => {
      const x = i * stepX
      const y = h - ((p - min) / (max - min || 1)) * (h - 20) - 10
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <path d={`M0 ${h - 1} L${w} ${h - 1}`} stroke="var(--line-soft)" strokeWidth="1.2" fill="none" />
      <path
        d={path}
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const BarChart = ({ w = 320, h = 130, bars, color = 'var(--ink)' }) => {
  const data = bars || [40, 70, 55, 90, 60, 85, 100, 75, 50, 80, 65, 95]
  const max = Math.max(...data)
  const bw = w / data.length - 4
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <path d={`M0 ${h - 1} L${w} ${h - 1}`} stroke="var(--line-soft)" strokeWidth="1.2" />
      {data.map((v, i) => {
        const bh = (v / max) * (h - 10)
        const x = i * (bw + 4) + 2
        const y = h - bh - 1
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={bw}
            height={bh}
            fill={color}
            opacity={0.85}
            stroke="var(--line)"
            strokeWidth="0.8"
          />
        )
      })}
    </svg>
  )
}

export const Donut = ({ size = 120, segments }) => {
  const segs = segments || [
    { v: 45, c: 'var(--ink)' },
    { v: 25, c: 'var(--highlight)' },
    { v: 18, c: 'var(--accent)' },
    { v: 12, c: 'var(--line-soft)' },
  ]
  const total = segs.reduce((a, b) => a + b.v, 0)
  const r = size / 2 - 8
  const cx = size / 2
  const cy = size / 2
  let acc = 0
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {segs.map((s, i) => {
        const start = (acc / total) * Math.PI * 2 - Math.PI / 2
        acc += s.v
        const end = (acc / total) * Math.PI * 2 - Math.PI / 2
        const x1 = cx + r * Math.cos(start)
        const y1 = cy + r * Math.sin(start)
        const x2 = cx + r * Math.cos(end)
        const y2 = cy + r * Math.sin(end)
        const large = end - start > Math.PI ? 1 : 0
        const d = `M ${cx} ${cy} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`
        return <path key={i} d={d} fill={s.c} stroke="var(--paper)" strokeWidth="1.5" />
      })}
      <circle cx={cx} cy={cy} r={r * 0.55} fill="var(--paper)" stroke="var(--line-soft)" strokeWidth="1" />
    </svg>
  )
}
