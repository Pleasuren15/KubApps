using k8s;
using k8s.KubeConfigModels;
using kubapps.api.Services.Interfaces;

namespace kubapps.api.Services;

public class ContextService(ILogger<ContextService> logger) : IContextService
{
    private readonly ILogger<ContextService> _logger = logger;

    public IList<Cluster> GetClusters()
    {
        try
        {
            _logger.LogInformation("{methodName} Start", nameof(GetClusters));

            var config = KubernetesClientConfiguration.LoadKubeConfig();
            var clusters = new List<Cluster>();
            foreach (var cluster in config.Clusters)
            {
                clusters.Add(cluster);
            }

            return clusters;
        }
        catch (Exception ex)
        {
            _logger.LogError("{methodName} Error: ErrorMessage {errorMax}", nameof(GetClusters), ex.Message);
            throw;
        }
        finally
        {
            _logger.LogInformation("{methodName} End", nameof(GetClusters));
        }
    }
}
