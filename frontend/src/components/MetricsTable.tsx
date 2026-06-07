import React from 'react'

interface Metric {
  id: number
  bank_id: number
  period_end_date: string
  period_type: string
  npa_ratio: number | null
  capital_adequacy_ratio: number | null
  net_interest_margin: number | null
  loan_to_deposit_ratio: number | null
  return_on_assets: number | null
  loan_book: number | null
  net_income: number | null
}

interface MetricsTableProps {
  metrics: Metric[]
}

const MetricsTable: React.FC<MetricsTableProps> = ({ metrics }) => {
  if (metrics.length === 0) {
    return <div className="no-data">No metrics data available</div>
  }

  const formatNumber = (value: number | null): string => {
    if (value === null) return 'N/A'
    if (Math.abs(value) >= 1000000) return (value / 1000000).toFixed(2) + 'M'
    if (Math.abs(value) >= 1000) return (value / 1000).toFixed(2) + 'K'
    return value.toFixed(2)
  }

  return (
    <div className="metrics-table-container">
      <table className="metrics-table">
        <thead>
          <tr>
            <th>Period End Date</th>
            <th>Type</th>
            <th>NPA Ratio (%)</th>
            <th>CAR (%)</th>
            <th>NIM (%)</th>
            <th>LTD Ratio (%)</th>
            <th>ROA (%)</th>
            <th>Loan Book</th>
            <th>Net Income</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map(metric => (
            <tr key={metric.id}>
              <td>{new Date(metric.period_end_date).toLocaleDateString()}</td>
              <td><span className="badge">{metric.period_type}</span></td>
              <td>{formatNumber(metric.npa_ratio)}</td>
              <td>{formatNumber(metric.capital_adequacy_ratio)}</td>
              <td>{formatNumber(metric.net_interest_margin)}</td>
              <td>{formatNumber(metric.loan_to_deposit_ratio)}</td>
              <td>{formatNumber(metric.return_on_assets)}</td>
              <td>{formatNumber(metric.loan_book)}</td>
              <td>{formatNumber(metric.net_income)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MetricsTable
