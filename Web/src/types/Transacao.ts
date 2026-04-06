export enum TipoTransacao {
    Despesa = "Despesa",
    Receita = "Receita"
}

export interface Transacao {
    id?: string;
    descricao: string;
    valor: number;
    tipo: TipoTransacao;
    pessoaId: string;
    pessoaNome?: string;
    categoriaId: string;
    categoriaDescricao?: string;
}
