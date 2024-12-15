import {Button} from "@/components/ui/button.tsx"
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Label} from "@/components/ui/label.tsx"
import {Controller, useForm} from "react-hook-form";
import Voucher from "@/constants/Voucher.ts";
import FormError from "@/components/ui/FormError.tsx";
import Spinner from "@/components/ui/Spinner.tsx";
import Organization from "@/constants/Organization.ts";
import {useSearchParams} from "react-router";
import {useEffect} from "react";
import {useCreateVoucher, useUpdateVoucher, useVoucher} from "@/hooks/vouchers.ts";

type VoucherDialogProps = {
    organization: Organization
}

export function VoucherDialog({organization}: VoucherDialogProps) {
    const [searchParams] = useSearchParams();
    const voucherId: string | null = searchParams.get("id");
    const isEditing: boolean = voucherId !== null;
    const {control, formState: {errors}, handleSubmit, getValues, reset} = useForm<Voucher>({
        defaultValues: {
            title: "",
            date: "",
            amount: 0,
            modeOfPayment: "",
            particulars: "",
        },
    });

    const {voucher, isVoucherLoading, isFetched} = useVoucher(voucherId ?? '', isEditing, organization);
    const {createVoucher, isCreatingVoucher} = useCreateVoucher(organization);
    const {updateVoucher, isUpdatingVoucher} = useUpdateVoucher(voucherId ?? '', organization);

    useEffect(() => {
        if (isFetched) {
            reset(voucher);
        }
    }, [isFetched, voucher, reset]);

    function create() {
        const data = getValues();
        createVoucher(data);
    }

    function update() {
        const data = getValues();
        updateVoucher(data);
    }

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>
                    {isEditing ? "Edit Voucher" : "Add Voucher"}
                </DialogTitle>
                <DialogDescription>
                    {isEditing ? "Edit this debit voucher for the institution." : "Add a debit voucher for the institution."}
                </DialogDescription>
            </DialogHeader>
            {isEditing && isVoucherLoading ? (
                <Spinner/>
            ) : (
                <>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Title
                            </Label>
                            <Controller
                                control={control}
                                name="title"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'This is field is required'
                                    }
                                }}
                                render={({field: {value, onChange}}) => (
                                    <Input
                                        id="name"
                                        className="col-span-3"
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                            <FormError message={errors.title?.message}/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">
                                Date
                            </Label>
                            <Controller
                                control={control}
                                name="date"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'This is field is required'
                                    }
                                }}
                                render={({field: {value, onChange}}) => (
                                    <Input
                                        id="date"
                                        className="col-span-3"
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                            <FormError message={errors.date?.message}/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right">
                                Amount
                            </Label>
                            <Controller
                                control={control}
                                name="amount"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'This is field is required'
                                    },
                                    min: {
                                        value: 1,
                                        message: "This can't be 0."
                                    }
                                }}
                                render={({field: {value, onChange}}) => (
                                    <Input
                                        id="amount"
                                        className="col-span-3"
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                            <FormError message={errors.amount?.message}/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="mode" className="text-right">
                                Mode
                            </Label>
                            <Controller
                                control={control}
                                name="modeOfPayment"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'This is field is required'
                                    }
                                }}
                                render={({field: {value, onChange}}) => (
                                    <Input
                                        id="mode"
                                        className="col-span-3"
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                            <FormError message={errors.modeOfPayment?.message}/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="parts" className="text-right">
                                Particulars
                            </Label>
                            <Controller
                                control={control}
                                name="particulars"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'This is field is required'
                                    }
                                }}
                                render={({field: {value, onChange}}) => (
                                    <Input
                                        id="parts"
                                        className="col-span-3"
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                            <FormError message={errors.particulars?.message}/>
                        </div>
                    </div>
                    <DialogFooter className="w-full flex-row justify-center">
                        <Button onClick={isEditing ? handleSubmit(update) : handleSubmit(create)}>
                            {isCreatingVoucher || isUpdatingVoucher ? (
                                <Spinner/>
                            ) : (
                                <p>{isEditing ? "Edit" : "Add"}</p>
                            )}
                        </Button>
                    </DialogFooter>
                </>
            )}
        </DialogContent>
    );
}

export default VoucherDialog;