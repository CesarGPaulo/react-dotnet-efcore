using System;
using System.Threading.Tasks;
using TodoList.Domain.Entities;
using TodoList.Domain.Interfaces.Repositories;
using TodoList.Domain.Interfaces.Services;

namespace TodoList.Domain.Services
{
    public class AtividadeService : IAtividadeService
    {
        private readonly IAtividadeRepo _atividadeRepo;

        public AtividadeService(IAtividadeRepo atividadeRepo)
        {
            _atividadeRepo = atividadeRepo;
        }
        public async Task<Atividade> AdicionarAtividade(Atividade model)
        {
            if(await _atividadeRepo.PegaPorTituloAsync(model.Titulo) != null) 
                throw new Exception("Já existe uma atividade com esse título.");
            
            if(await _atividadeRepo.PegaPorIdAsync(model.Id) == null)
            {
                _atividadeRepo.Adicionar(model);

                if(await _atividadeRepo.SalvarMudancasAsync())
                    return model;
            }

            return null;
        }

        public async Task<Atividade> AtualizarAtividade(Atividade model)
        {
            if(model.DataConclusao != DateTime.MinValue)
                throw new Exception($"Não se pode atualizar uma atividade já concluída.");

            if(await _atividadeRepo.PegaPorIdAsync(model.Id) == null)
            {
                _atividadeRepo.Atualizar(model);

                if(await _atividadeRepo.SalvarMudancasAsync())
                    return model;
            }

            return null;
        }

        public async Task<bool> ConcluirAtividade(Atividade model)
        {
            if(model != null)
            {
                model.Concluir();
                _atividadeRepo.Atualizar(model);
                return await _atividadeRepo.SalvarMudancasAsync();
            }

            return false;
        }

        public async Task<bool> DeletarAtividade(int atividadeId)
        {
            var atividade = await _atividadeRepo.PegaPorIdAsync(atividadeId);
            if(atividade == null)
                throw new Exception("Essa atividade não existe");
            
            _atividadeRepo.Deletar(atividade);
            return await _atividadeRepo.SalvarMudancasAsync();
        }

        public async Task<Atividade> PegarAtividadePorIdAsync(int atividadeId)
        {
            try
            {
                var atividade = await _atividadeRepo.PegaPorIdAsync(atividadeId);
                if(atividade == null) return null;

                return atividade;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Atividade[]> PegarTodasAtividadesAsync()
        {
            try
            {
                var atividades = await _atividadeRepo.PegaTodasAsync();
                if(atividades != null) return null;

                return atividades;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}