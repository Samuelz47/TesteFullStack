import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { useEffect, useMemo } from "react"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCreateTransacao } from "../../hooks/useTransacoes"
import { usePessoas } from "../../hooks/usePessoas"
import { useCategorias } from "../../hooks/useCategorias"
import { FinalidadeCategoria } from "../../types/Categoria"
import { AxiosError } from "axios"

const formSchema = z.object({
    descricao: z.string().min(1, { message: "A descrição é obrigatória." }).max(400, { message: "Máximo de 400 caracteres." }),
    valor: z.coerce.number().positive({ message: "O valor deve ser maior que 0." }),
    tipo: z.string().min(1, { message: "Selecione o tipo." }),
    pessoaId: z.string().min(1, { message: "Selecione uma pessoa." }),
    categoriaId: z.string().min(1, { message: "Selecione uma categoria." }),
})

type FormData = z.infer<typeof formSchema>

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function TransacaoFormSheet({ open, onOpenChange }: Props) {
    const createMutation = useCreateTransacao();
    const { data: pessoas } = usePessoas();
    const { data: categorias } = useCategorias();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            descricao: "",
            valor: 0,
            tipo: "",
            pessoaId: "",
            categoriaId: "",
        },
    })

    // Watch fields for dynamic rules
    const selectedPessoaId = useWatch({ control: form.control, name: "pessoaId" })
    const selectedTipo = useWatch({ control: form.control, name: "tipo" })

    // ===== REGRA 1: Pessoa menor de idade → Tipo travado como Despesa =====
    const selectedPessoa = useMemo(() => {
        return pessoas?.find(p => p.id === selectedPessoaId)
    }, [pessoas, selectedPessoaId])

    const isMenorDeIdade = selectedPessoa ? selectedPessoa.idade < 18 : false

    useEffect(() => {
        if (isMenorDeIdade) {
            form.setValue("tipo", "Despesa")
        }
    }, [isMenorDeIdade, form])

    // ===== REGRA 2: Filtrar categorias pela Finalidade com base no tipo =====
    const filteredCategorias = useMemo(() => {
        if (!categorias || !selectedTipo) return categorias ?? []
        return categorias.filter(cat => {
            if (cat.finalidade === FinalidadeCategoria.Ambas) return true
            if (selectedTipo === "Despesa" && cat.finalidade === FinalidadeCategoria.Despesa) return true
            if (selectedTipo === "Receita" && cat.finalidade === FinalidadeCategoria.Receita) return true
            return false
        })
    }, [categorias, selectedTipo])

    // Reset categoriaId when tipo changes and current selection is no longer valid
    useEffect(() => {
        const currentCatId = form.getValues("categoriaId")
        if (currentCatId && !filteredCategorias.find(c => c.id === currentCatId)) {
            form.setValue("categoriaId", "")
        }
    }, [filteredCategorias, form])

    // Reset form when sheet opens
    useEffect(() => {
        if (open) {
            form.reset()
        }
    }, [open, form])

    const onSubmit = (values: FormData) => {
        const payload = {
            descricao: values.descricao,
            valor: values.valor,
            tipo: values.tipo,
            pessoaId: values.pessoaId,
            categoriaId: values.categoriaId,
        }

        createMutation.mutate(
            payload as any,
            {
                onSuccess: () => {
                    toast.success("Transação cadastrada com sucesso!")
                    onOpenChange(false)
                },
                onError: (error: any) => {
                    const axiosError = error as AxiosError<any>
                    const data = axiosError?.response?.data

                    if (axiosError?.response?.status === 400) {
                        if (data?.erros && Array.isArray(data.erros)) {
                            data.erros.forEach((e: string) => toast.error(e))
                        } else if (data?.mensagem) {
                            toast.error(data.mensagem)
                        } else if (typeof data === "string") {
                            toast.error(data)
                        } else {
                            toast.error("Erro de validação no servidor.")
                        }
                    } else {
                        toast.error("Erro ao cadastrar transação.")
                    }
                }
            }
        )
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-lg overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Nova Transação</SheetTitle>
                    <SheetDescription>
                        Preencha os dados da transação. As categorias são filtradas conforme o tipo selecionado.
                    </SheetDescription>
                </SheetHeader>
                <div className="py-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            {/* Descrição */}
                            <FormField
                                control={form.control}
                                name="descricao"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descrição</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ex: Compra no mercado" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Valor */}
                            <FormField
                                control={form.control}
                                name="valor"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Valor (R$)</FormLabel>
                                        <FormControl>
                                            <Input type="number" step="0.01" placeholder="0,00" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Pessoa */}
                            <FormField
                                control={form.control}
                                name="pessoaId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pessoa</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione uma pessoa" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {pessoas?.map((p) => (
                                                    <SelectItem key={p.id || Math.random()} value={p.id || "none"}>
                                                        {p.nome} ({p.idade} anos)
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {isMenorDeIdade && (
                                            <p className="text-xs text-amber-600 mt-1">
                                                Pessoa menor de idade — tipo travado como Despesa.
                                            </p>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Tipo */}
                            <FormField
                                control={form.control}
                                name="tipo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            disabled={isMenorDeIdade}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione o tipo" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Despesa">Despesa</SelectItem>
                                                <SelectItem value="Receita" disabled={isMenorDeIdade}>
                                                    Receita
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Categoria (filtrada) */}
                            <FormField
                                control={form.control}
                                name="categoriaId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Categoria</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={
                                                        !selectedTipo
                                                            ? "Selecione o tipo primeiro"
                                                            : "Selecione uma categoria"
                                                    } />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {filteredCategorias.length === 0 ? (
                                                    <p className="p-2 text-sm text-muted-foreground">
                                                        Nenhuma categoria disponível.
                                                    </p>
                                                ) : (
                                                    filteredCategorias.map((c) => (
                                                        <SelectItem key={c.id || Math.random()} value={c.id || "none"}>
                                                            {c.descricao}
                                                        </SelectItem>
                                                    ))
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end gap-4 pt-4">
                                <Button type="submit" disabled={createMutation.isPending}>
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
