import { useState } from "react";
import { usePessoas, useDeletePessoa } from "../hooks/usePessoas";
import type { Pessoa } from "../types/Pessoa";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2, Loader2 } from "lucide-react"
import { PessoaFormSheet } from "../features/pessoas/PessoaFormSheet";
import { PessoaDeleteDialog } from "../features/pessoas/PessoaDeleteDialog";
import { toast } from "sonner";

export default function Pessoas() {
    const { data: pessoas, isLoading, isError } = usePessoas();
    const deleteMutation = useDeletePessoa();

    const [formOpen, setFormOpen] = useState(false);
    const [selectedPessoa, setSelectedPessoa] = useState<Pessoa | null>(null);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [pessoaToDelete, setPessoaToDelete] = useState<Pessoa | null>(null);

    const handleCreate = () => {
        setSelectedPessoa(null);
        setFormOpen(true);
    }

    const handleEdit = (pessoa: Pessoa) => {
        setSelectedPessoa(pessoa);
        setFormOpen(true);
    }

    const handleDeleteClick = (pessoa: Pessoa) => {
        setPessoaToDelete(pessoa);
        setDeleteOpen(true);
    }

    const confirmDelete = () => {
        if (!pessoaToDelete?.id) return;
        deleteMutation.mutate(pessoaToDelete.id, {
            onSuccess: () => {
                toast.success("Pessoa deletada com sucesso!");
                setDeleteOpen(false);
            },
            onError: () => {
                toast.error("Erro ao deletar a pessoa.");
            }
        });
    }

    if (isLoading) return <div className="flex justify-center py-10"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
    if (isError) return <div className="text-destructive font-medium">Erro ao carregar pessoas. O backend está rodando?</div>;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Pessoas</h1>
                    <p className="text-muted-foreground mt-1">Gerencie as pessoas vinculadas às transações.</p>
                </div>
                <Button onClick={handleCreate} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Nova Pessoa
                </Button>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Idade</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pessoas?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                    Nenhuma pessoa encontrada.
                                </TableCell>
                            </TableRow>
                        )}
                        {pessoas?.map((pessoa) => (
                            <TableRow key={pessoa.id}>
                                <TableCell className="font-medium">{pessoa.id}</TableCell>
                                <TableCell>{pessoa.nome}</TableCell>
                                <TableCell>{pessoa.idade}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(pessoa)}>
                                            <Edit2 className="h-4 w-4 text-muted-foreground" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(pessoa)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <PessoaFormSheet
                open={formOpen}
                onOpenChange={setFormOpen}
                pessoa={selectedPessoa}
            />

            {pessoaToDelete && (
                <PessoaDeleteDialog
                    open={deleteOpen}
                    onOpenChange={setDeleteOpen}
                    onConfirm={confirmDelete}
                    pessoaName={pessoaToDelete.nome}
                />
            )}
        </div>
    )
}
