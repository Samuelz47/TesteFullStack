import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pessoasService } from '../api/pessoasService';
import type { Pessoa } from '../types/Pessoa';

export const PESSOAS_QUERY_KEY = ['pessoas'];

export const usePessoas = () => {
    return useQuery({
        queryKey: PESSOAS_QUERY_KEY,
        queryFn: pessoasService.getAll
    });
};

export const useCreatePessoa = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: pessoasService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PESSOAS_QUERY_KEY });
        }
    });
};

export const useUpdatePessoa = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, pessoa }: { id: string; pessoa: Pessoa }) => pessoasService.update(id, pessoa),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PESSOAS_QUERY_KEY });
        }
    });
};

export const useDeletePessoa = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: pessoasService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PESSOAS_QUERY_KEY });
        }
    });
};
