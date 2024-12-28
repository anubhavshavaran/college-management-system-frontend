import axiosInstance from "@/services/axiosInstance.ts";
import Organization from "@/constants/Organization.ts";
import AcademicDate from "@/constants/AcademicDate.ts";

async function getDashDataApi(organization: Organization) {
    const {data, status} = await axiosInstance.request({
        method: 'GET',
        url: `/dash/${organization}`,
    });

    if (status.toString()[0] === '4' || status.toString()[0] === '5') {
        throw new Error(data.message);
    }

    return data;
}

async function getPaymentsStatsApi(organization: Organization, year: string | number) {
    const {data, status} = await axiosInstance.request({
        method: 'GET',
        url: `/payments/stats/${organization}/${year}`,
    });

    if (status.toString()[0] === '4') {
        throw new Error(data.message);
    }

    return data;
}

async function getAcademicDataApi(organization: Organization) {
    const {data, status} = await axiosInstance.request({
        url: `/dash/${organization}/stats/`,
        method: 'GET',
    });

    if (status.toString()[0] === '4') {
        throw new Error(data.message);
    }

    return data;
}

async function updateAcademicDateApi(organization: Organization, query: AcademicDate) {
    const {data, status} = await axiosInstance.request({
        url: `/dash/${organization}/stats/`,
        method: 'PATCH',
        data: {
            ...query,
        }
    });

    if (status.toString()[0] === '4') {
        throw new Error(data.message);
    }

    return data;
}

export {getDashDataApi, getPaymentsStatsApi, getAcademicDataApi, updateAcademicDateApi};