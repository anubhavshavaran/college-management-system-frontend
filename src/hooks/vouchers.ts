import {useMutation, useQuery} from "@tanstack/react-query";
import {
    createVoucherApi,
    deleteVoucherApi,
    getAllVouchersApi,
    getVoucherApi,
    updateVoucherApi
} from "@/services/voucherApi.ts";
import Organization from "@/constants/Organization.ts";
import Voucher from "@/constants/Voucher.ts";

function useVouchers(organization: Organization) {
    const {data, isPending: isVouchersLoading, error, isFetched} = useQuery({
        queryKey: [organization, 'vouchers'],
        queryFn: () => getAllVouchersApi(organization)
    });

    return {
        vouchers: data?.data?.docs,
        isVouchersLoading,
        error,
        isFetched
    };
}

function useDeleteVouchers(organization: Organization) {
    const {mutate: deleteVoucher} = useMutation({
        mutationFn: (id: string) => deleteVoucherApi(id, organization),
    });

    return {deleteVoucher};
}

function useVoucher(voucherId: string, enable: boolean, organization: Organization) {
    const {data, isPending: isVoucherLoading, isFetched} = useQuery({
        queryKey: ['voucher', voucherId],
        queryFn: () => getVoucherApi(voucherId ?? '', organization),
        enabled: enable
    });

    return {
        voucher: data?.data?.doc,
        isVoucherLoading,
        isFetched
    }
}

function useCreateVoucher(organization: Organization) {
    const {mutate: createVoucher, isPending: isCreatingVoucher} = useMutation({
        mutationFn: (voucher: Voucher) => createVoucherApi(voucher, organization)
    });

    return {
        createVoucher,
        isCreatingVoucher
    }
}

function useUpdateVoucher(voucherId: string, organization: Organization) {
    const {mutate: updateVoucher, isPending: isUpdatingVoucher} = useMutation({
        mutationFn: (voucher: Voucher) => updateVoucherApi(voucherId, voucher, organization)
    });

    return {
        updateVoucher,
        isUpdatingVoucher
    }
}

export { useVoucher, useVouchers, useDeleteVouchers, useCreateVoucher, useUpdateVoucher };