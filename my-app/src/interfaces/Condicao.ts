export interface ICondicao {
    metodos: "FIFO" | "SJF" | "EDF" | "RR";
    paginacao: "Fifo" | "MRU";
    quantum: number;
    sobrecarga: number;
    intervalo: number;
}