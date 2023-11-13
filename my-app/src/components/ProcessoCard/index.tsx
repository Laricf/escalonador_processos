import './processoCard.css';

function ProcessoCard() {
  return (
    <div className="card">
        <div className='boxCard'>
          <label htmlFor="" className="label">
            Tempo:
            <input className="btn" type="number" min='1' />
          </label>
          <label htmlFor="" className="label">
            Deadline:
            <input className="btn" type="number" min='0' />
          </label>
        </div>
        <div className='boxCard'>
        <label htmlFor="" className="label">
        Chegada:
            <input className="btn" type="number" min='1' />
          </label>
          <label htmlFor="" className="label">
            Páginas:
            <input className="btn" type="number" />
          </label>
        </div>
        <button className='exit'></button>
    </div>
  );
}

export default ProcessoCard;
