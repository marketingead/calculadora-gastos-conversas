import React from 'react';
import { PRICING, TARIFF_DETAILS } from '../constants/pricing';
import { formatTariff } from '../utils/formatters';
import { X, Info } from 'lucide-react';

interface TariffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TariffModal: React.FC<TariffModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-blue-50 text-blue-600">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Tabela de Tarifas — RD Conversas
              </h3>
              <p className="text-xs text-slate-500">
                Valores e regras aplicados nos cálculos do sistema
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3.5">
          <div className="space-y-2.5">
            {TARIFF_DETAILS.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Tarifa</span>
                    <span className="text-xs font-bold text-blue-950 font-mono">
                      {formatTariff(item.tariff)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional note */}
          <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-lg text-xs text-blue-900 leading-relaxed">
            <p className="font-bold mb-0.5">Observação importante:</p>
            <p className="text-blue-800 text-[11px]">
              As tarifas são cobradas em Dólares Americanos (US$) pela Meta / RD Station e convertidas na fatura ou descontadas diretamente do saldo pré-pago em carteira.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

