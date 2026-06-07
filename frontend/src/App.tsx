import { useState, useEffect } from 'react'
import axios from 'axios'
import BankSelector from './components/BankSelector'
import MetricsTable from './components/MetricsTable'
import './App.css'

interface Bank {
  id: number
  name: string
  ticker_symbol: string
}

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

function App() {
  const [banks, setBanks] = useState<Bank[]>([])
  const [selectedBank, setSelectedBank] = useState<number | null>(null)
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch banks on component mount
  useEffect(() => {
    fetchBanks()
  }, [])

  // Fetch metrics when bank is selected
  useEffect(() => {
    if (selectedBank) {
      fetchMetrics(selectedBank)
    }
  }, [selectedBank])

  const fetchBanks = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/banks')
      setBanks(response.data.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch banks')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchMetrics = async (bankId: number) => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/metrics/bank/${bankId}`)
      setMetrics(response.data.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch metrics')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async () => {
    if (!selectedBank) return
    try {
      setLoading(true)
      await axios.post(`/api/metrics/update/${selectedBank}`)
      // Refresh metrics after update
      await fetchMetrics(selectedBank)
      setError(null)
    } catch (err) {
      setError('Failed to update metrics')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <header className="header">
        <h1>📊 Indian Banks Finance Metrics</h1>
        <p>Track credit metrics of India's leading banks</p>
      </header>

      <main className="container">
        <div className="controls">
          <BankSelector 
            banks={banks} 
            selectedBank={selectedBank}
            onSelectBank={setSelectedBank}
          />
          <button 
            className="btn btn-primary"
            onClick={handleUpdate}
            disabled={!selectedBank || loading}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {selectedBank && !loading && (
          <MetricsTable metrics={metrics} />
        )}

        {loading && <div className="loading">Loading...</div>}
      </main>
    </div>
  )
}

export default App
