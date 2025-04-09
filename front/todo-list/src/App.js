import { useEffect, useState } from 'react';
import './App.css';
import AtividadeForm from './components/AtividadeForm';
import AtividadeLista from './components/AtividadeLista';
import api from './api/atividade';

function App() {
  const[atividades, setAtividades] = useState([])
  const[atividade, setAtividade] = useState({id : 0})

  const pegaTodasAtividades = async () => {
    const response = await api.get('atividade');
    return response.data;
  }

  useEffect( () => {
    const getAtividades = async () => {
      const todasAtividades = await pegaTodasAtividades();
      if(todasAtividades) setAtividades(todasAtividades);
    };
    getAtividades();
  }, []
  );

  const addAtividade = async (ativ) => {
    const response = await api.post('atividade', ativ); //atv é o body da requisição
    console.log(response.data)
    setAtividades([...atividades, response.data]);
  }

  const deletarAtividade = async (id) => {
    if(await api.delete(`atividade/${id}`))
    {
      const atividadeFiltradas = atividades.filter(atividade => atividade.id !== id)
      setAtividades(...[atividadeFiltradas]);
    }
  }

  function selecionaAtividade(id){
    const atividade = atividades.filter((atividade) => atividade.id === id);
    setAtividade(atividade[0]);
  }

  const atualizarAtividade = async (ativ) => {
    const response = await api.put(`atividade/${ativ.id}`, ativ)
    const {id} = response.data;
    setAtividades(atividades.map(item => item.id === id ? response.data : item));
    setAtividade({id:0});
  }

  function cancelarAtividade(ativ){
    setAtividade({id:0});
  }

  return (
    <>
    <AtividadeForm 
      addAtividade={addAtividade}
      atualizarAtividade = {atualizarAtividade}
      cancelarAtividade = {cancelarAtividade}
      ativSelecionada = {atividade}
      atividades ={atividades}
    />
    <AtividadeLista
        atividades = {atividades}
        deletarAtividade = {deletarAtividade} 
        selecionaAtividade = {selecionaAtividade}
    />
    </>
  );
}

export default App;
