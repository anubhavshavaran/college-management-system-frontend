import FeeInfoCard from "@/components/ui/FeeInfoCard.tsx";
import {Table, TableBody, TableCaption, TableCell, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogClose
} from "@/components/ui/dialog.tsx";
import PayFeeDialog from "@/components/students/PayFeeDialog.tsx";
import React, {useState} from "react";
import {useDeleteStudentPayment, useStudent, useStudentsPayments} from "@/hooks/students.ts";
import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import {useParams} from "react-router";
import Spinner from "@/components/ui/Spinner.tsx";
import Payment from "@/constants/Payment.ts";
import {format} from "date-fns";

function FeeData() {
    const {organization} = useOrganization();
    const {studentId} = useParams();
    const [isPayDialogOpen, setIsPayDialogOpen] = useState<boolean>(false);
    const {student, isPending} = useStudent(organization, studentId ?? '', true);
    const {payments, isPending: isPaymentsLoading} = useStudentsPayments(studentId ?? '');
    const {deletePayment} = useDeleteStudentPayment(studentId ?? '');

    function handleDelete(e: React.MouseEvent, id: string) {
        e.stopPropagation();
        deletePayment(id ?? '');
    }

    return (
        <>
            {isPending || isPaymentsLoading ? (
                <Spinner/>
            ) : (
                <>
                    <Dialog open={isPayDialogOpen} onOpenChange={() => setIsPayDialogOpen(false)}>
                        <DialogClose/>
                        <PayFeeDialog onSave={() => setIsPayDialogOpen(false)} />
                    </Dialog>
                    <div className="w-full flex flex-col gap-4 items-center">
                        <div className="w-full flex sm:flex-col md:flex-row gap-6">
                            <FeeInfoCard label="fixed fee" value={student.fixedFee}/>
                            <FeeInfoCard label="fees paid" value={student.paidFee}/>
                            <FeeInfoCard label="balance due"
                                         value={String(Number(student.fixedFee) - Number(student.paidFee))}/>
                            <FeeInfoCard label="previous fees" value={student.previousFee}/>
                        </div>
                        <Button
                            onClick={() => setIsPayDialogOpen(true)}
                            className="w-fit px-16 py-6 bg-defaultOrange text-black text-lg border-white border-[6px] rounded-2xl hover:bg-defaultOrange">
                            Pay
                        </Button>
                        <div className="w-full flex flex-col gap-6">

                        </div>
                        <div className="w-full py-8 bg-defaultLightGray flex flex-col gap-2">
                            <p className="text-base font-semibold">Transaction History</p>
                            <Table>
                                {payments.length === 0 && (
                                    <TableCaption>
                                        No vouchers are available.
                                    </TableCaption>
                                )}
                                <TableHeader>
                                    <TableRow>
                                        <TableCell className="text-center">Sr. No.</TableCell>
                                        <TableCell className="text-center">Transaction ID</TableCell>
                                        <TableCell className="text-center">Date</TableCell>
                                        <TableCell className="text-center">Amount</TableCell>
                                        <TableCell className="text-center">Mode of Payment</TableCell>
                                        <TableCell className="text-center">Particulars</TableCell>
                                        <TableCell className="text-center">Receipt</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {payments.map((payment: Payment, key: number) => (
                                        <TableRow key={key}>
                                            <TableCell className="text-center">{key + 1}</TableCell>
                                            <TableCell className="text-center">{payment.transactionId}</TableCell>
                                            <TableCell
                                                className="text-center">{format(new Date(payment.paidOn), 'dd-MM-yyyy')}</TableCell>
                                            <TableCell className="text-center">{payment.amount}</TableCell>
                                            <TableCell className="text-center">{payment.mode}</TableCell>
                                            <TableCell
                                                className="text-center">{payment.particulars ?? 'NIL'}</TableCell>
                                            <TableCell className="text-center">View Receipt</TableCell>
                                            <TableCell className="hover:bg-gray-200 rounded-lg flex justify-center"
                                                       onClick={(e) => handleDelete(e, payment._id ?? '')}>
                                                <img src="/icons/bin.png" width="20" alt="Delete Button"/>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default FeeData;
