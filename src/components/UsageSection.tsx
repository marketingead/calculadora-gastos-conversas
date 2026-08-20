import React from 'react';
import { IndicatorRow, UsageData } from '../types';
import { formatCurrency, formatTariff, formatQuantity } from '../utils/formatters';
import { Send, Inbox, Sparkles, Bell, HelpCircle } from 'lucide-react';

interface UsageSectionProps {
  usage: UsageData;
  indicatorRows: IndicatorRow[];
  totalCost: number;
  onUsageChange: (key: keyof UsageData, value: number) => void;
  onOpenTariffs: () => void;
}

export const UsageSection: React.FC<UsageSectionProps> = ({
  usage,
  indicatorRows,
  totalCost,
  onUsageChange,
  onOpenTariffs,
}) => {
  const getIcon = (id: keyof UsageData) => {
    switch (id) {
      case 'sentMessages':
        return <Send className="w-3.5 h-3.5 text-blue-600" />;
      case 'receivedMessages':
        return <Inbox className="w-3.5 h-3.5 text-emerald-600" />;
      case 'marketingTemplates':
        return <Sparkles className="w-3.5 h-3.5 text-orange-600" />;
      case 'utilityTemplates':
        return <Bell className="w-3.5 h-3.5 text-indigo-600" />;
    }
  };

  const handleInputChange = (key: keyof UsageData, rawValue: string) => {
    const sanitized = rawValue.replace(/\D/g, '');
    const num = sanitized === '' ? 0 : parseInt(sanitized, 10);
    onUsageChange(key, Math.max(0, num));
  };

  return (
    <section className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              1. Uso Últimos 15 Dias
            </h2>
            <button
              type="button"
              onClick={onOpenTariffs}
              className="text-slate-400 hover:text-blue-600 transition-colors"
              title="Ver detalhes de tarifas"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Volume e consumo registrado no período recente
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Total 15 Dias
          </span>
          <span className="text-sm font-bold text-slate-900 tabular-nums font-mono">
            {formatCurrency(totalCost)}
          </span>
        </div>
      </div>

      {/* Grid of Indicator inputs */}
      <div className="space-y-3.5">
        {indicatorRows.map((row) => {
          const rawVal = usage[row.id];

          return (
            <div
              key={row.id}
              className="p-3.5 bg-slate-50/80 border border-slate-200/90 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-md bg-white border border-slate-200 shadow-2xs">
                  {getIcon(row.id)}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-800">
                    {row.label}
                  </h3>
                  <div className="text-[11px] text-slate-500 font-mono">
                    Tarifa: {formatTariff(row.tariff)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4">
                {/* Input control */}
                <div className="relative w-36">
                  <input
                    id={`input-${row.id}`}
                    type="text"
                    inputMode="numeric"
                    value={rawVal === 0 ? '' : rawVal}
                    placeholder="0"
                    onChange={(e) => handleInputChange(row.id, e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-md py-1 px-2.5 text-right text-xs font-bold text-slate-900 font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 focus:outline-hidden"
                  />
                  <span className="block text-[10px] text-slate-400 text-right mt-0.5">
                    {formatQuantity(row.currentQuantity)} un
                  </span>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[80px]">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Custo
                  </span>
                  <span className="text-xs font-bold text-slate-900 font-mono tabular-nums">
                    {formatCurrency(row.currentCost)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Summary Bar */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-500 font-medium">Custo Histórico Base:</span>
        <span className="text-base font-bold text-slate-900 font-mono tabular-nums">
          {formatCurrency(totalCost)}
        </span>
      </div>
    </section>
  );
};

