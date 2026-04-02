using TesteFullStack.Domain.Enums;

namespace TesteFullStack.Application.DTOs;

public class CategoriaDTO
{
    public Guid Id { get; set; }
    public string Descricao { get; set; }
    public FinalidadeCategoria Finalidade { get; set; }
}