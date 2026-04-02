using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using TesteFullStack.Application.Interfaces;
using TesteFullStack.Application.Mappings;
using TesteFullStack.Application.Services;
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
builder.Services.AddScoped<ICategoriaService, CategoriaService>();

// 3. AutoMapper
builder.Services.AddAutoMapper(_ => { }, typeof(CategoriaMappingProfile).Assembly);

// 4. Controllers e Configuração de JSON (Converte Enum para String)
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

// 5. O SEGREDO DO .NET 10: Adiciona o gerador nativo do OpenAPI
builder.Services.AddOpenApi(); 

var app = builder.Build();

// ==========================================
// PIPELINE DE EXECUÇÃO (Middlewares)
// ==========================================

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

// Mapeia os endpoints criados nos seus Controllers
app.MapControllers(); 

app.Run();