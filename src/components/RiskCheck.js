import React, { useState } from 'react';
import { COLORS, FONTS } from '../constants';

function RiskCheck() {
  const [formData, setFormData] = useState({
    product: '', tradeValue: '', hsCode: '', origin: 'United Kingdom', experience: 'intermediate'
  });
  const [result, setResult] = useState(null);

  const handleAnalyze = (e) => {
    e.preventDefault();
    setResult({
      regulatory: [
        { risk: 'BIS Certification Required', severity: 'high', action: 'Obtain mandatory quality certification before shipment' },
        { risk: 'Import License Needed', severity: 'medium', action: 'Apply through DGFT portal - 15 day processing time' },
      ],
      logistics: [
        { risk: 'Port Congestion - Mumbai', severity: 'medium', action: 'Consider Chennai or Kolkata as alternative entry points' },
        { risk: 'Customs Documentation', severity: 'low', action: 'Ensure Bill of Entry accuracy to avoid delays' },
      ],
      compliance: [
        { risk: 'GST Registration', severity: 'high', action: 'Indian entity must have valid GSTIN for customs clearance' },
        { risk: 'Transfer Pricing Rules', severity: 'medium', action: 'Document arm\'s length pricing for related party transactions' },
      ],
      actions: [
        'Engage customs broker with UK-India corridor experience',
        'Budget 8-12% additional cost for compliance and certification',
        'Plan 45-60 day lead time for first shipment',
        'Consider AEO (Authorized Economic Operator) status for faster clearance'
      ]
    });
  };

  const getRiskBadge = (severity) => {
    const colors = {
      high: { bg: '#ff950015', text: '#ffb347', border: '#ff9500' },
      medium: { bg: '#ffc70015', text: '#ffd84d', border: '#ffc700' },
      low: { bg: '#00d08415', text: '#4ddbaa', border: '#00d084' },
    };
    const c = colors[severity];
    return (
      <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 4, fontSize: 10, fontWeight: 700, fontFamily: FONTS.mono, textTransform: 'uppercase', color: c.text, background: c.bg, border: `1px solid ${c.border}40` }}>
        {severity}
      </span>
    );
  };

  return (
    <div style={{ padding: '32px 40px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#f0ede6', marginBottom: 8 }}>Risk Check</h1>
        <p style={{ fontSize: 15, color: '#8a887f' }}>Analyze corridor-specific risks for your trade route</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1.5fr' : '1fr', gap: 32 }}>
        <div style={{ background: '#0a0b0e', border: '1px solid #1a1c20', borderRadius: 8, padding: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f0ede6', marginBottom: 24 }}>Trade Details</h3>
          
          <form onSubmit={handleAnalyze} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#b0ae9f', marginBottom: 8, fontWeight: 600 }}>Product Description</label>
              <input 
                required 
                value={formData.product} 
                onChange={(e) => setFormData({...formData, product: e.target.value})}
                placeholder="e.g., Medical diagnostic equipment"
                style={{ width: '100%', padding: '12px 16px', background: '#07080a', border: '1px solid #2a2c34', borderRadius: 6, color: '#e8e6e1', fontSize: 14, outline: 'none' }}
                onFocus={(e) => e.target.style.borderColor = COLORS.primary}
                onBlur={(e) => e.target.style.borderColor = '#2a2c34'}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#b0ae9f', marginBottom: 8, fontWeight: 600 }}>Annual Trade Value (GBP)</label>
              <input 
                required 
                type="number" 
                value={formData.tradeValue} 
                onChange={(e) => setFormData({...formData, tradeValue: e.target.value})}
                placeholder="e.g., 500000"
                style={{ width: '100%', padding: '12px 16px', background: '#07080a', border: '1px solid #2a2c34', borderRadius: 6, color: '#e8e6e1', fontSize: 14, outline: 'none' }}
                onFocus={(e) => e.target.style.borderColor = COLORS.primary}
                onBlur={(e) => e.target.style.borderColor = '#2a2c34'}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#b0ae9f', marginBottom: 8, fontWeight: 600 }}>HS Code (Optional)</label>
              <input 
                value={formData.hsCode} 
                onChange={(e) => setFormData({...formData, hsCode: e.target.value})}
                placeholder="e.g., 9018"
                style={{ width: '100%', padding: '12px 16px', background: '#07080a', border: '1px solid #2a2c34', borderRadius: 6, color: '#e8e6e1', fontSize: 14, fontFamily: FONTS.mono, outline: 'none' }}
                onFocus={(e) => e.target.style.borderColor = COLORS.primary}
                onBlur={(e) => e.target.style.borderColor = '#2a2c34'}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#b0ae9f', marginBottom: 8, fontWeight: 600 }}>Origin Country</label>
              <select 
                value={formData.origin} 
                onChange={(e) => setFormData({...formData, origin: e.target.value})}
                style={{ width: '100%', padding: '12px 16px', background: '#07080a', border: '1px solid #2a2c34', borderRadius: 6, color: '#e8e6e1', fontSize: 14, cursor: 'pointer', outline: 'none' }}
                onFocus={(e) => e.target.style.borderColor = COLORS.primary}
                onBlur={(e) => e.target.style.borderColor = '#2a2c34'}
              >
                <option value="United Kingdom">United Kingdom</option>
                <option value="India">India</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#b0ae9f', marginBottom: 8, fontWeight: 600 }}>Experience Level</label>
              <select 
                value={formData.experience} 
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                style={{ width: '100%', padding: '12px 16px', background: '#07080a', border: '1px solid #2a2c34', borderRadius: 6, color: '#e8e6e1', fontSize: 14, cursor: 'pointer', outline: 'none' }}
                onFocus={(e) => e.target.style.borderColor = COLORS.primary}
                onBlur={(e) => e.target.style.borderColor = '#2a2c34'}
              >
                <option value="beginner">First time trading with India</option>
                <option value="intermediate">Some experience (1-3 years)</option>
                <option value="advanced">Experienced (3+ years)</option>
              </select>
            </div>

            <button 
              type="submit"
              style={{ marginTop: 12, padding: '14px 0', background: 'linear-gradient(135deg, #c8a932 0%, #d4b744 100%)', color: '#07080a', border: 'none', borderRadius: 6, fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Analyze Risk
            </button>
          </form>
        </div>

        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ background: '#0a0b0e', border: '1px solid #1a1c20', borderRadius: 8, padding: 28 }}>
              <h3 style={{ fontWeight: 700, color: '#ff6b6b', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: 12, fontFamily: FONTS.mono }}>Regulatory Risks</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {result.regulatory.map((r, i) => (
                  <div key={i} style={{ padding: '14px 18px', background: '#07080a', borderRadius: 6, borderLeft: '3px solid #ff9500' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#f0ede6' }}>{r.risk}</span>
                      {getRiskBadge(r.severity)}
                    </div>
                    <p style={{ fontSize: 13, color: '#8a887f', lineHeight: 1.6 }}>{r.action}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#0a0b0e', border: '1px solid #1a1c20', borderRadius: 8, padding: 28 }}>
              <h3 style={{ fontWeight: 700, color: '#ffb347', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: 12, fontFamily: FONTS.mono }}>Logistics Risks</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {result.logistics.map((r, i) => (
                  <div key={i} style={{ padding: '14px 18px', background: '#07080a', borderRadius: 6, borderLeft: '3px solid #ffc700' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#f0ede6' }}>{r.risk}</span>
                      {getRiskBadge(r.severity)}
                    </div>
                    <p style={{ fontSize: 13, color: '#8a887f', lineHeight: 1.6 }}>{r.action}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#0a0b0e', border: '1px solid #1a1c20', borderRadius: 8, padding: 28 }}>
              <h3 style={{ fontWeight: 700, color: '#4ddbaa', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: 12, fontFamily: FONTS.mono }}>Compliance Watchpoints</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {result.compliance.map((r, i) => (
                  <div key={i} style={{ padding: '14px 18px', background: '#07080a', borderRadius: 6, borderLeft: '3px solid #00d084' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#f0ede6' }}>{r.risk}</span>
                      {getRiskBadge(r.severity)}
                    </div>
                    <p style={{ fontSize: 13, color: '#8a887f', lineHeight: 1.6 }}>{r.action}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #c8a93208 0%, #c8a93205 100%)', border: '1px solid #c8a93230', borderRadius: 8, padding: 28 }}>
              <h3 style={{ fontSize: 12, fontFamily: FONTS.mono, color: COLORS.primary, marginBottom: 16, fontWeight: 700, letterSpacing: '0.08em' }}>SUGGESTED ACTIONS</h3>
              <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {result.actions.map((action, i) => (
                  <li key={i} style={{ fontSize: 14, color: '#b0ae9f', lineHeight: 1.7 }}>{action}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RiskCheck;
