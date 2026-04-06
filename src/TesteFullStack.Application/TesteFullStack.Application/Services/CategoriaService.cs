using AutoMapper;
using TesteFullStack.Application.Common;
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

    public async Task<Result<CategoriaDTO>> CreateCategoriaAsync(CategoriaForRegistrationDTO dto)
    {
        var categoria = _mapper.Map<Categoria>(dto);
        
        await _uow.Categorias.Create(categoria);
        var sucess = await _uow.CommitAsync();

        if (!sucess)
        {
            return Result<CategoriaDTO>.Failure("Erro ao criar categoria");
        }
        
        var categoriaDto = _mapper.Map<CategoriaDTO>(categoria);
        return Result<CategoriaDTO>.Success(categoriaDto);
    }

    public async Task<IEnumerable<CategoriaDTO>> GetAllCategoriasAsync()
    {
        var categorias = await _uow.Categorias.GetAllAsync();
        return _mapper.Map<IEnumerable<CategoriaDTO>>(categorias);
    }
    
    public async Task<Result<CategoriaDTO>> GetbyIdAsync(Guid id)
    {
        var categoria = await _uow.Categorias.GetByIdAsync(id);
        if (categoria is null) return Result<CategoriaDTO>.Failure("Categoria não encontrada");
        
        var categoriaDto = _mapper.Map<CategoriaDTO>(categoria);
        return Result<CategoriaDTO>.Success(categoriaDto);
    }
}