using System.Text.Json;
using k8s;

namespace kubapp.api.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddKubernetesClient(this IServiceCollection services)
    {
        var logger = services.BuildServiceProvider().GetRequiredService<ILoggerFactory>().CreateLogger($"{nameof(AddKubernetesClient)}");

        services.AddSingleton<IKubernetes>(sp =>
        {
            KubernetesClientConfiguration config = KubernetesClientConfiguration.BuildConfigFromConfigFile();
            logger.LogInformation("Kubernetes client configured to use config file at: {config}", JsonSerializer.Serialize(config));
            return new Kubernetes(config);
        });

        return services;
    }
}
