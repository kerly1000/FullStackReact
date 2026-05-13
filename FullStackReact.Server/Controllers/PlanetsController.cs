using FullStackReact.Server.Data;
using Microsoft.AspNetCore.Mvc;
using FullStackReact.Server.ViewModel;
using FullStackReact.Server.Domain;

namespace FullStackReact.Server.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class PlanetsController : ControllerBase
    {
        private readonly PlanetContext _context;

        public PlanetsController
            (
                PlanetContext context
            )
        {
            _context = context;
        }

        public IActionResult SchoolIndex()
        {
            //muutuja resulti sisse pannakse domaini alt saadud info
            //mis antakse vaatesse returni juures
            //lisaks sellele antakse info edasi domaini modelist view modelisse
            var result = _context.Planets
                .Select(x => new PlanetsListViewModel
                {
                    PlanetsId = x.PlanetsId,
                    Name = x.Name,
                    Description = x.Description,
                    Type = x.Type,
                    Mass = x.Mass
                });

            return Ok(result);
        }

        [HttpPost]
        public IActionResult Create([FromBody] PlanetsCreateViewModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Name))
            {
                return BadRequest("Name is required");
            }
            // Continue with the rest of the creation logic

            var planet = new Planets
            {
                PlanetsId = Guid.NewGuid(),
                Name = model.Name,
                Description = model.Description,
                Type = model.Type,
                Mass = model.Mass
            };

            _context.Planets.Add(planet);
            _context.SaveChanges();

            return Ok(new
            {
                planetsId = planet.PlanetsId,
                name = planet.Name,
                description = planet.Description,
                type = planet.Type,
                mass = planet.Mass
            });
        }
    }
}