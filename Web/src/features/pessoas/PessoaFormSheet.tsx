import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCreatePessoa, useUpdatePessoa } from "../../hooks/usePessoas"
import type { Pessoa } from "../../types/Pessoa"
import { useEffect } from "react"

const formSchema = z.object({
    nome: z.string().min(1, { message: "O nome é obrigatório." }).max(200, { message: "O nome deve ter no máximo 200 caracteres." }),
    idade: z.coerce.number().min(0, { message: "A idade não pode ser negativa." })
})

export type PessoaFormData = z.infer<typeof formSchema>

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    pessoa?: Pessoa | null;
}

export function PessoaFormSheet({ open, onOpenChange, pessoa }: Props) {
    const createMutation = useCreatePessoa();
    const updateMutation = useUpdatePessoa();

    const form = useForm<PessoaFormData>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            nome: "",
            idade: 0,
        },
    })

    useEffect(() => {
        if (open) {
            form.reset({
                nome: pessoa?.nome ?? "",
                idade: pessoa?.idade ?? 0,
            })
        }
    }, [open, pessoa, form])

    const onSubmit = (values: PessoaFormData) => {
        if (pessoa?.id) {
            updateMutation.mutate(
                { id: pessoa.id, pessoa: { id: pessoa.id, ...values } },
                {
                    onSuccess: () => {
                        toast.success("Pessoa atualizada com sucesso!");
                        onOpenChange(false);
                    },
                    onError: () => toast.error("Erro ao atualizar pessoa.")
                }
            )
        } else {
            createMutation.mutate(
                values,
                {
                    onSuccess: () => {
                        toast.success("Pessoa cadastrada com sucesso!");
                        onOpenChange(false);
                    },
                    onError: () => toast.error("Erro ao cadastrar pessoa.")
                }
            )
        }
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>{pessoa ? "Editar Pessoa" : "Nova Pessoa"}</SheetTitle>
                    <SheetDescription>
                        Preencha os dados abaixo. Clique em salvar quando terminar.
                    </SheetDescription>
                </SheetHeader>
                <div className="py-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="nome"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Escreva o nome completo" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="idade"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Idade</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end gap-4 mt-6">
                                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                                    Salvar
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </SheetContent>
        </Sheet>
    )
}
