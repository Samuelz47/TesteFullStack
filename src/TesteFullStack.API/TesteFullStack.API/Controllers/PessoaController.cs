using Microsoft.AspNetCore.Mvc;
using TesteFullStack.Application.DTOs;
using TesteFullStack.Application.Interfaces;
using TesteFullStack.Domain.Entities;

namespace TesteFullStack.API.Controllers;
[Route("api/pessoas")]
[ApiController]
public class PessoaController : ControllerBase
{
    private readonly IPessoaService _pessoaService;

    public PessoaController(IPessoaService pessoaService)
    {
        _pessoaService = pessoaService;
    }

    [HttpGet("{id}", Name = "GetPessoabyId")]
    public async Task<IActionResult> GetAsync(Guid id)
    {
        var pessoa = await _pessoaService.GetbyIdAsync(id);
        if (!pessoa.IsSuccess) return NotFound(pessoa.Message);
        return Ok(pessoa.Data);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllAsync()
    {
        var pessoas = await _pessoaService.GetAllAsync();
        return Ok(pessoas);
    }

    [HttpGet("transacoes")]
    public async Task<IActionResult> GetAllWithTransacoesAsync()
    {
        var pessoas = await _pessoaService.GetAllWithTransacoesAsync();
        return Ok(pessoas);
    }

    [HttpPost]
    public async Task<IActionResult> PostAsync([FromBody] PessoaForRegistrationDTO dto)
    {
        var pessoa = await _pessoaService.CreateAsync(dto); 
        if (!pessoa.IsSuccess) return BadRequest(pessoa.Message);
        return CreatedAtRoute("GetPessoabyId", new { id = pessoa.Data.Id }, pessoa.Data);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutAsync(Guid id, [FromBody] PessoaForRegistrationDTO dto)
    {
        var pessoa = await _pessoaService.UpdateAsync(id, dto);
        if (!pessoa.IsSuccess) return BadRequest(pessoa.Message);
        return Ok(pessoa.Data);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsync(Guid id)
    {
        var pessoa = await _pessoaService.DeleteAsync(id);
        if (!pessoa.IsSuccess) return BadRequest(pessoa.Message);
        return NoContent();
    }
}