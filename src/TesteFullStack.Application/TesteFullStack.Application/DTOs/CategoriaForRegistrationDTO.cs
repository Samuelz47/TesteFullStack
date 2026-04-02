using TesteFullStack.Domain.Enums;

namespace TesteFullStack.Application.DTOs;

public class CategoriaForRegistrationDTO
{
    public string Descricao { get; set; }
    public FinalidadeCategoria Finalidade  { get; set; }
}