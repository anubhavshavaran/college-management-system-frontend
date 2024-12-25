import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createStudentApi, deleteStudentApi, getStudentsApi} from "@/services/studentsApi.ts";
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

export {useStudent, useStudents, useCreateStudent, useDeleteStudent};