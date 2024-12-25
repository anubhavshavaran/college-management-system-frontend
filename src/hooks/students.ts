import {useMutation, useQuery} from "@tanstack/react-query";
import {createStudentApi, getStudentsApi} from "@/services/studentsApi.ts";
import Organization from "@/constants/Organization.ts";
import Student from "@/constants/Student.ts";

function useStudents(organization: Organization) {
    const {data, isPending, error} = useQuery({
        queryKey: ['students'],
        queryFn: () => getStudentsApi(organization)
    });

    return {
        data: data?.data,
        isPending,
        error
    }
}

function useStudent() {

}

function useCreateStudent(organization: Organization) {
    const {mutate: createStudent, isPending, error} = useMutation({
        mutationFn: (student: Student) => createStudentApi(organization, student)
    });

    return {
        createStudent,
        isPending,
        error
    }
}

export {useStudent, useStudents, useCreateStudent}