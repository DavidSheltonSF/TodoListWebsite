using backend.Repositories;
using backend.Services;
using Microsoft.AspNetCore.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();

// Dependency injection
builder.Services.AddScoped<ITodoRepository, TodoRepository>();
builder.Services.AddScoped<ITodoService, TodoService>();

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseExceptionHandler((errorApp) =>
{
    errorApp.Run(async context =>
    {
        var exception = context.Features.Get<IExceptionHandlerFeature>()?.Error;


        switch (exception)
        {
            case KeyNotFoundException:
                context.Response.StatusCode = StatusCodes.Status404NotFound;
                break;

            default:
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                break;
        }

        await context.Response.WriteAsJsonAsync(new
        {
            message = exception?.Message
        });

    });
});

app.MapControllers();

app.Run();

