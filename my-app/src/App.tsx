import React from 'react';
import './App.css';
import Algoritmo from './components/AlgoritmoBox/algoritmoBox';
import Paginacao from './components/Paginacao/paginacao'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='text' > Escalonador de processos ;)</h1>
        <div className='body' >
          <Algoritmo/>
          <Paginacao/>
        </div>  
      </header>
    </div>
  );
}

export default App;
