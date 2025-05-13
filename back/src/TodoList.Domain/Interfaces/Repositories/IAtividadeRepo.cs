using System.Threading.Tasks;
using TodoList.Domain.Entities;

namespace TodoList.Domain.Interfaces.Repositories
{
    public interface IAtividadeRepo : IGeneralRepo
    {
        Task<Atividade[]> PegaTodasAsync();
        Task<Atividade> PegaPorIdAsync(int id);
        Task<Atividade> PegaPorTituloAsync(string titulo);
    }
}