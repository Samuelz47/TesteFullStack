import { axiosClient } from './axiosClient';
import type { Categoria } from '../types/Categoria';

export const categoriasService = {
    getAll: async () => {
        const { data } = await axiosClient.get<Categoria[]>('/categorias');
        return data;
    },
    getById: async (id: number) => {
        const { data } = await axiosClient.get<Categoria>(`/categorias/${id}`);
        return data;
    },
    create: async (categoria: Omit<Categoria, 'id'>) => {
        const { data } = await axiosClient.post<Categoria>('/categorias', categoria);
        return data;
    },
    update: async (id: number, categoria: Categoria) => {
        const { data } = await axiosClient.put<Categoria>(`/categorias/${id}`, categoria);
        return data;
    },
    delete: async (id: number) => {
        const { data } = await axiosClient.delete(`/categorias/${id}`);
        return data;
    }
};
