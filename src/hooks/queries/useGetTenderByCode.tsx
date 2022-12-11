import { useQuery } from "react-query";
import { TenderDTO } from "../../interfaces/tenders.dto";

export const useGetTenderByCode = (code: string) => {
    return useQuery<TenderDTO>('allDataByCode', () =>
        fetch(`http://localhost:3030/tender/code/${code}`).then(res =>
            res.json()
        )
    , { enabled: true, staleTime: Infinity })
}