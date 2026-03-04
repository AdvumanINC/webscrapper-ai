import { COLORS } from './constants';

export const getRiskColor = (risk) => COLORS[risk] || COLORS.low;
export const getChangeColor = (change) => change > 0 ? COLORS.negative : COLORS.positive;
export const getChangeIcon = (change) => change > 0 ? "▲" : "▼";
