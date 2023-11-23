import { IMemoria } from "../interfaces/Memoria";

export default class Memoria implements IMemoria {

    //array que representa o armazenamento da memória - Pode conter id do processo || NaN (se o espaço estiver livre)
    private listaArmazenamento: number[];

    //O tamanho total da memória ,-- tamanho total dividido pelo tamanho de página.
    private tamanhoArmazenamento: number;
  
    constructor(tamanhoArmazenamento: number, tamanhoPAgina: number) {
      this.tamanhoArmazenamento = tamanhoArmazenamento / tamanhoPAgina;
      //array que tem tamanho = tamanhoArmazenamento e que é  inicializado como NAN ou seja espaco livre 
      this.listaArmazenamento = new Array(this.tamanhoArmazenamento).fill(NaN);
    }
  
    //Retorna a quantidade de espaço livre na memória,
    get memoriaLiberar(): number {
      return this.listaArmazenamento.filter((value) => isNaN(value)).length;
    }
  
    get memoriaArmazenar(): number[] {
      return this.listaArmazenamento;
    }
  

    /*Responsabilidades:
    Adiciona um processo à memória, marcando o número de páginas especificado (numPages) com o processId.
    Verifica se há espaço suficiente na memória antes de armazenar o processo.
    */
    public armazenar(processId: number, numPages: number): void {
      let amazenamentoContador = 0;
      const memoriaLiberar: number = this.memoriaLiberar;
      //Se o numero de pagina menor que quantidade de espaço livre na memória, pode adicionar um processo a memoria
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
    /*Responsabilidades:
        Liberação espaço na memória, removendo as instâncias do id do processo até atingir o número de páginas desejado (numPages).
    */
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
  