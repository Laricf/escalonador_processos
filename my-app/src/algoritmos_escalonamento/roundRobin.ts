import Escalonador from "../interfaces/Escalonador";
import { IProcesso } from "../interfaces/Processo";
import RotatingQueue from "../dados/RotatingQueue"; 

export default class roundRobin implements Escalonador {
    public escalonador(
        processos: IProcesso[], 
        quantum: number = 2, 
        sobrecarga: number = 1 
        ): number[] {
            let vetorDeProcessos: IProcesso[] = [...processos].map((obj) => Object.assign({}, obj));
        let escalonador: number [] = [];
        let nProcessoAtual: IProcesso;
        let tempoExecucaoAtual: number = 0;
        let interacaoProcesso: number = 0;
        let indexProcesso: number = -1;
        let fimUltimoProcesso: boolean = true; 

        let fila: RotatingQueue = new RotatingQueue();

        while (vetorDeProcessos.length !== 0) {
            const chegadaProcesso = vetorDeProcessos
            // eslint-disable-next-line no-loop-func
            .filter((processo) => processo.tempoChegada <= tempoExecucaoAtual)
            .map((processo) => processo.id);

            if (chegadaProcesso.length === 0) {
                // plotar grafico
                tempoExecucaoAtual++;
                continue;
            }

            fila.addElementos(chegadaProcesso);

            if (fimUltimoProcesso === false) {
                fila.rotate();
            }

            indexProcesso = this.pegaIndexProcesso(fila.get(), vetorDeProcessos);
            nProcessoAtual = vetorDeProcessos[indexProcesso];

            interacaoProcesso = Math.min(nProcessoAtual?.tempoChegada, quantum);
            for(let i = 0; i < interacaoProcesso; i++) {
                //plotar gráfico
                nProcessoAtual.tempoExecucao -= 1;
                tempoExecucaoAtual++;
            }

            if (nProcessoAtual.tempoExecucao !== 0) {
                for (let i = 0; i < sobrecarga; i++) {
                    escalonador[tempoExecucaoAtual] = -1;
                    tempoExecucaoAtual++;
                }
                fimUltimoProcesso = false;
            } else {
                vetorDeProcessos.splice(indexProcesso, 1);
                fila.remove(nProcessoAtual.id);
                fimUltimoProcesso = true;
            }

            console.log(vetorDeProcessos + "FILA")

        }
        return escalonador;
    }


    // function pegaIndexProcesso(processoId: number, processo: IProcesso[]): number {
    //    for (let i=0; i<processo.length; i++){
    //        if (processo[i].id==processoId){
    //            return i;
    //        }
    //    }
    //    return -1;
    //}

    private pegaIndexProcesso(processoId: number, processos: IProcesso[]){
        for (let i = 0; i < processos.length; i++){
            if (processos[i].id === processoId){
                return i;
            }
        }
        return -1;
    }
}
