export enum FinalidadeCategoria {
    Despesa = 0,
    Receita = 1,
    Ambas = 2
}

export interface Categoria {
    id?: string;
    nome: string;
    finalidade: FinalidadeCategoria;
}
