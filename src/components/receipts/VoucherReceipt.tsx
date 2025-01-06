import {useVoucher} from "@/hooks/vouchers.ts";
import {useSearchParams} from "react-router";
import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import Spinner from "@/components/ui/Spinner.tsx";
import {formatDate} from "date-fns";
import formatNumberToWord from "@/functions/formatNumberToWord.ts";

function VoucherReceipt() {
    const [searchParams] = useSearchParams();
    const voucherId = searchParams.get("receiptId") ?? '';
    const {organization} = useOrganization();
    const {voucher, isVoucherLoading} = useVoucher(voucherId, Boolean(voucherId), organization);

    return (
        <div className="w-[400px] h-min border-2 border-slate-700 rounded-lg p-4">
            {isVoucherLoading ? (
                <Spinner/>
            ) : (
                <>
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <p className="w-full text-start capitalize">Voucher no. {voucher.voucherNumber}</p>
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
                        <p className="text-white px-2 py-1 bg-[#757575] rounded-lg capitalize">debit voucher</p>
                    </div>
                    <div className="flex flex-col justify-center items-start gap-1 mt-4">
                        <p className="">Date: {formatDate(voucher.date, "dd-MM-yyyy")}</p>
                        <p className="">Paid to: {voucher.title}</p>
                        <p className="">Mode of Payment: {voucher.modeOfPayment}</p>
                    </div>
                    <div className="w-full flex flex-col mt-4">
                        <p className="w-full p-1 text-center border-black border-2 border-b-0">Particulars</p>
                        <p className="w-full p-1 text-center border-black border-2 whitespace-normal break-words">{voucher.particulars}</p>
                    </div>

                    <div className="mt-4 w-full flex flex-wrap justify-between">
                        <div className="flex gap-1">
                            <p className="">Rs:</p>
                            <p className="border-b-[1.5px] border-b-black">{voucher.amount}</p>
                        </div>
                        <div className="flex gap-1">
                            <p className="">Rupees in Words:</p>
                            <p className="border-b-[1.5px] border-b-black capitalize">{formatNumberToWord(voucher.amount)} only</p>
                        </div>
                    </div>
                    <div className="w-full flex justify-between pt-6 pb-4">
                        <p>Accountant sign:_________</p>
                        <p>Remitter sign:__________</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default VoucherReceipt;
