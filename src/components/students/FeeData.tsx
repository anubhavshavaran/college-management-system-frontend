import FeeInfoCard from "@/components/ui/FeeInfoCard.tsx";
import {Table, TableBody, TableCell, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogClose
} from "@/components/ui/dialog.tsx";
import PayFeeDialog from "@/components/students/PayFeeDialog.tsx";

function FeeData() {
    return (
        <>
            <Dialog open={true}>
                <DialogClose />
                <PayFeeDialog />
            </Dialog>
            <div className="w-full flex flex-col gap-4 items-center">
                <div className="w-full flex sm:flex-col md:flex-row gap-6">
                    <FeeInfoCard/>
                    <FeeInfoCard/>
                    <FeeInfoCard/>
                    <FeeInfoCard/>
                </div>
                <Button
                    className="w-fit px-16 py-6 bg-defaultOrange text-black text-lg border-white border-[6px] rounded-2xl hover:bg-defaultOrange">
                    Pay
                </Button>
                <div className="w-full flex flex-col gap-6">

                </div>
                <div className="w-full py-8 bg-defaultLightGray flex flex-col gap-2">
                    <p className="text-base font-semibold">Transaction History</p>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell className="text-center">Sr. No.</TableCell>
                                <TableCell className="text-center">Transaction ID</TableCell>
                                <TableCell className="text-center">Date</TableCell>
                                <TableCell className="text-center">Amount</TableCell>
                                <TableCell className="text-center">Receipt</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="text-center">1</TableCell>
                                <TableCell className="text-center">#2024435</TableCell>
                                <TableCell className="text-center">2024-07-07</TableCell>
                                <TableCell className="text-center">1000</TableCell>
                                <TableCell className="text-center">View Receipt</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center">2</TableCell>
                                <TableCell className="text-center">#2024435</TableCell>
                                <TableCell className="text-center">2024-07-07</TableCell>
                                <TableCell className="text-center">1000</TableCell>
                                <TableCell className="text-center">View Receipt</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center">3</TableCell>
                                <TableCell className="text-center">#2024435</TableCell>
                                <TableCell className="text-center">2024-07-07</TableCell>
                                <TableCell className="text-center">1000</TableCell>
                                <TableCell className="text-center">View Receipt</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default FeeData;
