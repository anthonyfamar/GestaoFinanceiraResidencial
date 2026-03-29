using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace GFR.Domain.Entities
{
    //Classe que representa uma pessoa com id único, nome e idade
    public class Pessoa
    {
        public int Id { get; set; }

        //Usei string.Empty para evitar o nome ser nulo.
        [MaxLength(200)]
        public string Nome { get; set; } = string.Empty;

        public int Idade { get; set; }
    }
}
