namespace kubapps.api.Models
{
    public class Pod
    {
        public string Name { get; set; } = string.Empty;
        public string Namespace { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string ControlledBy { get; set; } = string.Empty;
        public string Health { get; set; } = string.Empty;
        public List<string> Labels { get; set; } = new List<string>();
        public string Logs { get; set; } = string.Empty;
    }
}
