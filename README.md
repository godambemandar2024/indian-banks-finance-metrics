# Indian Banks Finance Metrics App

A web application to track and display key credit metrics of listed Indian banks from their published financial reports and credible public sources.

## Features

- **Bank Selection**: Dropdown to select from 5 major Indian banks
- **Key Metrics Tracking**: Monitor 7 critical financial metrics
- **Quarterly & Annual Data**: View data for 3 preceding quarters and 3 preceding fiscal years
- **Manual Data Update**: Click "Update" button to fetch latest data from credible sources
- **Tabular Display**: Easy-to-read table format for metrics comparison

## Supported Banks

1. HDFC Bank
2. ICICI Bank
3. State Bank of India (SBI)
4. Axis Bank
5. Kotak Mahindra Bank

## Key Credit Metrics

1. Non-Performing Assets (NPA) Ratio (%)
2. Capital Adequacy Ratio (CAR) (%)
3. Net Interest Margin (NIM) (%)
4. Loan-to-Deposit Ratio (%)
5. Return on Assets (ROA) (%)
6. Loan Book / Gross Advances (₹ Crore)
7. Net Income (₹ Crore)

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL
- **Data Scraping**: Puppeteer / Cheerio
- **API**: RESTful API

## Project Structure

```
indian-banks-finance-metrics/
├── frontend/                 # React application
├── backend/                  # Node.js/Express server
├── database/                 # Database schema & seeds
├── docs/                     # Documentation
├── .env.example
└── docker-compose.yml
```

## Quick Start

### Prerequisites
- Node.js 16+
- PostgreSQL 12+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/godambemandar2024/indian-banks-finance-metrics.git
   cd indian-banks-finance-metrics
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp ../.env.example .env
   npm run dev
   ```

3. **Setup Frontend (new terminal)**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the app**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Usage

1. Open the app in your browser
2. Select a bank from the dropdown
3. Click the "Update" button to fetch latest metrics
4. View metrics in tabular format (last 3 quarters + 3 financial years)

## Data Sources

- Reserve Bank of India (RBI)
- National Stock Exchange (NSE) / Bombay Stock Exchange (BSE)
- Bank Investor Relations websites
- Financial News Service Providers

## Next Steps

1. Configure database connection in `.env`
2. Run database schema migration
3. Implement web scraping logic for data sources
4. Test with real financial data

## License

MIT License
