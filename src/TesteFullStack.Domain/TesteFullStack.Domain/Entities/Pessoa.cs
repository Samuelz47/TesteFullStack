namespace TesteFullStack.Domain.Entities;

public class Pessoa
{
    public Guid Id { get; set; }
    public string Nome { get; set; }
    public int Idade { get; set; }
    public List<Transacao> Transacoes { get; set; }
}