using GFR.Domain.Entities;
using GFR.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace GFR.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoasController : ControllerBase
    {
        private readonly GfrDbContext _context;

        public PessoasController(GfrDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Criar(Pessoa pessoa)
        {
            _context.Pessoas.Add(pessoa);
            _context.SaveChanges();

            return Ok("Pessoa registrada com sucesso.");
        }

        [HttpGet]
        public IActionResult Listar() 
        {
            var pessoas = _context.Pessoas.ToList();
            return Ok(pessoas);
        }
    }
}
