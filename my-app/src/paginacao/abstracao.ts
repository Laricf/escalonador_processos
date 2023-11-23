import Memoria from "../dados/Memoria";
import { IMemoria } from "../interfaces/Memoria";
import { IPaginacaoDados, IAlgoritmoPaginacao} from "../interfaces/PaginacaoData";
import { IProcesso } from "../interfaces/Processo";

abstract class MemoriaAbstracao implements IAlgoritmoPaginacao {

    private ram: IMemoria;
    private disco: IMemoria;
    private tabelaPagina:Map<number, number>;
    private nPagMap: Map<number, number>;


    constructor(processos: IProcesso[], tamanhoRam: number, tamanhoDisco: number, tamanhoPagina: number){
      this.ram = new Memoria(tamanhoRam, tamanhoPagina);
      this.disco = new Memoria(tamanhoDisco, tamanhoPagina);
      this.tabelaPagina = new Map<number, number>();
      this.nPagMap = new Map<number, number>();
    
    let processo: IProcesso;

    for (let i = 0; i < processos.length; i++) {
      processo = processos[i];
      this.disco.armazenar(processo.id, processo.nPaginas);
      this.nPagMap.set(processo.id, processo.nPaginas);
      this.tabelaPagina.set(processo.id, 0);
    }
}
    

  protected abstract caregamentoProcessosPaginas(processId: number): void;
  
  protected ramParaDisk(processoId: number, nPaginas: number): void {
    this.ram.liberar(processoId, nPaginas);
    this.disco.armazenar(processoId, nPaginas);

    const nPaginaAnterior = this.tabelaPagina.get(processoId) as number;
    this.tabelaPagina.set(processoId, nPaginaAnterior - nPaginas);
  }

  protected discoParaRam(processoId: number, nPaginas: number): void {
    this.disco.liberar(processoId, nPaginas);
    this.ram.armazenar(processoId, nPaginas);

    const nPaginaAnterior = this.tabelaPagina.get(processoId) as number;
    this.tabelaPagina.set(processoId, nPaginaAnterior + nPaginas);

  }
  run(schedule: number[]): IPaginacaoDados[] {
    throw new Error("Method not implemented.");
}

   
    

}


