import Memoria from "../dados/Memoria";
import { IMemoria } from "../interfaces/Memoria";
import { IPaginacaoDados, IAlgoritmoPaginacao} from "../interfaces/PaginacaoData";
import { IProcesso } from "../interfaces/Processo";

abstract class MemoriaAbstracao implements IAlgoritmoPaginacao {

/* ram:  memória principal (RAM) e é do tipo IMemoria.
disco: o disco (memória secundária) e também é do tipo IMemoria.
tabelaPagina: mapa que armazena o número de páginas associado a cada processo.
nPagMap: apa que mantém o número de páginas para cada processo. */

    protected ram: IMemoria;
    protected disco: IMemoria;
    protected tabelaPagina:Map<number, number>;
    protected nPagMap: Map<number, number>;


    constructor(processos: IProcesso[], tamanhoRam: number, tamanhoDisco: number, tamanhoPagina: number){
      this.ram = new Memoria(tamanhoRam, tamanhoPagina);
      this.disco = new Memoria(tamanhoDisco, tamanhoPagina);
      this.tabelaPagina = new Map<number, number>();
      this.nPagMap = new Map<number, number>();
    
    let processo: IProcesso;

    //Armazena os processos no disco, atualizando os maps 
    for (let i = 0; i < processos.length; i++) {
      processo = processos[i];
      this.disco.armazenar(processo.id, processo.nPaginas);
      this.nPagMap.set(processo.id, processo.nPaginas);
      this.tabelaPagina.set(processo.id, 0);
    }
}
    

  protected abstract caregamentoProcessosPaginas(processId: number): void;
  
  // Move um número específico de páginas de um processo da RAM para o disco. Atualiza a tabela de páginas
  protected ramParaDisk(processoId: number, nPaginas: number): void {
    this.ram.liberar(processoId, nPaginas);
    this.disco.armazenar(processoId, nPaginas);

    const nPaginaAnterior = this.tabelaPagina.get(processoId) as number;
    this.tabelaPagina.set(processoId, nPaginaAnterior - nPaginas);
  }
  //Move um número específico de páginas de um processo do disco para a RAM. Atualiza a tabela de páginas.
  protected discoParaRam(processoId: number, nPaginas: number): void {
    this.disco.liberar(processoId, nPaginas);
    this.ram.armazenar(processoId, nPaginas);

    const nPaginaAnterior = this.tabelaPagina.get(processoId) as number;
    this.tabelaPagina.set(processoId, nPaginaAnterior + nPaginas);

  }

  // FALTA TRECHO -- Não finalizado
  run(schedule: number[]): IPaginacaoDados[] {
    const pagina: IPaginacaoDados[] = [];
    let processoAtual: number;

    for (let i = 0; i < schedule.length; i++) {
      processoAtual = schedule[i];

      if (processoAtual !== -1) this.caregamentoProcessosPaginas(schedule[i]);

      pagina.push({
        etapa: i,
        execucaoProcesso: processoAtual,
        ram: [...this.ram.memoriaArmazenar],
        disco: [...this.disco.memoriaArmazenar],
      });
    }
    return pagina;
    
    }
}
export default MemoriaAbstracao;

