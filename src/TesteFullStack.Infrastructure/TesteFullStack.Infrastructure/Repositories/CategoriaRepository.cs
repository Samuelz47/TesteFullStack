using Microsoft.EntityFrameworkCore;
using TesteFullStack.Domain.Entities;
using TesteFullStack.Domain.Interfaces;
using TesteFullStack.Infrastructure.DbContext;

namespace TesteFullStack.Infrastructure.Repositories;

public class CategoriaRepository : ICategoriaRepository
{
    private readonly AppDbContext _context;
    
    public CategoriaRepository(AppDbContext context)
    {
        _context = context;
    }
    
    public async Task Create(Categoria categoria)
    { 
        await _context.Categorias.AddAsync(categoria);
    }

    public async Task<List<Categoria>> GetAllAsync()
    {
        return await _context.Categorias.AsNoTracking().ToListAsync();
    }
    
    public async Task<Categoria?> GetByIdAsync(Guid id)
    {
        return await _context.Categorias.FindAsync(id);
    }
}