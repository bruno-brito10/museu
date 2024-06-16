export class ErroCustomizado extends Error {
    public status: number;
    constructor (mensage: string,status:number) {
        super (mensage);
        this.status = status
    }
}