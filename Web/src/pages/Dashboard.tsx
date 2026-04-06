import { useRelatorioPessoas } from "../hooks/useRelatorio";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Loader2, TrendingUp, TrendingDown, Wallet } from "lucide-react"

export default function Dashboard() {
    const { data: relatorio, isLoading, isError } = useRelatorioPessoas();

    const formatCurrency = (value: any) => {
        const num = Number(value);
        if (isNaN(num)) return "R$ 0,00";
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(num);
    }

    const saldoColor = (value: number) => {
        if (value > 0) return "text-green-600";
        if (value < 0) return "text-red-600";
        return "text-muted-foreground";
    }

    if (isLoading) return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-muted-foreground animate-pulse">Carregando dashboard...</p>
        </div>
    );

    if (isError) return (
        <div className="flex flex-col items-center justify-center py-20 gap-4 border rounded-lg bg-destructive/5">
            <p className="text-destructive font-semibold">Erro ao carregar relatório.</p>
            <p className="text-sm text-muted-foreground">Verifique se o backend está rodando.</p>
        </div>
    );

    const totalReceitas = relatorio?.totalGeralReceitas ?? 0;
    const totalDespesas = relatorio?.totalGeralDespesas ?? 0;
    const saldoGeral = relatorio?.saldoGeral ?? 0;
    const pessoas = relatorio?.pessoas ?? [];

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground mt-1">Visão geral das suas finanças.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                {/* Receitas */}
                <div className="rounded-xl border bg-card shadow-sm p-6 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Total de Receitas</span>
                        <div className="rounded-full bg-green-100 p-2">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                        </div>
                    </div>
                    <span className="text-2xl font-bold text-green-600">{formatCurrency(totalReceitas)}</span>
                </div>

                {/* Despesas */}
                <div className="rounded-xl border bg-card shadow-sm p-6 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Total de Despesas</span>
                        <div className="rounded-full bg-red-100 p-2">
                            <TrendingDown className="h-4 w-4 text-red-600" />
                        </div>
                    </div>
                    <span className="text-2xl font-bold text-red-600">{formatCurrency(totalDespesas)}</span>
                </div>

                {/* Saldo */}
                <div className="rounded-xl border bg-card shadow-sm p-6 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Saldo Geral</span>
                        <div className={`rounded-full p-2 ${saldoGeral >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                            <Wallet className={`h-4 w-4 ${saldoGeral >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                        </div>
                    </div>
                    <span className={`text-2xl font-bold ${saldoColor(saldoGeral)}`}>{formatCurrency(saldoGeral)}</span>
                </div>
            </div>

            {/* Table: Totals per Person */}
            <div className="flex flex-col gap-3">
                <h2 className="text-xl font-semibold tracking-tight">Totais por Pessoa</h2>
                <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50">
                                    <TableHead className="font-semibold">Pessoa</TableHead>
                                    <TableHead className="text-right font-semibold">Receitas</TableHead>
                                    <TableHead className="text-right font-semibold">Despesas</TableHead>
                                    <TableHead className="text-right font-semibold">Saldo</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pessoas.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                                            Nenhum dado disponível.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    pessoas.map((p, i) => (
                                        <TableRow key={p.nome + i} className="hover:bg-muted/30 transition-colors">
                                            <TableCell className="font-medium">{p.nome}</TableCell>
                                            <TableCell className="text-right font-mono text-green-600">{formatCurrency(p.totalReceitas)}</TableCell>
                                            <TableCell className="text-right font-mono text-red-600">{formatCurrency(p.totalDespesas)}</TableCell>
                                            <TableCell className={`text-right font-mono font-semibold ${saldoColor(p.saldo)}`}>
                                                {formatCurrency(p.saldo)}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}
