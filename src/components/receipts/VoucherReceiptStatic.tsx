import {formatDate} from "date-fns";
import formatNumberToWord from "@/functions/formatNumberToWord.ts";
import Voucher from "@/constants/Voucher.ts";

type VoucherReceiptProps = {
    voucher: Voucher;
}

function VoucherReceipt({voucher}: VoucherReceiptProps) {
    return (
        <div className="w-[10cm] h-[14cm] border-2 border-slate-700 rounded-lg relative">
            <div className="flex flex-col gap-2 justify-center items-center pt-5">
                <p className="absolute top-4 left-4 text-start capitalize">Voucher no. {voucher.voucherNumber}</p>
                <img
                    src="/Logo.png"
                    width="48"
                    alt="Logo"
                />
                <div className="flex flex-col justify-center items-center">
                    <p className="text-sm">S.M.E Society</p>
                    <p className="font-semibold uppercase">Abdulkalam College</p>
                    <p className="text-sm">Vivekanand Nagar, Gadag-Betageri-582 103</p>
                </div>
                <div className="w-full h-[1.5px] bg-black"/>
                <div className="flex justify-center w-full">
                    <img
                        src="/debit-voucher.png"
                        alt="Debit Voucher"
                        className="h-8"
                    />
                </div>

                <div className="w-full h-[1.5px] bg-black"/>
            </div>
            <div className="flex flex-col justify-center items-start gap-1 p-4">
                <p className="">Date: {formatDate(voucher.date, "dd-MM-yyyy")}</p>
                <p className="">Paid to: {voucher.title}</p>
                <p className="">Mode of Payment: {voucher.modeOfPayment}</p>
            </div>
            <div className="w-full flex flex-col">
                <p className="w-full p-1 text-center font-semibold border-t-black border-t-2">Particulars</p>
                <p className="w-full p-1 text-center border-y-black border-y-2 whitespace-normal break-words">{voucher.particulars}</p>
            </div>

            <div className="p-3 w-full flex flex-wrap justify-between">
                <div className="flex gap-1">
                    <p className="text-sm">Rs:</p>
                    <p className="text-sm font-bold">{voucher.amount}</p>
                </div>
                <div className="flex gap-1 items-center">
                    <p className="text-sm">Rupees in Words:</p>
                    <p className="text-sm capitalize font-bold">{formatNumberToWord(voucher.amount)} only</p>
                </div>
            </div>
            <div className="w-full flex justify-start gap-16 pt-2 pb-10 px-4 border-t-2 border-t-black">
                <p>Accountant sign:</p>
                <p>Receiver sign:</p>
            </div>
        </div>
    );
}

export default VoucherReceipt;