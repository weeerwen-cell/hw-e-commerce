import { QueryClient } from "@tanstack/react-query"


export const queryClient = new QueryClient({
defaultOptions:{
  queries:{
    staleTime: 1000 *60, // stale time set to 1 second
    retry:1,  
  //num times React Query will automatically re-attempt a failed request
    refetchOnWindowFocus:false  
    //refetch when window regain focus
  }
}

})