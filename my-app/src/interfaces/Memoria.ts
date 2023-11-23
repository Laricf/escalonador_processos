export interface IMemoria{
    get memoriaLiberar(): number;
    get memoriaArmazenar(): number[];
    armazenar(processoId: number, nPaginas: number): void;
    liberar(processoId: number, nPaginas: number): void;
  }