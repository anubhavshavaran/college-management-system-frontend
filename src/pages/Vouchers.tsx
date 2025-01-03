import {
    TableCell,
    TableRow,
} from "@/components/ui/table";
import {Button} from "@/components/ui/button.tsx";
import Spinner from "@/components/ui/Spinner.tsx";
import {Dialog} from "@/components/ui/dialog.tsx";
import Voucher from "@/constants/Voucher.ts";
import VoucherTable from "@/components/vouchers/VoucherTable.tsx";
import {format} from "date-fns";
import {useSearchParams} from "react-router";
import React, {useState} from "react";
import VoucherDialog from "@/components/vouchers/VoucherDialog.tsx";
import {useDeleteVouchers, useVouchers} from "@/hooks/vouchers.ts";
import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import {useUser} from "@/contexts/UserContextProvider.tsx";
import PaymentReceipt from "@/components/receipts/PaymentReceipt.tsx";
import VoucherReceipt from "@/components/receipts/VoucherReceipt.tsx";

const headers = ['Sr. no.', 'Voucher ID', 'Title', 'Date', 'Amount', 'Mode of Payment', 'Particulars'];

function Vouchers() {
    const {user} = useUser();
    const {organization} = useOrganization();
    const [showReceipt, setShowReceipt] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const {vouchers, isVouchersLoading, error} = useVouchers(organization);
    const {deleteVoucher} = useDeleteVouchers(organization);

    function setId(id: string) {
        setIsDialogOpen(true);
        setSearchParams({
            id: id,
        });
    }

    function handleDialogClose(open: boolean) {
        setIsDialogOpen(open);

        if (!open) {
            searchParams.delete("id");
            setSearchParams(searchParams);
        }
    }

    function handleDelete(e: React.MouseEvent, id: string) {
        e.stopPropagation();
        deleteVoucher(id ?? '');
    }

    return (
        <div className="w-full p-4 flex flex-col gap-4">

            {showReceipt && (
                <PaymentReceipt onClose={() => setShowReceipt(false)}>
                    <VoucherReceipt/>
                </PaymentReceipt>
            )}

            {user?.role !== "ADMIN" && (
                <>
                    <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
                        <VoucherDialog onSave={() => setIsDialogOpen(false)} organization={organization}/>
                    </Dialog>

                    <Button onClick={() => setIsDialogOpen(true)}
                            className="bg-defaultGray p-5 shadow-none border-[1.5px] border-gray-400 rounded-xl hover:bg-defaultGray w-fit">
                        <img src="/icons/plus.png" width={18} alt="Add Vocuhers"/>
                        <p className="text-lg text-black font-normal ">Add Vouchers</p>
                    </Button>
                </>
            )}

            <div className="w-full bg-defaultGray py-2 rounded-2xl flex justify-center">
                {isVouchersLoading && (
                    <Spinner/>
                )}
                {error && (
                    <p className="w-full text-red-600 font-semibold text-center">{error.message}</p>
                )}
                {!isVouchersLoading && !error && (
                    <div className="w-full flex flex-col gap-4">
                        <VoucherTable
                            headers={headers}
                            data={vouchers ?? []}
                            render={(voucher: Voucher, key: number) => (
                                <TableRow key={key} onClick={() => setId(voucher._id ?? '')}>
                                    <TableCell className="text-center">{key + 1}</TableCell>
                                    <TableCell className="text-center">{voucher._id}</TableCell>
                                    <TableCell className="text-center">{voucher.title}</TableCell>
                                    <TableCell
                                        className="text-center">{format(new Date(voucher.date), 'dd-MM-yyyy')}</TableCell>
                                    <TableCell className="text-center">{voucher.amount}</TableCell>
                                    <TableCell className="text-center">{voucher.modeOfPayment}</TableCell>
                                    <TableCell className="text-center">{voucher.particulars}</TableCell>

                                    <TableCell
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowReceipt(true)
                                        }}
                                        className="text-center"
                                    >
                                        View Receipt
                                    </TableCell>

                                    {user?.role === "CHAIRMAN" && (
                                        <TableCell className="hover:bg-gray-200 rounded-lg flex justify-center"
                                                   onClick={(e) => handleDelete(e, voucher._id ?? '')}>
                                            <img src="/icons/bin.png" width="20" alt="Delete Button"/>
                                        </TableCell>
                                    )}
                                </TableRow>
                            )}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Vouchers;