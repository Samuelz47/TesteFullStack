using AutoMapper;
using TesteFullStack.Application.DTOs;
using TesteFullStack.Application.Interfaces;
using TesteFullStack.Domain.Entities;
using TesteFullStack.Domain.Interfaces;

namespace TesteFullStack.Application.Services;

public class CategoriaService : ICategoriaService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _uow;

    public CategoriaService(IUnitOfWork uof, IMapper mapper)
    {
        _uow = uof;
        _mapper = mapper;
    }

    public async Task<CategoriaDTO> CreateCategoriaAsync(CategoriaForRegistrationDTO dto)
    {
        var categoria = _mapper.Map<Categoria>(dto);
        
        await _uow.Categorias.Create(categoria);
        var sucess = await _uow.CommitAsync();

        if (!sucess)
        {
            throw new Exception("Erro ao criar Categoria");
        }
        
        return _mapper.Map<CategoriaDTO>(categoria);
    }

    public async Task<IEnumerable<CategoriaDTO>> GetAllCategoriasAsync()
    {
        var categorias = await _uow.Categorias.GetAllAsync();
        return _mapper.Map<IEnumerable<CategoriaDTO>>(categorias);
    }
}