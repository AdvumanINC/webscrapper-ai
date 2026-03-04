# ADVUMAN - UK-India Trade Intelligence

React application for UK-India trade intelligence platform with real-time alerts, analytics, and risk assessment.

## Features

- User authentication (Email/Password, GitHub OAuth, SSO)
- Real-time trade alerts and notifications
- Risk assessment and analytics dashboard
- UK-India trade corridor intelligence
- Proprietary indexes (RPI, LSI, CPI)
- Subscription-based pricing plans

## Tech Stack

- **Frontend**: React
- **Backend**: Supabase (PostgreSQL + Auth)
- **Styling**: Inline styles with custom design system

## Installation

```bash
npm install
```

## Environment Setup

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Add your Supabase credentials to `.env`:
```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Create a `user_profiles` table in Supabase:
```sql
CREATE TABLE user_profiles (
  user_id UUID REFERENCES auth.users PRIMARY KEY,
  full_name TEXT,
  company_name TEXT,
  email TEXT,
  trial_start_date TIMESTAMP,
  trial_end_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Running the Application

```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## Building for Production

```bash
npm run build
```

## Project Structure

```
advuman/
├── public/
│   ├── index.html
│   └── logo.jpeg
├── src/
│   ├── components/
│   │   ├── Alerts.js
│   │   ├── Analytics.js
│   │   ├── AuthPage.js
│   │   ├── Dashboard.js
│   │   ├── DashboardNew.js
│   │   ├── LandingPage.js
│   │   ├── LoginModal.js
│   │   ├── ParticleGrid.js
│   │   ├── RiskCheck.js
│   │   ├── SeverityBadge.js
│   │   ├── Signals.js
│   │   ├── SignupModal.js
│   │   └── Sparkline.js
│   ├── App.js
│   ├── constants.js
│   ├── index.css
│   ├── index.js
│   ├── supabaseClient.js
│   └── utils.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## License

Private - All rights reserved
