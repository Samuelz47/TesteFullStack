using TesteFullStack.Application.Common;
using TesteFullStack.Application.DTOs;

namespace TesteFullStack.Application.Interfaces;

public interface ICategoriaService
{
    Task<Result<CategoriaDTO>> CreateCategoriaAsync(CategoriaForRegistrationDTO dto);
    Task<IEnumerable<CategoriaDTO>> GetAllCategoriasAsync();
    Task<Result<CategoriaDTO>> GetbyIdAsync(Guid id);
}