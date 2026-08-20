import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all">
        <div className="p-6">
          <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3 border border-rose-100">
            <AlertTriangle className="w-5 h-5" />
          </div>

          <div className="text-center">
            <h3 className="text-sm font-bold text-slate-900">
              Restaurar valores padrão?
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Isso redefinirá todas as quantidades de mensagens, taxa de previsão para 0%, saldo atual para US$ 35,00 e restaurará as 4 campanhas de exemplo da planilha original.
            </p>
          </div>

          <div className="mt-5 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="w-full sm:w-auto px-3.5 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-colors"
            >
              Confirmar e Restaurar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

