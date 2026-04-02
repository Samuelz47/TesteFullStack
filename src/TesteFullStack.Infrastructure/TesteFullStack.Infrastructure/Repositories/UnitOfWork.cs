using TesteFullStack.Domain.Interfaces;
using TesteFullStack.Infrastructure.DbContext;

namespace TesteFullStack.Infrastructure.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _context;
    
    public ICategoriaRepository Categorias { get; }
    // public IPessoaRepository Pessoas { get; }
    // public ITransacaoRepository Transacoes { get; }
    
    public UnitOfWork(AppDbContext context)
    {
        _context = context;
        Categorias = new CategoriaRepository(_context);
    }
    
    public async Task<bool> CommitAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}