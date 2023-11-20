import Escalonador from "../interfaces/Escalonador";
import { IProcesso } from "../interfaces/Processo";


class SJFAlgoritmo implements Escalonador {

    public escalonador(processos: IProcesso[]): any {
        let escalonador: number[] = [];
        let tempoExecucaoAtual: number = 0;

        let filaDeProcessosMap: IProcesso[] = processos.map((processo) => ({ ...processo }));

        while (filaDeProcessosMap.length) {
            // Filtra os processos que já chegaram

            const processosChegados = filaDeProcessosMap.filter(processo => processo.tempoChegada <= tempoExecucaoAtual);

            if (processosChegados.length === 0) {
                //FALTA TRECHO GERAR GRAFICO
                tempoExecucaoAtual++;
                continue;
            }

            // Ordena os processos chegados pelo tempo de execução
            let filaProcessoOrdenada = processosChegados.sort((processo1, processo2) => processo1.tempoExecucao - processo2.tempoExecucao);

            const processoAtual = filaProcessoOrdenada[0];

            // Adiciona o processo ao escalonador e avanca no tempo
            for (let i = 0; i < processoAtual.tempoExecucao; i++) {
                escalonador[tempoExecucaoAtual++] = processoAtual.id;
                tempoExecucaoAtual++;
            }

            // Remove o processo da fila
            filaDeProcessosMap = filaDeProcessosMap.filter(processo => processo.id !== processoAtual.id);
            
           // console.log(filaDeProcessosMap + "FILA")
        }

        return escalonador;
    }
}
export default SJFAlgoritmo;