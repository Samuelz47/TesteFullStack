using AutoMapper;
using TesteFullStack.Application.DTOs;
using TesteFullStack.Domain.Entities;

namespace TesteFullStack.Application.Mappings;

public class TransacaoMappingProfile : Profile
{
    public TransacaoMappingProfile()
    {
        CreateMap<TransacaoForRegistrationDTO, Transacao>();
        CreateMap<Transacao, TransacaoDTO>()
            .ForMember(dest =>
                dest.PessoaNome, opt =>
                opt.MapFrom(src => src.Pessoa.Nome))
            .ForMember(dest =>
                dest.CategoriaDescricao, opt =>
                opt.MapFrom(src => src.Categoria.Descricao));
    }
}