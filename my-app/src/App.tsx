import React, { useState } from 'react';
import './App.css';
import Algoritmo from './components/AlgoritmoBox';
import Processos from './components/ProcessoCard';
import { ICondicao } from './interfaces/Condicao';

function App() {
  

  const estadoInicial: ICondicao = {
    metodo: "FIFO",
    paginacao: "FIFO",
    quantum: 0,
    sobrecarga: 2,
    intervalo: 0,
  };

  const [conditions, setConditions] = useState<ICondicao>(estadoInicial);

  
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title"> Escalonador de processos ;)</h1>
      </header>
      <main>
        <div className="firstSection">
          <Algoritmo conditions={conditions} setConditions={setConditions}  />
        </div>

        <div className="secondSection">
          <h2 className="subtitle">Criando processos:</h2>
          <div className="boxProcess">
            <Processos />
            <button className="plus"></button>
          </div>
        </div>

        <div className="thirdSection">
          <button>Run</button>
          <button>Reset</button>
        </div>
      </main>
    </div>
  );
}

export default App;
