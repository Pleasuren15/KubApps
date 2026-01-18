using k8s.Models;

namespace kubapps.api.Services.Interfaces;

public interface IPodService
{
    Task<IList<V1Pod>> GetAllPodsAsync();
}
