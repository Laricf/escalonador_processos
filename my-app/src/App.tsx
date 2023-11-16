import React, { useState } from 'react';
import './App.css';
import Algoritmo from './components/AlgoritmoBox';
import Processos from './components/ProcessoCard';
import { ICondicao } from './interfaces/Condicao';
import Grafico from './components/Grafico'

interface Processo {
  id: number;
  tempoExecucao: number 
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
  

  const adicionarProcesso = () => {
    console.log('Clicou no botão de adicionar processo');
    const novoProcesso: Processo = {
      id: processosLista.length + 1,
      tempoExecucao: 1,
      tempoChegada: 1,
      numeroPagina: 0,
      deadline: 1,
    
    };
    console.log('Novo processo:', novoProcesso);

    setProcessosLista((prevProcessosLista) => [...prevProcessosLista, novoProcesso]);
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
            <Processos processosLista={processosLista} />
            <div className='botaoadicionar'>
              <button className="plus" onClick={adicionarProcesso}></button>
          </div>
          </div>
        </div>
        <div className="thirdSection">
          <button>Run</button>
          <button>Reset</button>
        </div>
        <Grafico />
      </main>
    </div>
  );
}

export default App;
