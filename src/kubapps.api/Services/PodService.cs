using System.Diagnostics;
using k8s;
using k8s.Models;
using kubapps.api.Services.Interfaces;

namespace kubapps.api.Services
{
    public class PodService(ILogger<ContextService> logger) : IPodService
    {
        private readonly ILogger<ContextService> _logger = logger;

        public async Task<IList<V1Pod>> GetAllPodsAsync()
        {
            try
            {
                _logger.LogInformation("{methodName} Start", nameof(GetAllPodsAsync));

                var kubeConfig = KubernetesClientConfiguration.LoadKubeConfig();
                var config = KubernetesClientConfiguration.BuildConfigFromConfigObject(kubeConfig);
                var client = new Kubernetes(config);
                var pods = new List<V1Pod>();

                // get namesapces
                var namespaces = await client.CoreV1.ListNamespaceAsync();

                foreach (var ns in namespaces.Items)
                {
                    _logger.LogInformation("Namespace: {namespaceName}", ns.Metadata.Name);
                    var namespacePods = await client.CoreV1.ListNamespacedPodAsync(ns.Metadata.Name);
                    foreach (var pod in namespacePods.Items)
                    {
                        _logger.LogInformation("Pod: {podName}", pod.Metadata.Name);
                        pods.Add(pod);
                    }
                }

                return pods!;
            }
            catch (Exception ex)
            {
                _logger.LogError("{methodName} Error: ErrorMessage {errorMax}", nameof(GetAllPodsAsync), ex.Message);
                throw;
            }
        }
    }
}
