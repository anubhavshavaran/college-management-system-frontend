import {ReactNode} from 'react'

type FormErrorProps = {
    message: string | ReactNode;
    className?: string;
}

function FormError({message, className}: FormErrorProps) {
    return (
        <>
            {message && (
                <p className={`text-red-500 text-sm leading-3 font-semibold ${className}`}>{message}</p>
            )}
        </>
    );
}

export default FormError;