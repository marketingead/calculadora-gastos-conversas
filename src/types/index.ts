export type CampaignType = 'marketing' | 'utility';

export interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  baseSize: number;
}

export interface UsageData {
  sentMessages: number;
  receivedMessages: number;
  marketingTemplates: number;
  utilityTemplates: number;
}

export interface PricingConfig {
  message: number;
  utility: number;
  marketing: number;
}

export interface IndicatorRow {
  id: keyof UsageData;
  label: string;
  currentQuantity: number;
  tariff: number;
  currentCost: number;
  projectedQuantity: number;
  projectedCost: number;
  tariffDescription: string;
}

export interface FinancialSummary {
  currentUsageCost: number;
  projectedUsageCost: number;
  campaignsTotalCost: number;
  totalNeedCost: number;
  currentBalance: number;
  requiredRechargeCost: number;
  isBalanceSufficient: boolean;
  surplusAmount: number;
}
