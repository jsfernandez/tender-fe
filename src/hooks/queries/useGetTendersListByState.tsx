import { useQuery } from "react-query";
import { TenderDTO } from "../../interfaces/tenders.dto";

export const useGetTenderListByState = () => {
    return useQuery<TenderDTO>('allDataByState', () =>
        fetch('http://localhost:3030/tender/state/published').then(res =>
            res.json()
        )
    , { enabled: true, staleTime: Infinity })
}