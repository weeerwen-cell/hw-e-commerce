import {searchApi} from '../products/pages/api'
import {useQuery} from "@tanstack/react-query"

export const useSearchProducts = (query:string)=>{
    return useQuery({
        queryKey:["products", "search", query],
        queryFn:()=>searchApi(query),
        enabled: !!query 
    })
}

