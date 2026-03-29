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

        [HttpPut("{id}")]
        public IActionResult Editar(int id, Pessoa pessoaEditada)
        {
            var pessoa = ObterPessoa(id);

            if (pessoa == null)
                return NotFound("Pessoa não encontrada");

            pessoa.Nome = pessoaEditada.Nome;
            pessoa.Idade = pessoaEditada.Idade;

            _context.SaveChanges();

            return Ok(pessoa);
        }

        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            var pessoa = ObterPessoa(id);

            if (pessoa == null)
                return NotFound("Pessoa não encontrada.");
           
            //remove as transações da pessoas em especifico
            var transacoes = _context.Transacoes.Where(t => t.PessoaId == id).ToList(); 
            _context.Transacoes.RemoveRange(transacoes);

            //remove a pessoa
            _context.Pessoas.Remove(pessoa);

            _context.SaveChanges();
            return Ok("Pessoa e suas transações removidas com sucesso.");
        }

        [HttpGet]
        public IActionResult Listar() 
        {
            var pessoas = _context.Pessoas.ToList();
            return Ok(pessoas);
        }

        private Pessoa? ObterPessoa(int id)
        {
            return _context.Pessoas.Find(id);
        }
    }
}
