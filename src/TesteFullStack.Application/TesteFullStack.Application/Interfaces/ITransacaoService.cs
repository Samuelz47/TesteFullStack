using TesteFullStack.Application.Common;
using TesteFullStack.Application.DTOs;

namespace TesteFullStack.Application.Interfaces;

public interface ITransacaoService
{
    Task<Result<TransacaoDTO>> CreateAsync(TransacaoForRegistrationDTO dto);
    Task<Result<TransacaoDTO>> GetbyIdAsync(Guid id);
    Task<Result<IEnumerable<TransacaoDTO>>> GetAllAsync();
}