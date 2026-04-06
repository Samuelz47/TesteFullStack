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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCreateCategoria } from "../../hooks/useCategorias"

const formSchema = z.object({
    descricao: z.string().min(1, { message: "A descrição é obrigatória." }).max(400, { message: "Máximo de 400 caracteres permitidos." }),
    finalidade: z.string()
})

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CategoriaFormSheet({ open, onOpenChange }: Props) {
    const createMutation = useCreateCategoria();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            descricao: "",
            finalidade: "0",
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // Enviar como string pro backend conferir com o JsonStringEnumConverter
        // .NET vai aceitar "Despesa", "Receita" ou o index 0, 1, 2 se o converter permitir.
        // Como o converter está ativo, vamos mandar o NOME do enum ou o valor que o Select provê.
        const mappedValues = {
            descricao: values.descricao,
            finalidade: values.finalidade === "0" ? "Despesa" : values.finalidade === "1" ? "Receita" : "Ambas"
        }

        createMutation.mutate(
            mappedValues as any,
            {
                onSuccess: () => {
                    toast.success("Categoria cadastrada com sucesso!");
                    form.reset();
                    onOpenChange(false);
                },
                onError: () => toast.error("Erro ao cadastrar categoria.")
            }
        )
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>Nova Categoria</SheetTitle>
                    <SheetDescription>
                        Crie uma nova categoria preenchendo a descrição e finalidade.
                    </SheetDescription>
                </SheetHeader>
                <div className="py-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="descricao"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descrição</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ex: Mercado Livre" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="finalidade"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Finalidade</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione a finalidade" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="0">Despesa</SelectItem>
                                                <SelectItem value="1">Receita</SelectItem>
                                                <SelectItem value="2">Ambas</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end gap-4 mt-6">
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
