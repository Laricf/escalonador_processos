import { IProcesso } from "../interfaces/Processo";
import Escalonador from "../interfaces/Escalonador";


export default class EDF implements Escalonador {
    public escalonador(
        processos: IProcesso[],
        quantum: number = 2,
        sobrecarga: number = 1
    ): number[] {
        let vetorDeProcessos: IProcesso[] = [...processos].map((processo) =>
        Object.assign({}, processo)
        );
        let escalonador: number[] = [];
        let processoAtual: IProcesso;
        let tempoExecucaoAtual: number = 0;
        let interacaoProcesso: number = 0;

         
        while (vetorDeProcessos.length !==0) {
            const chegadaProcesso: number[] = vetorDeProcessos
            // eslint-disable-next-line no-loop-func
            .map((processo, index) => 
            processo.tempoChegada <= tempoExecucaoAtual ? index : -1
            )
            .filter((index) => index !== -1);

            if (chegadaProcesso.length === 0) {
                //gráfico
                tempoExecucaoAtual++;
                continue;
            }

            const menorprazoFinalIndex: number = this.getMenorprazoFinalProcesso(
                vetorDeProcessos, chegadaProcesso
            );

            processoAtual = vetorDeProcessos[menorprazoFinalIndex];

            interacaoProcesso = Math.min(processoAtual.tempoExecucao, quantum);
            for (let i = 0; i < interacaoProcesso; i++) {
                if ((processoAtual.deadline as number) >= tempoExecucaoAtual) {
                    escalonador[tempoExecucaoAtual] = processoAtual.id;
                } else {
                    escalonador[tempoExecucaoAtual] = processoAtual.id + 0.1;
                }
                processoAtual.tempoExecucao -= 1;
                tempoExecucaoAtual++;
            }

            if (processoAtual.tempoExecucao !==0) {
                for (let i = 0; i < sobrecarga; i++) {
                    escalonador[tempoExecucaoAtual] = -1;
                    tempoExecucaoAtual++;
                } 
            } else {
                vetorDeProcessos.splice(menorprazoFinalIndex, 1);
            }
            console.log(vetorDeProcessos + "FILA")
        }

        return escalonador;
    }

    private getMenorprazoFinalProcesso(
        processos: IProcesso[],
        chegadaProcesso: number[]
    ): number {
        let menorprazoFinal: number = Infinity;
        let menorprazoFinalIndex: number = -1;

        for (let i = 0; i < chegadaProcesso.length; i++) {
            let processo: IProcesso = processos[chegadaProcesso[i]];
            let prazoFinal: number = (processo.deadline as number) + processo.tempoChegada;
            if (prazoFinal < menorprazoFinal) {
                menorprazoFinal = prazoFinal;
                menorprazoFinalIndex = chegadaProcesso[i];
            }
        }

        return menorprazoFinalIndex;
    }
}
        
    
