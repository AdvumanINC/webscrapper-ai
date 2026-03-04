# Supabase Integration Setup

## 1. Install Dependencies

```bash
npm install @supabase/supabase-js
```

## 2. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the database to be provisioned

## 3. Set Up Database Schema

1. Go to SQL Editor in your Supabase dashboard
2. Copy and paste the contents of `supabase-schema.sql`
3. Run the SQL to create all tables and policies

## 4. Configure Environment Variables

1. Get your Supabase credentials:
   - In your Supabase dashboard, click the **Settings** icon (gear icon) in the left sidebar
   - Click on **API** in the settings menu
   - Under "Project API keys" section, you'll see:
     - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
     - **anon public** key (long string starting with `eyJ...`)
   - Copy both values

2. Update `.env` file in your project root:
   ```
   REACT_APP_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

**Alternative way to find credentials:**
- Click **Home** in left sidebar
- Click **Connect** button
- Select **App Frameworks** → **React**
- Copy the URL and anon key shown in the code example

## 5. Enable Email Authentication

1. In Supabase dashboard, click **Authentication** (🔐 icon) in the left sidebar
2. Click **Providers** tab at the top
3. Find **Email** in the list and click to expand it
4. Toggle **Enable Email provider** to ON
5. **Important Settings:**
   - **Confirm email**: Toggle OFF for testing (users can login immediately)
   - **Confirm email**: Toggle ON for production (users must verify email)
   - **Secure email change**: Keep enabled
6. Click **Save**

**Optional: Customize Email Templates**
1. Still in **Authentication** section, click **Email Templates** tab
2. You'll see templates for:
   - **Confirm signup** - Email sent when user signs up
   - **Magic Link** - Passwordless login email
   - **Change Email Address** - Email change confirmation
   - **Reset Password** - Password reset email
3. Click any template to customize:
   - Edit subject line
   - Customize email body (supports HTML)
   - Use variables like `{{ .ConfirmationURL }}` and `{{ .SiteURL }}`
4. Click **Save** after editing

**For Development/Testing:**
- Turn OFF "Confirm email" so you can test signup without email verification
- You can always enable it later for production

## 6. Database Tables Created

- **user_profiles**: Stores user company info, trial dates, subscription status
- **alerts**: Trade intelligence alerts
- **user_alert_preferences**: User notification preferences
- **signals**: Real-time trade signals
- **risk_assessments**: User risk check history

## 7. Features Integrated

✅ User signup with email/password
✅ User login
✅ Session persistence (auto-login on refresh)
✅ User profile storage
✅ 14-day trial tracking
✅ Secure logout
✅ Row Level Security (RLS) policies

## 8. Test the Integration

1. Start the app: `npm start`
2. Click "Start Free Trial"
3. Fill in the signup form
4. Check your email for verification (if enabled)
5. Login and access the dashboard

## 9. Optional: Seed Sample Data

Run this SQL in Supabase SQL Editor to add sample alerts:

```sql
INSERT INTO alerts (title, summary, severity, category, date, source, corridor, tags) VALUES
('India DPIIT Issues New FDI Policy Circular', 'Department for Promotion of Industry and Internal Trade released revised FDI guidelines affecting e-commerce, defence, and insurance sectors.', 'critical', 'Regulatory', '2026-02-11', 'DPIIT Gazette Notification', 'UK-India', ARRAY['FDI', 'compliance', 'e-commerce']),
('CBIC Revises Anti-Dumping Duties on UK Steel Imports', 'Central Board of Indirect Taxes and Customs has initiated a sunset review of anti-dumping duties on certain steel products.', 'high', 'Tariff', '2026-02-10', 'CBIC Notification No. 04/2026', 'UK-India', ARRAY['anti-dumping', 'steel', 'tariffs']);
```

## 10. Next Steps

- Set up email templates in Supabase
- Configure password reset flow
- Add real-time subscriptions for alerts
- Implement user profile editing
- Add payment integration for post-trial subscriptions
