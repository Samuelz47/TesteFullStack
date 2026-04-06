using Microsoft.AspNetCore.Mvc;
using TesteFullStack.Application.DTOs;
using TesteFullStack.Application.Interfaces;

namespace TesteFullStack.API.Controllers;
[Route("api/transacoes")]
[ApiController]
public class TransacaoController : ControllerBase
{
    private readonly ITransacaoService _transacaoService;

    public TransacaoController(ITransacaoService transacaoService)
    {
        _transacaoService = transacaoService;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAllAsync()
    {
        var transacoes = await _transacaoService.GetAllAsync();
        return Ok(transacoes);
    }

    [HttpGet("{id}", Name = "GetTransacaoById")]
    public async Task<IActionResult> GetbyIdAsync(Guid id)
    {
        var transacao = await _transacaoService.GetbyIdAsync(id);
        if (!transacao.IsSuccess) return NotFound(transacao.Message);
        return Ok(transacao.Data);
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateAsync([FromBody] TransacaoForRegistrationDTO dto)
    {
        var transacao = await _transacaoService.CreateAsync(dto);
        if (!transacao.IsSuccess) return BadRequest(transacao.Message);
        return CreatedAtRoute("GetTransacaoById", new { id = transacao.Data.Id }, transacao.Data);
    }
}