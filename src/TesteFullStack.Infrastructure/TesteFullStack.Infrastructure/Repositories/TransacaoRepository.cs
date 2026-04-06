using Microsoft.EntityFrameworkCore;
using TesteFullStack.Domain.Entities;
using TesteFullStack.Domain.Interfaces;
using TesteFullStack.Infrastructure.DbContext;

namespace TesteFullStack.Infrastructure.Repositories;

public class TransacaoRepository : ITransacaoRepository
{
    private readonly AppDbContext _context;
    
    public TransacaoRepository(AppDbContext context)
    {
        _context = context;
    }
    
    public async Task<Transacao?> GetByIdAsync(Guid id)
    {
        return await _context.Transacoes.FindAsync(id);
    }

    public async Task CreateAsync(Transacao transacao)
    {
        await _context.Transacoes.AddAsync(transacao);
    }
    
    public async Task<IEnumerable<Transacao>> GetAllAsync()
    {
        return await _context.Transacoes
            .Include(t => t.Categoria)
            .Include(t => t.Pessoa)
            .AsNoTracking()
            .ToListAsync();
    }
}