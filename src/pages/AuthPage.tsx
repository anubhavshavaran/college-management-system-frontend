
import AuthForm from "@/components/auth/AuthForm.tsx";
import BackgroundImage from "@/components/auth/BackgroundImage.tsx";

function AuthPage() {
    return (
        <div className="w-full h-screen flex justify-between items-center">
            <BackgroundImage />
            <AuthForm />
        </div>
    );
}

export default AuthPage;