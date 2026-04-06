using AutoMapper;
using TesteFullStack.Application.Common;
using TesteFullStack.Application.DTOs;
using TesteFullStack.Application.Interfaces;
using TesteFullStack.Domain.Entities;
using TesteFullStack.Domain.Enums;
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

    public async Task<Result<TransacaoDTO>> CreateAsync(TransacaoForRegistrationDTO dto)
    {
        var pessoa = await _uow.Pessoas.GetByIdAsync(dto.PessoaId);
        var categoria = await _uow.Categorias.GetByIdAsync(dto.CategoriaId);
        if (pessoa is null || categoria is null) 
            return Result<TransacaoDTO>.Failure("Pessoa ou categoria não encontrada");
        
        if (pessoa.Idade < 18 && dto.Tipo != TipoTransacao.Despesa)
            return Result<TransacaoDTO>.Failure("Pessoa menor de idade só pode transacionar despesa");
            
        // Se a categoria for exclusiva de Receita, não aceita Despesa
        if (categoria.Finalidade == FinalidadeCategoria.Receita && dto.Tipo == TipoTransacao.Despesa)
        {
            return Result<TransacaoDTO>.Failure("Você não pode lançar uma Despesa usando uma categoria de Receita.");
        }

        // Se a categoria for exclusiva de Despesa, não aceita Receita
        if (categoria.Finalidade == FinalidadeCategoria.Despesa && dto.Tipo == TipoTransacao.Receita)
        {
            return Result<TransacaoDTO>.Failure("Você não pode lançar uma Receita usando uma categoria de Despesa.");
        }

        var transacao = _mapper.Map<Transacao>(dto);
        await _uow.Transacoes.CreateAsync(transacao);
        var success = await _uow.CommitAsync();
        
        if (!success) return Result<TransacaoDTO>.Failure("Erro ao criar transação");
        
        var transacaoDto = _mapper.Map<TransacaoDTO>(transacao);
        return Result<TransacaoDTO>.Success(transacaoDto);
    }

    public async Task<Result<TransacaoDTO>> GetbyIdAsync(Guid id)
    {
        var transacao = await _uow.Transacoes.GetByIdAsync(id);
        if (transacao is null) return Result<TransacaoDTO>.Failure("Transação não encontrada");

        var transacaoDto = _mapper.Map<TransacaoDTO>(transacao);
        return Result<TransacaoDTO>.Success(transacaoDto);
    }

    public async Task<Result<IEnumerable<TransacaoDTO>>> GetAllAsync()
    {
        var transacoes = await _uow.Transacoes.GetAllAsync();
        var transacoesDto = _mapper.Map<IEnumerable<TransacaoDTO>>(transacoes);
        
        return Result<IEnumerable<TransacaoDTO>>.Success(transacoesDto);
    }
}