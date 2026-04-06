using TesteFullStack.Domain.Enums;

namespace TesteFullStack.Application.DTOs;

public class TransacaoDTO
{
    public Guid Id { get; set; }
    public string Descricao { get; set; }
    public decimal Valor { get; set; }
    public TipoTransacao Tipo { get; set; }
    public Guid PessoaId { get; set; }
    public string PessoaNome { get; set; } 
    public Guid CategoriaId { get; set; }
    public string CategoriaDescricao { get; set; }
}