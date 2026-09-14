import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts'
import { REVENUE_GROWTH } from '../data'
import type { RevenueSegment } from '../types'

interface TooltipProps {
  active?: boolean
  payload?: Array<{ payload: RevenueSegment }>
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload || !payload.length) return null
  const data = payload[0].payload
  return (
    <div className="bg-slate-900/95 border border-slate-700 rounded-lg px-3 py-2 shadow-xl">
      <p className="text-sm font-semibold text-white mb-1">{data.segment}</p>
      <p className="text-xs text-slate-300">
        Growth: <span className={data.growth >= 0 ? 'text-green-400' : 'text-red-400'}>{data.growth > 0 ? '+' : ''}{data.growth}%</span>
      </p>
      <p className="text-xs text-slate-300">Revenue: <span className="font-mono text-blue-400">{data.revenue}</span></p>
    </div>
  )
}

export default function RevenueGrowthChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={REVENUE_GROWTH} layout="vertical" margin={{ top: 5, right: 45, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
        <XAxis
          type="number"
          domain={[-10, 40]}
          ticks={[-10, 0, 10, 20, 30, 40]}
          tick={{ fill: '#94a3b8', fontSize: 11 }}
          axisLine={{ stroke: '#334155' }}
          tickLine={{ stroke: '#334155' }}
          tickFormatter={(v: number) => `${v}%`}
        />
        <YAxis
          type="category"
          dataKey="segment"
          tick={{ fill: '#94a3b8', fontSize: 11 }}
          axisLine={{ stroke: '#334155' }}
          tickLine={{ stroke: '#334155' }}
          width={100}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1e293b40' }} />
        <Bar dataKey="growth" radius={[0, 6, 6, 0]} barSize={20}>
          {REVENUE_GROWTH.map((entry, idx) => (
            <Cell key={idx} fill={entry.growth >= 0 ? '#10b981' : '#ef4444'} />
          ))}
          <LabelList
            dataKey="growth"
            position="right"
            formatter={(v: number) => `${v > 0 ? '+' : ''}${v}%`}
            style={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
