export interface IPaginacaoDados {
    etapa: number;
    execucaoProcesso: number;
    ram: number[];
    disco: number[];
  }

  export interface IAlgoritmoPaginacao {
    run(escalonador: number[]): IPaginacaoDados[];
  }