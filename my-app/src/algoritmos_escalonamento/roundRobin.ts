import Escalonador from "../interfaces/Escalonador";
import { IProcesso } from "../interfaces/Processo";
import RotatingQueue from "../dados/RotatingQueue"; 

export default class RoundRobinAlgortimo implements Escalonador {
    public escalonador(
        processo: IProcesso[], 
        quantum: number, 
        sobrecarga: number = 1 
        ): number[] {
            let vetorDeProcessos: IProcesso[] = [...processo].map((obj) => Object.assign({}, obj));
        let escalonador: number [] = [];
        let nProcessoAtual: IProcesso;
        let tempoExecucaoAtual: number = 0;
        let interacaoProcesso: number = 0;
        let indexProcesso: number = -1;
        let fimUltimoProcesso: boolean = true; 

        let fila: RotatingQueue = new RotatingQueue();

        while (vetorDeProcessos.length !== 0) {
            const chegadaProcesso = vetorDeProcessos
            .filter((processo) => processo.tempoChegada <= tempoExecucaoAtual)
            .map((processo) => processo.id);

            if (chegadaProcesso.length === 0) {
                // plotar grafico
                tempoExecucaoAtual++;
                continue;
            }

            fila.addElementos(chegadaProcesso);

            if (fimUltimoProcesso = false) {
                fila.rotate();
            }

            indexProcesso = this.pegaIndexProcesso(fila.get(), vetorDeProcessos);
            nProcessoAtual = vetorDeProcessos[indexProcesso];

            interacaoProcesso = Math.min(nProcessoAtual?.tempoChegada, quantum);
            for(let i=0; i < interacaoProcesso; i++) {
                //plotar gráfico
                tempoExecucaoAtual++;
            }

            if (nProcessoAtual.tempoExecucao !== 0) {
                for (let i = 0; i < sobrecarga; i++) {
                    //plotar grafico
                    tempoExecucaoAtual++;
                }
            } else {
                vetorDeProcessos.splice(indexProcesso, 1);
                fila.remove(nProcessoAtual.id);
                fimUltimoProcesso = true;
            }

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

    private pegaIndexProcesso(processoId: number, processo: IProcesso[]){
        for (let i=0; i<processo.length; i++){
            if (processo[i].id==processoId){
                return i;
            }
        }
        return -1;
    }
}