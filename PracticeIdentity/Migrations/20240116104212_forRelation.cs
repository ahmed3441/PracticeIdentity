using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PracticeIdentity.Migrations
{
    /// <inheritdoc />
    public partial class forRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {


            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Customer_RoomId",
                table: "Customer",
                column: "RoomIdFK",
                principalTable: "Rooms",
                principalColumn: "RoomId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Customer_RoomId",
                table: "Customer");

            migrationBuilder.AddForeignKey(
                name: "FK_Customer_Rooms_RoomId",
                table: "Customer",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "RoomId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
