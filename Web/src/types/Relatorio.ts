export interface RelatorioPessoa {
    nome: string;
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
}

export interface RelatorioGeralPessoas {
    pessoas: RelatorioPessoa[];
    totalGeralReceitas: number;
    totalGeralDespesas: number;
    saldoGeral: number;
}
