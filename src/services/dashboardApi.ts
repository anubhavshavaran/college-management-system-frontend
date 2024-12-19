import axiosInstance from "@/services/axiosInstance.ts";
import Organization from "@/constants/Organization.ts";

async function getDashDataApi(organization: Organization) {
    const {data, status} = await axiosInstance.request({
        method: 'GET',
        url: `/dash/${organization}`,
    });

    if (status.toString()[0] === '4') {
        throw new Error(data.message);
    }

    return data;
}

export {getDashDataApi};