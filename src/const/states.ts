export enum STATES {
    Publicada = "5",
    Cerrada = "6",
    Desierta = "7",
    Adjudicada = "8",
    Revocada = "18",
    Suspendida = "19",
}

export const STATES_LABEL = {
    5: 'Publicada',
    6: 'Cerrada',
    7: 'Desierta',
    8: 'Adjudicada',
    18: 'Revocada',
    19: 'Suspendida',
}

export const STATES_NUMBER = {
    Publicada: "5",
    Cerrada: "6",
    Desierta: "7",
    Adjudicada: "8",
    Revocada: "18",
    Suspendida: "19",
}

export const RECORD_STATES_LABEL: Record<number, string> = {
    5: 'Publicada',
    6: 'Cerrada',
    7: 'Desierta',
    8: 'Adjudicada',
    18: 'Revocada',
    19: 'Suspendida',
}