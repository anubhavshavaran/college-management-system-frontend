import Organization from "@/constants/Organization.ts";
import {
    TableCell,
    TableRow,
} from "@/components/ui/table";
import {Button} from "@/components/ui/button.tsx";
import {useMutation, useQuery} from "@tanstack/react-query";
import {deleteVoucher, getAllVouchers} from "@/services/voucherApi.ts";
import Spinner from "@/components/ui/Spinner.tsx";
import {Dialog, DialogTrigger} from "@/components/ui/dialog.tsx";
import AddVoucherDialog from "@/components/vouchers/AddVoucherDialog.tsx";
import Voucher from "@/constants/Voucher.ts";
import VoucherTable from "@/components/vouchers/VoucherTable.tsx";
import {format} from "date-fns";
import Searchbar from "@/components/ui/Searchbar.tsx";
import {useSearchParams} from "react-router";

type VoucherProps = {
    organization: Organization;
}

const headers = ['Sr. no.', 'Voucher ID', 'Title', 'Date', 'Amount', 'Mode of Payment', 'Particulars'];

function Vouchers({organization}: VoucherProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    let vouchers: Array<Voucher> | null = null;
    const {data, isLoading, error, isSuccess} = useQuery({
        queryKey: [organization, 'vouchers'],
        queryFn: () => getAllVouchers(organization)
    });
    const {mutate} = useMutation({
        mutationFn: (id: string) => deleteVoucher(id, organization),
    });

    if (isSuccess) {
        vouchers = data?.data.docs;
    }

    return (
        <div className="w-full p-4 flex flex-col gap-4">
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        className="bg-defaultGray p-5 shadow-none border-[1.5px] border-gray-400 rounded-xl hover:bg-defaultGray w-fit">
                        <p className="text-lg text-black font-normal ">Add Vouchers</p>
                    </Button>
                </DialogTrigger>
                <AddVoucherDialog/>
            </Dialog>
            <div className="w-full bg-defaultGray py-2 rounded-2xl flex justify-center">
                {isLoading && (
                    <Spinner/>
                )}
                {error && (
                    <p className="w-full text-red-600 font-semibold text-center">{error.message}</p>
                )}
                {!isLoading && !error && (
                    <div className="w-full flex flex-col gap-4">
                        <div className="w-full flex justify-end gap-4 px-4">
                            <Searchbar />
                            <Button onClick={() => {
                                setSearchParams({})
                            }}>X</Button>
                        </div>
                        <VoucherTable
                            headers={headers}
                            data={vouchers ?? []}
                            render={(voucher: Voucher, key: number) => (
                                <TableRow key={key}>
                                    <TableCell className="text-center">{key + 1}</TableCell>
                                    <TableCell className="text-center">{voucher._id}</TableCell>
                                    <TableCell className="text-center">{voucher.title}</TableCell>
                                    <TableCell
                                        className="text-center">{format(new Date(voucher.date), 'dd-MM-yyyy')}</TableCell>
                                    <TableCell className="text-center">{voucher.amount}</TableCell>
                                    <TableCell className="text-center">{voucher.modeOfPayment}</TableCell>
                                    <TableCell className="text-center">{voucher.particulars}</TableCell>
                                    <Button onClick={() => mutate(voucher._id ?? '')} className="bg-none bg-transparent shadow-none text-black hover:bg-gray-200">D</Button>
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