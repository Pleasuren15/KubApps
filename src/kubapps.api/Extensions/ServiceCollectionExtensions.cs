using kubapps.api.Services;
using kubapps.api.Services.Interfaces;

namespace kubapps.api.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        // Add framework services
        services.AddAuthorization();
        services.AddOpenApi();
        services.AddLogging();
        services.AddCors(options =>
        {
            options.AddDefaultPolicy(builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            });
        });

        // Add application services
        services.AddSingleton<IContextService, ContextService>();
        services.AddSingleton<IPodService, PodService>();

        return services;
    }
}
