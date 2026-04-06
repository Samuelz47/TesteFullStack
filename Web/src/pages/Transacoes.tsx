import { useState } from "react";
import { useTransacoes } from "../hooks/useTransacoes";
import { TipoTransacao } from "../types/Transacao";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Loader2 } from "lucide-react"
import { TransacaoFormSheet } from "../features/transacoes/TransacaoFormSheet";

export default function Transacoes() {
    const { data: transacoes, isLoading, isError } = useTransacoes();
    const [formOpen, setFormOpen] = useState(false);

    const formatCurrency = (value: any) => {
        const num = Number(value);
        if (isNaN(num)) return "R$ 0,00";
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(num);
    }

    const renderTipoBadge = (tipo: any) => {
        if (!tipo) return <Badge variant="outline">N/A</Badge>;

        // Handle both string and potentially numeric/enum values
        const tipoStr = String(tipo);
        if (tipoStr === "Despesa" || tipo === 0) {
            return <Badge variant="destructive" className="bg-red-500 hover:bg-red-600">Despesa</Badge>
        }
        if (tipoStr === "Receita" || tipo === 1) {
            return <Badge className="bg-green-500 hover:bg-green-600">Receita</Badge>
        }
        return <Badge variant="outline">{tipoStr}</Badge>
    }

    if (isLoading) return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-muted-foreground animate-pulse">Carregando transações...</p>
        </div>
    );

    if (isError) return (
        <div className="flex flex-col items-center justify-center py-20 gap-4 border rounded-lg bg-destructive/5">
            <p className="text-destructive font-semibold">Erro ao carregar transações.</p>
            <p className="text-sm text-muted-foreground">Verifique se o backend está rodando em https://localhost:7156</p>
        </div>
    );

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Transações</h1>
                    <p className="text-muted-foreground mt-1">Registre e acompanhe suas receitas e despesas.</p>
                </div>
                <Button onClick={() => setFormOpen(true)} className="gap-2 shadow-sm">
                    <Plus className="h-4 w-4" />
                    Nova Transação
                </Button>
            </div>

            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50">
                                <TableHead className="font-semibold">Descrição</TableHead>
                                <TableHead className="text-right font-semibold">Valor</TableHead>
                                <TableHead className="font-semibold">Tipo</TableHead>
                                <TableHead className="font-semibold">Categoria</TableHead>
                                <TableHead className="font-semibold">Pessoa</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(!transacoes || transacoes.length === 0) ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                                        Nenhuma transação encontrada.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                transacoes.map((t) => (
                                    <TableRow key={t.id || Math.random()} className="hover:bg-muted/30 transition-colors">
                                        <TableCell className="font-medium underline-offset-4 decoration-primary/30">{t.descricao || "Sem descrição"}</TableCell>
                                        <TableCell className="text-right font-mono font-medium">{formatCurrency(t.valor)}</TableCell>
                                        <TableCell>{renderTipoBadge(t.tipo)}</TableCell>
                                        <TableCell>
                                            <span className="text-sm text-muted-foreground">{t.categoriaDescricao || "S/ Cat"}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm font-medium">{t.pessoaNome || "S/ Pessoa"}</span>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <TransacaoFormSheet open={formOpen} onOpenChange={setFormOpen} />
        </div>
    )
}
