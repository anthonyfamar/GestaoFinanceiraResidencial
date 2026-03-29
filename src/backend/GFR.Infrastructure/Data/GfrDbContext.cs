using GFR.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace GFR.Infrastructure.Data
{
    //Representação do banco de dados usando Entity Framework Core, onde cada DbSet representa uma tabela, baseada nas entidade do domínio
    //DbContext = Banco, DbSet = Tabela, Classe = Estrutura da tabela
    public class GfrDbContext : DbContext
    {
        public GfrDbContext(DbContextOptions<GfrDbContext> options) : base(options) { }

        public DbSet<Pessoa> Pessoas { get; set; }

        public DbSet<Categoria> Categorias { get; set; }

        public DbSet<Transacao> Transacoes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Transacao>().Property(t => t.Valor).HasColumnType("REAL");
        }

    }
}
