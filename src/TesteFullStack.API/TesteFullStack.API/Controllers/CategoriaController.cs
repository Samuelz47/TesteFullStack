using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TesteFullStack.Application.DTOs;
using TesteFullStack.Application.Interfaces;

namespace TesteFullStack.API.Controllers;
[Route("[controller]")]
[ApiController]
public class CategoriaController : Controller
{
    private readonly ICategoriaService _categoriaService;

    public CategoriaController(ICategoriaService categoriaService)
    {
        _categoriaService = categoriaService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllCategoriasAsync()
    {
        var categorias = await _categoriaService.GetAllCategoriasAsync();
        return Ok(categorias);
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateCategoriaAsync([FromBody] CategoriaForRegistrationDTO dto)
    {
        var categoria = await _categoriaService.CreateCategoriaAsync(dto);
        if (categoria is null) return BadRequest(new { error = "Erro ao criar categoria" });
        return StatusCode(201, categoria);
    }
}