using System.Text.Json.Serialization;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TesteFullStack.Application.Interfaces;
using TesteFullStack.Application.Mappings;
using TesteFullStack.Application.Services;
using TesteFullStack.Application.Validators;
using TesteFullStack.Domain.Interfaces;
using TesteFullStack.Infrastructure.DbContext;
using TesteFullStack.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// 1. Configuração do Banco de Dados (SQLite)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// 2. Injeção de Dependências
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<ICategoriaRepository, CategoriaRepository>();
builder.Services.AddScoped<IPessoaRepository, PessoaRepository>();
builder.Services.AddScoped<ITransacaoRepository, TransacaoRepository>();
builder.Services.AddScoped<ICategoriaService, CategoriaService>();
builder.Services.AddScoped<IPessoaService, PessoaService>();
builder.Services.AddScoped<ITransacaoService, TransacaoService>();

// 3. AutoMapper
builder.Services.AddAutoMapper(_ => { }, typeof(CategoriaMappingProfile).Assembly);

// 4. Controllers e Configuração de JSON (Converte Enum para String)
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

// 5. Adiciona o gerador nativo do OpenAPI
builder.Services.AddOpenApi(); 

// 6. Habilita a validação automática para não precisar ficar chamando manualmente nos Controllers
builder.Services.AddFluentValidationAutoValidation()
    .AddFluentValidationClientsideAdapters();

builder.Services.AddValidatorsFromAssemblyContaining<PessoaValidator>();

// 7. CUSTOMIZAÇÃO DO ERRO 400
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.InvalidModelStateResponseFactory = context =>
    {
        // Pega as mensagens de erro que o FluentValidation gerou
        var erros = context.ModelState
            .Where(e => e.Value.Errors.Count > 0)
            .SelectMany(x => x.Value.Errors)
            .Select(x => x.ErrorMessage)
            .ToList();

        // Formata para o Front
        var respostaBonita = new
        {
            Sucesso = false,
            Mensagem = "Encontramos alguns erros nos dados enviados.",
            Erros = erros
        };

        return new BadRequestObjectResult(respostaBonita);
    };
});

// PIPELINE DE EXECUÇÃO (Middlewares)

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    // Expõe o arquivo de especificação invisível gerado pelo .NET 10
    app.MapOpenApi(); 
    
    // Pluga a interface clássica do Swagger lendo o arquivo gerado acima
    app.UseSwaggerUI(options => 
    {
        options.SwaggerEndpoint("/openapi/v1.json", "TesteFullStack API v1");
        options.RoutePrefix = "swagger"; // Mantém a URL padrão
    });
}

app.UseHttpsRedirection();

// Mapeia os endpoints dos Controllers
app.MapControllers(); 

app.Run();