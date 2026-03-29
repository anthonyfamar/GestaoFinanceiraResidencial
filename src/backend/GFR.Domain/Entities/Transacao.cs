using GFR.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace GFR.Domain.Entities
{
    public class Transacao
    {
        public int id { get; set; }

        public string Descricao { get; set; } = string.Empty;

        public decimal Valor { get; set; }

        public TipoTransacao Tipo { get; set; }

        public int PessoaId { get; set; }

        public int CategoriaId { get; set; }
    }
}
