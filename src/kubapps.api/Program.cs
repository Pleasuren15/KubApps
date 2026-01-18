using kubapps.api.Extensions;
using kubapps.api.Services.Interfaces;
using Scalar.AspNetCore;

namespace kubapps.api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddServices();

            var app = builder.Build();
            app.AddWebApplication();
            

            app.MapGet("/getAllCluster", (IContextService contextService) =>
            {
                var results = contextService.GetClusters();
                return results;
            })
            .WithName("GetAllClusters");


            app.MapGet("/getAllPods", (IPodService podService) =>
            {
                var results = podService.GetAllPodsAsync();
                return results;
            })
            .WithName("GetAllPods");

            app.Run();
        }
    }
}
