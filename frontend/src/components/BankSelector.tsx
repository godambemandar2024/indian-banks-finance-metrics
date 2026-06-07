import React from 'react'

interface BankSelectorProps {
  banks: Array<{ id: number; name: string; ticker_symbol: string }>
  selectedBank: number | null
  onSelectBank: (bankId: number) => void
}

const BankSelector: React.FC<BankSelectorProps> = ({ banks, selectedBank, onSelectBank }) => {
  return (
    <select 
      value={selectedBank || ''} 
      onChange={(e) => onSelectBank(Number(e.target.value))}
      className="bank-selector"
    >
      <option value="">Select a bank...</option>
      {banks.map(bank => (
        <option key={bank.id} value={bank.id}>
          {bank.name} ({bank.ticker_symbol})
        </option>
      ))}
    </select>
  )
}

export default BankSelector
