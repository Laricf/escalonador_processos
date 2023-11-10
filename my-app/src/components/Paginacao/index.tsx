import './paginacao.css'

function Paginacao () {

    return(
        <div>
            <h2 className='titulo' >Paginação: </h2>
            <div className='botoes' >
                <input className='botao' type="number" />
                <button className='botao' type="button" > FIFO </button>
                <button className='botao' type="button" > MRU </button>
                
            </div>
        </div>

    );

};

export default Paginacao