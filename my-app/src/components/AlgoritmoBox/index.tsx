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

  const atualizarPaginacao = (value: string) => {
    if (value === 'FIFO') {
      setConditions({ ...conditions, paginacao: 'MRU' });
    }
    if (value === 'MRU') {
      setConditions({ ...conditions, paginacao: 'FIFO' });
    }
  };

  return (
    <div className="corpo">
      <form className="algoritmo" onSubmit={(e) => e.preventDefault()}>
        <section className="metodos">
          <h2 className="titulo">Selecione o Algoritmo:</h2>
          <section className='container-metodos'>
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
        </section>
        <section className="paginacao">
          <h2 className="titulo">Paginação: </h2>
          <div className="botoes">
            {opcoesPaginacao.map((paginacao) => (
              <li className="botoes" key={paginacao}>
                <button
                  className="botao"
                  type="button"
                  id="paginacao"
                  value={conditions.paginacao}
                  onClick={() => {
                    atualizarPaginacao(paginacao);
                    console.log({ conditions });
                  }}
                >
                  {paginacao}
                </button>
              </li>
            ))}
          </div>
        </section>
      </form>
    </div>
  );
};

export default Algoritmo;
