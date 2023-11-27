import './algoritmoBox.css';
import { ICondicao } from '../../interfaces/Condicao';
import {IProcesso} from '../../interfaces/Processo';

interface AlgoritmoProps {
  conditions: ICondicao;
  setConditions: React.Dispatch<React.SetStateAction<ICondicao>>;
  setProcessosLista: React.Dispatch<IProcesso[]>;
  setAlgortimoSelecionado: React.Dispatch<ICondicao['metodo']>;
  processosLista: IProcesso[];
}


export const opcoesMetodo: ICondicao['metodo'][] = ['FIFO', 'EDF', 'RR', 'SJF'];
const opcoesPaginacao: ICondicao['paginacao'][] = ['FIFO', 'MRU'];

const Algoritmo: React.FC<AlgoritmoProps> = ({
  conditions,
  setConditions,
  setProcessosLista,
  processosLista,
  setAlgortimoSelecionado,
}: AlgoritmoProps)   => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setConditions({ ...conditions, [id]: value ? parseInt(value) : '' });
  };

  // const atualizarProcessos = () => {
  //   const novosProcessos = processosLista.map((processo) => ({
  //     ...processo,
  //     metodo: conditions.metodo,
  //     paginacao: conditions.paginacao,
  //     quantum: conditions.quantum,
  //     sobrecarga: conditions.sobrecarga,
  //     intervalo: conditions.intervalo,
  //   }));
  //   setProcessosLista(novosProcessos);
  // };

  const atualizarPaginacao = (value: string) => {
    setConditions( prevConditions => {
      conditions = {...prevConditions, paginacao: value as ICondicao['paginacao']};
      console.log({conditions});
      return conditions;
    })
  };

  const atualizarMetodo = (metodo: ICondicao['metodo']) => {
    setConditions({...conditions, metodo});
    setAlgortimoSelecionado(metodo);
  }
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
                      atualizarMetodo(metodo);
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
