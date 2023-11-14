export interface ICondicao {
    metodo: "FIFO" | "SJF" | "EDF" | "RR";
    paginacao: "FIFO" | "MRU";
    quantum: number;
    sobrecarga: number;
    intervalo: number;
}