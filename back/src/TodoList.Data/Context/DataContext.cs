using Microsoft.EntityFrameworkCore;
using TodoList.Data.Mappings;
using TodoList.Domain.Entities;

namespace TodoList.Data.Context
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}
        public DbSet<Atividade> Atividades { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new AtividadeMap());
        }
    }
}