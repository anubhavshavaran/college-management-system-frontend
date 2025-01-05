import axiosInstance from "@/services/axiosInstance.ts";
import Payment from "@/constants/Payment.ts";

async function getPaymentsApi(id: string) {
    const {data, status} = await axiosInstance.request({
        method: 'GET',
        url: `/payments/${id}`,
    });

    if (status.toString()[0] === '4' || status.toString()[0] === '5') {
        throw new Error(data.message);
    }

    return data;
}

async function getPaymentApi(id: string) {
    const {data, status} = await axiosInstance.request({
        method: 'GET',
        url: `/payments/receipt/${id}`,
    });

    if (status.toString()[0] === '4' || status.toString()[0] === '5') {
        throw new Error(data.message);
    }

    return data;
}

async function createPaymentApi(id: string, payment: Payment) {
    const {data, status} = await axiosInstance.request({
        method: 'POST',
        url: `/payments/${id}`,
        data: {
            ...payment,
        },
    });

    if (status.toString()[0] === '4' || status.toString()[0] === '5') {
        throw new Error(data.message);
    }

    return data;
}

async function deletePaymentApi(id: string) {
    const {data, status} = await axiosInstance.request({
        method: 'DELETE',
        url: `/payments/${id}`
    });

    if (status.toString()[0] === '4' || status.toString()[0] === '5') {
        throw new Error(data.message);
    }

    return data;
}

export {getPaymentsApi, createPaymentApi, deletePaymentApi, getPaymentApi};