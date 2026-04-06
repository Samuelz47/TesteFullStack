import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { transacoesService } from '../api/transacoesService';

export const TRANSACOES_QUERY_KEY = ['transacoes'];

export const useTransacoes = () => {
    return useQuery({
        queryKey: TRANSACOES_QUERY_KEY,
        queryFn: transacoesService.getAll
    });
};

export const useCreateTransacao = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: transacoesService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TRANSACOES_QUERY_KEY });
        }
    });
};
