import { axiosClient } from './axiosClient';
import type { Pessoa } from '../types/Pessoa';

export const pessoasService = {
    getAll: async () => {
        const { data } = await axiosClient.get<Pessoa[]>('/pessoas');
        return data;
    },
    getById: async (id: number) => {
        const { data } = await axiosClient.get<Pessoa>(`/pessoas/${id}`);
        return data;
    },
    create: async (pessoa: Omit<Pessoa, 'id'>) => {
        const { data } = await axiosClient.post<Pessoa>('/pessoas', pessoa);
        return data;
    },
    update: async (id: number, pessoa: Pessoa) => {
        const { data } = await axiosClient.put<Pessoa>(`/pessoas/${id}`, pessoa);
        return data;
    },
    delete: async (id: number) => {
        const { data } = await axiosClient.delete(`/pessoas/${id}`);
        return data;
    }
};
