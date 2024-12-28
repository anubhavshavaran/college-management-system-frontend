import {Button} from "@/components/ui/button.tsx";
import {IoCloseSharp} from "react-icons/io5";
import {ReactNode} from "react";

type PaymentReceiptProps = {
    onClose: () => void;
    children: ReactNode;
}

function PaymentReceipt({onClose, children}: PaymentReceiptProps) {
    function handlePrint() {
        window.print();
    }

    return (
        <div className="w-full h-screen overflow-scroll absolute z-20 bg-white top-0 left-0 flex flex-col items-center">
            <Button
                onClick={onClose}
                className="bg-transparent hover:bg-transparent w-fit self-end "
            >
                <IoCloseSharp color="black" />
            </Button>
            {children}
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