using AutoMapper;
using TesteFullStack.Application.DTOs;
using TesteFullStack.Domain.Entities;

namespace TesteFullStack.Application.Mappings;

public class PessoaMappingProfile : Profile
{
    public PessoaMappingProfile()
    {
        CreateMap<PessoaForRegistrationDTO, Pessoa>();
        CreateMap<Pessoa, PessoaDTO>();
    }
}