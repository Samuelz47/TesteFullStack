import { useState } from "react";
import { useCategorias } from "../hooks/useCategorias";
import { FinalidadeCategoria } from "../types/Categoria";
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
import { CategoriaFormSheet } from "../features/categorias/CategoriaFormSheet";

export default function Categorias() {
    const { data: categorias, isLoading, isError } = useCategorias();
    const [formOpen, setFormOpen] = useState(false);

    const renderFinalidadeBadge = (finalidade: FinalidadeCategoria) => {
        switch (finalidade) {
            case FinalidadeCategoria.Despesa:
                return <Badge variant="destructive" className="bg-red-500 hover:bg-red-600">Despesa</Badge>
            case FinalidadeCategoria.Receita:
                return <Badge className="bg-green-500 hover:bg-green-600">Receita</Badge>
            case FinalidadeCategoria.Ambas:
                return <Badge className="bg-blue-500 hover:bg-blue-600">Ambas</Badge>
            default:
                return <Badge variant="outline">Desconhecido</Badge>
        }
    }

    if (isLoading) return <div className="flex justify-center py-10"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
    if (isError) return <div className="text-destructive font-medium">Erro ao carregar categorias.</div>;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Categorias</h1>
                    <p className="text-muted-foreground mt-1">Gerencie as categorias das suas transações.</p>
                </div>
                <Button onClick={() => setFormOpen(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Nova Categoria
                </Button>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">Descrição</TableHead>
                            <TableHead>Finalidade</TableHead>
                            <TableHead className="text-right">ID</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categorias?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                                    Nenhuma categoria encontrada.
                                </TableCell>
                            </TableRow>
                        )}
                        {categorias?.map((categoria) => (
                            <TableRow key={categoria.id}>
                                <TableCell className="font-medium">{categoria.descricao}</TableCell>
                                <TableCell>
                                    {renderFinalidadeBadge(categoria.finalidade)}
                                </TableCell>
                                <TableCell className="text-right text-muted-foreground text-xs">{categoria.id}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <CategoriaFormSheet open={formOpen} onOpenChange={setFormOpen} />
        </div>
    )
}
