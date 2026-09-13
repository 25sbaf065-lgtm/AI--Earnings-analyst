import json
import pandas as pd

# Raw JSON data payload generated from the transcript analysis
raw_extracted_data = """
{
  "ticker": "ADANIENT",
  "quarter": "Q2 FY26",
  "metrics": {
    "group_capex_actual": 16300,
    "group_capex_target": 36000,
    "rights_issue": 25000
  },
  "risks": [
    "U.S. solar module tariff repricing cycle",
    "Supreme Court clearance delays on City Side Development",
    "Working capital inventory absorption from copper plant ramp-up"
  ]
}
"""

def process_financial_pipeline(json_payload):
    # Parse the incoming raw JSON string
    data = json.loads(json_payload)
    
    # Load into a Pandas DataFrame for technical analysis
    df_metrics = pd.DataFrame([data['metrics']])
    
    # Calculate CapEx Execution Rate
    df_metrics['capex_execution_rate'] = (df_metrics['group_capex_actual'] / df_metrics['group_capex_target']) * 100
    
    # Calculate Remaining Target Budget Needed
    df_metrics['remaining_capex_budget'] = df_metrics['group_capex_target'] - df_metrics['group_capex_actual']
    
    print("--- BACKEND PIPELINE EXECUTION SUCCESSFUL ---")
    print(f"Ticker: {data['ticker']} | Period: {data['quarter']}")
    print(f"CapEx Deployment Rate: {df_metrics['capex_execution_rate'].values[0]:.2f}%")
    print(f"Remaining Capital Requirement: ₹{df_metrics['remaining_capex_budget'].values[0]:,} Cr")
    
    return df_metrics.to_dict(orient='records')[0]

if __name__ == "__main__":
    process_financial_pipeline(raw_extracted_data)
