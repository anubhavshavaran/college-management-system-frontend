import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    createStudentApi,
    deleteStudentApi,
    getStudentApi,
    getStudentsApi,
    updateStudentApi
} from "@/services/studentsApi.ts";
import Organization from "@/constants/Organization.ts";
import Student from "@/constants/Student.ts";

function useStudents(organization: Organization) {
    const {data, isPending, error} = useQuery({
        queryKey: [organization, 'students'],
        queryFn: () => getStudentsApi(organization)
    });

    return {
        data: data?.data,
        isPending,
        error
    }
}

function useStudent(organization: Organization, id: string, isEnable: boolean) {
    const {data, isPending, error, isFetched} = useQuery({
        queryKey: [organization, 'student', id],
        queryFn: () => getStudentApi(organization, id),
        enabled: isEnable,
    });

    return {
        student: data?.data.doc,
        isPending,
        isFetched,
        error
    }
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

function useDeleteStudent(organization: Organization) {
    const queryClient = useQueryClient();
    const {mutate: deleteStudent, isPending: isDeletingStudent} = useMutation({
        mutationFn: (id: string) => deleteStudentApi(organization, id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [organization, 'students']
            }, {
                throwOnError: true
            });
        }
    });

    return {deleteStudent, isDeletingStudent};
}

function useUpdateStudent(studentId: string, organization: Organization) {
    const queryClient = useQueryClient();
    const {mutate: updateStudent, isPending: isUpdatingStudent} = useMutation({
        mutationFn: (student: Student) => updateStudentApi(organization, studentId, student),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [organization, 'students']
            }, {
                throwOnError: true
            });
        }
    });

    return {
        updateStudent,
        isUpdatingStudent,
    }
}

export {useStudent, useStudents, useCreateStudent, useDeleteStudent, useUpdateStudent};