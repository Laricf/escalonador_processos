import './algoritmoBox.css';
import { ICondicao } from '../../interfaces/Condicao';

interface AlgoritmoProps {
  conditions: ICondicao;
  setConditions: React.Dispatch<React.SetStateAction<ICondicao>>;
}

const opcoesMetodo: ICondicao['metodo'][] = ['FIFO', 'EDF', 'RR', 'SJF'];
const opcoesPaginacao: ICondicao['paginacao'][] = ['FIFO', 'MRU'];

const Algoritmo = ({ conditions, setConditions }: AlgoritmoProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setConditions({ ...conditions, [id]: value ? parseInt(value) : '' });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions

  return (
    <div className="corpo">
      <section>
        <form className="algoritmo" onSubmit={(e) => e.preventDefault()}>
          <h2 className="titulo">Selecione o Algoritmo:</h2>
          <div>
            {opcoesMetodo.map((metodo) => (
              <li className="botoes">
                <button
                  className="botao"
                  type="button"
                  onClick={() => {
                    console.log({ conditions });
                    setConditions({ ...conditions, metodo });
                  }}
                >
                  {metodo}
                </button>
              </li>
            ))}
          </div>
        </form>
        <div className="quantum-sobrecarga">
          <div>
            <label className="titulo">Quantum:</label>
            <input
              className="botao"
              type="number"
              id="quantum"
              min="1"
              value={conditions.quantum}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="titulo">Sobrecarga: </label>
            <input
              className="botao"
              type="number"
              id="sobrecarga"
              min="0"
              value={conditions.sobrecarga}
              onChange={handleChange}
            />
          </div>
        </div>
      </section>
      <section className="paginacao">
        <h2 className="titulo">Paginação: </h2>
        <div className="botoes">
          <input
            className="botao"
            id="intervalo"
            type="number"
            value={conditions.intervalo}
            onChange={handleChange}
          />
          {opcoesPaginacao.map((paginacao) => (
            <li className="botoes">
              <button
                className="botao"
                type="button"
                id="paginacao"
                value={paginacao}
                onClick={() => {
                  console.log({ conditions });
                  setConditions({ ...conditions, paginacao });
                }}
              >
                {paginacao}
              </button>
            </li>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Algoritmo;
