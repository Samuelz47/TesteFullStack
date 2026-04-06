import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoriasService } from '../api/categoriasService';

export const CATEGORIAS_QUERY_KEY = ['categorias'];

export const useCategorias = () => {
    return useQuery({
        queryKey: CATEGORIAS_QUERY_KEY,
        queryFn: categoriasService.getAll
    });
};

export const useCreateCategoria = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: categoriasService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CATEGORIAS_QUERY_KEY });
        }
    });
};
