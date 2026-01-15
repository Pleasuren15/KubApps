using k8s.KubeConfigModels;

namespace kubapp.api.Services.Interfaces;

public interface IContextService
{
    IList<Cluster> GetClustersAsync();
}
