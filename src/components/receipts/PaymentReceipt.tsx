import {Button} from "@/components/ui/button.tsx";
import {IoCloseSharp} from "react-icons/io5";
import {ReactNode} from "react";
import {useSearchParams} from "react-router";

type PaymentReceiptProps = {
    children: ReactNode;
}

function PaymentReceipt({children}: PaymentReceiptProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    function handlePrint() {
        window.print();
    }

    function handleClose() {
        searchParams.delete("receiptId");
        setSearchParams(searchParams);
    }

    return (
        <div className="w-full h-screen overflow-scroll absolute z-20 bg-white top-0 left-0 flex flex-col items-center">
            <Button
                onClick={handleClose}
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