namespace FullStackReact.Server.Controllers
{
    internal class PlanetsDetailViewModel
    {
        public Guid PlanetsId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public int Mass { get; set; }
    }
}