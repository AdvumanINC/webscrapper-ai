export const COLORS = {
  primary: "#c8a932",
  primaryLight: "#d4b744",
  bg: "#07080a",
  positive: "#4ddbaa",
  negative: "#ff6b6b",
  critical: "#ff3b30",
  high: "#ff9500",
  medium: "#ffc700",
  low: "#00d084"
};

export const GRADIENTS = {
  primary: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
  card: "linear-gradient(135deg, #0e1014 0%, #0f101a 100%)",
  assessment: "linear-gradient(135deg, #c8a93208 0%, #c8a93205 100%)"
};

export const FONTS = {
  mono: "'JetBrains Mono', monospace"
};

export const SAMPLE_ALERTS = [
  {
    id: 1, severity: "critical",
    title: "India DPIIT Issues New FDI Policy Circular",
    summary: "Department for Promotion of Industry and Internal Trade released revised FDI guidelines affecting e-commerce, defence, and insurance sectors. UK firms with Indian JVs should review compliance within 90-day window.",
    source: "DPIIT Gazette Notification", date: "2026-02-11",
    category: "Regulatory", corridor: "UK-India",
    tags: ["FDI", "compliance", "e-commerce"],
  },
  {
    id: 2, severity: "high",
    title: "CBIC Revises Anti-Dumping Duties on UK Steel Imports",
    summary: "Central Board of Indirect Taxes and Customs has initiated a sunset review of anti-dumping duties on certain steel products imported from the UK. Provisional duty rate increased from 12.4% to 18.7%.",
    source: "CBIC Notification No. 04/2026", date: "2026-02-10",
    category: "Tariff", corridor: "UK-India",
    tags: ["anti-dumping", "steel", "tariffs"],
  },
  {
    id: 3, severity: "medium",
    title: "UK-India FTA Round 16 Concluded — Services Chapter Stalled",
    summary: "16th round of UK-India FTA negotiations concluded in New Delhi. Progress on goods market access but services chapter remains contentious. Mode 4 (movement of natural persons) is the key sticking point.",
    source: "UK DBT Press Release / MEA Statement", date: "2026-02-08",
    category: "Trade Agreement", corridor: "UK-India",
    tags: ["FTA", "services", "Mode 4"],
  },
  {
    id: 4, severity: "medium",
    title: "RBI Tightens External Commercial Borrowing Norms",
    summary: "Reserve Bank of India revised ECB framework. All-in-cost ceiling reduced by 50bps. UK lenders providing trade finance to Indian importers should review pricing structures.",
    source: "RBI/2026-27/14", date: "2026-02-07",
    category: "Financial", corridor: "UK-India",
    tags: ["ECB", "trade finance", "RBI"],
  },
  {
    id: 5, severity: "low",
    title: "BIS Updates Quality Control Orders for Electronics",
    summary: "Bureau of Indian Standards expanded mandatory certification list for electronic components. 47 new product categories added. UK electronics exporters have 180-day compliance window.",
    source: "BIS QCO Notification", date: "2026-02-05",
    category: "Standards", corridor: "UK-India",
    tags: ["BIS", "electronics", "certification"],
  },
  {
    id: 6, severity: "high",
    title: "India Raises Customs Duty on Medical Devices",
    summary: "Union Budget 2026-27 increased basic customs duty on imported medical devices from 7.5% to 15%. Affects UK medtech exporters including diagnostics, implants, and surgical instruments.",
    source: "Finance Bill 2026", date: "2026-02-04",
    category: "Tariff", corridor: "UK-India",
    tags: ["medical devices", "customs duty", "budget"],
  },
];

export const INDEX_DATA = {
  rpi: { name: "Regulatory Pressure Index", abbrev: "RPI", value: 7.2, change: +0.8, history: [5.1,5.4,5.8,6.0,6.1,6.4,6.2,6.5,6.8,7.0,6.9,7.2], description: "Measures regulatory burden and policy volatility affecting cross-border trade" },
  lsi: { name: "Logistics Strain Index", abbrev: "LSI", value: 5.8, change: -0.3, history: [6.8,6.5,6.2,6.0,5.9,6.1,6.3,6.1,5.9,5.7,5.9,5.8], description: "Tracks shipping costs, port congestion, and supply chain disruption risk" },
  cpi: { name: "Compliance Pressure Index", abbrev: "CPI", value: 6.5, change: +1.2, history: [4.2,4.5,4.8,5.0,5.2,5.1,5.5,5.8,6.0,6.1,6.3,6.5], description: "Quantifies standards, certification, and documentation requirements" },
};

export const SECTORS = [
  { name: "Pharmaceuticals", alerts: 12, risk: "high" },
  { name: "IT Services", alerts: 8, risk: "medium" },
  { name: "Textiles & Apparel", alerts: 6, risk: "medium" },
  { name: "Auto Components", alerts: 9, risk: "high" },
  { name: "Food & Agri", alerts: 4, risk: "low" },
  { name: "Medical Devices", alerts: 11, risk: "critical" },
  { name: "Electronics", alerts: 7, risk: "medium" },
  { name: "Steel & Metals", alerts: 10, risk: "high" },
];
