export enum TipoTransacao {
    Despesa = 0,
    Receita = 1
}

export interface Transacao {
    id?: number;
    descricao: string;
    valor: number;
    data: string; // ISO date string from C#
    tipo: TipoTransacao;
    categoriaId?: number;
    pessoaId?: number;
}
