import {DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useCreateStudentPayment} from "@/hooks/students.ts";
import {useParams} from "react-router";
import {Controller, useForm} from "react-hook-form";
import Payment from "@/constants/Payment.ts";
import FormError from "@/components/ui/FormError.tsx";
import Spinner from "@/components/ui/Spinner.tsx";
import DatePickerWithMonthYear from "@/components/ui/DatePickerWithMonthYear.tsx";

type PayFeeDialogProps = {
    onSave: () => void;
}

function PayFeeDialog({onSave}: PayFeeDialogProps) {
    const {studentId} = useParams();
    const {createPayment, isCreatingPayment} = useCreateStudentPayment(studentId ?? '');
    const {control, getValues, formState: {errors}, handleSubmit, reset} = useForm<Payment>();

    function create() {
        const data = getValues();
        createPayment(data);
        reset();
        onSave();
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Pay Fees</DialogTitle>
                <DialogDescription>
                    Pay the fee of a student
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Amount *
                    </Label>
                    <Controller
                        control={control}
                        name="amount"
                        rules={{
                            required: {
                                value: true,
                                message: 'Amount is required'
                            },
                            min: {
                                value: 1,
                                message: 'Amount connot be zero'
                            }
                        }}
                        render={({field: {value, onChange}}) => (
                            <div className="w-full col-span-3 flex flex-col gap-2">
                                <Input
                                    id="name"
                                    className="col-span-3"
                                    value={value}
                                    onChange={onChange}
                                    disabled={isCreatingPayment}
                                />
                                <FormError message={errors.amount?.message}/>
                            </div>
                        )}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-16">
                    <Label htmlFor="username" className="text-right text-nowrap">
                        Mode of Payment *
                    </Label>
                    <Controller
                        control={control}
                        name="mode"
                        rules={{
                            required: {
                                value: true,
                                message: 'Mode of Payment is required'
                            }
                        }}
                        render={({field: {value, onChange}}) => (
                            <div className="w-full col-span-3 flex flex-col gap-2">
                                <Input
                                    id="name"
                                    className="col-span-3"
                                    value={value}
                                    onChange={onChange}
                                    disabled={isCreatingPayment}
                                />
                                <FormError message={errors.mode?.message}/>
                            </div>
                        )}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Paid On *
                    </Label>
                    <Controller
                        control={control}
                        name="paidOn"
                        rules={{
                            required: {
                                value: true,
                                message: 'Payment Date is required'
                            }
                        }}
                        render={({field: {value, onChange}}) => (
                            <div className="w-full col-span-3 flex flex-col gap-2">
                                <DatePickerWithMonthYear date={value ?? Date()} setDate={onChange} />
                                <FormError message={errors.paidOn?.message} />
                            </div>
                        )}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Particulars
                    </Label>
                    <Controller
                        control={control}
                        name="particulars"
                        render={({field: {value, onChange}}) => (
                            <>
                                <Input
                                    id="name"
                                    className="col-span-3"
                                    value={value}
                                    onChange={onChange}
                                    disabled={isCreatingPayment}
                                />
                            </>
                        )}
                    />
                </div>
            </div>
            <DialogFooter className="w-full flex sm:justify-center">
                <Button
                    type="submit"
                    className="bg-defaultOrange"
                    onClick={handleSubmit(create)}
                    disabled={isCreatingPayment}
                >
                    {isCreatingPayment ? (
                        <Spinner/>
                    ) : (
                        'Pay'
                    )}
                </Button>
            </DialogFooter>
        </DialogContent>
    );
}

export default PayFeeDialog;