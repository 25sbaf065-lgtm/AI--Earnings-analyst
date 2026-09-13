export interface MetricExtracts {
  groupCapExActual: number;
  groupCapExTarget: number;
  airportGrowth: string;
  mdoGrowth: string;
  rightsIssue: string;
}

export interface SentimentAnalysis {
  score: number;
  tone: string;
  rationale: string;
}

export interface WallStreetAnalysisSchema {
  ticker: string;
  quarter: string;
  executiveSummary: string;
  metrics: MetricExtracts;
  risks: string[];
  sentiment: SentimentAnalysis;
}
