using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoList.Domain.Entities
{
    public class Atividade
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public Prioridade Prioridade { get; set; }
        public DateTime DataCriacao { get; set; }
        public DateTime DataConclusao { get; set; }
        public Atividade(int id, string titulo, string descricao) : this()
        {
           Id = id; 
           Titulo = titulo;
           Descricao = descricao;
        }
        public Atividade() => DataCriacao = DateTime.Now;
        public void Concluir(){
            if(DataConclusao == DateTime.MinValue)
                DataConclusao = DateTime.Now;
            else
                throw new Exception($"Atividade já concluída em: {DataConclusao.ToString("dd/MM/yyyy hh:mm")}");
            
        }
    }
}