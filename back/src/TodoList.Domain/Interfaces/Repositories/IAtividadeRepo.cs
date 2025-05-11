using System.Threading.Tasks;
using TodoList.Domain.Entities;

namespace TodoList.Domain.Interfaces.Repositories
{
    public interface IAtividadeRepo
    {
        Task<Atividade[]> PegaTodasAsync();
        Task<Atividade> PegaPorIdAsync();
        Task<Atividade> PegaPorTituloAsync();
    }
}