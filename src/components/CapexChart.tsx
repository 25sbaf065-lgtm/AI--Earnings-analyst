import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts'
import { CAPEX_SEGMENTS } from '../data'
import type { CapexSegment } from '../types'

interface TooltipProps {
  active?: boolean
  payload?: Array<{ payload: CapexSegment }>
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload || !payload.length) return null
  const data = payload[0].payload
  const pct = data.target > 0 ? ((data.actual / data.target) * 100).toFixed(1) : '0'
  return (
    <div className="bg-slate-900/95 border border-slate-700 rounded-lg px-3 py-2 shadow-xl">
      <p className="text-sm font-semibold text-white mb-1">{data.segment}</p>
      <p className="text-xs text-slate-300">
        Actual: <span className="font-mono text-blue-400">₹{data.actual.toLocaleString()} Cr</span>
      </p>
      <p className="text-xs text-slate-300">
        Target: <span className="font-mono text-slate-400">₹{data.target.toLocaleString()} Cr</span>
      </p>
      <p className="text-xs text-slate-400 mt-1">Progress: {pct}%</p>
    </div>
  )
}

export default function CapexChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={CAPEX_SEGMENTS} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
        <XAxis
          dataKey="segment"
          tick={{ fill: '#94a3b8', fontSize: 11 }}
          axisLine={{ stroke: '#334155' }}
          tickLine={{ stroke: '#334155' }}
          angle={-15}
          textAnchor="end"
          height={60}
        />
        <YAxis
          tick={{ fill: '#94a3b8', fontSize: 11 }}
          axisLine={{ stroke: '#334155' }}
          tickLine={{ stroke: '#334155' }}
          tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1e293b40' }} />
        <Legend
          wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
          formatter={(value: string) => <span className="text-slate-300">{value}</span>}
        />
        <Bar dataKey="target" name="FY26 Target" radius={[6, 6, 0, 0]} fill="#334155" barSize={18} />
        <Bar dataKey="actual" name="H1 Actual" radius={[6, 6, 0, 0]} barSize={18}>
          {CAPEX_SEGMENTS.map((entry, idx) => (
            <Cell key={idx} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
