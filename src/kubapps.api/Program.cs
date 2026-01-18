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
            .WithName("AllClusters");


            app.MapGet("/pods/{clusterName}", async (IPodService podService, string clusterName) =>
            {
                var results = await podService.GetAllPodsAsync(clusterName);
                return results;
            })
            .WithName("AllPods");

            app.Run();
        }
    }
}
