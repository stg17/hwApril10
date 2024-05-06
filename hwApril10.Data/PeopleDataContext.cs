using Microsoft.EntityFrameworkCore;

namespace hwApril10.Data;

public class PeopleDataContext : DbContext
{
    private readonly string _connectionString;

    public PeopleDataContext(string connectionString)
    {
        _connectionString = connectionString;
    }

    public DbSet<Person> People { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_connectionString);
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
        {
            relationship.DeleteBehavior = DeleteBehavior.Restrict;
        }
    }
}