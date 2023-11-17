import React, { useState, useEffect } from 'react';
import './App.css';
import Algoritmo from './components/AlgoritmoBox';
import { ICondicao } from './interfaces/Condicao';
import Grafico from './components/Grafico/index';


interface Processo {
  id: number;
  tempoExecucao: number;
  tempoChegada: number;
  numeroPagina: number;
  deadline: number;
}

function App() {
  const estadoInicial: ICondicao = {
    metodo: "FIFO",
    paginacao: "FIFO",
    quantum: 0,
    sobrecarga: 2,
    intervalo: 0,
  };

  const [conditions, setConditions] = useState<ICondicao>(estadoInicial);
  const [processosLista, setProcessosLista] = useState<Processo[]>([]);
  const [tempoInput, setTempoInput] = useState<number>(1);
  const [deadlineInput, setDeadlineInput] = useState<number>(0);
  const [chegadaInput, setChegadaInput] = useState<number>(1);
  const [paginasInput, setPaginasInput] = useState<number>(0);
  const [novaListaProcessos, setNovaListaProcessos] = useState<Processo[]>([]);

  const adicionarProcesso = () => {
    console.log('Clicou no botão de adicionar processo');
    const novoProcesso: Processo = {
      id: processosLista.length + 1,
      tempoExecucao: tempoInput,
      tempoChegada: chegadaInput,
      numeroPagina: paginasInput,
      deadline: deadlineInput,
    };

    const updatedList = [...novaListaProcessos, novoProcesso];
    setNovaListaProcessos(updatedList);
    console.log('Nova lista de processos:', updatedList);

    setProcessosLista((prevProcessosLista) => [...prevProcessosLista, novoProcesso]);
  };

  const handleDelete = (id: number) => {
    const updatedCards = novaListaProcessos.filter((processo) => processo.id !== id);
    console.log("Item excluído com o ID:", id);
    console.log("Nova lista de processos:", updatedCards);
    setNovaListaProcessos(updatedCards);
  };

 

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title"> Escalonador de processos ;)</h1>
      </header>
      <main>
        <div className="firstSection">
          <Algoritmo conditions={conditions} setConditions={setConditions} />
        </div>

        <div className="secondSection">
          <div className="boxProcess">
            <main className='cardinteiro'>
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
                <button onClick={adicionarProcesso}>Adicionar</button>
              </div>

              <div className="cardLista ">
                <h2 className="subtitle">Lista de Processos:</h2>
                <div className='processoslista'>
                  {novaListaProcessos.map((processo) => (
                    <div className="card2" key={processo.id}>
                      <div className='boxCard'>
                        <label htmlFor="" className="btn">
                          <p className='cardinfo' >Tempo: {processo.tempoExecucao}</p>
                        </label>
                        <label htmlFor="" className="btn">
                          <p className='cardinfo' >Deadline: {processo.deadline}</p>
                        </label>
                      </div>
                      <div className='boxCard'>
                        <label htmlFor="" className="btn">
                          <p className='cardinfo'> Chegada: {processo.tempoChegada}</p>
                        </label>
                        <label htmlFor="" className="btn">
                          <p className='cardinfo' > Páginas: {processo.numeroPagina}</p>
                        </label>
                      </div>
                      <button className='exit' onClick={() => handleDelete(processo.id)}>Deletar</button>
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="thirdSection">
          <button>Run</button>
          <button>Reset</button>
        </div>
        <Grafico/>
      </main>
    </div>
  );
}

export default App;
