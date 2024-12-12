using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class workorderdocumenttable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WorkOrderDocuments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FilePath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FileSize = table.Column<int>(type: "int", nullable: true),
                    FileContent = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    FileType = table.Column<int>(type: "int", nullable: true),
                    ProjectId = table.Column<int>(type: "int", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkOrderDocuments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkOrderDocuments_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "JobLevelLeave",
                columns: new[] { "Id", "IsDeleted", "JobLevel" },
                values: new object[,]
                {
                    { 1, false, "Junior level" },
                    { 2, false, "Middle level" },
                    { 3, false, "Senior level" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_WorkOrderDocuments_ProjectId",
                table: "WorkOrderDocuments",
                column: "ProjectId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WorkOrderDocuments");

            migrationBuilder.DeleteData(
                table: "JobLevelLeave",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "JobLevelLeave",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "JobLevelLeave",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
