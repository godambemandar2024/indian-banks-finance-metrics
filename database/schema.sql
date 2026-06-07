-- Create banks table
CREATE TABLE IF NOT EXISTS banks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  ticker_symbol VARCHAR(10),
  isin VARCHAR(20),
  nse_code VARCHAR(10),
  bse_code VARCHAR(10),
  headquarters VARCHAR(255),
  investor_relations_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create metrics table
CREATE TABLE IF NOT EXISTS metrics (
  id SERIAL PRIMARY KEY,
  bank_id INT NOT NULL,
  period_end_date DATE NOT NULL,
  period_type VARCHAR(20) NOT NULL CHECK (period_type IN ('quarterly', 'annual')),
  npa_ratio DECIMAL(10, 2),
  capital_adequacy_ratio DECIMAL(10, 2),
  net_interest_margin DECIMAL(10, 2),
  loan_to_deposit_ratio DECIMAL(10, 2),
  return_on_assets DECIMAL(10, 2),
  loan_book BIGINT,
  net_income BIGINT,
  data_source VARCHAR(255),
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (bank_id) REFERENCES banks(id) ON DELETE CASCADE,
  UNIQUE(bank_id, period_end_date, period_type)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_metrics_bank_id ON metrics(bank_id);
CREATE INDEX IF NOT EXISTS idx_metrics_period_date ON metrics(period_end_date DESC);
CREATE INDEX IF NOT EXISTS idx_metrics_bank_period ON metrics(bank_id, period_end_date DESC);

-- Insert supported banks
INSERT INTO banks (name, ticker_symbol, nse_code, bse_code, headquarters, investor_relations_url) 
VALUES 
  ('HDFC Bank', 'HDFCBANK.NS', 'HDFCBANK', '500180', 'Mumbai', 'https://www.hdfcbank.com/investor-relations'),
  ('ICICI Bank', 'ICICIBANK.NS', 'ICICIBANK', '500229', 'Mumbai', 'https://www.icicibank.com/investor-relations'),
  ('State Bank of India', 'SBIN.NS', 'SBIN', '500112', 'Mumbai', 'https://www.sbi.co.in/investor-relations'),
  ('Axis Bank', 'AXISBANK.NS', 'AXISBANK', '506000', 'Mumbai', 'https://www.axisbank.com/investor-relations'),
  ('Kotak Mahindra Bank', 'KOTAKBANK.NS', 'KOTAKBANK', '500209', 'Mumbai', 'https://www.kotak.com/investor-relations')
ON CONFLICT (name) DO NOTHING;
