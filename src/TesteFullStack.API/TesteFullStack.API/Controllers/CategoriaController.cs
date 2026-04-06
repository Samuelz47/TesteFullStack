using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TesteFullStack.Application.DTOs;
using TesteFullStack.Application.Interfaces;

namespace TesteFullStack.API.Controllers;
[Route("api/categorias")]
[ApiController]
public class CategoriaController : ControllerBase
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
        if (!categoria.IsSuccess) return BadRequest(categoria.Message);
        return CreatedAtRoute("GetCategoriaById", new { id = categoria.Data.Id }, categoria.Data);
    }

    [HttpGet("{id}",  Name = "GetCategoriaById")]
    public async Task<IActionResult> GetAsync(Guid id)
    {
        var categoria = await _categoriaService.GetbyIdAsync(id);
        if (!categoria.IsSuccess) return NotFound(categoria.Message);
        return Ok(categoria.Data);
    }
}