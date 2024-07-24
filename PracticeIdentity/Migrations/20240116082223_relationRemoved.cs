using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PracticeIdentity.Migrations
{
    /// <inheritdoc />
    public partial class relationRemoved : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {


            migrationBuilder.DropColumn(
                name: "RoomId",
                table: "Customer");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "RoomId",
                table: "Customer",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "RoomsRoomId",
                table: "Customer",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Customer_RoomsRoomId",
                table: "Customer",
                column: "RoomsRoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_Customer_Rooms_RoomsRoomId",
                table: "Customer",
                column: "RoomsRoomId",
                principalTable: "Rooms",
                principalColumn: "RoomId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
