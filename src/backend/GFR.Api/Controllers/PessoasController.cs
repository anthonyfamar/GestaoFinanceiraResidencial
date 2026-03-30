using GFR.Domain.Entities;
using GFR.Domain.Enums;
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
            try
            {
                var pessoa = ObterPessoa(id);

                pessoa.Nome = pessoaEditada.Nome;
                pessoa.Idade = pessoaEditada.Idade;

                _context.SaveChanges();

                return Ok(pessoa);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            try
            {
                var pessoa = ObterPessoa(id);

                //remove as transações da pessoas em especifico
                var transacoes = _context.Transacoes.Where(t => t.PessoaId == id).ToList();
                _context.Transacoes.RemoveRange(transacoes);

                //remove a pessoa
                _context.Pessoas.Remove(pessoa);

                _context.SaveChanges();
                return Ok("Pessoa e suas transações removidas com sucesso.");
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet]
        public IActionResult Listar()
        {
            var pessoas = ObterListaDePessoas();
            return Ok(pessoas);
        }

        [HttpGet("totais")]
        public IActionResult TotaisPorPessoa()
        {
            var pessoas = ObterListaDePessoas();
            var resultado = new List<object>();

            decimal totalGeralReceita = 0;
            decimal totalGeralDespesa = 0;

            //for each para cada pessoa
            foreach (var pessoa in pessoas)
            {
                //Filtra a transação por pessoa do tipo receita e soma o valor, se não tiver nenhuma transação do tipo receita, retorna 0
                var somaReceitas = _context.Transacoes
                    .Where(t => t.PessoaId == pessoa.Id && t.Tipo == TipoTransacao.Receita)
                    .Sum(t => t.Valor);

                //Filtra a transação por pessoa, tipo despesa e soma o valor
                var somaDespesas = _context.Transacoes
                    .Where(t => t.PessoaId == pessoa.Id && t.Tipo == TipoTransacao.Despesa)
                    .Sum(t => t.Valor);

                var saldo = somaReceitas - somaDespesas;

                totalGeralReceita += somaReceitas;
                totalGeralDespesa += somaDespesas;

                //monta o resultado da pessoa
                resultado.Add(new
                {
                    PessoaId = pessoa.Id,
                    Nome = pessoa.Nome,
                    Receitas = somaReceitas,
                    Despesas = somaDespesas,
                    Saldo = saldo
                });
            }

            var totalGeral = new
            {
                TotalReceitas = totalGeralReceita,
                TotalDespesas = totalGeralDespesa,
                SaldoGeral = totalGeralReceita - totalGeralDespesa
            };

            return Ok(new
            {
                Pessoas = resultado,
                TotalGeral = totalGeral
            });
        }

        private Pessoa ObterPessoa(int id)
        {
            var pessoa = _context.Pessoas.Find(id);

            if (pessoa == null)
                throw new Exception("Pessoa não encontrada.");

            return pessoa;
        }

        private List<Pessoa> ObterListaDePessoas()
        {
            return _context.Pessoas.ToList();
        }
    }
}
