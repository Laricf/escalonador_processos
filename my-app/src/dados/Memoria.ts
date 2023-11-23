import { IMemoria } from "../interfaces/Memoria";

export default class Memoria implements IMemoria {
    private listaArmazenamento: number[];
    private tamanhoArmazenamento: number;
  
    constructor(tamanhoArmazenamento: number, tamanhoPAgina: number) {
      this.tamanhoArmazenamento = tamanhoArmazenamento / tamanhoPAgina;
      this.listaArmazenamento = new Array(this.tamanhoArmazenamento).fill(NaN);
    }
  
    get memoriaLiberar(): number {
      return this.listaArmazenamento.filter((value) => isNaN(value)).length;
    }
  
    get memoriaArmazenar(): number[] {
      return this.listaArmazenamento;
    }
  
    public armazenar(processId: number, numPages: number): void {
      let amazenamentoContador = 0;
      const memoriaLiberar: number = this.memoriaLiberar;
      if (numPages <= memoriaLiberar) {
        for (let i = 0; i < this.tamanhoArmazenamento; i++) {
          if (isNaN(this.listaArmazenamento[i])) {
            this.listaArmazenamento[i] = processId;
            amazenamentoContador++;
          }
  
          if (amazenamentoContador === numPages) break;
        }
      } else {
        console.log("Falta espaco disco, memoriaLiberar:" + memoriaLiberar);
      }
    }
  
    public liberar(processId: number, numPages: number): void {
      let remocaoContador: number = 0;
      for (let i = 0; i < this.tamanhoArmazenamento; i++) {
        if (this.listaArmazenamento[i] === processId) {
          this.listaArmazenamento[i] = NaN;
          remocaoContador++;
        }
  
        if (remocaoContador == numPages) break;
      }
    }
  }
  