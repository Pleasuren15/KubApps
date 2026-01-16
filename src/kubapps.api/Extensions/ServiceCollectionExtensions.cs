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

        // Add application services
        services.AddSingleton<IContextService, ContextService>();

        return services;
    }
}
