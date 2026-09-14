import { useEffect, useState } from 'react'
import { SENTIMENT_SCALE } from '../data'

interface SentimentGaugeProps {
  score: number
}

export default function SentimentGauge({ score }: SentimentGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(-10)

  useEffect(() => {
    const duration = 1500
    const steps = 60
    const stepDuration = duration / steps
    const increment = (score - -10) / steps
    let current = -10
    const interval = setInterval(() => {
      current += increment
      if (current >= score) {
        current = score
        clearInterval(interval)
      }
      setAnimatedScore(current)
    }, stepDuration)
    return () => clearInterval(interval)
  }, [score])

  const min = SENTIMENT_SCALE.min
  const max = SENTIMENT_SCALE.max
  const range = max - min
  const normalized = (animatedScore - min) / range

  const startAngle = -135
  const endAngle = 135
  const totalAngle = endAngle - startAngle
  const needleAngle = startAngle + normalized * totalAngle

  const radius = 140
  const cx = 160
  const cy = 160
  const strokeWidth = 28

  const polarToCartesian = (r: number, angleDeg: number) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    }
  }

  const describeArc = (r: number, startAng: number, endAng: number) => {
    const start = polarToCartesian(r, endAng)
    const end = polarToCartesian(r, startAng)
    const largeArc = endAng - startAng <= 180 ? '0' : '1'
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`
  }

  const zone = SENTIMENT_SCALE.zones.find((z) => animatedScore >= z.from && animatedScore <= z.to) ?? SENTIMENT_SCALE.zones[4]

  const needleEnd = polarToCartesian(radius - 35, needleAngle)
  const needleBase1 = polarToCartesian(12, needleAngle + 90)
  const needleBase2 = polarToCartesian(12, needleAngle - 90)

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <svg viewBox="0 0 320 260" className="w-full max-w-[340px]">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="25%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="75%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>

        <path
          d={describeArc(radius, startAngle, endAngle)}
          fill="none"
          stroke="#1e293b"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          d={describeArc(radius, startAngle, endAngle)}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          opacity="0.85"
        />

        {Array.from({ length: 21 }).map((_, i) => {
          const angle = startAngle + (i / 20) * totalAngle
          const outer = polarToCartesian(radius + 2, angle)
          const inner = polarToCartesian(radius + 14, angle)
          const isMajor = i % 5 === 0
          return (
            <line
              key={i}
              x1={outer.x}
              y1={outer.y}
              x2={inner.x}
              y2={inner.y}
              stroke={isMajor ? '#64748b' : '#334155'}
              strokeWidth={isMajor ? 2 : 1}
            />
          )
        })}

        {[-10, -5, 0, 5, 10].map((val) => {
          const angle = startAngle + ((val - min) / range) * totalAngle
          const pos = polarToCartesian(radius + 30, angle)
          return (
            <text
              key={val}
              x={pos.x}
              y={pos.y}
              fill="#64748b"
              fontSize="11"
              fontFamily="JetBrains Mono, monospace"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {val > 0 ? `+${val}` : val}
            </text>
          )
        })}

        <g style={{ transition: 'transform 0.05s linear' }}>
          <polygon
            points={`${needleEnd.x},${needleEnd.y} ${needleBase1.x},${needleBase1.y} ${needleBase2.x},${needleBase2.y}`}
            fill="#e2e8f0"
            filter="url(#glow)"
          />
        </g>

        <circle cx={cx} cy={cy} r="14" fill="#1e293b" stroke="#475569" strokeWidth="2" />
        <circle cx={cx} cy={cy} r="6" fill={zone.color} />

        <text
          x={cx}
          y={cy + 65}
          fill="white"
          fontSize="36"
          fontWeight="800"
          fontFamily="Inter, sans-serif"
          textAnchor="middle"
        >
          {animatedScore >= 0 ? '+' : ''}
          {animatedScore.toFixed(1)}
        </text>
        <text
          x={cx}
          y={cy + 88}
          fill={zone.color}
          fontSize="14"
          fontWeight="600"
          fontFamily="Inter, sans-serif"
          textAnchor="middle"
          letterSpacing="2"
        >
          {zone.label.toUpperCase()}
        </text>
      </svg>

      <div className="flex items-center gap-3 mt-1 flex-wrap justify-center">
        {SENTIMENT_SCALE.zones.map((z) => (
          <div key={z.label} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: z.color }} />
            <span className="text-[10px] text-slate-400 font-medium">{z.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
