using TesteFullStack.Application.Common;
using TesteFullStack.Application.DTOs;

namespace TesteFullStack.Application.Interfaces;

public interface IPessoaService
{
    Task<Result<PessoaDTO>> CreateAsync(PessoaForRegistrationDTO dto);
    Task<IEnumerable<PessoaDTO>> GetAllAsync();
    Task<Result<RelatorioGeralPessoasDTO>> GetAllWithTransacoesAsync();
    Task<Result<PessoaDTO>> GetbyIdAsync(Guid id);
    Task<Result<PessoaDTO>> UpdateAsync(Guid id, PessoaForRegistrationDTO dto);
    Task<Result<bool>> DeleteAsync(Guid id);
    
}