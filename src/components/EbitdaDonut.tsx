import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { EBITDA_BREAKDOWN } from '../data'
import type { EbitdaSegment } from '../types'

interface TooltipProps {
  active?: boolean
  payload?: Array<{ payload: EbitdaSegment }>
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload || !payload.length) return null
  const data = payload[0].payload
  return (
    <div className="bg-slate-900/95 border border-slate-700 rounded-lg px-3 py-2 shadow-xl">
      <p className="text-sm font-semibold text-white">{data.segment}</p>
      <p className="text-xs text-slate-300">Share: <span className="font-mono text-blue-400">{data.percentage}%</span></p>
    </div>
  )
}

export default function EbitdaDonut() {
  return (
    <div className="relative w-full" style={{ height: 200 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={EBITDA_BREAKDOWN}
            dataKey="percentage"
            nameKey="segment"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            startAngle={90}
            endAngle={-270}
            paddingAngle={2}
            stroke="none"
          >
            {EBITDA_BREAKDOWN.map((entry, idx) => (
              <Cell key={idx} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-3xl font-bold text-white">70%</span>
        <span className="text-[10px] text-slate-400 uppercase tracking-wider">Incubating</span>
      </div>
    </div>
  )
}
