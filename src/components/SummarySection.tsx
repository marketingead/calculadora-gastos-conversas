import React from 'react';
import { FinancialSummary } from '../types';
import { formatCurrency, parseInputNumber } from '../utils/formatters';
import { Wallet, Plus, Minus, Equal, CheckCircle2, AlertTriangle } from 'lucide-react';

interface SummarySectionProps {
  summary: FinancialSummary;
  currentBalance: number;
  onBalanceChange: (value: number) => void;
}

export const SummarySection: React.FC<SummarySectionProps> = ({
  summary,
  currentBalance,
  onBalanceChange,
}) => {
  const handleBalanceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInputNumber(e.target.value);
    onBalanceChange(Math.max(0, parsed));
  };

  return (
    <section className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3 mb-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            4. Saldo Atual & Fechamento Financeiro
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Cálculo consolidado da necessidade líquida de recarga
          </p>
        </div>

        {/* Balance Input Box */}
        <div className="bg-blue-50/60 border border-blue-100 rounded-lg p-2.5 flex items-center gap-2.5">
          <div className="p-1.5 rounded-md bg-white border border-blue-200 text-blue-700 shadow-2xs">
            <Wallet className="w-3.5 h-3.5" />
          </div>
          <div>
            <label
              htmlFor="balance-input"
              className="block text-[10px] font-bold text-blue-800 uppercase tracking-wider"
            >
              Saldo Atual Disponível
            </label>
            <div className="relative mt-0.5">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-xs font-bold text-slate-400">
                US$
              </span>
              <input
                id="balance-input"
                type="number"
                step="0.01"
                min="0"
                value={currentBalance === 0 ? '' : currentBalance}
                placeholder="0.00"
                onChange={handleBalanceInput}
                className="w-28 pl-9 pr-2 py-0.5 bg-white rounded border border-blue-200 text-xs font-bold text-slate-900 font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 focus:outline-hidden tabular-nums"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Math Visual Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-stretch">
          {/* Item 1: Uso Estimado */}
          <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                1. Uso Estimado
              </span>
              <span className="text-[11px] text-slate-500">Próximos 15 dias</span>
            </div>
            <div className="mt-2 text-lg font-bold text-slate-900 font-mono tabular-nums">
              {formatCurrency(summary.projectedUsageCost)}
            </div>
          </div>

          {/* Item 2: Campanhas */}
          <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  2. Campanhas
                </span>
                <span className="text-[11px] text-slate-500">Disparos pontuais</span>
              </div>
              <Plus className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="mt-2 text-lg font-bold text-slate-900 font-mono tabular-nums">
              {formatCurrency(summary.campaignsTotalCost)}
            </div>
          </div>

          {/* Item 3: Necessidade Total */}
          <div className="bg-slate-100/70 rounded-lg p-3.5 border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                  = Necessidade
                </span>
                <span className="text-[11px] text-slate-500">Uso + Campanhas</span>
              </div>
              <Equal className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="mt-2 text-lg font-bold text-slate-900 font-mono tabular-nums">
              {formatCurrency(summary.totalNeedCost)}
            </div>
          </div>

          {/* Item 4: Saldo Atual */}
          <div className="bg-blue-50/40 rounded-lg p-3.5 border border-blue-100 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                  - Saldo Atual
                </span>
                <span className="text-[11px] text-slate-500">Saldo em conta</span>
              </div>
              <Minus className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="mt-2 text-lg font-bold text-slate-900 font-mono tabular-nums">
              {formatCurrency(summary.currentBalance)}
            </div>
          </div>

          {/* Item 5: Recarga Necessária */}
          <div
            className={`rounded-lg p-3.5 border flex flex-col justify-between ${
              summary.isBalanceSufficient
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-slate-900 text-white border-slate-800 shadow-md'
            }`}
          >
            <div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider block ${
                  summary.isBalanceSufficient ? 'text-emerald-800' : 'text-slate-400'
                }`}
              >
                = Recarga Total
              </span>
              <span
                className={`text-[11px] ${
                  summary.isBalanceSufficient ? 'text-emerald-600' : 'text-slate-400'
                }`}
              >
                Valor a solicitar
              </span>
            </div>
            <div
              className={`mt-2 text-xl font-black tabular-nums font-mono ${
                summary.isBalanceSufficient ? 'text-emerald-900' : 'text-white'
              }`}
            >
              {formatCurrency(summary.requiredRechargeCost)}
            </div>
          </div>
        </div>

        {/* Status Callout Banner */}
        {summary.isBalanceSufficient ? (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2.5 text-emerald-900 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold">Saldo suficiente: </span>
              <span>
                O saldo atual de {formatCurrency(summary.currentBalance)} cobre a necessidade de {formatCurrency(summary.totalNeedCost)} (margem de {formatCurrency(summary.surplusAmount)}).
              </span>
            </div>
          </div>
        ) : (
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-3 text-slate-700 text-xs">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <span className="font-bold text-slate-900">
                  Recarga recomendada de {formatCurrency(summary.requiredRechargeCost)}:
                </span>{' '}
                Copie o modelo abaixo para encaminhar a solicitação de recarga.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

