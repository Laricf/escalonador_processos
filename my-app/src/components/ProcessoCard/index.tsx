import React from 'react';
import './processoCard.css'


interface ProcessoItemProps {
  processo: Processo;
}

const ProcessoItem: React.FC<ProcessoItemProps> = ({ processo }) => (
  <div className="card2">
    <div className='boxCard'>
      <label htmlFor="" className="btn">
        Tempo: {processo.tempoExecucao}
      </label>
      <label htmlFor="" className="btn">
        Deadline:{processo.deadline}
      </label>
    </div>
    <div className='boxCard'>
      <label htmlFor="" className="btn">
        Chegada: {processo.tempoChegada}
      </label>
      <label htmlFor="" className="btn">
        Páginas:{processo.numeroPagina}
      </label>
    </div>
  </div>
);
interface ProcessoCardProps {
  tempo?: number;
  deadline?: number;
  chegada?: number;
  paginas?: number;
  processosLista: Processo[];
}

interface Processo {
  id: number;
  tempoChegada: number;
  tempoExecucao: number;
  numeroPagina: number;
  deadline?: number
}

const ProcessoCard: React.FC<ProcessoCardProps> = ({
  tempo = 1,
  deadline = 0,
  chegada = 1,
  paginas = 0,
  processosLista,
}) => {
  return (
    <main className='cardinteiro' >
      <div className="card">
        <div className='boxCard'>
          <label htmlFor="" className="label">
            Tempo:
            <input className="btn" type="number" min='1' value={tempo} />
          </label>
          <label htmlFor="" className="label">
            Deadline:
            <input className="btn" type="number" min='0' value={deadline} />
          </label>
        </div>
        <div className='boxCard'>
          <label htmlFor="" className="label">
            Chegada:
            <input className="btn" type="number" min='1' value={chegada} />
          </label>
          <label htmlFor="" className="label">
            Páginas:
            <input className="btn" type="number" value={paginas} />
          </label>
        </div>
        <div className="cardLista ">
          <h2>Lista de Processos:</h2>
          <ul className='processoslista'>
            {processosLista.map((processo) => (
              <ProcessoItem key={processo.id} processo={processo}  />
            ))}
          </ul>
        </div>
        <button className='exit'></button>
      </div>
    </main>
  );
};

export default ProcessoCard;