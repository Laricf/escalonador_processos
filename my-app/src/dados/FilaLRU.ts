class FilaLRU {
  // Array que mantém a ordem dos processos com base no uso mais recente
  private fila: number[];

  // Construtor que inicializa a fila
  constructor() {
    this.fila = [];
  }

  // Método que retorna o processo menos recentemente usado (primeiro elemento da fila)
  get lru(): number {
    return this.fila[0];
  }

  // Método que remove e retorna o primeiro elemento da fila
  public shift(): number | undefined {
    return this.fila.shift();
  }

  // Método que atualiza a posição de um processo na fila, movendopara o final
  public atualizaProcesso(processId: number): void {
    // Procura o índice do processo na fila
    const index = this.fila.indexOf(processId);
    
    // Se o processo estiver na fila, remove
    if (index !== -1) {
      this.fila.splice(index, 1);
    }
    
    // Adiciona o processo ao final da fila
    this.fila.push(processId);
  }
}
export default FilaLRU;