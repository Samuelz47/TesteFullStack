namespace TesteFullStack.Application.DTOs;

public class RelatorioGeralPessoasDTO
{
    public List<RelatorioPessoaDTO> Pessoas { get; set; }
    public decimal TotalGeralReceitas { get; set; }
    public decimal TotalGeralDespesas { get; set; }
    public decimal SaldoGeral { get; set; }
}