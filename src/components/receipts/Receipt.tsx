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
        <div className="w-[10cm] h-[18cm] border-2 border-slate-700 rounded-lg">
            {isPending ? (
                <Spinner/>
            ) : (
                <>
                    <div className="w-full p-2 flex justify-around items-start">
                        <div className="flex flex-col">
                            <p className="font-semibold text-start capitalize">{title}</p>
                            <p className="w-full text-sm text-start capitalize">Receipt no. {payment.transactionId}</p>
                        </div>
                        <img
                            src="/Logo.png"
                            width="64"
                            alt="Logo"
                        />
                        <p className="text-sm font-semibold">Date: {formatDate(payment.paidOn, "dd-MM-yyyy")}</p>
                    </div>
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <div className="flex flex-col justify-center items-center">
                            <p>S.M.E Society</p>
                            <p className="font-semibold">Abdulkalam College</p>
                            <p>Vivekanand Nagar, Gadag-Betageri-582 103</p>
                        </div>
                        <p className="text-white px-2 py-1 bg-black rounded-lg">Fee Receipt</p>
                    </div>
                    <div className="p-4 flex flex-col justify-center items-start mt-4">
                        <p className="">Name: {payment.studentId.name}</p>
                        {organization === Organization.SCHOOL ? (
                            <div className="grid grid-cols-2">
                                <p className="">Class: {payment.studentId.class}</p>
                                <p className="col-start-1">SATS Number.: {payment.studentId.satsNumber}</p>
                                <p className="">Mode of Payment: {payment.mode}</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2">
                                <p className="">Course: {payment.studentId.course}</p>
                                <p className="">Year: {payment.studentId.year}</p>
                                <p className="">Reg no.: {payment.studentId.registrationNumber}</p>
                                <p className="">Mode of Payment: {payment.mode}</p>
                            </div>
                        )}
                    </div>
                    <div className="w-full flex flex-col mt-4">
                        <div className="w-full flex">
                            <p className="w-[7.5cm] text-center border-r-black border-r-2 border-t-black border-t-2">Particulars</p>
                            <p className="w-[2.5cm] text-center border-t-black border-t-2">Amount</p>
                        </div>
                        <div className="w-full flex">
                            <p className="w-[7.5cm] p-[2px] text-center border-black border-2 border-b-0 border-l-0 whitespace-normal break-words">{payment.particulars}</p>
                            <p className="w-[2.5cm] p-[2px] text-center border-t-black border-t-2">{payment.amount}</p>
                        </div>
                        <div className="w-full flex">
                            <p className="w-[7.5cm] p-3 text-center border-black border-2 border-b-0 border-l-0 whitespace-normal break-words"></p>
                            <p className="w-[2.5cm] p-3 text-center border-t-black border-t-2"></p>
                        </div>
                        <div className="w-full flex">
                            <p className="w-[7.5cm] p-3 text-center border-black border-2 border-b-0 border-l-0 whitespace-normal break-words"></p>
                            <p className="w-[2.5cm] p-3 text-center border-t-black border-t-2"></p>
                        </div>
                        <div className="w-full flex">
                            <p className="w-[7.5cm] p-3 text-center border-black border-2 border-l-0 whitespace-normal break-words"></p>
                            <p className="w-[2.5cm] p-3 text-center border-y-black border-y-2"></p>
                        </div>
                    </div>
                    <div className="mt-4 px-4 w-full flex flex-wrap justify-between">
                        <div className="flex gap-1">
                            <p className="">Rs:</p>
                            <p className="border-b-[1.5px] border-b-black">{payment.amount}</p>
                        </div>
                        <div className="flex gap-1">
                            <p className="">Rupees in Words:</p>
                            <p className="border-b-[1.5px] border-b-black capitalize">{formatNumberToWord(payment.amount)} only</p>
                        </div>
                    </div>
                    <div className="mt-14 w-full flex justify-start gap-16 pt-4 pb-4 px-4 border-t-2 border-t-black">
                        <p>Accountant sign:</p>
                        <p>Remitter sign:</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default Receipt;