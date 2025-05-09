import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    createStudentApi,
    deleteStudentApi,
    getStudentApi,
    getStudentsApi, getStudentsYearsOfPassingApi, promoteStudentsApi, searchStudentsApi,
    updateStudentApi, updateStudentsFixedFeeApi
} from "@/services/studentsApi.ts";
import Organization from "@/constants/Organization.ts";
import Student from "@/constants/Student.ts";
import {createPaymentApi, deletePaymentApi, getPaymentApi, getPaymentsApi} from "@/services/paymentsApi.ts";
import Payment from "@/constants/Payment.ts";
import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import {useSearchParams} from "react-router";
import {toast} from "react-hot-toast";

function useStudents(organization: Organization, course: string, year?: string, name?: string, expectedYearOfPassing?: string) {
    const query = organization === Organization.SCHOOL ? {class: course, name} : expectedYearOfPassing !== '' ? {
        course,
        year,
        name,
        expectedYearOfPassing
    } : {course, year, name};
    const {data, isPending, error} = useQuery({
        queryKey: organization === Organization.SCHOOL ? [organization, 'students', name] : expectedYearOfPassing !== '' ? [organization, 'students', course, year, name, expectedYearOfPassing] : [organization, 'students', course, year, name],
        queryFn: () => getStudentsApi(organization, query)
    });
    let dues: number = 0;
    data?.data?.students.forEach((student: any) => {
        console.log(student.fixedFee - student.paidFee);
        dues += Number(student.fixedFee - student.paidFee);
    });

    return {
        data: data?.data,
        isPending,
        dues,
        error
    }
}

function useStudentsPassingYears(organization: Organization, course?: string, year?: string) {
    const query = {course, year};
    const {data, isPending} = useQuery({
        queryKey: ['years', organization, course, year],
        queryFn: () => getStudentsYearsOfPassingApi(organization, query)
    });

    return {
        data: data?.data,
        isPending,
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

function useCreateStudent(organization: Organization, onSuccess: () => void) {
    const {mutate: createStudent, isPending, error} = useMutation({
        mutationFn: (student: Student) => createStudentApi(organization, student),
        onSuccess: (data) => {
            if (data.status === "error") {
                toast.error("Error Occurred");
            } else {
                if (data.error === "duplicate") {
                    toast.error(data.message);
                } else {
                    toast.success("Student created successfully.");
                    onSuccess();
                }
            }
        }
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
            toast.success("Student deleted successfully.");

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
            toast.success("Student updated successfully.");

            await queryClient.invalidateQueries({
                queryKey: [organization, 'students']
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

function useStudentPayment(id: string) {
    const {data, isPending, error} = useQuery({
        queryKey: ['paymentReceipt', id],
        queryFn: () => getPaymentApi(id)
    });

    return {
        payment: data?.data?.payment,
        isPending,
        error
    }
}

function useCreateStudentPayment(id: string) {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryClient = useQueryClient();
    const {mutate: createPayment, isPending: isCreatingPayment, error} = useMutation({
        mutationFn: (payment: Payment) => createPaymentApi(id, payment),
        onSuccess: async (data) => {
            searchParams.set("receiptId", data?.data?.payment._id);
            setSearchParams(searchParams);
            toast.success("Payment done successfully.");

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
            toast.success("Payment deleted successfully.");

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

function useUpdateStudentsFee() {
    const {organization} = useOrganization();
    const [searchParams] = useSearchParams();
    const query = organization === Organization.SCHOOL ? {
        class: searchParams.get("cat") ?? '',
    } : {
        course: searchParams.get("cat") ?? '',
        year: searchParams.get("year") ?? '',
    };
    const {mutate: updateFees, isPending} = useMutation({
        mutationFn: (fixedFee: number) => updateStudentsFixedFeeApi(organization, query, fixedFee),
        onSuccess: () => {
            toast.success("Payment updated successfully.");
        }
    });

    return {
        updateFees,
        isPending,
    }
}

function useSearchStudents(organization: Organization, enabled: boolean, query?: string, course?: string, year?: string) {
    let params = {};
    if (course) params = {...params, course};
    if (year) params = {...params, year};

    let queryArray = ['search', query];
    if (course) queryArray = [...queryArray, course];
    if (year) queryArray = [...queryArray, year];

    const {data, isPending: isSearching, isFetched} = useQuery({
        queryKey: ['search', queryArray],
        queryFn: () => searchStudentsApi(organization, query ?? '', params),
        enabled
    });

    return {
        results: data?.data?.students,
        isSearching,
        isFetched
    }
}

function usePromoteStudents(course: string, year?: string) {
    const {organization} = useOrganization();
    const queryClient = useQueryClient();
    const {mutate: promoteStudents, isPending} = useMutation({
        mutationFn: () => promoteStudentsApi(organization, {course, year}),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [organization, 'students', course, year]
            }, {
                throwOnError: true
            });

            toast.success("Students promoted successfully.");
        }
    });

    return {
        promoteStudents,
        isPending,
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
    useDeleteStudentPayment,
    useUpdateStudentsFee,
    useSearchStudents,
    useStudentPayment,
    useStudentsPassingYears,
    usePromoteStudents
};