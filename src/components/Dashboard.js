import React, { useState } from 'react';
import SeverityBadge from './SeverityBadge';
import Sparkline from './Sparkline';
import { SAMPLE_ALERTS, INDEX_DATA, SECTORS, COLORS, FONTS } from '../constants';
import { getRiskColor, getChangeColor, getChangeIcon } from '../utils';

function Dashboard({ onBackToLanding }) {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [hoveredSector, setHoveredSector] = useState(null);

  const filtered = SAMPLE_ALERTS.filter((a) => {
    if (filterSeverity !== "all" && a.severity !== filterSeverity) return false;
    if (filterCategory !== "all" && a.category !== filterCategory) return false;
    return true;
  });

  const categories = [...new Set(SAMPLE_ALERTS.map((a) => a.category))];

  return (
    <div style={{ background: "#07080a", minHeight: "100vh", color: "#e8e6e1" }}>
      <nav style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px 48px", background: "#07080a", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1400, width: "100%", background: "linear-gradient(135deg, #c8a932 0%, #d4b744 100%)", padding: "12px 40px", borderRadius: "50px", boxShadow: "0 4px 20px rgba(200,169,50,0.15)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button onClick={onBackToLanding} style={{ background: "#07080a", border: "none", color: "#c8a932", cursor: "pointer", fontSize: 13, padding: "8px 16px", borderRadius: "20px", transition: "all 0.2s", fontWeight: 600 }} onMouseEnter={(e) => { e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)"; }} onMouseLeave={(e) => { e.target.style.boxShadow = "none"; }}>← Back</button>
            <div style={{ width: 1, height: 20, background: "#07080a", opacity: 0.3 }} />
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img src="logo.jpeg" alt="Advuman Logo" style={{ width: 28, height: 28, borderRadius: "6px", objectFit: "cover" }} />
              <span style={{ fontWeight: 600, fontSize: 16, color: "#07080a" }}>ADVUMAN</span>
              <span style={{ fontSize: 11, color: "#07080a", fontFamily: "'JetBrains Mono', monospace", marginLeft: 6, fontWeight: 500, opacity: 0.7 }}>DASHBOARD</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", background: "#07080a", borderRadius: "20px", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#00d084", fontWeight: 600 }}>
              <div style={{ width: 7, height: 7, background: "#00d084", borderRadius: "50%", boxShadow: "0 0 8px #00d084" }} />LIVE
            </div>
            <span style={{ fontSize: 12, color: "#07080a", fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, opacity: 0.7 }}>UK ↔ INDIA</span>
          </div>
        </div>
      </nav>

      <div style={{ display: "flex", minHeight: "calc(100vh - 56px)" }}>
        <aside style={{ width: 280, borderRight: "1px solid #1a1c20", padding: "24px 18px", flexShrink: 0, overflowY: "auto", background: "linear-gradient(180deg, #07080a 0%, #0a0b0e 100%)" }}>
          <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#555", letterSpacing: "0.12em", marginBottom: 20, fontWeight: 700, textTransform: "uppercase" }}>CORRIDOR INDEXES</div>
          {Object.values(INDEX_DATA).map((idx) => (
            <div key={idx.abbrev} style={{ background: "linear-gradient(135deg, #0e1014 0%, #0f101a 100%)", border: "1px solid #1a1c20", borderRadius: 5, padding: "14px 16px", marginBottom: 10, transition: "all 0.2s", cursor: "pointer" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#c8a93240"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(200,169,50,0.1)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1a1c20"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontFamily: FONTS.mono, color: "#888", fontWeight: 700 }}>{idx.abbrev}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 22, fontWeight: 800, fontFamily: FONTS.mono, color: "#f0ede6" }}>{idx.value}</span>
                  <span style={{ fontSize: 11, fontFamily: FONTS.mono, color: getChangeColor(idx.change), fontWeight: 700 }}>{getChangeIcon(idx.change)}{Math.abs(idx.change).toFixed(1)}</span>
                </div>
              </div>
              <Sparkline data={idx.history} color={getChangeColor(idx.change)} width={240} height={32} />
            </div>
          ))}

          <div style={{ fontSize: 12, fontFamily: FONTS.mono, color: "#777", letterSpacing: "0.12em", margin: "32px 0 20px", fontWeight: 700, textTransform: "uppercase" }}>SECTORS MONITORED</div>
          {SECTORS.map((s) => {
            const riskColor = getRiskColor(s.risk);
            return (
            <div key={s.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", borderRadius: 5, marginBottom: 6, fontSize: 14, color: "#a8a69d", cursor: "pointer", background: hoveredSector === s.name ? "#c8a93210" : "transparent" }} onMouseEnter={() => setHoveredSector(s.name)} onMouseLeave={() => setHoveredSector(null)}>
              <span style={{ fontWeight: hoveredSector === s.name ? 600 : 500 }}>{s.name}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontFamily: FONTS.mono, fontSize: 13, color: "#777", fontWeight: 700 }}>{s.alerts}</span>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: riskColor, boxShadow: `0 0 10px ${riskColor}40` }} />
              </div>
            </div>
          );})}
        </aside>

        <main style={{ flex: 1, padding: "32px 40px", overflowY: "auto", background: "#08090b" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <div style={{ display: "flex", gap: 12 }}>
              <select value={filterSeverity} onChange={(e) => setFilterSeverity(e.target.value)} style={{ background: "#0e1014", border: "1px solid #2a2c34", color: "#8a887f", padding: "8px 14px", borderRadius: 4, fontSize: 13, fontFamily: FONTS.mono, cursor: "pointer" }} onFocus={(e) => e.target.style.borderColor = COLORS.primary} onBlur={(e) => e.target.style.borderColor = "#2a2c34"}>
                <option value="all">All Severity</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} style={{ background: "#0e1014", border: "1px solid #2a2c34", color: "#8a887f", padding: "8px 14px", borderRadius: 4, fontSize: 13, fontFamily: FONTS.mono, cursor: "pointer" }} onFocus={(e) => e.target.style.borderColor = COLORS.primary} onBlur={(e) => e.target.style.borderColor = "#2a2c34"}>
                <option value="all">All Categories</option>
                {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
            </div>
            <span style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace", color: "#777", fontWeight: 700 }}>{filtered.length} ALERTS · LAST UPDATED 2026-02-14 10:23 UTC</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.map((alert) => (
              <div key={alert.id} onClick={() => setSelectedAlert(selectedAlert?.id === alert.id ? null : alert)} style={{ background: selectedAlert?.id === alert.id ? "#12131a" : "#0a0b0e", border: `1px solid ${selectedAlert?.id === alert.id ? "#c8a93240" : "#1a1c20"}`, borderRadius: 8, padding: "24px 28px", cursor: "pointer", transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)" }} onMouseEnter={(e) => { if (selectedAlert?.id !== alert.id) { e.currentTarget.style.borderColor = "#c8a93220"; e.currentTarget.style.backgroundColor = "#0f101a"; } }} onMouseLeave={(e) => { if (selectedAlert?.id !== alert.id) { e.currentTarget.style.borderColor = "#1a1c20"; e.currentTarget.style.backgroundColor = "#0a0b0e"; } }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <SeverityBadge severity={alert.severity} />
                    <span style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: "#666", background: "#ffffff08", padding: "4px 12px", borderRadius: 3, fontWeight: 700, textTransform: "uppercase" }}>{alert.category}</span>
                  </div>
                  <span style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace", color: "#666", fontWeight: 700 }}>{alert.date}</span>
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 700, color: "#f5f3ee", marginBottom: 12, lineHeight: 1.4 }}>{alert.title}</h3>
                <p style={{ fontSize: 16, color: "#b0ae9f", lineHeight: 1.7, fontWeight: 500 }}>{alert.summary}</p>

                {selectedAlert?.id === alert.id && (
                  <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid #1a1c20", animation: "fadeIn 0.2s ease" }}>
                    <div style={{ display: "flex", gap: 32, marginBottom: 16 }}>
                      <div>
                        <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#555", display: "block", marginBottom: 6, fontWeight: 700, textTransform: "uppercase" }}>SOURCE</span>
                        <span style={{ fontSize: 13, color: "#b0ae9f", fontWeight: 500 }}>{alert.source}</span>
                      </div>
                      <div>
                        <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#555", display: "block", marginBottom: 6, fontWeight: 700, textTransform: "uppercase" }}>CORRIDOR</span>
                        <span style={{ fontSize: 13, color: "#b0ae9f", fontWeight: 500 }}>{alert.corridor}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                      {alert.tags.map((tag) => (
                        <span key={tag} style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#c8a932", background: "#c8a93215", padding: "4px 10px", borderRadius: 3, fontWeight: 600, border: "1px solid #c8a93230" }}>{tag}</span>
                      ))}
                    </div>
                    <div style={{ marginTop: 16, padding: "16px 20px", background: "linear-gradient(135deg, #c8a93208 0%, #c8a93205 100%)", border: "1px solid #c8a93230", borderRadius: 6 }}>
                      <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#c8a932", marginBottom: 8, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>ADVUMAN ASSESSMENT</div>
                      <p style={{ fontSize: 14, color: "#b0ae9f", lineHeight: 1.8 }}>
                        {alert.severity === "critical" ? "Immediate action required. Review your current operations against the new guidelines and consult with your India-side legal counsel within the next 5 business days." : alert.severity === "high" ? "High impact expected within 30-60 days. Begin contingency planning and assess exposure in your current shipment pipeline." : "Monitor closely. This development may compound with other regulatory changes. No immediate action needed but factor into quarterly planning."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
