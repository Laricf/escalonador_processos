import FilaLRU from "../dados/FilaLRU";
import { IProcesso } from "../interfaces/Processo";
import MemoriaAbstracao from "./abstracao";


export default class LRUPaginacao extends MemoriaAbstracao {

    // Declaração de uma propriedade privada para a fila LRU
    private FilaLRU: FilaLRU;
  
    // Construtor que recebe informações sobre processos e configurações de memória
    constructor(
      processos: IProcesso[],
      tamanhoRAM: number,
      tamanhoPagina: number,
      tamanhoDisco: number
    ) {
      // Chama o construtor da classe pai
      super(processos, tamanhoRAM, tamanhoPagina, tamanhoDisco);
  
      // Inicializa a fila LRU
      this.FilaLRU = new FilaLRU();
    }
  
    // Método responsável pelo carregamento de páginas na RAM usando a política LRU
    caregamentoProcessosPaginas(idProcesso: number): void {
      // Atualiza a posição do processo na fila LRU
      this.FilaLRU.atualizaProcesso(idProcesso);
  
      // Calcula o número de páginas no disco que não estão presentes na RAM
      let numPaginasDisco: number =
        (this.nPagMap.get(idProcesso)!) -
        (this.tabelaPagina.get(idProcesso) as number);
  
      // Se não há páginas no disco para carregar, retorna
      if (numPaginasDisco === 0) return;
  
      // Se o número de páginas no disco é maior que a quantidade de memória liberada na RAM
      if (numPaginasDisco > this.ram.memoriaLiberar) {
        // Variável para rastrear a quantidade de memória já alocada
        let armazenamentoAlocado: number = this.ram.memoriaLiberar;
  
        // Loop para alocar espaço até que a quantidade necessária de memória seja alcançada
        while (armazenamentoAlocado < numPaginasDisco) {
          // Obtém o processo menos recentemente usado da fila LRU
          let FilaProcessos: number = this.FilaLRU.lru;
          // Obtém o número de páginas na RAM associadas ao processo
          let paginasRAMFilaProcessos: number = this.tabelaPagina.get(
            FilaProcessos
          ) as number;
          // Calcula a nova quantidade de memória alocada
          let novoArmazenamentoAlocado: number =
            paginasRAMFilaProcessos + armazenamentoAlocado;
  
          // Se a nova quantidade de memória alocada não ultrapassa a necessária
          if (novoArmazenamentoAlocado <= numPaginasDisco) {
            // Atualiza a quantidade de memória alocada
            armazenamentoAlocado = novoArmazenamentoAlocado;
            // Remove o processo mais antigo da fila LRU
            this.FilaLRU.shift();
            // Move as páginas associadas ao processo para o disco
            this.ramParaDisk(FilaProcessos, paginasRAMFilaProcessos);
          } else {
            // Caso contrário, calcula o número de páginas necessárias
            let paginasNecessarias = numPaginasDisco - armazenamentoAlocado;
            // Ajusta a quantidade de memória alocada
            armazenamentoAlocado += paginasNecessarias;
            // Move as páginas necessárias para o disco
            this.ramParaDisk(FilaProcessos, paginasNecessarias);
          }
        }
      }
  
      // Move as páginas do disco para a RAM
      this.discoParaRam(idProcesso, numPaginasDisco);
    }
  }
  