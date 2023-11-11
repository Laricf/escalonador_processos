import Escalonador from "../interfaces/Escalonador";
import { IProcesso } from "../interfaces/Processo";

class FIFOAlgoritmo implements Escalonador {
    public escalonador(processos: IProcesso[]): any {
        let escalonador: number[] = [];
        let nProcessoAtual: IProcesso;
        let tempoExecucaoAtual: number = 0;
        let tamanhoFilaZero = 0;

        const filaProcessoOrdenada: IProcesso[] = [...processos]
        //shallow copies
        .map((processosAtual) => ({...processosAtual}))
        //ordenamento p ordem de chrgas 
        .sort((processo1, processo2) => processo1.tempoChegada - processo2.tempoChegada)

        while (filaProcessoOrdenada.length !== tamanhoFilaZero){
            //pega o primeiro elemento e esquipa ele da fila geral -- repete até fila zerar
            nProcessoAtual = filaProcessoOrdenada.shift() as IProcesso;

            // Se o tempo de chegada do processo é maior que o tempo de execução atual, avança o tempo
            while(nProcessoAtual.tempoChegada > tempoExecucaoAtual){
                //FALTA TRECHO P GERAR GRAFICO
                tempoExecucaoAtual++;
            }
            while (nProcessoAtual.tempoExecucao !== 0) {
                escalonador[tempoExecucaoAtual] = nProcessoAtual.id;
                nProcessoAtual.tempoExecucao -= 1;
                tempoExecucaoAtual++;
              }

        }

        return escalonador;

    }
}
export default FIFOAlgoritmo;

       


       




