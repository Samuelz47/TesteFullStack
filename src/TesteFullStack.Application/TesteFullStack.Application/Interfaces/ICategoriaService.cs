using TesteFullStack.Application.DTOs;

namespace TesteFullStack.Application.Interfaces;

public interface ICategoriaService
{
    Task<CategoriaDTO> CreateCategoriaAsync(CategoriaForRegistrationDTO dto);
    Task<IEnumerable<CategoriaDTO>> GetAllCategoriasAsync();
}