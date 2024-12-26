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
import {createPaymentApi, deletePaymentApi, getPaymentsApi} from "@/services/paymentsApi.ts";
import Payment from "@/constants/Payment.ts";

function useStudents(organization: Organization, course: string) {
    const query = organization === Organization.SCHOOL ? {class: course} : {course};
    const {data, isPending, error} = useQuery({
        queryKey: [organization, 'students'],
        queryFn: () => getStudentsApi(organization, query)
    });

    return {
        data: data?.data,
        isPending,
        error
    }
}

function useStudent(organization: Organization, id: string, isEnable: boolean) {
    const {data, isPending, error, isFetched} = useQuery({
        queryKey: ['student', id],
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

function useStudentsPayments(id: string) {
    const {data, isPending, error} = useQuery({
        queryKey: ['payments', id],
        queryFn: () => getPaymentsApi(id)
    });

    return {
        payments: data?.data?.payments,
        isPending,
        error
    }
}

function useCreateStudentPayment(id: string) {
    const queryClient = useQueryClient();
    const {mutate: createPayment, isPending: isCreatingPayment, error} = useMutation({
        mutationFn: (payment: Payment) => createPaymentApi(id, payment),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['payments', id]
            }, {
                throwOnError: true
            });
            await queryClient.invalidateQueries({
                queryKey: ['student', id]
            }, {
                throwOnError: true
            });
        }
    });

    return {
        createPayment,
        isCreatingPayment,
        error
    }
}

function useDeleteStudentPayment(studentId: string) {
    const queryClient = useQueryClient();
    const {mutate: deletePayment, isPending: isDeletingPayment, error} = useMutation({
        mutationFn: (id: string) => deletePaymentApi(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['payments', studentId]
            }, {
                throwOnError: true
            });
            await queryClient.invalidateQueries({
                queryKey: ['student', studentId]
            }, {
                throwOnError: true
            });
        }
    });

    return {
        deletePayment,
        isDeletingPayment,
        error
    }
}

export {
    useStudent,
    useStudents,
    useCreateStudent,
    useDeleteStudent,
    useUpdateStudent,
    useStudentsPayments,
    useCreateStudentPayment,
    useDeleteStudentPayment
};