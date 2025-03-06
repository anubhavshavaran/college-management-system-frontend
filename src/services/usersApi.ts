import axiosInstance from "@/services/axiosInstance.ts";
import Organization from "@/constants/Organization.ts";
import User from "@/constants/User.ts";
import user from "@/constants/User.ts";

async function getUserApi(id: string, organization: Organization) {
    const {data, status} = await axiosInstance.request({
        url: `/users/${organization}/${id}/`,
        method: "GET",
    });

    if (status.toString()[0] === '4') {
        throw new Error(data.message);
    }

    return data;
}

async function getUsersApi(organization: Organization) {
    const {data, status} = await axiosInstance.request({
        url: `/users/${organization}/`,
        method: "GET",
    });

    if (status.toString()[0] === '4') {
        throw new Error(data.message);
    }

    return data;
}

async function deleteUserApi(id: string, organization: Organization) {
    const {data, status} = await axiosInstance.request({
        url: `/users/${organization}/${id}/`,
        method: "DELETE",
    });

    if (status.toString()[0] === '4') {
        throw new Error(data.message);
    }

    return data;
}

async function createUserApi(user: User, organization: Organization) {
    const {data, status} = await axiosInstance.request({
        url: `/users/${organization}/`,
        method: "POST",
        data: {
            ...user
        }
    });

    if (status.toString()[0] === '4') {
        throw new Error(data.message);
    }

    return data;
}

async function updateUserApi(id: string, user: user, organization: Organization) {
    const {data, status} = await axiosInstance.request({
        method: "PATCH",
        url: `/users/${organization}/${id}`,
        data: {
            ...user
        }
    });

    if (status.toString()[0] === '4') {
        throw new Error(data.message);
    }

    return data;
}

export {getUsersApi, deleteUserApi, getUserApi, createUserApi, updateUserApi};