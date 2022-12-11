import { Tender } from './tender';

export interface TenderDTO {
    Cantidad: number,
    FechaCreacion: Date,
    Version: string,
    Listado: Tender[],
}