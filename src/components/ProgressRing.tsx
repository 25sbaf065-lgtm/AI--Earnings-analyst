interface ProgressRingProps {
  actual: number
  target: number
  label: string
  color: string
}

export default function ProgressRing({ actual, target, label, color }: ProgressRingProps) {
  const pct = target > 0 ? Math.min((actual / target) * 100, 100) : 0
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (pct / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#1e293b" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-white">{pct.toFixed(0)}%</span>
        </div>
      </div>
      <span className="text-xs text-slate-400 text-center leading-tight">{label}</span>
      <span className="text-[10px] text-slate-500 font-mono">
        ₹{(actual / 1000).toFixed(1)}k / ₹{(target / 1000).toFixed(0)}k Cr
      </span>
    </div>
  )
}
