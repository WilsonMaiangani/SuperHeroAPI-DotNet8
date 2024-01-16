using Microsoft.EntityFrameworkCore;
using SuperHeroAPI_DotNet8.Data;
using MySql.Data.MySqlClient;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

void teste()
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    //var connectionString = "Server=localhost;Port=3306;Database=UserManager;Uid=root;Pwd=;";
    MySqlConnection Conexao = new MySqlConnection(connectionString);
    Conexao.Open();
    Conexao.Close();
}
builder.Services.AddDbContext<DataContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    //options.UseMySql(
    //    connectionString,
    //    ServerVersion.AutoDetect(connectionString)
    //    )
    //.LogTo(Console.WriteLine, LogLevel.Information)
    //.EnableSensitiveDataLogging()
    //.EnableDetailedErrors();

    options.UseSqlServer(connectionString);
});

#region [Cors]
builder.Services.AddCors();
#endregion

var app = builder.Build();

#region [Cors]
app.UseCors(c =>
{
    c.AllowAnyHeader();
    c.AllowAnyMethod();
    c.AllowAnyOrigin();
});
#endregion

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
//teste();
app.Run();

