import {useMutation} from "@tanstack/react-query";
import {loginUserApi} from "@/services/authApi.ts";
import User from "@/constants/User.ts";

function useLogin() {
    const {data, mutate: loginUser, isPending: isLoggingIn, error, isSuccess} = useMutation({
        mutationKey: ['login'],
        mutationFn: ({username, password, organization, role}: User) => loginUserApi(username, password, organization, role),
    });

    return {
        user: data?.data?.user,
        loginUser,
        isLoggingIn,
        error,
        isSuccess,
    };
}

export default useLogin;