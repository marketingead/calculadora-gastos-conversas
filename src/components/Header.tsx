import React from 'react';
import { RotateCcw, HelpCircle, Printer, MessageSquareText } from 'lucide-react';

interface HeaderProps {
  onOpenTariffs: () => void;
  onOpenReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenTariffs, onOpenReset }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand zone */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-200 font-bold">
              <MessageSquareText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Previsão de Uso — RD Conversas
              </h1>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Controle de utilização, campanhas e previsão de recarga
              </p>
            </div>
          </div>

          {/* Action Zone */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={onOpenTariffs}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 bg-white hover:bg-slate-50 rounded-lg transition-colors border border-slate-200 shadow-2xs"
              title="Consultar tabela de tarifas"
            >
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Tabela de Tarifas</span>
              <span className="sm:hidden">Tarifas</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="no-print inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 rounded-lg transition-colors border border-slate-200 shadow-2xs"
              title="Imprimir relatório"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Imprimir</span>
            </button>

            <button
              type="button"
              onClick={onOpenReset}
              className="no-print inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600 bg-white hover:bg-rose-50 rounded-lg transition-colors border border-slate-200 hover:border-rose-200 shadow-2xs"
              title="Restaurar valores padrão"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden md:inline">Restaurar Padrão</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

