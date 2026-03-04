-- User Profiles Table
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  trade_corridor TEXT NOT NULL,
  category TEXT NOT NULL,
  shipping_frequency TEXT NOT NULL,
  trial_start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  trial_end_date TIMESTAMP WITH TIME ZONE,
  subscription_status TEXT DEFAULT 'trial',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can view own profile" 
  ON user_profiles FOR SELECT 
  USING (auth.uid() = user_id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" 
  ON user_profiles FOR UPDATE 
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile" 
  ON user_profiles FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Alerts Table
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  severity TEXT NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  source TEXT,
  corridor TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for alerts (public read)
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view alerts" 
  ON alerts FOR SELECT 
  USING (true);

-- User Alert Preferences Table
CREATE TABLE user_alert_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email_alerts BOOLEAN DEFAULT true,
  in_app_alerts BOOLEAN DEFAULT true,
  whatsapp_alerts BOOLEAN DEFAULT false,
  critical_only BOOLEAN DEFAULT false,
  frequency TEXT DEFAULT 'realtime',
  categories JSONB DEFAULT '{"regulatory": true, "logistics": true, "tariff": true, "standards": false, "financial": true}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

ALTER TABLE user_alert_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own alert preferences" 
  ON user_alert_preferences FOR ALL 
  USING (auth.uid() = user_id);

-- Signals Table
CREATE TABLE signals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  confidence TEXT NOT NULL,
  impact TEXT NOT NULL,
  analyst_note TEXT,
  severity TEXT NOT NULL,
  hs_code TEXT,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE signals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view signals" 
  ON signals FOR SELECT 
  USING (true);

-- Risk Assessments Table
CREATE TABLE risk_assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product TEXT NOT NULL,
  trade_value NUMERIC,
  hs_code TEXT,
  origin TEXT NOT NULL,
  experience TEXT NOT NULL,
  assessment_result JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE risk_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own risk assessments" 
  ON risk_assessments FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create risk assessments" 
  ON risk_assessments FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at 
  BEFORE UPDATE ON user_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_alert_preferences_updated_at 
  BEFORE UPDATE ON user_alert_preferences 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
