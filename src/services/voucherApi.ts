import Organization from "@/constants/Organization.ts";
import axiosInstance from "@/services/axiosInstance.ts";
import Voucher from "@/constants/Voucher.ts";

async function getAllVouchersApi(organization: Organization) {
    const {data, status} = await axiosInstance.request({
        method: "GET",
        url: `/vouchers/${organization}/`,
    });

    if (status.toString()[0] === '4') {
        throw new Error(data.message);
    }

    return data;
}

async function getVoucherApi(id: string, organization: Organization) {
    const {data, status} = await axiosInstance.request({
        method: "GET",
        url: `/vouchers/${organization}/${id}`,
    });

    if (status.toString()[0] === '4') {
        throw new Error(data.message);
    }

    return data;
}

async function createVoucherApi(voucher: Voucher, organization: Organization) {
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

async function deleteVoucherApi(id: string, organization: Organization) {
    const {data, status} = await axiosInstance.request({
        method: "DELETE",
        url: `/vouchers/${organization}/${id}`
    });

    if (status.toString()[0] === '4') {
        throw new Error(data.message);
    }

    return true;
}

async function updateVoucherApi(id: string, voucher: Voucher, organization: Organization) {
    const {data, status} = await axiosInstance.request({
        method: "PATCH",
        url: `/vouchers/${organization}/${id}`,
        data: {
            ...voucher
        }
    });

    if (status.toString()[0] === '4') {
        throw new Error(data.message);
    }

    return true;
}

export {getAllVouchersApi, getVoucherApi, createVoucherApi, deleteVoucherApi, updateVoucherApi};