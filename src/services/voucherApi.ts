import Organization from "@/constants/Organization.ts";
import axiosInstance from "@/services/axiosInstance.ts";
import Voucher from "@/constants/Voucher.ts";

async function getAllVouchers(organization: Organization) {
    const {data, status} = await axiosInstance.request({
        method: "GET",
        url: `/vouchers/${organization}/`,
    });

    if (status.toString()[0] === '4') {
        throw new Error(data.message);
    }

    return data;
}

async function createVoucher(voucher: Voucher, organization: Organization) {
    const {data, status} = await axiosInstance.request({
        url: `/vouchers/${organization}/`,
        method: "POST",
        data: {
            ...voucher,
            voucherId: 'rt764r5476'
        }
    });

    if (status.toString()[0] === '4') {
        throw new Error(data.message);
    }

    return data;
}

async function deleteVoucher(id: string, organization: Organization) {
    const {data, status} = await axiosInstance.request({
        method: "DELETE",
        url: `/vouchers/${organization}/${id}`
    });

    if (status.toString()[0] === '4') {
        throw new Error(data.message);
    }

    return true;
}

export {getAllVouchers, createVoucher, deleteVoucher};