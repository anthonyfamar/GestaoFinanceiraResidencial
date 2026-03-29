using GFR.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace GFR.Domain.Entities
{
    //Classe para representar uma categoria de transação financeira
    public class Categoria
    {
        public int Id { get; set; }

        public string Descricao { get; set; } = string.Empty;

        public FinalidadeCategoria Finalidade { get; set; }
    }
}
