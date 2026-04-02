using AutoMapper;
using TesteFullStack.Application.DTOs;
using TesteFullStack.Domain.Entities;

namespace TesteFullStack.Application.Mappings;

public class CategoriaMappingProfile : Profile
{
    public CategoriaMappingProfile()
    {
        CreateMap<CategoriaForRegistrationDTO, Categoria>();
        CreateMap<Categoria, CategoriaDTO>();
    }
}