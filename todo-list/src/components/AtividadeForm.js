import React from 'react'

export default function AtividadeForm(props) {
  return (
    <form className='row g-3'>
        <div className="col-md-6">
          <label className="form-label">ID</label>
          <input id ="inputID" type="text" className="form-control" readOnly value = {Math.max.apply(Math, props.atividades.map((item) => item.id))+1}/>
        </div>
        <div className="col-md-6">
          <label className="form-label">Prioridade</label>
            <select id="inputPrioridade" className="form-select">
            < option defaultValue="0">Escolha...</option>
              <option value="1">Baixa</option>
              <option value="2">Normal</option>
              <option value="3">Alta</option>
            </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Título</label>
          <input id="inputTitulo" type="text" className="form-control"/>
        </div>
        <div className="col-md-6">
          <label className="form-label">Descrição</label>
          <input id="inputDescricao" type="text" className="form-control"/>
        </div>
        <hr />
        <div className='col-12'>
          <button
            className="btn btn-outline-secondary" 
            onClick={props.addAtividade} 
          >
            Adicionar atividade
          </button>
        </div>
      </form>
  )
}
