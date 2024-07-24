using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PracticeIdentity.Migrations
{
    /// <inheritdoc />
    public partial class CheckOut : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AddColumn<string>(
                name: "CheckOut",
                table: "Customer",
                type: "nvarchar(max)",
                nullable: true,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CheckOut",
                table: "Customer");

            migrationBuilder.RenameColumn(
                name: "RoomIdFK",
                table: "Customer",
                newName: "RoomId");

            migrationBuilder.RenameIndex(
                name: "IX_Customer_RoomIdFK",
                table: "Customer",
                newName: "IX_Customer_RoomId");
        }
    }
}
