import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  FileText,
  Building2,
  Gauge,
  BarChart3,
  DollarSign,
  Shield,
  Calendar,
  ArrowUpRight,
} from 'lucide-react'
import SentimentGauge from './components/SentimentGauge'
import CapexChart from './components/CapexChart'
import RevenueGrowthChart from './components/RevenueGrowthChart'
import EbitdaDonut from './components/EbitdaDonut'
import ProgressRing from './components/ProgressRing'
import { PRIMARY_ANALYSIS, CORE_METRICS, CAPEX_SEGMENTS } from './data'
import type { Trend } from './types'

const trendIcon: Record<Trend, typeof TrendingUp> = {
  positive: TrendingUp,
  negative: TrendingDown,
  neutral: Minus,
}

const trendColor: Record<Trend, string> = {
  positive: 'text-emerald-400 bg-emerald-500/10',
  negative: 'text-red-400 bg-red-500/10',
  neutral: 'text-slate-400 bg-slate-500/10',
}

export default function App() {
  const a = PRIMARY_ANALYSIS

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Top nav bar */}
      <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Gauge className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight">AI Earnings Call Analyst</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Gemini-Powered Transcript Intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{a.call_date}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <span className="text-xs font-bold text-blue-400 font-mono">{a.ticker}</span>
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs text-slate-300">{a.quarter}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 py-6 space-y-6">
        {/* Company header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-slide-up">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-blue-400 font-medium uppercase tracking-wider">Earnings Transcript Analysis</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">{a.company_name}</h2>
            <p className="text-sm text-slate-400 mt-1">Q2 & H1 FY26 Earnings Call — AI-Extracted Intelligence</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-700/50">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">H1 Revenue</p>
              <p className="text-xl font-bold text-white">₹44,281 <span className="text-sm text-slate-400">Cr</span></p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-700/50">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">H1 EBITDA</p>
              <p className="text-xl font-bold text-white">₹7,688 <span className="text-sm text-slate-400">Cr</span></p>
            </div>
          </div>
        </div>

        {/* Core metrics row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
          {CORE_METRICS.map((m, i) => {
            const Icon = trendIcon[m.trend]
            return (
              <div
                key={i}
                className="glass-card-hover p-5 animate-slide-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="metric-label">{m.label}</span>
                  <div className={`p-1.5 rounded-lg ${trendColor[m.trend]}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className="metric-value mb-1">{m.value}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{m.subtext}</p>
              </div>
            )
          })}
        </div>

        {/* Main grid: gauge + executive summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sentiment Gauge */}
          <div className="glass-card p-6 animate-slide-up">
            <div className="flex items-center gap-2 mb-4">
              <Gauge className="w-4 h-4 text-blue-400" />
              <h3 className="section-title">Quantitative Sentiment Gauge</h3>
            </div>
            <SentimentGauge score={a.sentiment_analysis.score} />
            <div className="mt-4 pt-4 border-t border-slate-800">
              <p className="text-xs text-slate-400 leading-relaxed italic">
                {a.sentiment_analysis.rationale}
              </p>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="lg:col-span-2 glass-card p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-blue-400" />
              <h3 className="section-title">Executive Summary</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{a.executive_summary}</p>

            {/* Financial health sub-sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/40">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Revenue Trend</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{a.financial_health.revenue_trend}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/40">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Margin Guidance</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{a.financial_health.margin_guidance}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/40">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">CapEx Updates</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{a.financial_health.capex_updates}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CapEx Chart */}
          <div className="glass-card p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-400" />
                <h3 className="section-title">H1 CapEx Actual vs FY26 Target</h3>
              </div>
              <span className="text-xs text-slate-500 font-mono">₹ in Crores</span>
            </div>
            <CapexChart />
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Total H1 Deployed</p>
                <p className="text-lg font-bold text-white">₹16,300 Cr</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Full-Year Target</p>
                <p className="text-lg font-bold text-white">₹36,000 Cr</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Pace</p>
                <p className="text-lg font-bold text-amber-400">45.3%</p>
              </div>
            </div>
          </div>

          {/* Revenue Growth Chart */}
          <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <h3 className="section-title">Segment Revenue Growth (YoY)</h3>
              </div>
              <span className="text-xs text-slate-500 font-mono">% change</span>
            </div>
            <RevenueGrowthChart />
          </div>
        </div>

        {/* EBITDA donut + Progress rings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* EBITDA Donut */}
          <div className="glass-card p-6 animate-slide-up">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-blue-400" />
              <h3 className="section-title">EBITDA Contribution Mix</h3>
            </div>
            <EbitdaDonut />
            <div className="flex items-center justify-around mt-4 pt-4 border-t border-slate-800">
              {[
                { label: 'Incubating', pct: '70%', color: '#3b82f6' },
                { label: 'Established', pct: '30%', color: '#64748b' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-slate-400">{item.label}</span>
                  <span className="text-xs font-bold text-white font-mono">{item.pct}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CapEx Progress Rings */}
          <div className="lg:col-span-2 glass-card p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-2 mb-4">
              <ArrowUpRight className="w-4 h-4 text-amber-400" />
              <h3 className="section-title">CapEx Deployment Progress by Segment</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-2">
              {CAPEX_SEGMENTS.map((seg, i) => (
                <ProgressRing
                  key={i}
                  actual={seg.actual}
                  target={seg.target}
                  label={seg.segment}
                  color={seg.color}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Hidden Risks */}
        <div className="glass-card p-6 animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h3 className="section-title">Hidden Risk Flagging Grid</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {a.hidden_risks.map((risk, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 hover:border-amber-500/40 transition-colors duration-300"
              >
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-amber-400">{i + 1}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{risk}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-4 pb-8 text-center">
          <p className="text-xs text-slate-600">
            AI-Driven Corporate Earnings Call Analyst · Powered by Google Gemini AI Studio · Structured Wall Street Analyst JSON Schema
          </p>
        </footer>
      </main>
    </div>
  )
}
