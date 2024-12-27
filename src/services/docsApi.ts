import axiosInstance from "@/services/axiosInstance.ts";
import Organization from "@/constants/Organization.ts";

async function getDocsApi(organization: Organization) {
    const {data, status} = await axiosInstance.request({
        method: 'GET',
        url: `/docs/${organization}`,
    });

    if (status.toString()[0] === '4' || status.toString()[0] === '5') {
        throw new Error(data.message);
    }

    return data;
}

async function createDocsApi(organization: Organization, formData: FormData) {
    const {data, status} = await axiosInstance.request({
        method: 'POST',
        url: `/docs/${organization}`,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });

    if (status.toString()[0] === '4' || status.toString()[0] === '5') {
        throw new Error(data.message);
    }

    return data;
}

async function deleteDocsApi(organization: Organization, id: string) {
    const {data, status} = await axiosInstance.request({
        method: 'DELETE',
        url: `/docs/${organization}/${id}`
    });

    if (status.toString()[0] === '4' || status.toString()[0] === '5') {
        throw new Error(data.message);
    }

    return data;
}

export {createDocsApi, getDocsApi, deleteDocsApi}