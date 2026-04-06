namespace TesteFullStack.Domain.Interfaces;

public interface IUnitOfWork : IDisposable
{
    ICategoriaRepository Categorias { get; }
    IPessoaRepository Pessoas { get; }
    ITransacaoRepository Transacoes { get; }
    
    Task<bool> CommitAsync(); 
}