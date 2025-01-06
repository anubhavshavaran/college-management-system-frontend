import {useSearchParams} from "react-router";
import {useStudentPayment} from "@/hooks/students.ts";
import Spinner from "@/components/ui/Spinner.tsx";
import {formatDate} from "date-fns";
import formatNumberToWord from "@/functions/formatNumberToWord.ts";
import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import Organization from "@/constants/Organization.ts";

type ReceiptProps = {
    title: string
}

function Receipt({title}: ReceiptProps) {
    const {organization} = useOrganization();
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
                        <p className="w-full text-start capitalize">Receipt no. {payment.transactionId}</p>
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
                        {organization === Organization.SCHOOL ? (
                            <>
                                <p className="">Class: {payment.studentId.class}</p>
                                <p className="">SATS Number.: {payment.studentId.satsNumber}</p>
                                <p className="">Mode of Payment: {payment.mode}</p>
                            </>
                        ) : (
                            <>
                                <p className="">Course: {payment.studentId.course}</p>
                                <p className="">Year: {payment.studentId.year}</p>
                                <p className="">Reg no.: {payment.studentId.registrationNumber}</p>
                                <p className="">Mode of Payment: {payment.mode}</p>
                            </>
                        )}
                    </div>
                    <div className="w-full flex flex-col mt-4">
                        <div className="w-full flex">
                            <p className="w-[300px] text-center border-black border-2 border-b-0">Particulars</p>
                            <p className="w-[65px] text-center border-black border-2 border-b-0 border-l-0">Amount</p>
                        </div>
                        <div className="w-full flex">
                            <p className="w-[300px] p-1 text-center border-black border-2 whitespace-normal break-words">{payment.particulars}</p>
                            <p className="w-[65px] p-1 text-center border-black border-2 border-l-0">120</p>
                        </div>
                    </div>
                    <div className="mt-4 w-full flex flex-wrap justify-between">
                        <div className="flex gap-1">
                        <p className="">Rs:</p>
                            <p className="border-b-[1.5px] border-b-black">{payment.amount}</p>
                        </div>
                        <div className="flex gap-1">
                            <p className="">Rupees in Words:</p>
                            <p className="border-b-[1.5px] border-b-black capitalize">{formatNumberToWord(payment.amount)} only</p>
                        </div>
                    </div>
                    <div className="w-full flex justify-between pt-6 pb-4">
                        <p>Accountant sign:_________</p>
                        <p>Remitter sign:__________</p>
                    </div>
                </>
            )}
        </div>
    )
        ;
}

export default Receipt;