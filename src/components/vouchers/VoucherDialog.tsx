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
import FlowDatePicker from "@/components/ui/FlowDatePicker.tsx";

type VoucherDialogProps = {
    organization: Organization;
    onSave: () => void;
}

export function VoucherDialog({organization, onSave}: VoucherDialogProps) {
    const [searchParams] = useSearchParams();
    const voucherId: string | null = searchParams.get("id");
    const isEditing: boolean = voucherId !== null;
    const {control, formState: {errors}, handleSubmit, getValues, reset} = useForm<Voucher>({
        defaultValues: {
            title: "",
            amount: 0,
            modeOfPayment: "",
            particulars: "",
            date: new Date()
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
        reset();
        onSave();
    }

    function update() {
        const data = getValues();
        updateVoucher(data);
        reset();
        onSave();
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
                                Paid To
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
                                    <div className="w-full col-span-3 flex flex-col gap-2">
                                        <Input
                                            id="name"
                                            className="col-span-3"
                                            value={value}
                                            onChange={onChange}
                                        />
                                        <FormError message={errors.title?.message}/>
                                    </div>
                                )}
                            />
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
                                    <div className="w-full col-span-3 flex flex-col gap-2">
                                        <FlowDatePicker value={value} onChange={onChange} />
                                        <FormError message={errors.date?.message}/>
                                    </div>
                                )}
                            />
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
                                    <div className="w-full col-span-3 flex flex-col gap-2">
                                        <Input
                                            id="amount"
                                            className="col-span-3"
                                            value={value}
                                            onChange={onChange}
                                        />
                                        <FormError message={errors.amount?.message}/>
                                    </div>
                                )}
                            />
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
                                    <div className="w-full col-span-3 flex flex-col gap-2">
                                        <Input
                                            id="mode"
                                            className="col-span-3"
                                            value={value}
                                            onChange={onChange}
                                        />
                                        <FormError message={errors.modeOfPayment?.message}/>
                                    </div>
                                )}
                            />
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
                                    <div className="w-full col-span-3 flex flex-col gap-2">
                                        <Input
                                            id="parts"
                                            className="col-span-3"
                                            value={value}
                                            onChange={onChange}
                                        />
                                        <FormError message={errors.particulars?.message}/>
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                    <DialogFooter className="w-full flex sm:justify-center">
                        <Button
                            onClick={isEditing ? handleSubmit(update) : handleSubmit(create)}
                            className="bg-defaultOrange"
                        >
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