using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using PracticeIdentity.Models;

namespace PracticeIdentity.Data
{
    public class ApplicationDbContext: IdentityDbContext<User, Role, Guid, UserClaim, UserRole, UserLogin, RoleClaim, UserToken>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> Options) : base(Options)
        {

        }
        //Tables in databases
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserClaim> UsersClaim { get; set; }
        public DbSet<UserRole> UsersRole { get; set; }
        public DbSet<UserLogin> UsersLogin { get; set; }
        public DbSet<RoleClaim> RolesClaim { get; set; }
        public DbSet<UserToken> UsersToken { get; set; }

        public DbSet<Rooms> Rooms { get; set; }
        public DbSet<Customer> Customer { get; set; }

        public DbSet<CustomersInRooms> CustomersInRooms { get; set; }
        public DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Rooms>(entity =>
            {
                entity.ToTable("Rooms");
                entity.HasKey(e => e.RoomId).HasName("PK_Rooms");

                entity.Property(p => p.RoomId)
                .HasColumnName("RoomId")
                .ValueGeneratedOnAdd();

                entity.Property(p => p.RoomNo)
                .IsRequired()
                .HasColumnType("nvarchar(250)");

                entity.Property(p => p.RoomType)
                .IsRequired()
                .HasColumnType("nvarchar(250)");

                entity.Property(p => p.Bed)
                .IsRequired()
                .HasColumnType("nvarchar(250)");

                entity.Property(p => p.Price)
                .IsRequired()
                .HasColumnType("int");
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.ToTable("Customer");
                entity.HasKey(e => e.CustomerId).HasName("PK_Customer");

            });

            modelBuilder.Entity<CustomersInRooms>(entity =>
            {
                entity.ToTable("CustomersInRooms");
                entity.HasKey(d=>d.CustomersInRoomsId).HasName("PK_CustomerInRooms");

              entity.HasOne<Rooms>()
             .WithMany()
             .HasForeignKey(d => d.RoomIdFK)
             .OnDelete(DeleteBehavior.ClientSetNull)
             .HasConstraintName("FK_Rooms_CustomersInRooms_RoomId");

                entity.HasOne<Customer>()
                  .WithMany()
                  .HasForeignKey(d => d.CustomerIdFK)
                  .OnDelete(DeleteBehavior.ClientSetNull)
                  .HasConstraintName("FK_Customer_CustomerInRooms_CustomerId");

            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.ToTable("Employee");
                entity.HasKey(e => e.EmployeeId).HasName("PK_Employee");

                entity.Property(p => p.EmployeeId)
                .HasColumnName("EmployeeId")
                .ValueGeneratedOnAdd();

                entity.Property(p => p.EmployeeName)
                .IsRequired()
                .HasColumnType("nvarchar(250)");

                entity.Property(p => p.EmployeeMobileNo)
                .IsRequired()
                .HasColumnType("int");

                entity.Property(p => p.EmploeeGender)
                .IsRequired()
                .HasColumnType("nvarchar(6)");

                entity.Property(p => p.EmployeeEmailId)
                .IsRequired()
                .HasColumnType("nvarchar(250)");

            });
        }
    }
}
