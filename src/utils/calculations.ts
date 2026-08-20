import { PRICING } from '../constants/pricing';
import { Campaign, FinancialSummary, IndicatorRow, UsageData } from '../types';
import { formatCurrency, formatQuantity } from './formatters';

/**
 * Calculates row breakdown for the 4 primary usage indicators
 */
export function getIndicatorRows(usage: UsageData, ratePercent: number): IndicatorRow[] {
  const multiplier = 1 + ratePercent / 100;

  const rows: IndicatorRow[] = [
    {
      id: 'sentMessages',
      label: 'Mensagens Enviadas',
      currentQuantity: usage.sentMessages,
      tariff: PRICING.message,
      currentCost: usage.sentMessages * PRICING.message,
      projectedQuantity: usage.sentMessages * multiplier,
      projectedCost: usage.sentMessages * multiplier * PRICING.message,
      tariffDescription: 'US$ 0,001 por mensagem enviada',
    },
    {
      id: 'receivedMessages',
      label: 'Mensagens Recebidas',
      currentQuantity: usage.receivedMessages,
      tariff: PRICING.message,
      currentCost: usage.receivedMessages * PRICING.message,
      projectedQuantity: usage.receivedMessages * multiplier,
      projectedCost: usage.receivedMessages * multiplier * PRICING.message,
      tariffDescription: 'US$ 0,001 por mensagem recebida',
    },
    {
      id: 'marketingTemplates',
      label: 'Template Marketing',
      currentQuantity: usage.marketingTemplates,
      tariff: PRICING.marketing,
      currentCost: usage.marketingTemplates * PRICING.marketing,
      projectedQuantity: usage.marketingTemplates * multiplier,
      projectedCost: usage.marketingTemplates * multiplier * PRICING.marketing,
      tariffDescription: 'US$ 0,0625 por template de marketing',
    },
    {
      id: 'utilityTemplates',
      label: 'Template Utilidade',
      currentQuantity: usage.utilityTemplates,
      tariff: PRICING.utility,
      currentCost: usage.utilityTemplates * PRICING.utility,
      projectedQuantity: usage.utilityTemplates * multiplier,
      projectedCost: usage.utilityTemplates * multiplier * PRICING.utility,
      tariffDescription: 'US$ 0,0068 por template de utilidade',
    },
  ];

  return rows;
}

/**
 * Calculates individual campaign cost based on its type tariff and audience base
 */
export function getCampaignCost(campaign: Pick<Campaign, 'type' | 'baseSize'>): number {
  const tariff = campaign.type === 'marketing' ? PRICING.marketing : PRICING.utility;
  return (campaign.baseSize || 0) * tariff;
}

/**
 * Computes consolidated financial figures
 */
export function calculateFinancialSummary(
  usage: UsageData,
  ratePercent: number,
  campaigns: Campaign[],
  currentBalance: number
): FinancialSummary {
  const rows = getIndicatorRows(usage, ratePercent);
  
  const currentUsageCost = rows.reduce((acc, row) => acc + row.currentCost, 0);
  const projectedUsageCost = rows.reduce((acc, row) => acc + row.projectedCost, 0);
  
  const campaignsTotalCost = campaigns.reduce(
    (acc, camp) => acc + getCampaignCost(camp),
    0
  );

  const totalNeedCost = projectedUsageCost + campaignsTotalCost;
  const safeBalance = Math.max(0, currentBalance || 0);
  const requiredRechargeCost = Math.max(0, totalNeedCost - safeBalance);
  const isBalanceSufficient = safeBalance >= totalNeedCost;
  const surplusAmount = isBalanceSufficient ? safeBalance - totalNeedCost : 0;

  return {
    currentUsageCost,
    projectedUsageCost,
    campaignsTotalCost,
    totalNeedCost,
    currentBalance: safeBalance,
    requiredRechargeCost,
    isBalanceSufficient,
    surplusAmount,
  };
}

/**
 * Generates the automatic official email request template
 */
export function generateEmailTemplate(
  summary: FinancialSummary,
  campaigns: Campaign[]
): string {
  const campaignsText =
    campaigns.length > 0
      ? campaigns
          .map(
            (c) =>
              `${c.name}\nBase de ${formatQuantity(c.baseSize)} contatos = ${formatCurrency(
                getCampaignCost(c)
              )}`
          )
          .join('\n\n')
      : 'Nenhuma campanha pontual prevista no período.';

  return `Bom dia,

Solicito nova recarga para o RD Conversas EAD, considerando a previsão de utilização para os próximos 15 dias.

Saldo Atual Remanescente
${formatCurrency(summary.currentBalance)}

Campanhas previstas:

${campaignsText}

Utilização prevista para os próximos 15 dias
${formatCurrency(summary.projectedUsageCost)}

Total previsto em campanhas
${formatCurrency(summary.campaignsTotalCost)}

Necessidade total prevista
${formatCurrency(summary.totalNeedCost)}

Saldo atual disponível
${formatCurrency(summary.currentBalance)}

RECARGA TOTAL NECESSÁRIA
${formatCurrency(summary.requiredRechargeCost)}`;
}
