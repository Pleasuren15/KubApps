using k8s.KubeConfigModels;

namespace kubapps.api.Services.Interfaces;

public interface IContextService
{
    IList<Cluster> GetClustersAsync();
}
