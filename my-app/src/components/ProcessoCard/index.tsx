import './processoCard.css';

function ProcessoCard() {
  return (
    <div className="card">
        <div className='boxCard'>
          <label htmlFor="tempo" className="label">
            Tempo:
            <input className="btn" id='tempo' type="number" min='1' />
          </label>
          <label htmlFor="deadline" className="label">
            Deadline:
            <input id='deadline' className="btn" type="number" min='0' />
          </label>
        </div>
        <div className='boxCard'>
        <label htmlFor="chegada" className="label">
        Chegada:
            <input className="btn" type="number" id='chegada' min='1' />
          </label>
          <label htmlFor="paginas" className="label">
            Páginas:
            <input className="btn" type="number" id='paginas' min='0' />
          </label>
        </div>
        <button className='exit'></button>
    </div>
  );
}

export default ProcessoCard;
