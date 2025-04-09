import React from 'react'

export default function Atividade(props) {
  function prioridadeLabel(param){
    switch(param){
      case 'Baixa':
      case 'Normal':
      case 'Alta':
        return param;
     default:
      return 'Não definido';
    }
  }
  
  function prioridadeStyle(param, icon){
    switch(param){
      case'Baixa':
        return icon ? 'smile' : 'success';
      case'Normal':
      return icon ? 'meh': 'dark';
      case'Alta':
      return icon ? 'frown' : 'warning';
     default:
      return 'Não definido';
    }
  }

  return (
    <div className={"card mb-2 shadow-sm border-" + prioridadeStyle(props.atv.prioridade)}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">
                  <span className="badge text-bg-secondary">{props.atv.id}</span> - {props.atv.titulo}
                  </h5>
                  <h6>
                    Prioridade: 
                    <span className={"ms-1 text-" + prioridadeStyle(props.atv.prioridade)}>
                      <i className={"me-1 far fa-" + prioridadeStyle(props.atv.prioridade, true)}></i>
                        {prioridadeLabel(props.atv.prioridade)}</span>
                  </h6>
                </div>
                <p className="card-text">{props.atv.descricao}</p>
                <div className="d-flex justify-content-end pt-2 border-top">
                  <button className="btn btn-outline-primary me-2 btn-sm"
                    onClick={() => props.selecionaAtividade(props.atv.id)}>
                    <i className="me-1 fa-solid fa-pen-to-square"></i>
                      Editar
                  </button>
                  <button 
                    className="btn btn-outline-danger me-2 btn-sm" 
                    onClick={() => props.deletarAtividade(props.atv.id)}>
                    <i className="me-1 fa-regular fa-trash-can"></i>
                      Excluir
                  </button>
                </div>
              </div>
            </div>
  )
}
