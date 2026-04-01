using TesteFullStack.Domain.Enums;

namespace TesteFullStack.Domain.Entities;

public class Categoria
{
    public Guid Id { get; set; }
    public string Descricao { get; set; }
    public FinalidadeCategoria Finalidade { get; set; }
}