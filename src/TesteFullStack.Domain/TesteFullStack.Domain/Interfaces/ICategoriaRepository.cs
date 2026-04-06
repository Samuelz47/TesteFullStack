using TesteFullStack.Domain.Entities;

namespace TesteFullStack.Domain.Interfaces;

public interface ICategoriaRepository
{
    Task Create(Categoria categoria);
    Task<List<Categoria>> GetAllAsync();
    Task<Categoria?> GetByIdAsync(Guid id);
}