using GFR.Application.Services;
using GFR.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Transactions;
//endpoint que irá receber os dados, serve para testar tudo de uma vez
namespace GFR.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacoesController : ControllerBase
    {
        private readonly TransacaoService _service;

        public TransacoesController(TransacaoService service)
        {
            _service = service;
        }

        [HttpPost]
        public IActionResult Post([FromBody] Transacao transacao)
        {
            try
            {
                _service.RegistrarTransacaoFinanceira(transacao);
                return Ok("Transação registrada com sucesso!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
