using k8s.Models;
using kubapps.api.Models;

namespace kubapps.api.Services.Interfaces;

public interface IPodService
{
    Task<IList<Pod>> GetAllPodsAsync();
}
