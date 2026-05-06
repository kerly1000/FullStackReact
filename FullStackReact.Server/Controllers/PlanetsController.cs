using FullStackReact.Server.Data;
using Microsoft.AspNetCore.Mvc;
using FullStackReact.Server.ViewModel;

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
            //muutuja resulti sisse pannakse domeeni alt saadud info, mis antakse edasi vaatesse
            //returni juures
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
    }
}
