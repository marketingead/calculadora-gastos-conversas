import React from 'react';
import { IndicatorRow } from '../types';
import { formatCurrency, formatQuantity, formatRate } from '../utils/formatters';
import { TrendingUp, TrendingDown, Minus, SlidersHorizontal } from 'lucide-react';

interface ProjectionSectionProps {
  ratePercent: number;
  indicatorRows: IndicatorRow[];
  projectedTotalCost: number;
  onRateChange: (value: number) => void;
}

const PRESET_RATES = [-25, -10, 0, 10, 20, 50];

export const ProjectionSection: React.FC<ProjectionSectionProps> = ({
  ratePercent,
  indicatorRows,
  projectedTotalCost,
  onRateChange,
}) => {
  const getRateStatus = () => {
    if (ratePercent > 0) {
      return {
        label: 'Aumento',
        icon: <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />,
        badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      };
    }
    if (ratePercent < 0) {
      return {
        label: 'Redução',
        icon: <TrendingDown className="w-3.5 h-3.5 text-amber-600" />,
        badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
      };
    }
    return {
      label: 'Estável',
      icon: <Minus className="w-3.5 h-3.5 text-slate-400" />,
      badgeClass: 'bg-slate-100 text-slate-600 border-slate-200',
    };
  };

  const status = getRateStatus();

  return (
    <section className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            2. Previsão de Crescimento (Próximos 15 Dias)
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Ajuste a taxa esperada para projetar o consumo
          </p>
        </div>

        <div className="bg-blue-50/60 border border-blue-100 rounded-lg px-3 py-1.5 flex items-center gap-2">
          <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
            Total Projetado
          </span>
          <span className="text-sm font-bold text-blue-900 tabular-nums font-mono">
            {formatCurrency(projectedTotalCost)}
          </span>
        </div>
      </div>

      <div className="space-y-5">
        {/* Simulator Area */}
        <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/90 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
              <label
                htmlFor="rate-input"
                className="text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Taxa Prevista
              </label>
            </div>

            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold border ${status.badgeClass}`}
            >
              {status.icon}
              <span>{formatRate(ratePercent)} ({status.label})</span>
            </span>
          </div>

          {/* Slider + Input */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            <div className="sm:col-span-8 flex flex-col gap-1">
              <input
                id="rate-slider"
                type="range"
                min="-50"
                max="100"
                step="1"
                value={Math.min(100, Math.max(-50, ratePercent))}
                onChange={(e) => onRateChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-hidden"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono px-1">
                <span>-50%</span>
                <span>0%</span>
                <span>+50%</span>
                <span>+100%</span>
              </div>
            </div>

            <div className="sm:col-span-4">
              <div className="relative rounded-md">
                <input
                  id="rate-input"
                  type="number"
                  step="0.5"
                  value={ratePercent === 0 ? '0' : ratePercent}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    onRateChange(isNaN(val) ? 0 : val);
                  }}
                  className="w-full bg-white border border-slate-200 rounded-md py-1 px-2.5 pr-7 text-right text-xs font-bold text-slate-900 font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 focus:outline-hidden tabular-nums"
                  placeholder="0"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-400 font-bold text-xs">
                  %
                </div>
              </div>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="pt-2 border-t border-slate-200/60 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-medium text-slate-400 mr-1">
              Atalhos:
            </span>
            {PRESET_RATES.map((preset) => {
              const isActive = ratePercent === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => onRateChange(preset)}
                  className={`px-2 py-0.5 text-xs font-semibold rounded transition-colors border ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {formatRate(preset)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projection Comparison Table */}
        <div className="border border-slate-200 rounded-lg overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 border-b border-slate-200 text-[10px] uppercase tracking-wider font-bold">
              <tr>
                <th scope="col" className="py-2.5 px-3">Indicador</th>
                <th scope="col" className="py-2.5 px-3 text-right">Uso Atual</th>
                <th scope="col" className="py-2.5 px-3 text-center">Taxa</th>
                <th scope="col" className="py-2.5 px-3 text-right">Uso Estimado</th>
                <th scope="col" className="py-2.5 px-3 text-right">Valor Estimado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {indicatorRows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-slate-800">
                    {row.label}
                  </td>
                  <td className="py-2.5 px-3 text-right tabular-nums font-mono text-slate-500">
                    {formatQuantity(row.currentQuantity)}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="font-mono text-slate-600 text-[11px]">
                      {formatRate(ratePercent)}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right tabular-nums font-mono font-semibold text-slate-900">
                    {formatQuantity(row.projectedQuantity)}
                  </td>
                  <td className="py-2.5 px-3 text-right tabular-nums font-mono font-bold text-blue-950">
                    {formatCurrency(row.projectedCost)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-50 font-bold border-t border-slate-200">
              <tr>
                <td colSpan={4} className="py-2.5 px-3 text-slate-500 text-right uppercase text-[10px] tracking-wider">
                  Valor Estimado para os Próximos 15 Dias:
                </td>
                <td className="py-2.5 px-3 text-right text-sm text-blue-950 tabular-nums font-mono font-black">
                  {formatCurrency(projectedTotalCost)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
};

