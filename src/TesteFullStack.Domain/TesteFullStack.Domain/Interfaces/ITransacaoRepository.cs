using TesteFullStack.Domain.Entities;

namespace TesteFullStack.Domain.Interfaces;

public interface ITransacaoRepository
{
    Task<Transacao?> GetByIdAsync(Guid id);
    Task<IEnumerable<Transacao>> GetAllAsync();
    Task CreateAsync(Transacao transacao);

}