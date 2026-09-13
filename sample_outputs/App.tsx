import React from 'react';

// Financial Schema interface matching our institutional model
interface FinancialData {
  ticker: string;
  quarter: string;
  executiveSummary: string;
  metrics: {
    groupCapExActual: number;
    groupCapExTarget: number;
    airportGrowth: string;
    mdoGrowth: string;
    rightsIssue: string;
  };
  risks: string[];
  sentiment: {
    score: number;
    tone: string;
    rationale: string;
  };
}

const mockData: FinancialData = {
  ticker: "ADANIENT",
  quarter: "Q2 FY26",
  executiveSummary: "Group financial performance remained highly resilient with key infrastructure milestones met across major portfolios, backed by the board-approved ₹25,000 crore equity rights issue to fortify liquidity.",
  metrics: {
    groupCapExActual: 16300,
    groupCapExTarget: 36000,
    airportGrowth: "+32%",
    mdoGrowth: "+35%",
    rightsIssue: "₹25,000 Cr Approved"
  },
  risks: [
    "U.S. solar module tariff repricing cycle uncertainties",
    "Supreme Court/environmental delays on City Side Development",
    "Working capital inventory absorption from copper plant ramp-up"
  ],
  sentiment: {
    score: 6.2,
    tone: "Bullish / Confident",
    rationale: "Strong management confidence metrics isolated during complex analyst Q&A regarding cash flows and confidential data center contracts."
  }
};

export default function App() {
  const capExPercentage = Math.round((mockData.metrics.groupCapExActual / mockData.metrics.groupCapExTarget) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      {/* Header Banner */}
      <header className="mb-8 border-b border-slate-800 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">WALL STREET EQUITY ANALYST DASHBOARD</h1>
          <p className="text-sm text-slate-400">Automated Corporate Transcript Extraction Layer</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded text-right">
          <span className="text-xs font-semibold text-blue-400 block">{mockData.ticker}</span>
          <span className="text-sm font-bold text-white">{mockData.quarter} Report</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Pillar: Sentiment Gauge Component */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
          <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-6 w-full text-left">Quantitative Sentiment Gauge</h2>
          <div className="relative w-48 h-48 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#1e293b" strokeWidth="8" fill="transparent" />
              <circle cx="50" cy="50" r="40" stroke="#2563eb" strokeWidth="8" fill="transparent" 
                strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * ((mockData.sentiment.score + 10) / 20))} 
                strokeLinecap="round" />
            </svg>
            <div className="absolute text-center">
              <span className="text-4xl font-extrabold text-white">+{mockData.sentiment.score}</span>
              <span className="text-xs block text-slate-500 mt-1">Calibrated (-10 to +10)</span>
            </div>
          </div>
          <div className="bg-emerald-950/50 border border-emerald-800/60 px-3 py-1 rounded-full text-xs font-bold text-emerald-400 mb-4">
            TONE: {mockData.sentiment.tone}
          </div>
          <p className="text-xs text-slate-400 text-center px-2 italic">"{mockData.sentiment.rationale}"</p>
        </div>

        {/* Center/Right Pillars */}
        <div className="lg:col-span-2 grid grid-cols-1 gap-8">
          {/* Executive Summary Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-3">Executive Summary Card</h2>
            <p className="text-slate-300 text-sm leading-relaxed">{mockData.executiveSummary}</p>
          </div>

          {/* Operational Metrics & Risks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Financial Health Indicators Grid */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-4">Financial Health</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Capital Expenditure Run-Rate</span>
                    <span className="text-white font-semibold">{capExPercentage}% Target Met</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${capExPercentage}%` }}></div>
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-1">₹{mockData.metrics.groupCapExActual.toLocaleString()} Cr deployed vs ₹{mockData.metrics.groupCapExTarget.toLocaleString()} Cr FY26 Target</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Airport Growth</span>
                    <span className="text-lg font-bold text-emerald-400">{mockData.metrics.airportGrowth}</span>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">MDO Contract Growth</span>
                    <span className="text-lg font-bold text-emerald-400">{mockData.metrics.mdoGrowth}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hidden Risk Flagging Grid */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h2 className="text-sm font-semibold tracking-wider text-red-400 uppercase mb-4">Hidden Risk Flags</h2>
              <ul className="space-y-3">
                {mockData.risks.map((risk, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-red-500 font-bold mt-0.5">⚠️</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
