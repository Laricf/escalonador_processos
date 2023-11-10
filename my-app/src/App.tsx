import React from 'react';
import './App.css';
import Algoritmo from './components/AlgoritmoBox';
import Paginacao from './components/Paginacao';
import Processos from './components/ProcessoCard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title"> Escalonador de processos ;)</h1>
      </header>
      <main>
        <div className="firstSection">
          <Algoritmo />
          <Paginacao />
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
