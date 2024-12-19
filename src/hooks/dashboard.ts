import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import {useQuery} from "@tanstack/react-query";
import {getDashDataApi} from "@/services/dashboardApi.ts";

function useDashData() {
    const {organization} = useOrganization();
    const {data, isPending, isFetched, error} = useQuery({
        queryKey: [organization, 'dashboard'],
        queryFn: () => getDashDataApi(organization)
    });

    return {
        data: data?.data,
        isPending,
        isFetched,
        error
    }
}

export default useDashData;