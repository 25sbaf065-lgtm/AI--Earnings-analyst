export type Trend = 'positive' | 'negative' | 'neutral'

export interface HighlightMetric {
  label: string
  value: string
  subtext: string
  trend: Trend
}

export interface FinancialHealth {
  revenue_trend: string
  margin_guidance: string
  capex_updates: string
}

export interface SentimentAnalysis {
  score: number
  rationale: string
}

export interface TranscriptAnalysis {
  ticker: string
  quarter: string
  company_name: string
  call_date: string
  executive_summary: string
  financial_health: FinancialHealth
  hidden_risks: string[]
  sentiment_analysis: SentimentAnalysis
}

export interface CapexSegment {
  segment: string
  actual: number
  target: number
  color: string
}

export interface RevenueSegment {
  segment: string
  growth: number
  revenue: string
}

export interface EbitdaSegment {
  segment: string
  percentage: number
  color: string
}
