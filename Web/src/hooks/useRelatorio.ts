import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '../api/axiosClient';
import type { RelatorioGeralPessoas } from '../types/Relatorio';

export const useRelatorioPessoas = () => {
    return useQuery({
        queryKey: ['relatorio-pessoas'],
        queryFn: async () => {
            const { data } = await axiosClient.get<RelatorioGeralPessoas>('/pessoas/transacoes');
            return data;
        }
    });
};
