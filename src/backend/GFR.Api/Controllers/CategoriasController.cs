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
        public IActionResult Criar(Categoria categoria)
        {
            _context.Categorias.Add(categoria);
            _context.SaveChanges();

            return Ok("Categoria registrada com sucesso.");
        }

        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            var categoria = _context.Categorias.Find(id);

            if (categoria == null)
                throw new Exception("Categoria não encontrada.");

            //remove a categoria
            _context.Categorias.Remove(categoria);

            _context.SaveChanges();
            return Ok("Categoria removida com sucesso.");
        }

        [HttpGet]
        public IActionResult Listar()
        {
            var categorias = _context.Categorias.ToList();
            return Ok(categorias);
        }
    }
}
