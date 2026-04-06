using Microsoft.EntityFrameworkCore;
using TesteFullStack.Domain.Entities;
using TesteFullStack.Domain.Interfaces;
using TesteFullStack.Infrastructure.DbContext;

namespace TesteFullStack.Infrastructure.Repositories;

public class PessoaRepository : IPessoaRepository
{
    private readonly AppDbContext _context;
    
    public PessoaRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Pessoa?> GetByIdAsync(Guid id)
    {
        return await _context.Pessoas.FindAsync(id);
    }

    public async Task CreateAsync(Pessoa pessoa)
    {
        await _context.Pessoas.AddAsync(pessoa);
    }

    public Task Delete(Pessoa pessoa)
    {
        _context.Pessoas.Remove(pessoa);
        return Task.CompletedTask;
    }

    public Task Edit(Pessoa pessoa)
    {
        _context.Pessoas.Update(pessoa);
        return Task.CompletedTask;
    }
    
    public async Task<IEnumerable<Pessoa>> GetAllAsync()
    {
        return await _context.Pessoas.AsNoTracking().ToListAsync();
    }
    
    public async Task<IEnumerable<Pessoa>> GetAllWithTransacoesAsync()
    {
        return await _context.Pessoas.Include(p => p.Transacoes)
            .AsNoTracking()
            .ToListAsync();
    }
}