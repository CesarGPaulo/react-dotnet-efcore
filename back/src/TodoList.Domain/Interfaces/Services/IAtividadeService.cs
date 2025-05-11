using System.Threading.Tasks;
using TodoList.Domain.Entities;

namespace TodoList.Domain.Interfaces.Services
{
    public interface IAtividadeService
    {
        Task<Atividade> AdicionarAtividade (Atividade model);
        Task<Atividade> AtualizarAtividade(Atividade model);
        Task<bool> DeletarAtividade (int atividadeId);
        Task <bool> ConcluirAtividade(Atividade model);
        Task<Atividade> PegaTodasAtividadePorIdAsync (int atividadeId);
        Task<Atividade []> PegaTodasAtividadesAsync (Atividade model);
    }
}