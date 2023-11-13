import { IProcesso } from "./Processo";

export default interface IEscalonador {
  escalonador(
    processo: IProcesso[],
    quantum: number,
    sobrecarga?: number
  ): number[];
}

  