namespace TesteFullStack.Domain.Entities;

public class Pessoa
{
    public Guid Id { get; set; }
    public string Nome { get; set; }
    public int Idade { get; set; }
    public List<Transacao> Transacoes { get; set; } = new List<Transacao>(); //Garante que caso a Pessoa não tenha transação a lista retorna com transação zerada
}