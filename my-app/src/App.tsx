import React, { useEffect, useRef, useState} from 'react';
import './App.css';
import Algoritmo from './components/AlgoritmoBox';
import { ICondicao } from './interfaces/Condicao';
import Grafico from './components/Grafico/index';
import FIFO from './algoritmos_escalonamento/fifo';
import SJF from './algoritmos_escalonamento/sjf';
import EDF from './algoritmos_escalonamento/edf';
import roundRobin from './algoritmos_escalonamento/roundRobin';
import ChartJS, { Chart, ChartType } from 'chart.js/auto';
import ApexCharts from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';
import { IProcesso } from './interfaces/Processo';


interface Processo {
  id: number;
  tempoExecucao: number;
  tempoChegada: number;
  numeroPagina: number;
  deadline: number;
}

const App: React.FC = () => {
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
  const [algoritmoSelecionado, setAlgoritmoSelecionado] = useState<string>('FIFO');
  const [resultadoEscalonamento, setResultadoEscalonamento] = useState<number[][] | null>(null);
  
  
 

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

  const escalonadores: Record<string, any> = {
    FIFO: FIFO,
    SJF: SJF,
    EDF: EDF,
    RR: roundRobin
    // Adicione outros escalonadores aqui
  };
 

  const handleRun = () => {
    const escalonadorSelecionado = escalonadores[algoritmoSelecionado];
    if (escalonadorSelecionado) {
      console.log('Rodando o algoritmo:', algoritmoSelecionado);

      // Atualizar os processos com as condições selecionadas antes de rodar o escalonador
      const novosProcessos = processosLista.map((processo) => ({
        ...processo,
        metodo: conditions.metodo,
        paginacao: conditions.paginacao,
        quantum: conditions.quantum,
        sobrecarga: conditions.sobrecarga,
        intervalo: conditions.intervalo,
      }));
      console.log('Valor de sobrecarga:', conditions.sobrecarga);
      console.log('Valor de quantum:', conditions.quantum);

      // Executar o escalonador com os novos processos
      const resultadoEscalonamento = new escalonadorSelecionado().escalonador(novosProcessos);
      console.log('Resultado do escalonamento:', resultadoEscalonamento);
    } else {
      console.error('Escalonador não encontrado.');
    }
  };

  
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title"> Escalonador de processos ;)</h1>
      </header>
      <main>
        <div className="firstSection">
        <Algoritmo conditions={conditions} setConditions={setConditions} processosLista={processosLista} setProcessosLista={function (value: React.SetStateAction<IProcesso[]>): void {
            throw new Error('Function not implemented.');
          } } />
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
          <button onClick={handleRun} >Run</button>
          <button>Reset</button>
        </div>
      </main>
    </div>
  );
}

export default App;
