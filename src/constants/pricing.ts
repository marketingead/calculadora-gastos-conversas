import { PricingConfig, UsageData, Campaign } from '../types';

export const PRICING: PricingConfig = {
  message: 0.001,
  utility: 0.0068,
  marketing: 0.0625,
};

export const DEFAULT_USAGE: UsageData = {
  sentMessages: 45250,
  receivedMessages: 31288,
  marketingTemplates: 7195,
  utilityTemplates: 1688,
};

export const DEFAULT_RATE: number = 0;

export const DEFAULT_BALANCE: number = 35.0;

export const DEFAULT_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    name: 'Campanha Bolsa Novos Cursos',
    type: 'marketing',
    baseSize: 300,
  },
  {
    id: 'camp-2',
    name: 'Veteranos com boletos vencidos',
    type: 'marketing',
    baseSize: 330,
  },
  {
    id: 'camp-3',
    name: 'Estratégia Cursos por Área',
    type: 'marketing',
    baseSize: 1240,
  },
  {
    id: 'camp-4',
    name: 'Disparos Fim de Semana',
    type: 'marketing',
    baseSize: 400,
  },
];

export const TARIFF_DETAILS = [
  {
    title: 'Mensagens Comuns',
    type: 'Enviadas / Recebidas',
    tariff: PRICING.message,
    description: 'Tarifa aplicada tanto para mensagens enviadas quanto recebidas dentro da janela de conversa.',
  },
  {
    title: 'Template de Utilidade',
    type: 'Disparos de Notificação',
    tariff: PRICING.utility,
    description: 'Mensagens ativas de confirmação, alerta, cobrança ou avisos de serviço solicitados pelo cliente.',
  },
  {
    title: 'Template de Marketing',
    type: 'Campanhas & Promoções',
    tariff: PRICING.marketing,
    description: 'Mensagens com conteúdo promocional, ofertas de cursos, captação de alunos e prospecção.',
  },
];
