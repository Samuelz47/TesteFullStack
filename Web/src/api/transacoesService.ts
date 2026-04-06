import { axiosClient } from './axiosClient';
import type { Transacao } from '../types/Transacao';

export const transacoesService = {
    getAll: async () => {
        const { data } = await axiosClient.get<Transacao[]>('/transacoes');
        return data;
    },
    getById: async (id: string) => {
        const { data } = await axiosClient.get<Transacao>(`/transacoes/${id}`);
        return data;
    },
    create: async (transacao: Omit<Transacao, 'id'>) => {
        const { data } = await axiosClient.post<Transacao>('/transacoes', transacao);
        return data;
    },
    update: async (id: string, transacao: Transacao) => {
        const { data } = await axiosClient.put<Transacao>(`/transacoes/${id}`, transacao);
        return data;
    },
    delete: async (id: string) => {
        const { data } = await axiosClient.delete(`/transacoes/${id}`);
        return data;
    }
};
