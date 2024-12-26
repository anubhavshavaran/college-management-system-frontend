import axiosInstance from "@/services/axiosInstance.ts";
import Organization from "@/constants/Organization.ts";
import Student from "@/constants/Student.ts";

async function getStudentsApi(organization: Organization, query: {course?: string, class?: string}) {
    const {data, status} = await axiosInstance.request({
        method: 'GET',
        url: `/students/${organization}`,
        params: {
            ...query
        }
    });

    if (status.toString()[0] === '4') {
        throw new Error(data.message);
    }

    return data;
}

async function getStudentApi(organization: Organization, id: string) {
    const {data, status} = await axiosInstance.request({
        method: 'GET',
        url: `/students/${organization}/${id}`
    });

    if (status.toString()[0] === '4') {
        throw new Error(data.message);
    }

    return data;
}

async function createStudentApi(organization: Organization, student: Student) {
    const {data, status} = await axiosInstance.request({
        url: `/students/${organization}/`,
        method: 'POST',
        data: {
            ...student
        }
    });

    if (status.toString()[0] === '4') {
        throw new Error(data.message);
    }

    return data;
}

async function deleteStudentApi(organization: Organization, id: string) {
    const {data, status} = await axiosInstance.request({
        method: 'DELETE',
        url: `/students/${organization}/${id}`,
    });

    if (status.toString()[0] === '4') {
        throw new Error(data.message);
    }

    return data;
}

async function updateStudentApi(organization: Organization, id: string, student: Student) {
    const {data, status} = await axiosInstance.request({
        method: 'PATCH',
        url: `/students/${organization}/${id}`,
        data: {
            ...student
        }
    });

    if (status.toString()[0] === '4') {
        throw new Error(data.message);
    }

    return data;
}

export {getStudentApi, getStudentsApi, createStudentApi, deleteStudentApi, updateStudentApi};