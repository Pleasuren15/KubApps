namespace kubapps.api.Models
{
    public class Pod(string name, string nameSpace, string status, string controlledBy, bool isReady, List<string> labels, DateTime dateTimeCreated)
    {
        public string Name { get; set; } = name;
        public string Namespace { get; set; } = nameSpace;
        public string Status { get; set; } = status;
        public string ControlledBy { get; set; } = controlledBy;
        public bool IsReady { get; set; } = isReady;
        public List<string> Labels { get; set; } = labels;
        public DateTime DateTimeCreated { get; set; } = dateTimeCreated;
    }
}
