export default class RotatingQueue {
    private fila: number[];

    constructor() {
        this.fila = [];
    }

    get(): number {
        if (this.fila.length > 0) {
            return this.fila[0];
        } else {
            return -1;
        }
    }

    rotate(): void {
        if (this.fila.length > 0) {
            const primeiroelemento = this.fila.shift();
            if(primeiroelemento) {
                this.fila.push(primeiroelemento);
            }
        }
    }

    //function rotateFila(fila: any[]): void {
    //    if (fila.length > 0){
    //        const primeiroelemento = fila.shift();
    //        if (primeiroelemento) {
    //            fila.push(primeiroelemento);
    //        }
    //    }
        
    //}

    public addElementos(elements: number[]): void {
        const uniqueElements = elements.filter(
          (element) => !this.fila.includes(element)  
        );
        this.fila.push(...uniqueElements);
    }

    public remove(elementToRemove: number) {
        this.fila.filter((element) => element !== elementToRemove)
    }
}