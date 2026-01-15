using k8s;
using kubapp.api.Services.Interfaces;

namespace kubapp.api.Managers;

public class ContextService(IKubernetes kubernetes) : IContextService
{
    private readonly IKubernetes _kubernetes;
}
