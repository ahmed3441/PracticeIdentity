using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PracticeIdentity.Migrations
{
    /// <inheritdoc />
    public partial class CustomerInRoom : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CustomersInRooms",
                columns: table => new
                {
                    CheckIn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CheckOut = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RoomIdFK = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CustomerIdFK = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "FK_Customer_CustomerInRooms_CustomerId",
                        column: x => x.CustomerIdFK,
                        principalTable: "Customer",
                        principalColumn: "CustomerId");
                    table.ForeignKey(
                        name: "FK_Rooms_CustomersInRooms_RoomId",
                        column: x => x.RoomIdFK,
                        principalTable: "Rooms",
                        principalColumn: "RoomId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CustomersInRooms_CustomerIdFK",
                table: "CustomersInRooms",
                column: "CustomerIdFK");

            migrationBuilder.CreateIndex(
                name: "IX_CustomersInRooms_RoomIdFK",
                table: "CustomersInRooms",
                column: "RoomIdFK");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomersInRooms");

            migrationBuilder.AddColumn<string>(
                name: "CheckIn",
                table: "Customer",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CheckOut",
                table: "Customer",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "RoomIdFK",
                table: "Customer",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Customer_RoomIdFK",
                table: "Customer",
                column: "RoomIdFK");

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Customer_RoomId",
                table: "Customer",
                column: "RoomIdFK",
                principalTable: "Rooms",
                principalColumn: "RoomId");
        }
    }
}
