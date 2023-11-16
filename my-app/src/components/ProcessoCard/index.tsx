import React, { useState } from 'react';
import './processoCard.css'



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

const ProcessoCard: React.FC<ProcessoCardProps> = ({ processosLista }) => {
  const [tempoInput, setTempoInput] = useState<number>(1);
  const [deadlineInput, setDeadlineInput] = useState<number>();
  const [chegadaInput, setChegadaInput] = useState<number>(1);
  const [paginasInput, setPaginasInput] = useState<number>(0);
  const [novaListaProcessos, setNovaListaProcessos] = useState<Processo[]>(processosLista);

  const adicionarProcesso = () => {
    const novoProcesso: Processo = {
      id: processosLista.length + 1,
      tempoChegada: chegadaInput,
      tempoExecucao: tempoInput,
      numeroPagina: paginasInput,
      deadline: deadlineInput,
    };

    const updatedList = [...novaListaProcessos, novoProcesso];
    setNovaListaProcessos(updatedList);
    console.log('Nova lista de processos:', updatedList);

    setNovaListaProcessos((prevProcessosLista) => [...prevProcessosLista, novoProcesso]);
  };
 
  interface ProcessoItemProps {
    processo: Processo;
  }
  
  const ProcessoItem: React.FC<ProcessoItemProps> = ({ processo}) => (
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
  

  return (
    <main className='cardinteiro' >
      <h2 className="subtitle" >Criando Processos:</h2>
      <div className="card">
        <div className='boxCard'>
          <label htmlFor="" className="label">
            Tempo:
            <input className="btn" type="number" min='1' value={tempoInput}
              onChange={(e) => setTempoInput(parseInt(e.target.value))} />
          </label>
          <label htmlFor="" className="label">
            Deadline:
            <input className="btn" type="number" min='0' value={deadlineInput}
              onChange={(e) => setDeadlineInput(parseInt(e.target.value))}  />
          </label>
        </div>
        <div className='boxCard'>
          <label htmlFor="" className="label">
            Chegada:
            <input className="btn" type="number" min='1' value={chegadaInput}
              onChange={(e) => setChegadaInput(parseInt(e.target.value))} />
          </label>
          <label htmlFor="" className="label">
            Páginas:
            <input className="btn" type="number" value={paginasInput}
              onChange={(e) => setPaginasInput(parseInt(e.target.value))} />
          </label>
        </div>
        <button className='exit'></button>
      </div>
      <div className="cardLista ">
          <h2 className="subtitle">Lista de Processos:</h2>
          <div className='processoslista'>
            {processosLista.map((processo) => (
              <ProcessoItem key={processo.id} processo={processo}  />
            ))}
          </div>
          <button  onClick={adicionarProcesso} >adicionar processo</button>
        </div>
    </main>
  );
};

export default ProcessoCard;