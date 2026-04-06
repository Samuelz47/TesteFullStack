export enum TipoTransacao {
    Despesa = 0,
    Receita = 1
}

export interface Transacao {
    id?: string;
    descricao: string;
    valor: number;
    data: string; // ISO date string from C#
    tipo: TipoTransacao;
    categoriaId?: string;
    pessoaId?: string;
}
