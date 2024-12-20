import axiosInstance from "@/services/axiosInstance.ts";

async function loginUserApi(username: string, password: string, organization: string, role: string) {
    const {data, status} = await axiosInstance.request({
        url: '/auth/signin',
        method: 'POST',
        data: {
            username,
            password,
            organization,
            role
        }
    });

    if (status.toString()[0] === '4') {
        throw new Error(data.message);
    }

    return data;
}

export {loginUserApi}