import React, { useState } from 'react';
import { COLORS, FONTS } from '../constants';

function Alerts() {
  const [preferences, setPreferences] = useState({
    emailAlerts: true,
    inAppAlerts: true,
    whatsappAlerts: false,
    criticalOnly: false,
    categories: {
      regulatory: true,
      logistics: true,
      tariff: true,
      standards: false,
      financial: true
    },
    frequency: 'realtime'
  });

  const toggleCategory = (cat) => {
    setPreferences({
      ...preferences,
      categories: { ...preferences.categories, [cat]: !preferences.categories[cat] }
    });
  };

  return (
    <div style={{ padding: '32px 40px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#f0ede6', marginBottom: 8 }}>Alert Preferences</h1>
        <p style={{ fontSize: 15, color: '#8a887f' }}>Configure how and when you receive trade intelligence alerts</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ background: '#0a0b0e', border: '1px solid #1a1c20', borderRadius: 8, padding: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f0ede6', marginBottom: 24 }}>Notification Channels</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { key: 'emailAlerts', label: 'Email Alerts', desc: 'Receive alerts via email' },
              { key: 'inAppAlerts', label: 'In-App Notifications', desc: 'Show alerts in dashboard' },
              { key: 'whatsappAlerts', label: 'WhatsApp Alerts', desc: 'Critical alerts via WhatsApp' },
              { key: 'criticalOnly', label: 'Critical Only Mode', desc: 'Only receive critical severity alerts' }
            ].map(item => (
              <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#07080a', borderRadius: 6 }}>
                <div>
                  <div style={{ fontSize: 15, color: '#f0ede6', fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: '#666' }}>{item.desc}</div>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: 48, height: 26, cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={preferences[item.key]} 
                    onChange={() => setPreferences({...preferences, [item.key]: !preferences[item.key]})}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: preferences[item.key] ? COLORS.primary : '#2a2c34',
                    borderRadius: 26,
                    transition: 'all 0.3s'
                  }}>
                    <span style={{
                      position: 'absolute',
                      height: 18,
                      width: 18,
                      left: preferences[item.key] ? 26 : 4,
                      bottom: 4,
                      background: '#fff',
                      borderRadius: '50%',
                      transition: 'all 0.3s'
                    }} />
                  </span>
                </label>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32 }}>
            <h4 style={{ fontSize: 15, color: '#f0ede6', fontWeight: 600, marginBottom: 16 }}>Alert Frequency</h4>
            <select 
              value={preferences.frequency}
              onChange={(e) => setPreferences({...preferences, frequency: e.target.value})}
              style={{ width: '100%', padding: '12px 16px', background: '#07080a', border: '1px solid #2a2c34', borderRadius: 6, color: '#e8e6e1', fontSize: 14, cursor: 'pointer', outline: 'none' }}
              onFocus={(e) => e.target.style.borderColor = COLORS.primary}
              onBlur={(e) => e.target.style.borderColor = '#2a2c34'}
            >
              <option value="realtime">Real-time (as they happen)</option>
              <option value="hourly">Hourly Digest</option>
              <option value="daily">Daily Summary</option>
              <option value="weekly">Weekly Report</option>
            </select>
          </div>
        </div>

        <div style={{ background: '#0a0b0e', border: '1px solid #1a1c20', borderRadius: 8, padding: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f0ede6', marginBottom: 24 }}>Alert Categories</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { key: 'regulatory', label: 'Regulatory Changes', color: '#ff6b6b' },
              { key: 'logistics', label: 'Logistics & Shipping', color: '#ffb347' },
              { key: 'tariff', label: 'Tariff & Duties', color: '#ffd84d' },
              { key: 'standards', label: 'Standards & Certification', color: '#4ddbaa' },
              { key: 'financial', label: 'Financial & Currency', color: '#c8a932' }
            ].map(cat => (
              <div 
                key={cat.key}
                onClick={() => toggleCategory(cat.key)}
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '14px 18px', 
                  background: preferences.categories[cat.key] ? '#07080a' : '#0a0b0e',
                  border: `1px solid ${preferences.categories[cat.key] ? cat.color + '40' : '#1a1c20'}`,
                  borderRadius: 6,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = cat.color + '60'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = preferences.categories[cat.key] ? cat.color + '40' : '#1a1c20'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: cat.color, boxShadow: `0 0 10px ${cat.color}40` }} />
                  <span style={{ fontSize: 14, color: '#f0ede6', fontWeight: 600 }}>{cat.label}</span>
                </div>
                <span style={{ fontSize: 12, fontFamily: FONTS.mono, color: preferences.categories[cat.key] ? COLORS.positive : '#666', fontWeight: 700 }}>
                  {preferences.categories[cat.key] ? 'ON' : 'OFF'}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32, padding: '20px 24px', background: 'linear-gradient(135deg, #c8a93208 0%, #c8a93205 100%)', border: '1px solid #c8a93230', borderRadius: 6 }}>
            <div style={{ fontSize: 11, fontFamily: FONTS.mono, color: COLORS.primary, marginBottom: 10, fontWeight: 700, letterSpacing: '0.08em' }}>ACTIVE ALERTS</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#f0ede6', fontFamily: FONTS.mono, marginBottom: 8 }}>
              {Object.values(preferences.categories).filter(Boolean).length}
            </div>
            <div style={{ fontSize: 13, color: '#8a887f' }}>
              categories enabled
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        <button 
          style={{ padding: '12px 28px', background: '#0e1014', border: '1px solid #2a2c34', borderRadius: 6, color: '#8a887f', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
          onMouseEnter={(e) => e.target.style.borderColor = '#c8a93240'}
          onMouseLeave={(e) => e.target.style.borderColor = '#2a2c34'}
        >
          Reset to Default
        </button>
        <button 
          style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #c8a932 0%, #d4b744 100%)', color: '#07080a', border: 'none', borderRadius: 6, fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}

export default Alerts;
