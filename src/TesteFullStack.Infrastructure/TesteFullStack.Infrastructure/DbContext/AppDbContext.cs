using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using TesteFullStack.Domain.Entities;

namespace TesteFullStack.Infrastructure.DbContext;

public class AppDbContext : Microsoft.EntityFrameworkCore.DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    
    public DbSet<Pessoa> Pessoas { get; set; }
    public DbSet<Transacao> Transacoes { get; set; }
    public DbSet<Categoria> Categorias { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Pessoa>(entity =>
        {
            entity.HasKey(p => p.Id);
            
            entity.Property(p => p.Nome)
                .IsRequired()
                .HasMaxLength(200);
            
            entity.Property(p => p.Idade)
                .IsRequired();
            
            entity.HasMany(p => p.Transacoes)
                .WithOne(t => t.Pessoa)
                .HasForeignKey(t => t.PessoaId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        builder.Entity<Categoria>(entity =>
        {
            entity.HasKey(p => p.Id);

            entity.Property(c => c.Descricao)
                .IsRequired()
                .HasMaxLength(400);

            entity.Property(c => c.Finalidade)
                .IsRequired();
        });

        builder.Entity<Transacao>(entity =>
        {
            entity.HasKey(p => p.Id);

            entity.Property(c => c.Descricao)
                .IsRequired()
                .HasMaxLength(400);
            
            entity.Property(t => t.Valor)
                .IsRequired();
            entity.ToTable(t => t.HasCheckConstraint("CK_Transacao_ValorPositivo", "Valor > 0"));
            
            entity.Property(t => t.Tipo)
                .IsRequired();
            
            entity.HasOne(t => t.Pessoa)
                .WithMany(p => p.Transacoes)
                .HasForeignKey(t => t.PessoaId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            
            entity.HasOne(t => t.Categoria)
                .WithMany()
                .HasForeignKey(t => t.CategoriaId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict); //Não permite excluir uma categoria se ela já foi usada.
        });
    }
}