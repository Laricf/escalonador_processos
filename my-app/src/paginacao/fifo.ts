import { IProcesso } from "../interfaces/Processo";
import MemoriaAbstracao from "./abstracao";

export default class FIFOPaginacao extends MemoriaAbstracao {
    
    private primeiroNaLista: number[] = [];
  
    constructor(
      processos: IProcesso[],
      tamanhoRam: number,
      tamanhoPagina: number,
      tamanhoDisco: number
    ) {
      super(processos, tamanhoRam, tamanhoPagina, tamanhoDisco);
    }
  
    caregamentoProcessosPaginas(processId: number): void {

      let nPaginaEmDisco: number = (this.nPagMap.get(processId) as number) - (this.tabelaPagina.get(processId) as number);


      if (nPaginaEmDisco === 0) 
              return;
  
      if (nPaginaEmDisco > this.ram.memoriaLiberar) {

        let alocacaoMemoria: number = this.ram.memoriaLiberar;

        while (alocacaoMemoria < nPaginaEmDisco) {

          let primeiroProcesso: number = this.primeiroNaLista[0];
          let primeiroProcessoRamPages: number = this.tabelaPagina.get( primeiroProcesso ) as number;
          let novaAlocacaoMemoria: number =primeiroProcessoRamPages + alocacaoMemoria;
  
          if (novaAlocacaoMemoria <= nPaginaEmDisco) {

           alocacaoMemoria = novaAlocacaoMemoria;
            this.primeiroNaLista.shift();
            this.ramParaDisk(primeiroProcesso, primeiroProcessoRamPages);
          } else {
            let necessaryPages = nPaginaEmDisco - alocacaoMemoria;
            
            alocacaoMemoria += necessaryPages;
            this.ramParaDisk(primeiroProcesso, necessaryPages);
          }
        }
      }
  
      this.discoParaRam(processId, nPaginaEmDisco);
      this.primeiroNaLista.push(processId);
    }
  }
  