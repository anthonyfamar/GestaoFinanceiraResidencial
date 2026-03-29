using GFR.Domain.Entities;
using GFR.Domain.Enums;
using GFR.Infrastructure.Data;

namespace GFR.Application.Services
{
    public class TransacaoService
    {
        private readonly GfrDbContext _context;

        public TransacaoService(GfrDbContext context)
        {
            _context = context;
        }

        public void RegistrarTransacaoFinanceira(Transacao transacao)
        {
            //Regra 1: Valor sempre positivo
            if (transacao.Valor <= 0)
                throw new InvalidOperationException("Valor deve ser maior que zero.");

            //Validações
            var pessoa = _context.Pessoas.Find(transacao.PessoaId);
            if (pessoa == null)
                throw new Exception("Pessoa não encontrada.");

            var categoria = _context.Categorias.Find(transacao.CategoriaId);
            if (categoria == null)
                throw new Exception("Categoria não encontrada.");

            //Regra 2: Menor de idade
            if (pessoa.Idade < 18 && transacao.Tipo == TipoTransacao.Receita)
                throw new Exception("Menores de idade não podem registrar receitas.");

            //Regra 3: Restrição de categorias dependendo da finalidade
            switch (categoria.Finalidade)
            {
                case FinalidadeCategoria.Ambas:
                    break; //sempre compatível
                case FinalidadeCategoria.Receita:
                    if (transacao.Tipo != TipoTransacao.Receita)
                        throw new Exception("Categoria não compatível com o tipo da transação.");
                    break;
                case FinalidadeCategoria.Despesa:
                    if (transacao.Tipo != TipoTransacao.Despesa)
                        throw new Exception("Categoria não compatível com o tipo da transação.");
                    break;
            }

            _context.Transacoes.Add(transacao);
            _context.SaveChanges();
        }
    }
}
