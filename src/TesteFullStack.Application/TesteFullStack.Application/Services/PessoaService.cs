using AutoMapper;
using TesteFullStack.Application.Common;
using TesteFullStack.Application.DTOs;
using TesteFullStack.Application.Interfaces;
using TesteFullStack.Domain.Entities;
using TesteFullStack.Domain.Enums;
using TesteFullStack.Domain.Interfaces;

namespace TesteFullStack.Application.Services;

public class PessoaService : IPessoaService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _uow;

    public PessoaService(IUnitOfWork uof, IMapper mapper)
    {
        _uow = uof;
        _mapper = mapper;
    }

    public async Task<Result<PessoaDTO>> CreateAsync(PessoaForRegistrationDTO dto)
    {
        var pessoa = _mapper.Map<Pessoa>(dto);
        
        await _uow.Pessoas.CreateAsync(pessoa);
        var success = await _uow.CommitAsync();

        if (!success)
        {
            return Result<PessoaDTO>.Failure("Erro ao criar pessoa");
        }
        
        var pessoaDto = _mapper.Map<PessoaDTO>(pessoa);
        return Result<PessoaDTO>.Success(pessoaDto);
    }

    public async Task<IEnumerable<PessoaDTO>> GetAllAsync()
    {
        var pessoas = await _uow.Pessoas.GetAllAsync();
        return _mapper.Map<IEnumerable<PessoaDTO>>(pessoas);
    }

    public async Task<Result<RelatorioGeralPessoasDTO>> GetAllWithTransacoesAsync()
    {
        var pessoas = await _uow.Pessoas.GetAllWithTransacoesAsync();
        var relatorio = new RelatorioGeralPessoasDTO();

        foreach (var pessoa in pessoas) //foreach para determinar saldo, receita e total em cada pessoa
        {
            var receitas = pessoa.Transacoes.Where(t => t.Tipo == TipoTransacao.Receita)
                .Sum(t => t.Valor);
            var despesas = pessoa.Transacoes.Where(t => t.Tipo == TipoTransacao.Despesa)
                .Sum(t => t.Valor);
            //Dentro de cada pessoa temos seu relatorio individual
            relatorio.Pessoas.Add(new RelatorioPessoaDTO
            {
                Nome = pessoa.Nome,
                TotalReceitas = receitas,
                TotalDespesas = despesas,
                Saldo = receitas - despesas
            });
        }
        //Define os totais do relatorio geral
        relatorio.TotalGeralReceitas = relatorio.Pessoas.Sum(p => p.TotalReceitas); 
        relatorio.TotalGeralDespesas = relatorio.Pessoas.Sum(p => p.TotalDespesas);
        relatorio.SaldoGeral = relatorio.TotalGeralReceitas - relatorio.TotalGeralDespesas;

        return Result<RelatorioGeralPessoasDTO>.Success(relatorio);
    }

    public async Task<Result<PessoaDTO>> GetbyIdAsync(Guid id)
    {
        var pessoa = await _uow.Pessoas.GetByIdAsync(id);
        if (pessoa is null) return Result<PessoaDTO>.Failure("Pessoa não encontrada");
        
        var pessoaDto = _mapper.Map<PessoaDTO>(pessoa);
        return Result<PessoaDTO>.Success(pessoaDto);
    }

    public async Task<Result<PessoaDTO>> UpdateAsync(Guid id, PessoaForRegistrationDTO dto)
    {
        var pessoa = await _uow.Pessoas.GetByIdAsync(id);
        if (pessoa is null) return Result<PessoaDTO>.Failure("Pessoa não encontrada");
        
        var pessoaAtualizada = _mapper.Map(dto, pessoa); //Chamamos o AutoMapper dessa forma pra evitar apagar dados existentes
        _uow.Pessoas.Edit(pessoaAtualizada);
        var success = await _uow.CommitAsync();
        if (!success) Result<PessoaDTO>.Failure("Erro ao atualizar pessoa");
        
        var pessoadto = _mapper.Map<PessoaDTO>(pessoaAtualizada);
        return Result<PessoaDTO>.Success(pessoadto);
    }

    public async Task<Result<bool>> DeleteAsync(Guid id)
    {
        var pessoa = await _uow.Pessoas.GetByIdAsync(id);
        if (pessoa is null) return Result<bool>.Failure("Pessoa não encontrada");
        
        _uow.Pessoas.Delete(pessoa);
        var sucess = await _uow.CommitAsync();
        if  (!sucess) return Result<bool>.Failure("Erro ao excluir pessoa");
        return Result<bool>.Success(true);
    }
}