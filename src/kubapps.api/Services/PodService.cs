using System.Diagnostics;
using System.Text;
using k8s;
using k8s.Models;
using kubapps.api.Models;
using kubapps.api.Services.Interfaces;

namespace kubapps.api.Services
{
    public class PodService(ILogger<ContextService> logger) : IPodService
    {
        private readonly ILogger<ContextService> _logger = logger;

        public async Task<IList<Pod>> GetAllPodsAsync()
        {
            try
            {
                _logger.LogInformation("{methodName} Start", nameof(GetAllPodsAsync));

                var kubeConfig = KubernetesClientConfiguration.LoadKubeConfig();
                var config = KubernetesClientConfiguration.BuildConfigFromConfigObject(kubeConfig);
                var client = new Kubernetes(config);
                var pods = new List<Pod>();

                // get namesapces
                var namespaces = await client.CoreV1.ListNamespaceAsync();

                foreach (var ns in namespaces.Items)
                {
                    _logger.LogInformation("Namespace: {namespaceName}", ns.Metadata.Name);
                    var namespacePods = await client.CoreV1.ListNamespacedPodAsync(ns.Metadata.Name);
                    foreach (var pod in namespacePods.Items)
                    {
                        _logger.LogInformation("Pod: {podName}", pod.Metadata.Name);

                        var name = pod.Metadata.Name;
                        var namespaceName = ns.Name();
                        var status = pod.Status.Phase;

                        bool isReady = pod.Status.ContainerStatuses != null &&
                                       pod.Status.ContainerStatuses.All(c => c.Ready);

                        var controlledBy = pod.Metadata.OwnerReferences != null && pod.Metadata.OwnerReferences.Count > 0 ? pod.Metadata.OwnerReferences[0].Kind + "/" + pod.Metadata.OwnerReferences[0].Name : "N/A";
                        var toRemove = pod.Metadata.GenerateName.Remove(pod.Metadata.GenerateName.Length - 1);
                        controlledBy = controlledBy.Replace($"/{toRemove}", string.Empty);

                        var labels = pod.Metadata.Labels != null ? pod.Metadata.Labels.Select(l => l.Key + "=" + l.Value).ToList() : new List<string>();
                        var dateCreated = pod.Metadata.CreationTimestamp!.Value;

                        pods.Add(new Pod(name, namespaceName, status, controlledBy, isReady, labels, dateCreated));
                    }
                }

                return pods;
            }
            catch (Exception ex)
            {
                _logger.LogError("{methodName} Error: ErrorMessage {errorMax}", nameof(GetAllPodsAsync), ex.Message);
                throw;
            }
            finally
            {
                _logger.LogInformation("{methodName} End", nameof(GetAllPodsAsync));
            }
        }

        public async Task<Process> PortFowardPod(string podName, string @namespace, int localPort, int podPort)
        {
            try
            {
                _logger.LogInformation("{methodName} Start", nameof(PortFowardPod));

                var startInfo = new ProcessStartInfo
                {
                    FileName = "kubectl",
                    Arguments = $"port-forward pod/{podName} {localPort}:{podPort} -n {@namespace}",
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };

                var process = new Process { StartInfo = startInfo };
                process.Start();

                return process;
            }
            catch (Exception ex)
            {
                _logger.LogError("{methodName} Error: ErrorMessage {errorMax}", nameof(PortFowardPod), ex.Message);
                throw;
            }
            finally
            {
                _logger.LogInformation("{methodName} End", nameof(PortFowardPod));
            }
        }
    }
}
