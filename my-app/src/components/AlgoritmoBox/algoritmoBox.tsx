import './algoritmoBox.css'

function Algoritmo() {
    return(
        <main className='corpo' >
            <div className='algoritmo'>
                <h2 className='titulo' >Selecione o Algoritmo:</h2>
                <div className='botoes' >
                    <button className='botao' type="button"> FIFO </button>
                    <button className='botao' type="button"> SJF </button>
                    <button className='botao' type="button"> RR </button>
                    <button className='botao' type="button"> EDF </button>
                </div>
            </div>
            <div className='quantum' >
                <div>
                    <h2 className='titulo' >Quantum:</h2>
                    <input className='botao' type='number' />
                </div>
                <div>
                    <h2 className='titulo' >Sobrecarga: </h2>
                    <input className='botao' type='number' ></input>
                </div>
            </div>
        </main>

    );

};


export default Algoritmo