using TesteFullStack.Domain.Enums;

namespace TesteFullStack.Application.DTOs;

public class TransacaoForRegistrationDTO
{
    public string Descricao { get; set; }
    public decimal Valor { get; set; }
    public TipoTransacao Tipo { get; set; }
    public Guid PessoaId { get; set; }
    public Guid CategoriaId { get; set; }
}