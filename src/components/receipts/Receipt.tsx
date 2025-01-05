import {useSearchParams} from "react-router";
import {useStudentPayment} from "@/hooks/students.ts";
import Spinner from "@/components/ui/Spinner.tsx";
import {formatDate} from "date-fns";
import formatNumberToWord from "@/functions/formatNumberToWord.ts";

type ReceiptProps = {
    title: string
}

function Receipt({title}: ReceiptProps) {
    const [searchParams] = useSearchParams();
    const paymentId = searchParams.get("receiptId") ?? '';
    const {payment, isPending} = useStudentPayment(paymentId);

    return (
        <div className="w-[400px] border-2 border-slate-700 rounded-lg p-4">
            {isPending ? (
                <Spinner/>
            ) : (
                <>
                    <div className="w-full flex justify-between pb-2">
                        <p className="font-semibold text-start capitalize">{title}</p>
                        <p>Date: {formatDate(payment.paidOn, "dd-MM-yyyy")}</p>
                    </div>
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <img
                            src="/Logo.png"
                            width="40"
                            alt="Logo"
                        />
                        <div className="flex flex-col justify-center items-center">
                            <p>S.M.E Society</p>
                            <p className="font-semibold">Abdulkalam College</p>
                            <p>Vivekanand Nagar, Gadag-Betageri-582 103</p>
                        </div>
                        <p className="text-white px-2 py-1 bg-black rounded-lg">Fee Receipt</p>
                    </div>
                    <div className="flex flex-col justify-center items-start gap-1 mt-4">
                        <p className="">Name of the student: {payment.studentId.name}</p>
                        <p className="">Class: {payment.studentId.class}</p>
                        <p className="">Reg no.: {payment.studentId.satsNumber}</p>
                        <p className="">Mode of Payment: {payment.mode}</p>
                    </div>
                    <table className="w-full mt-4">
                        <tbody>
                        <tr>
                            <td className="text-center border-black border-2">Particulars</td>
                            <td className="text-center border-black border-2">Amount</td>
                        </tr>
                        <tr>
                            <td className="border-2 p-[8px] border-black text-center">{payment.particulars}</td>
                            <td className="border-2 p-[8px] border-black text-center">{payment.amount}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="mt-2 w-full flex flex-wrap justify-between">
                        <p className="">Rs: {payment.amount}</p>
                        <p className="capitalize">Rupees in Words: {formatNumberToWord(payment.amount)} only</p>
                    </div>
                    <div className="w-full flex justify-between py-12">
                        <p>Accountant sign:_________</p>
                        <p>Remitter sign:__________</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default Receipt;