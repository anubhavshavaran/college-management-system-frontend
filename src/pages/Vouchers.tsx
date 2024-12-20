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
import Searchbar from "@/components/ui/Searchbar.tsx";
import {useSearchParams} from "react-router";
import React, {useState} from "react";
import VoucherDialog from "@/components/vouchers/VoucherDialog.tsx";
import {useDeleteVouchers, useVouchers} from "@/hooks/vouchers.ts";
import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import Filter from "@/components/ui/Filter.tsx";
import TablePagination from "@/components/ui/TablePagination.tsx";

const headers = ['Sr. no.', 'Voucher ID', 'Title', 'Date', 'Amount', 'Mode of Payment', 'Particulars'];

function Vouchers() {
    const {organization} = useOrganization();
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
        <div className="w-full p-4 pt-20 flex flex-col gap-4">
            <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
                <VoucherDialog onSave={() => setIsDialogOpen(false)} organization={organization}/>
            </Dialog>
            <Button onClick={() => setIsDialogOpen(true)}
                    className="bg-defaultGray p-5 shadow-none border-[1.5px] border-gray-400 rounded-xl hover:bg-defaultGray w-fit">
                <img src="/icons/plus.png" width={18} alt="Add Vocuhers"/>
                <p className="text-lg text-black font-normal ">Add Vouchers</p>
            </Button>

            <div className="w-full bg-defaultGray py-2 rounded-2xl flex justify-center">
                {isVouchersLoading && (
                    <Spinner/>
                )}
                {error && (
                    <p className="w-full text-red-600 font-semibold text-center">{error.message}</p>
                )}
                {!isVouchersLoading && !error && (
                    <div className="w-full flex flex-col gap-4">
                        <div className="w-full flex justify-end gap-4 px-4">
                            <Searchbar/>
                            <Button onClick={() => {
                                searchParams.delete("query");
                                setSearchParams(searchParams);
                            }}>X</Button>
                            <Filter/>
                        </div>
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
                                    <TableCell className="hover:bg-gray-200 rounded-lg flex justify-center"
                                               onClick={(e) => handleDelete(e, voucher._id ?? '')}>
                                        <img src="/icons/bin.png" width="20" alt="Delete Button"/>
                                    </TableCell>
                                </TableRow>
                            )}
                        />
                        <TablePagination pages={50} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Vouchers;