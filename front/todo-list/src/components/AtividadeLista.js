import React from 'react'
import Atividade from './Atividade'

export default function AtividadeLista(props) {
  return (
    <div className='mt-3'>
    {props.atividades.map(atv => (
      <Atividade key={atv.id}
      deletarAtividade={props.deletarAtividade}
      atv={atv}
      selecionaAtividade = {props.selecionaAtividade}
      />
    ))}
</div>
  )
}
