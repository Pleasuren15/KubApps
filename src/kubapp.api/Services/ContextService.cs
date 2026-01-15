using k8s;
using k8s.KubeConfigModels;
using kubapp.api.Services.Interfaces;

namespace kubapp.api.Services;

public class ContextService(ILogger<ContextService> logger) : IContextService
{
    private readonly ILogger<ContextService> _logger = logger;

    public IList<Cluster> GetClustersAsync()
    {
        _logger.LogInformation("{methodName} Start", nameof(GetClustersAsync));

        var config = KubernetesClientConfiguration.LoadKubeConfig();
        var clusters = new List<Cluster>();
        foreach (var cluster in config.Clusters)
        {
            clusters.Add(cluster);
        }

        _logger.LogInformation("{methodName} End: ClusterCount {clusterCount}", nameof(GetClustersAsync), clusters.Count);
        return clusters;
    }
}
