using System.Diagnostics;
using k8s.Models;
using kubapps.api.Models;

namespace kubapps.api.Services.Interfaces;

public interface IPodService
{
    Task<IList<Pod>> GetAllPodsAsync();

    Task<Process> PortFowardPod(string podName, string @namespace, int localPort, int podPort);
}
