import React, { useEffect, useRef, useState} from 'react';
import './App.css';
import Algoritmo from './components/AlgoritmoBox';
import { ICondicao } from './interfaces/Condicao';
import FIFO from './algoritmos_escalonamento/fifo';
import SJF from './algoritmos_escalonamento/sjf';
import EDF from './algoritmos_escalonamento/edf';
import roundRobin from './algoritmos_escalonamento/roundRobin';
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
    quantum: 2,
    sobrecarga: 0,
    intervalo: 0,
  };
 
  const [conditions, setConditions] = useState<ICondicao>(estadoInicial);
  const [processosLista, setProcessosLista] = useState<Processo[]>([]);
  const [tempoInput, setTempoInput] = useState<number>(1);
  const [deadlineInput, setDeadlineInput] = useState<number>(0);
  const [chegadaInput, setChegadaInput] = useState<number>(1);
  const [paginasInput, setPaginasInput] = useState<number>(0);
  const [novaListaProcessos, setNovaListaProcessos] = useState<Processo[]>([]);
  const [algoritmoSelecionado, setAlgoritmoSelecionado] = useState<string>('');
  const [resultadoEscalonamento, setResultadoEscalonamento] = useState<number[][] | null>(null);
  const [shouldDrawGraph, setShouldDrawGraph] = useState(false);
  
  
 

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

    setTempoInput(1);
    setDeadlineInput(0);
    setChegadaInput(1);
    setPaginasInput(0);
  
    setProcessosLista((prevProcessosLista) => [...prevProcessosLista, novoProcesso]);
    setAlgoritmoSelecionado(conditions.metodo);
  };

  const handleDelete = (id: number) => {
    const updatedCards = novaListaProcessos.filter((processo) => processo.id !== id);
    console.log("Item excluído com o ID:", id);
    console.log("Nova lista de processos:", updatedCards);
    setNovaListaProcessos(updatedCards);
  };
  const resetarEstadoInicial = () => {
    console.log('Resetando estado inicial...');
    setConditions(estadoInicial);
    setAlgoritmoSelecionado('');
    setResultadoEscalonamento(null);
    setShouldDrawGraph(false);

    const canvas = canvasRef.current;
  if (canvas) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

    console.log('Estado resetado para:', estadoInicial);
  };

  const escalonadores: Record<string, any> = {
    FIFO: FIFO,
    SJF: SJF,
    EDF: EDF,
    RR: roundRobin
    // Adicione outros escalonadores aqui
  };
 
  const runSequentially = async () => {
     let tempoAtual = 0;

  for (let i = 0; i < novaListaProcessos.length; i++) {
    const processo = novaListaProcessos[i];

    // eslint-disable-next-line no-loop-func
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Processo ${processo.id} iniciado.`);
        setTimeout(() => {
          console.log(`Processo ${processo.id} concluído.`);
          tempoAtual += processo.tempoExecucao; // Atualizando o tempo atual
          resolve(null);
        }, processo.tempoExecucao * 1000); // Tempo de execução em segundos
      }, Math.max(processo.tempoChegada - tempoAtual, 0) * 1000); // Atraso para início do próximo processo
    });
  }
  setShouldDrawGraph(true); 
};

  const handleRun = () => {
    runSequentially();
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

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (shouldDrawGraph && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
  
      if (ctx) {
        const barHeight = 30;
        const barMargin = 10;
        let tempoAtual = 0;
        let turnaroundTotal = 0;
  
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '20px Arial';
  
        novaListaProcessos.forEach((processo, index) => {
          setTimeout(() => {
            // Representação da execução do processo
            ctx.fillStyle = 'blue';
            ctx.fillRect(tempoAtual * 10, index * (barHeight + barMargin) + 20, processo.tempoExecucao * 10, barHeight);
            ctx.fillText(`Processo: ${processo.id}`, 100 + tempoAtual * 10, index * (barHeight + barMargin) + 20 + barHeight / 2 + 5);
  
            const turnaround =  1 + processo.tempoExecucao - processo.tempoChegada;
            turnaroundTotal += turnaround;
            console.log(turnaroundTotal)
  
            tempoAtual += processo.tempoExecucao;
  
            // Verificar se há sobrecarga após o processo
            if (tempoAtual % conditions.quantum === 0) {
              ctx.fillStyle = 'red';
              ctx.fillRect(tempoAtual * 10, index * (barHeight + barMargin) + 20, conditions.sobrecarga * 10, barHeight);
              ctx.fillText('Sobrecarga', tempoAtual * 10, index * (barHeight + barMargin) + 20 + barHeight / 2 + 5);
  
              
            }
  
            // Se for o último processo, calcula e exibe o turnaround médio
            if (index === novaListaProcessos.length - 1) {
              const turnaroundMedio = turnaroundTotal / novaListaProcessos.length;
              ctx.fillText(`Turnaround Médio: ${turnaroundMedio.toFixed(2)}`, 10, 20);
            }
          }, Math.max(processo.tempoChegada - tempoAtual, 0) * 1000);
        });
      }
    }
  }, [shouldDrawGraph, novaListaProcessos, conditions.quantum, conditions.sobrecarga]);
  
  

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
          <button onClick={resetarEstadoInicial}>Reset</button>
        </div>
        <div className="graficoSection">
        <canvas ref={canvasRef} width={600} height={400} style={{ border: '5px solid #dd2424' }} />
      </div>
      </main>
    </div>
  );
}

export default App;