import React from 'react';
import { COLORS, FONTS } from '../constants';

function Analytics() {
  const disruptionData = [
    { month: 'Aug', count: 12 },
    { month: 'Sep', count: 15 },
    { month: 'Oct', count: 18 },
    { month: 'Nov', count: 14 },
    { month: 'Dec', count: 22 },
    { month: 'Jan', count: 19 },
    { month: 'Feb', count: 16 },
  ];

  const riskDistribution = [
    { category: 'Regulatory', count: 34, color: '#ff6b6b' },
    { category: 'Logistics', count: 28, color: '#ffb347' },
    { category: 'Tariff', count: 18, color: '#ffd84d' },
    { category: 'Standards', count: 12, color: '#4ddbaa' },
  ];

  const sourceCoverage = [
    { source: 'CBIC', alerts: 45 },
    { source: 'DGFT', alerts: 38 },
    { source: 'BIS', alerts: 22 },
    { source: 'RBI', alerts: 18 },
    { source: 'MEA', alerts: 15 },
    { source: 'UK DBT', alerts: 12 },
  ];

  const maxDisruption = Math.max(...disruptionData.map(d => d.count));
  const totalRisk = riskDistribution.reduce((sum, r) => sum + r.count, 0);

  return (
    <div style={{ padding: '32px 40px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#f0ede6', marginBottom: 8 }}>Analytics</h1>
        <p style={{ fontSize: 15, color: '#8a887f' }}>Trade intelligence metrics and trends</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 24 }}>
        <div style={{ background: '#0a0b0e', border: '1px solid #1a1c20', borderRadius: 8, padding: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f0ede6', marginBottom: 24 }}>Trade Disruptions Over Time</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 240 }}>
            {disruptionData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: 200 }}>
                  <div 
                    style={{ 
                      width: '100%', 
                      background: 'linear-gradient(180deg, #c8a932 0%, #d4b744 100%)', 
                      borderRadius: '4px 4px 0 0',
                      height: `${(d.count / maxDisruption) * 100}%`,
                      transition: 'all 0.3s',
                      position: 'relative',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    <span style={{ position: 'absolute', top: -24, left: '50%', transform: 'translateX(-50%)', fontSize: 13, fontWeight: 700, color: '#f0ede6', fontFamily: FONTS.mono }}>{d.count}</span>
                  </div>
                </div>
                <span style={{ fontSize: 12, color: '#666', fontFamily: FONTS.mono, fontWeight: 600 }}>{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0a0b0e', border: '1px solid #1a1c20', borderRadius: 8, padding: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f0ede6', marginBottom: 24 }}>Risk Distribution</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {riskDistribution.map((r, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, color: '#b0ae9f', fontWeight: 600 }}>{r.category}</span>
                  <span style={{ fontSize: 14, color: '#f0ede6', fontFamily: FONTS.mono, fontWeight: 700 }}>{r.count}</span>
                </div>
                <div style={{ width: '100%', height: 8, background: '#07080a', borderRadius: 4, overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      width: `${(r.count / totalRisk) * 100}%`, 
                      height: '100%', 
                      background: r.color,
                      transition: 'width 0.5s ease'
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: '#0a0b0e', border: '1px solid #1a1c20', borderRadius: 8, padding: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f0ede6', marginBottom: 24 }}>Source Monitoring Coverage</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {sourceCoverage.map((s, i) => (
            <div 
              key={i} 
              style={{ 
                background: '#07080a', 
                border: '1px solid #1a1c20', 
                borderRadius: 6, 
                padding: '20px 24px',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#c8a93240';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1a1c20';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: 15, color: '#b0ae9f', marginBottom: 12, fontWeight: 600 }}>{s.source}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 32, fontWeight: 800, color: '#f0ede6', fontFamily: FONTS.mono }}>{s.alerts}</span>
                <span style={{ fontSize: 13, color: '#666' }}>alerts</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginTop: 24 }}>
        {[
          { label: 'Total Alerts', value: '150', change: '+12%' },
          { label: 'Avg Response Time', value: '4.2h', change: '-18%' },
          { label: 'Critical Alerts', value: '23', change: '+5%' },
          { label: 'Sources Monitored', value: '25', change: '+2' },
        ].map((stat, i) => (
          <div key={i} style={{ background: '#0a0b0e', border: '1px solid #1a1c20', borderRadius: 8, padding: 24 }}>
            <div style={{ fontSize: 12, color: '#666', marginBottom: 8, fontFamily: FONTS.mono, fontWeight: 600 }}>{stat.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: '#f0ede6', fontFamily: FONTS.mono }}>{stat.value}</span>
              <span style={{ fontSize: 12, color: stat.change.startsWith('+') && !stat.label.includes('Critical') ? COLORS.positive : stat.change.startsWith('-') ? COLORS.positive : COLORS.negative, fontFamily: FONTS.mono, fontWeight: 700 }}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Analytics;
