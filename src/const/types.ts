export enum TenderTypes {
    L1 = 'Licitación Pública Menor a 100 UTM',
    LE = 'Licitación Pública igual o superior a 100 UTM e inferior a 1.000 UTM',
    LP = 'Licitación Pública igual o superior a 1.000 UTM e inferior a 2.000 UTM',
    LQ = 'Licitación Pública igual o superior a 2.000 UTM e inferior a 5.000 UTM',
    LR = 'Licitación Pública igual o superior a 5.000 UTM',
    E2 = 'Licitación Privada Menor a 100 UTM.',
    CO = 'Licitación Privada igual o superior a 100 UTM e inferior a 1000 UTM',
    B2 = 'Licitación Privada igual o superior a 1000 UTM e inferior a 2000 UTM',
    H2 = 'Licitación Privada igual o superior a 2000 UTM e inferior a 5000 UTM',
    I2 = 'Licitación Privada Mayor a 5000 UTM',
    LS = 'Licitación Pública Servicios personales especializados',
}

export const TENDER_TYPES_LABELS: Record<string, string> = {
    L1: 'Licitación Pública Menor a 100 UTM',
    LE: 'Licitación Pública igual o superior a 100 UTM e inferior a 1.000 UTM',
    LP: 'Licitación Pública igual o superior a 1.000 UTM e inferior a 2.000 UTM',
    LQ: 'Licitación Pública igual o superior a 2.000 UTM e inferior a 5.000 UTM',
    LR: 'Licitación Pública igual o superior a 5.000 UTM',
    E2: 'Licitación Privada Menor a 100 UTM.',
    CO: 'Licitación Privada igual o superior a 100 UTM e inferior a 1000 UTM',
    B2: 'Licitación Privada igual o superior a 1000 UTM e inferior a 2000 UTM',
    H2: 'Licitación Privada igual o superior a 2000 UTM e inferior a 5000 UTM',
    I2: 'Licitación Privada Mayor a 5000 UTM',
    LS: 'Licitación Pública Servicios personales especializados',
}