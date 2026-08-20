import React, { useState } from 'react';
import { Campaign } from '../types';
import { PRICING } from '../constants/pricing';
import { formatCurrency, formatQuantity, formatTariff } from '../utils/formatters';
import { getCampaignCost } from '../utils/calculations';
import { CampaignModal } from './CampaignModal';
import {
  Plus,
  Trash2,
  Edit2,
  Copy,
  Sparkles,
  Bell,
  Megaphone,
} from 'lucide-react';

interface CampaignsSectionProps {
  campaigns: Campaign[];
  totalCampaignsCost: number;
  onAddCampaign: (campaign: Campaign) => void;
  onUpdateCampaign: (campaign: Campaign) => void;
  onDeleteCampaign: (id: string) => void;
  onDuplicateCampaign: (campaign: Campaign) => void;
}

export const CampaignsSection: React.FC<CampaignsSectionProps> = ({
  campaigns,
  totalCampaignsCost,
  onAddCampaign,
  onUpdateCampaign,
  onDeleteCampaign,
  onDuplicateCampaign,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  const handleOpenAdd = () => {
    setEditingCampaign(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setIsModalOpen(true);
  };

  const handleSaveModal = (campaign: Campaign) => {
    if (editingCampaign) {
      onUpdateCampaign(campaign);
    } else {
      onAddCampaign(campaign);
    }
  };

  return (
    <section className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              3. Campanhas Previstas
            </h2>
            <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded">
              {campaigns.length} {campaigns.length === 1 ? 'ação' : 'ações'}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Ações pontuais e disparos programados
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="bg-orange-50/70 border border-orange-200/80 rounded-lg px-3 py-1.5 flex items-center gap-2">
            <span className="text-[10px] font-bold text-orange-800 uppercase tracking-wider">
              Total
            </span>
            <span className="text-sm font-bold text-slate-900 tabular-nums font-mono">
              {formatCurrency(totalCampaignsCost)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Adicionar</span>
          </button>
        </div>
      </div>

      {/* Campaign List */}
      <div>
        {campaigns.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-2">
              <Megaphone className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-slate-700">
              Nenhuma campanha prevista
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Adicione campanhas para somar o investimento na previsão de recarga.
            </p>
            <button
              type="button"
              onClick={handleOpenAdd}
              className="mt-3 inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              Adicionar campanha
            </button>
          </div>
        ) : (
          <div className="border border-slate-200 rounded-lg overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-400 border-b border-slate-200 text-[10px] uppercase tracking-wider font-bold">
                <tr>
                  <th scope="col" className="py-2.5 px-3">Campanha</th>
                  <th scope="col" className="py-2.5 px-3">Tipo</th>
                  <th scope="col" className="py-2.5 px-3 text-right">Base</th>
                  <th scope="col" className="py-2.5 px-3 text-right">Tarifa</th>
                  <th scope="col" className="py-2.5 px-3 text-right">Valor</th>
                  <th scope="col" className="py-2.5 px-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {campaigns.map((camp) => {
                  const cost = getCampaignCost(camp);
                  const isMarketing = camp.type === 'marketing';
                  const tariff = isMarketing ? PRICING.marketing : PRICING.utility;

                  return (
                    <tr key={camp.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-slate-800">
                        {camp.name}
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            isMarketing
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-indigo-100 text-indigo-700'
                          }`}
                        >
                          {isMarketing ? (
                            <Sparkles className="w-2.5 h-2.5" />
                          ) : (
                            <Bell className="w-2.5 h-2.5" />
                          )}
                          {isMarketing ? 'Marketing' : 'Utilidade'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right tabular-nums font-mono text-slate-600">
                        {formatQuantity(camp.baseSize)}
                      </td>
                      <td className="py-2.5 px-3 text-right tabular-nums font-mono text-slate-400 text-[11px]">
                        {formatTariff(tariff)}
                      </td>
                      <td className="py-2.5 px-3 text-right tabular-nums font-mono font-bold text-slate-900">
                        {formatCurrency(cost)}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(camp)}
                            className="p-1 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded transition-colors"
                            title="Editar campanha"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDuplicateCampaign(camp)}
                            className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded transition-colors"
                            title="Duplicar campanha"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteCampaign(camp.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded transition-colors"
                            title="Excluir campanha"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-slate-50 font-bold border-t border-slate-200">
                <tr>
                  <td colSpan={4} className="py-2.5 px-3 text-slate-500 text-right uppercase text-[10px] tracking-wider">
                    Total Investimento em Campanhas:
                  </td>
                  <td className="py-2.5 px-3 text-right text-sm text-slate-900 tabular-nums font-mono font-black">
                    {formatCurrency(totalCampaignsCost)}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      <CampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveModal}
        campaignToEdit={editingCampaign}
      />
    </section>
  );
};

