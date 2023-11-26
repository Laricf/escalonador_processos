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

    // o "!" garante o não retorno de valor nulo || indefinido

      let nPaginaEmDisco: number = this.nPagMap.get(processId)! - this.tabelaPagina.get(processId)!;


// Se não há páginas em disco, não é necessário fazer nada

      if (nPaginaEmDisco === 0) 
              return;


// Se o número de páginas em disco for maior que a memória livre na RAM
      if (nPaginaEmDisco > this.ram.memoriaLiberar) {

        let alocacaoMemoria: number = this.ram.memoriaLiberar;

        while (alocacaoMemoria < nPaginaEmDisco) {

          let primeiroProcesso: number = this.primeiroNaLista[0];
          let primeiroProcessoRamPages: number = this.tabelaPagina.get(primeiroProcesso)!;
          let novaAlocacaoMemoria: number = primeiroProcessoRamPages + alocacaoMemoria;
  
    // Se a nova alocação de memória é suficiente para todas as páginas em disco

          if (novaAlocacaoMemoria <= nPaginaEmDisco) {

           alocacaoMemoria = novaAlocacaoMemoria;

            this.primeiroNaLista.shift();
            this.ramParaDisk(primeiroProcesso, primeiroProcessoRamPages);

          } else {
    // Caso contrário, calcula quantas páginas são necessárias e faz a alocação parcial

            let paginasNecessarias = nPaginaEmDisco - alocacaoMemoria;

            alocacaoMemoria += paginasNecessarias;
            this.ramParaDisk(primeiroProcesso, paginasNecessarias);
          }
        }
      }

// Move as páginas da RAM para o disco e, em seguida, da RAM para a RAM
    
  
      this.discoParaRam(processId, nPaginaEmDisco);
      this.primeiroNaLista.push(processId);
    }
  }
  