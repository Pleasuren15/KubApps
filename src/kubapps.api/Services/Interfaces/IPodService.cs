using System.Diagnostics;
using kubapps.api.Models;

namespace kubapps.api.Services.Interfaces;

public interface IPodService
{
    Task<IList<Pod>> GetAllPodsAsync(string clusterName);

    Task<Process> PortFowardPod(string podName, string @namespace, int localPort, int podPort);
    Task<string> GetPodLogsAsync(string clusterName, string podName, string @namespace);
}
