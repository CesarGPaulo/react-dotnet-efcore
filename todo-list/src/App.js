import { useState } from 'react';
import './App.css';
import AtividadeForm from './components/AtividadeForm';
import Atividade from './components/Atividade';

let initialState = [
  {
    id : 1,
    prioridade: '3',
    titulo: "titulo 1",
    descricao: 'Primeira atividade',
  },
  {
    id : 2,
    prioridade: '2',
    titulo: "titulo 2",
    descricao: 'Segunda atividade',
  },
  {
    id : 3,
    prioridade: '1',
    titulo: "titulo 3",
    descricao: 'Terceira atividade',
  },
];

function App() {
  const[atividades, setAtividades] = useState(initialState)

  function addAtividade(e){
    e.preventDefault();

    const atividade = {
      id: document.getElementById('inputID').value,
      prioridade: document.getElementById('inputPrioridade').value,
      titulo: document.getElementById('inputTitulo').value,
      descricao: document.getElementById('inputDescricao').value
    };
    setAtividades([...atividades, { ...atividade }]);
  }

  function deletarAtividade(id){
    const atividadeFiltradas = atividades.filter(atividade => atividade.id !== id)
    setAtividades(...[atividadeFiltradas]);
  }

  return (
    <>
    <AtividadeForm 
      addAtividade={addAtividade}
      atividades ={atividades}
    />
      <div className='mt-3'>
          {atividades.map(atv => (
            <Atividade key={atv.id}
            deletarAtividade={deletarAtividade}
            atv={atv}
            />
          ))}
      </div>
    </>
  );
}

export default App;
