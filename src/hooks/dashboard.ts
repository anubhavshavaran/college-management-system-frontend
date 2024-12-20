import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import {useQuery} from "@tanstack/react-query";
import {getDashDataApi, getPaymentsStatsApi} from "@/services/dashboardApi.ts";

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

function usePaymentsData(year: string | number) {
    const {organization} = useOrganization();
    const {data, isPending, error, isFetched} = useQuery({
        queryKey: ['paymentsStats', year],
        queryFn: () => getPaymentsStatsApi(organization, year)
    });

    return {
        data: data?.data.payments,
        isPending,
        isFetched,
        error
    }
}

export {useDashData, usePaymentsData};