import Escalonador from "../interfaces/Escalonador";
import FIFOAlgoritmo from "./fifo";
import SJFAlgoritmo from "./sjf";

export enum EscalonadorType {
  FIFO = "FIFO",
  SJF = "SJF",
}

export class SchedulerFactory {
  static createScheduler(type: EscalonadorType): Escalonador {
    switch (type) {
      case EscalonadorType.FIFO:
        return new FIFOAlgoritmo();
      case EscalonadorType.SJF:
        return new SJFAlgoritmo();
      default:
        throw new Error("Invalid scheduler type");
    }
  }
}



