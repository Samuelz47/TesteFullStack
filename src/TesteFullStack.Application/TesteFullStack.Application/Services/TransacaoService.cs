using AutoMapper;
using TesteFullStack.Application.Interfaces;
using TesteFullStack.Domain.Interfaces;

namespace TesteFullStack.Application.Services;

public class TransacaoService : ITransacaoService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _uow;

    public TransacaoService(IUnitOfWork uof, IMapper mapper)
    {
        _uow = uof;
        _mapper = mapper;
    }
}