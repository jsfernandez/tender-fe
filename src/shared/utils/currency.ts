import { COUNTRY_LABEL } from "../../const/times";

const currencyFractionDigits = new Intl.NumberFormat(COUNTRY_LABEL.CL, {
    style: 'currency',
    currency: 'CLP',
}).resolvedOptions().maximumFractionDigits;

export const transformToCurrency = (amount: number) => {
    return (amount).toLocaleString(COUNTRY_LABEL.CL, {
        maximumFractionDigits: currencyFractionDigits 
    });
} 