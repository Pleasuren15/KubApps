using kubapp.api.Extensions;

namespace kubapp.api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddAuthorization();
            builder.Services.AddOpenApi();
            builder.Services.AddLogging();
            builder.Services.AddKubernetesClient();

            var app = builder.Build();
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();

            app.MapGet("/weatherforecast", (HttpContext httpContext) =>
            {
                
            })
            .WithName("GetWeatherForecast");

            app.Run();
        }
    }
}
