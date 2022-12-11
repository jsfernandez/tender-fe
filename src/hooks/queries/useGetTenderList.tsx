import { useQuery } from "react-query";
import { TenderDTO } from "../../interfaces/tenders.dto";

export const useGetTenderList = () => {
    return useQuery<TenderDTO>('allData', () =>
        fetch(`http://localhost:3030/tender`).then(res =>
            res.json()
        )
    , { enabled: true, staleTime: Infinity })
}