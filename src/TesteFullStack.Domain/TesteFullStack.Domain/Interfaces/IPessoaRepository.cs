using TesteFullStack.Domain.Entities;

namespace TesteFullStack.Domain.Interfaces;

public interface IPessoaRepository
{
    Task<Pessoa?> GetByIdAsync(Guid id);
    Task CreateAsync(Pessoa pessoa);
    Task Delete(Pessoa pessoa);
    Task Edit(Pessoa pessoa);
    Task<IEnumerable<Pessoa>> GetAllAsync();
    Task<IEnumerable<Pessoa>> GetAllWithTransacoesAsync();

}