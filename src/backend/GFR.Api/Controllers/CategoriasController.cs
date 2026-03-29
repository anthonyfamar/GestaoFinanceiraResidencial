using GFR.Domain.Entities;
using GFR.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace GFR.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriasController : ControllerBase
    {
        private readonly GfrDbContext _context;

        public CategoriasController(GfrDbContext context) 
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult RegistraCategorias(Categoria categoria)
        {
            _context.Categorias.Add(categoria);
            _context.SaveChanges();

            return Ok(categoria + " registrada com sucesso.");
        }

        [HttpGet]
        public IActionResult ListarCategorias()
        {
            var categorias = _context.Categorias.ToList();
            return Ok(categorias);
        }
    }
}
