import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import Organization from "@/constants/Organization.ts";
import {createUserApi, deleteUserApi, getUserApi, getUsersApi, updateUserApi} from "@/services/usersApi.ts";
import User from "@/constants/User.ts";
import {toast} from "react-hot-toast";

function useUsers(organization: Organization) {
    const {data, isPending, error} = useQuery({
        queryKey: ['users', organization],
        queryFn: () => getUsersApi(organization),
    });

    return {
        data: data?.data,
        isUsersLoading: isPending,
        error
    }
}

function useDeleteUser(organization: Organization) {
    const queryClient = useQueryClient();
    const {mutate: deleteUser, isPending: isDeletingUser} = useMutation({
        mutationFn: (id: string) => deleteUserApi(id, organization),
        onSuccess: async () => {
            toast.success("User deleted successfully.");

            await queryClient.invalidateQueries({
                queryKey: ['users', organization]
            }, {
                throwOnError: true
            });
        }
    });

    return {deleteUser, isDeletingUser};
}

function useUser(userId: string, enable: boolean, organization: Organization) {
    const {data, isPending: isUserLoading, isFetched} = useQuery({
        queryKey: ['user', userId],
        queryFn: () => getUserApi(userId ?? '', organization),
        enabled: enable
    });

    return {
        user: data?.data?.doc,
        isUserLoading,
        isFetched
    }
}

function useCreateUser(organization: Organization) {
    const queryClient = useQueryClient();
    const {mutate: createUser, isPending: isCreatingUser} = useMutation({
        mutationFn: (user: User) => createUserApi(user, organization),
        onSuccess: async (data) => {
            if (data.status === 'success') {
                toast.success("User created successfully.");
            } else {
                toast.error("User creation failed.");
            }

            await queryClient.invalidateQueries({
                queryKey: ['users', organization]
            }, {
                throwOnError: true
            });
        }
    });

    return {
        createUser,
        isCreatingUser
    }
}

function useUpdateUser(userId: string, organization: Organization) {
    const queryClient = useQueryClient();
    const {mutate: updateUser, isPending: isUpdatingUser} = useMutation({
        mutationFn: (user: User) => updateUserApi(userId, user, organization),
        onSuccess: async (data) => {
            if (data.status === 'success') {
                toast.success("User created successfully.");
            } else {
                toast.error("User creation failed.");
            }

            await queryClient.invalidateQueries({
                queryKey: ['users', organization]
            }, {
                throwOnError: true
            });
        }
    });

    return {
        updateUser,
        isUpdatingUser
    }
}

export {useUsers, useDeleteUser, useUser, useCreateUser, useUpdateUser};