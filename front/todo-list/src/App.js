import { useEffect, useState } from 'react';
import './App.css';
import {Button, Modal} from 'react-bootstrap';
import AtividadeForm from './components/AtividadeForm';
import AtividadeLista from './components/AtividadeLista';
import api from './api/atividade';

function App() {
  const [showAtividadeModal, setShowAtividadeModal] = useState(false);
  const [smConfirmaCancelamento, setSmConfirmaCancelamento] = useState(false);
  const[atividades, setAtividades] = useState([])
  const[atividade, setAtividade] = useState({id : 0})

  const handleAtividadeModal = () => setShowAtividadeModal(!showAtividadeModal);

  const handleConfirmaCancelamento = (id) => {
    if(id !==0 && id !==undefined){
      const atividade = atividades.filter((atividade) => atividade.id === id);
      setAtividade(atividade[0]);
    }
    else{
      setAtividade({id:0})
    }

    setSmConfirmaCancelamento(!smConfirmaCancelamento);
  }
    
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

    handleAtividadeModal();
  }

  const novaAtividade = () => {
    setAtividade({id:0});

    handleAtividadeModal();
  }

  const deletarAtividade = async (id) => {
    handleConfirmaCancelamento(0);
    if(await api.delete(`atividade/${id}`))
    {
      const atividadeFiltradas = atividades.filter(atividade => atividade.id !== id)
      setAtividades(...[atividadeFiltradas]);
    }
  }

  const selecionaAtividade = (id) => {
    const atividade = atividades.filter((atividade) => atividade.id === id);
    setAtividade(atividade[0]);

    handleAtividadeModal();
  }

  const atualizarAtividade = async (ativ) => {
    const response = await api.put(`atividade/${ativ.id}`, ativ)
    const {id} = response.data;
    setAtividades(atividades.map(item => item.id === id ? response.data : item));
    setAtividade({id:0});

    handleAtividadeModal();
  }

  const cancelarAtividade = (ativ) => {
    setAtividade({id:0});

    handleAtividadeModal();
  }

  return (
    <>
      <div className='d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-1'>
        <h1>Atividade {atividade.id !== 0 ? atividade.id : ''}</h1>
        <Button variant="outline-secondary" onClick={novaAtividade}>
          <i className='fas fa-plus'></i>
        </Button>
      </div>
      
      <AtividadeLista
          atividades = {atividades}
          selecionaAtividade = {selecionaAtividade}
          handleConfirmaCancelamento={handleConfirmaCancelamento}
      />

      <Modal show={showAtividadeModal} onHide={handleAtividadeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>Atividade {atividade.id !== 0 ? atividade.id : ''}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AtividadeForm 
            addAtividade={addAtividade}
            atualizarAtividade = {atualizarAtividade}
            cancelarAtividade = {cancelarAtividade}
            ativSelecionada = {atividade}
            atividades ={atividades}
          />
        </Modal.Body>
      </Modal>

      <Modal show={smConfirmaCancelamento} onHide={handleConfirmaCancelamento}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>Excluindo atividade {''}
              {atividade.id !== 0 ? atividade.id : ''}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir a atividade {atividade.id}
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-between'>
          <button className='btn btn-outline-success me-2' onClick={() => deletarAtividade(atividade.id)}>
            <i className='fas fa-check me-2'></i>
              Sim
          </button>
          <button className='btn btn-danger me-2' onClick={() => handleConfirmaCancelamento(0)}>
            <i className='fas fa-times me-2'></i>
              Não
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
