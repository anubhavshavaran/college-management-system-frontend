import {ReactNode} from "react";

type StudentInfoProps = {
    label: string;
    children: ReactNode;
}

function StudentInfoInput({label, children}: StudentInfoProps) {
    return (
        <div className="w-full flex flex-col gap-1">
            <p className="text-base font-normal">{label}</p>
            {children}
        </div>
    );
}

export default StudentInfoInput;