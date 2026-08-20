import React from 'react';
import { FinancialSummary } from '../types';
import { formatCurrency, formatRate } from '../utils/formatters';
import { Clock, TrendingUp, Megaphone, Zap, CheckCircle2 } from 'lucide-react';

interface KeyMetricsProps {
  summary: FinancialSummary;
  ratePercent: number;
  campaignsCount: number;
}

export const KeyMetrics: React.FC<KeyMetricsProps> = ({
  summary,
  ratePercent,
  campaignsCount,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Uso Últimos 15 dias */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Uso Últimos 15 Dias
          </span>
          <div className="p-1.5 rounded-md bg-slate-100 text-slate-500">
            <Clock className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold text-slate-900 tracking-tight tabular-nums font-mono">
            {formatCurrency(summary.currentUsageCost)}
          </div>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            Histórico apurado
          </p>
        </div>
      </div>

      {/* 2. Previsão Próximos 15 dias */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Previsão Próximos 15 Dias
          </span>
          <div className="p-1.5 rounded-md bg-blue-50 text-blue-600">
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tracking-tight tabular-nums font-mono">
              {formatCurrency(summary.projectedUsageCost)}
            </span>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                ratePercent > 0
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : ratePercent < 0
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {formatRate(ratePercent)}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            Projeção por taxa
          </p>
        </div>
      </div>

      {/* 3. Campanhas Previstas */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Campanhas Previstas
          </span>
          <div className="p-1.5 rounded-md bg-orange-50 text-orange-600">
            <Megaphone className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tracking-tight tabular-nums font-mono">
              {formatCurrency(summary.campaignsTotalCost)}
            </span>
            <span className="text-[11px] font-semibold text-orange-700 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
              {campaignsCount} {campaignsCount === 1 ? 'ação' : 'ações'}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            Disparos programados
          </p>
        </div>
      </div>

      {/* 4. Recarga Necessária - Design Theme Highlight */}
      <div
        className={`rounded-xl p-5 flex flex-col justify-between transition-all ${
          summary.isBalanceSufficient
            ? 'bg-emerald-50 border border-emerald-200 text-emerald-950 shadow-xs'
            : 'bg-slate-900 text-white border border-slate-800 shadow-xl shadow-slate-200/80'
        }`}
      >
        <div className="flex items-center justify-between">
          <span
            className={`text-[10px] font-bold uppercase tracking-[0.15em] ${
              summary.isBalanceSufficient ? 'text-emerald-800' : 'text-slate-400'
            }`}
          >
            Recarga Total Necessária
          </span>
          <div
            className={`p-1.5 rounded-md ${
              summary.isBalanceSufficient
                ? 'bg-emerald-200/60 text-emerald-800'
                : 'bg-white/10 text-white'
            }`}
          >
            {summary.isBalanceSufficient ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
              <Zap className="w-3.5 h-3.5 text-amber-300" />
            )}
          </div>
        </div>
        <div className="mt-3">
          <div
            className={`text-2xl sm:text-3xl font-black tracking-tight tabular-nums font-mono ${
              summary.isBalanceSufficient ? 'text-emerald-950' : 'text-white'
            }`}
          >
            {formatCurrency(summary.requiredRechargeCost)}
          </div>
          <div className="mt-1">
            {summary.isBalanceSufficient ? (
              <span className="text-xs font-semibold text-emerald-700">
                Saldo suficiente em conta
              </span>
            ) : (
              <span className="text-xs text-slate-400 font-medium">
                Necessidade: {formatCurrency(summary.totalNeedCost)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

