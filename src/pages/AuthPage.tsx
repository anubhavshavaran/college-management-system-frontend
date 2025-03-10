import AuthForm from "@/components/auth/AuthForm.tsx";
import BackgroundImage from "@/components/auth/BackgroundImage.tsx";
import {useUser} from "@/contexts/UserContextProvider.tsx";
import {useNavigate} from "react-router";
import {useEffect} from "react";

function AuthPage() {
    const {user} = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate(-1);
        }
    }, [navigate, user]);

    return (
        <div className="w-full h-screen flex justify-between items-center">
            <BackgroundImage/>
            <AuthForm/>
        </div>
    );
}

export default AuthPage;