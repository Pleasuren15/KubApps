using k8s.KubeConfigModels;
using k8s.Models;

namespace kubapp.api.Services.Interfaces;

public interface IContextService
{
    IList<Cluster> GetClustersAsync();
}
