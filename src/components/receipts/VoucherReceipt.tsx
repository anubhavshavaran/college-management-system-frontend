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
        <div className="print-section w-[400px] h-min border-2 border-slate-700 rounded-lg p-4">
            {isVoucherLoading ? (
                <Spinner/>
            ) : (
                <>
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
                        <p className="text-white px-2 py-1 bg-[#757575] rounded-lg capitalize">debit voucher</p>
                    </div>
                    <div className="flex flex-col justify-center items-start gap-1 mt-4">
                        <p className="">Date: {formatDate(voucher.date, "dd-MM-yyyy")}</p>
                        <p className="">Paid to: {voucher.title}</p>
                        <p className="">Mode of Payment: {voucher.modeOfPayment}</p>
                    </div>
                    <table className="w-full mt-4">
                        <tbody>
                        <tr>
                            <td className="text-center border-black border-2">Particulars</td>
                        </tr>
                        <tr>
                            <td className="border-2 p-[8px] border-black text-center">{voucher.particulars}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="mt-2 w-full flex flex-wrap justify-between">
                        <p className="">Rs: {voucher.amount}</p>
                        <p className="capitalize">Rupees in Words: {formatNumberToWord(voucher.amount)} only</p>
                    </div>
                    <div className="w-full flex justify-between py-12">
                        <p>Approved by:_________</p>
                        <p>Received by:__________</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default VoucherReceipt;
