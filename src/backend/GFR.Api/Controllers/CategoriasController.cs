using GFR.Domain.Entities;
using GFR.Domain.Enums;
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

        [HttpGet("totais")]
        public IActionResult TotaisPorCategoria()
        {
            var categorias = _context.Categorias.ToList();
            var resultado = new List<object>();

            decimal totalGeralReceita = 0;
            decimal totalGeralDespesa = 0;

            //for each para cada pessoa
            foreach (var categoria in categorias)
            {
                //Filtra a transação por pessoa do tipo receita e soma o valor, se não tiver nenhuma transação do tipo receita, retorna 0
                var somaReceitas = _context.Transacoes
                    .Where(t => t.CategoriaId == categoria.Id && t.Tipo == TipoTransacao.Receita)
                    .Sum(t => t.Valor);

                //Filtra a transação por pessoa, tipo despesa e soma o valor
                var somaDespesas = _context.Transacoes
                    .Where(t => t.CategoriaId == categoria.Id && t.Tipo == TipoTransacao.Despesa)
                    .Sum(t => t.Valor);

                var saldo = somaReceitas - somaDespesas;

                totalGeralReceita += somaReceitas;
                totalGeralDespesa += somaDespesas;

                //monta o resultado da pessoa
                resultado.Add(new
                {
                    CategoriaId = categoria.Id,
                    Descricao = categoria.Descricao,
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
                Categorias = resultado,
                TotalGeral = totalGeral
            });
        }

        [HttpGet]
        public IActionResult Listar()
        {
            var categorias = _context.Categorias.ToList();
            return Ok(categorias);
        }
    }
}
