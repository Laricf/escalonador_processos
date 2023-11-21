import Escalonador from "../interfaces/Escalonador";
import FIFOAlgoritmo from "./fifo";
import SJFAlgoritmo from "./sjf";
import EDFescalonador from "./edf";
import RoundRobinAlgortimo from "./roundRobin";

export enum EscalonadorType {
  FIFO = "FIFO",
  SJF = "SJF",
  EDF = "EDF",
  RR = "roundRobin"
}

export class SchedulerFactory {
  static createScheduler(type: EscalonadorType): Escalonador {
    switch (type) {
      case EscalonadorType.FIFO:
        return new FIFOAlgoritmo();
      case EscalonadorType.SJF:
        return new SJFAlgoritmo();
      case EscalonadorType.EDF:
        return new EDFescalonador();
      case EscalonadorType.RR:
        return new RoundRobinAlgortimo();
      default:
        throw new Error("Invalid scheduler type");
    }
  }
}



