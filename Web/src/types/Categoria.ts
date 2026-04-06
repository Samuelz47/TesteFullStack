export enum FinalidadeCategoria {
    Despesa = 0,
    Receita = 1,
    Ambas = 2
}

export interface Categoria {
    id?: number;
    nome: string;
    finalidade: FinalidadeCategoria;
}
