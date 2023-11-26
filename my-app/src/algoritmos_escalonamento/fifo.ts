import Escalonador from "../interfaces/Escalonador";
import { IProcesso } from "../interfaces/Processo";

class FIFO implements Escalonador {
  public escalonador(processos: IProcesso[]): any {
    let escalonador: { id: number; tempoExecucao: number }[] = [];
    let nProcessoAtual: IProcesso;
    let tempoExecucaoAtual: number = 0;

    const filaProcessoOrdenada: IProcesso[] = [...processos]
      .map((processosAtual) => ({ ...processosAtual }))
      .sort((processo1, processo2) => processo1.tempoChegada - processo2.tempoChegada);

    while (filaProcessoOrdenada.length) {
      nProcessoAtual = filaProcessoOrdenada.shift() as IProcesso;

      // Se o tempo de chegada do processo é maior que o tempo de execução atual, avança o tempo
      while (nProcessoAtual.tempoChegada > tempoExecucaoAtual) {
        // FALTA TRECHO P GERAR GRAFICO
        tempoExecucaoAtual++;
      }

      while (nProcessoAtual.tempoExecucao > 0) {
        escalonador.push({ id: nProcessoAtual.id, tempoExecucao: nProcessoAtual.tempoExecucao });
        nProcessoAtual.tempoExecucao = 0; // Finaliza o tempo de execução do processo atual
        tempoExecucaoAtual++;
      }
    }

    return escalonador;
  }
}

export default FIFO;


       


       




