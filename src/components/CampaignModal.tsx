import React, { useState, useEffect } from 'react';
import { Campaign, CampaignType } from '../types';
import { PRICING } from '../constants/pricing';
import { formatCurrency, formatTariff } from '../utils/formatters';
import { X, Sparkles, Bell } from 'lucide-react';

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (campaign: Campaign) => void;
  campaignToEdit?: Campaign | null;
}

export const CampaignModal: React.FC<CampaignModalProps> = ({
  isOpen,
  onClose,
  onSave,
  campaignToEdit,
}) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<CampaignType>('marketing');
  const [baseSize, setBaseSize] = useState<number | ''>('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (campaignToEdit) {
      setName(campaignToEdit.name);
      setType(campaignToEdit.type);
      setBaseSize(campaignToEdit.baseSize);
      setError('');
    } else {
      setName('');
      setType('marketing');
      setBaseSize('');
      setError('');
    }
  }, [campaignToEdit, isOpen]);

  if (!isOpen) return null;

  const currentTariff = type === 'marketing' ? PRICING.marketing : PRICING.utility;
  const currentTotal = typeof baseSize === 'number' ? baseSize * currentTariff : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor, informe o nome da campanha.');
      return;
    }
    const numBase = typeof baseSize === 'number' ? baseSize : 0;
    if (numBase <= 0) {
      setError('Por favor, informe uma base de contatos maior que zero.');
      return;
    }

    onSave({
      id: campaignToEdit ? campaignToEdit.id : `camp-${Date.now()}`,
      name: name.trim(),
      type,
      baseSize: numBase,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {campaignToEdit ? 'Editar Campanha' : 'Nova Campanha Prevista'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Informe os dados do disparo para cálculo de orçamento
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs font-semibold text-rose-700">
              {error}
            </div>
          )}

          {/* Nome */}
          <div>
            <label
              htmlFor="camp-name"
              className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1"
            >
              Nome da Campanha
            </label>
            <input
              id="camp-name"
              type="text"
              required
              placeholder="Ex: Campanha Bolsa Novos Cursos"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 focus:outline-hidden"
            />
          </div>

          {/* Tipo de Template */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              Tipo de Template
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType('marketing')}
                className={`p-3 rounded-lg border text-left flex items-start gap-2.5 transition-all ${
                  type === 'marketing'
                    ? 'border-orange-500 bg-orange-50/60 text-orange-950 ring-1 ring-orange-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <Sparkles className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold">Marketing</div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {formatTariff(PRICING.marketing)}/msg
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setType('utility')}
                className={`p-3 rounded-lg border text-left flex items-start gap-2.5 transition-all ${
                  type === 'utility'
                    ? 'border-indigo-500 bg-indigo-50/60 text-indigo-950 ring-1 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <Bell className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold">Utilidade</div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {formatTariff(PRICING.utility)}/msg
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Tamanho da Base */}
          <div>
            <label
              htmlFor="camp-base"
              className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1"
            >
              Tamanho da Base (Contatos / Disparos)
            </label>
            <input
              id="camp-base"
              type="number"
              min="1"
              required
              placeholder="Ex: 300"
              value={baseSize}
              onChange={(e) => {
                const val = e.target.value === '' ? '' : parseInt(e.target.value, 10);
                setBaseSize(typeof val === 'number' && val >= 0 ? val : '');
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-900 font-mono focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 focus:outline-hidden tabular-nums font-bold"
            />
          </div>

          {/* Calculation Preview */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              <span className="font-semibold block text-slate-700">Cálculo:</span>
              <span className="font-mono">
                {baseSize ? baseSize : 0} contatos × {formatTariff(currentTariff)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Previsto</span>
              <span className="text-sm font-bold text-slate-900 font-mono tabular-nums">
                {formatCurrency(currentTotal)}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-200 transition-colors"
            >
              {campaignToEdit ? 'Salvar Alterações' : 'Adicionar Campanha'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

