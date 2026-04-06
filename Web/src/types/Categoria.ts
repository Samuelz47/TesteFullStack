export enum FinalidadeCategoria {
    Despesa = "Despesa",
    Receita = "Receita",
    Ambas = "Ambas"
}

export interface Categoria {
    id?: string;
    descricao: string;
    finalidade: FinalidadeCategoria;
}
