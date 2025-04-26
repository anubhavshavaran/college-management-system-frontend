import {Button} from "@/components/ui/button.tsx";
import {ReactNode} from "react";
import {IoCloseSharp} from "react-icons/io5";
import {useNavigate} from "react-router";

type PaymentReceiptProps = {
    children: ReactNode;
    className?: string;
}

function PaymentReceipt({className, children}: PaymentReceiptProps) {
    const navigate = useNavigate();

    function handlePrint() {
        window.print();
    }

    function handleClose() {
        navigate(-1);
    }

    return (
        <div className="w-full h-screen overflow-scroll fixed z-20 bg-white top-0 left-0 flex flex-col items-center">
            <Button
                onClick={handleClose}
                className="bg-transparent hover:bg-transparent w-fit self-end "
            >
                <IoCloseSharp color="black"/>
            </Button>
            <div className={`${className} w-full flex justify-around items-center`}>
                {children}
            </div>
            <Button
                onClick={handlePrint}
                className="bg-defaultOrange hover:bg-defaultOrange w-fit mt-4"
            >
                Print
            </Button>
        </div>
    );
}

export default PaymentReceipt;