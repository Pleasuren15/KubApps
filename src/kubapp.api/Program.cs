using kubapp.api.Extensions;
using kubapp.api.Services;
using kubapp.api.Services.Interfaces;

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
            builder.Services.AddSingleton<IContextService, ContextService>();

            var app = builder.Build();
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();

            app.MapGet("/getAllCluster", (IContextService contextService) =>
            {
                var results = contextService.GetClustersAsync();
                return results;
            })
            .WithName("GetAllClusters");

            app.Run();
        }
    }
}
