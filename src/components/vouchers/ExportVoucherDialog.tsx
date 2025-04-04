import {DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Controller, useForm} from "react-hook-form";
import FormError from "@/components/ui/FormError.tsx";
import {getAllVouchersApi} from "@/services/voucherApi.ts";
import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import {useState} from "react";
import Spinner from "@/components/ui/Spinner.tsx";
import {generatePDF, generateStatement} from "@/lib/pdf.ts";
import FlowDatePicker from "@/components/ui/FlowDatePicker.tsx";
import {toast} from "react-hot-toast";
import Organization from "@/constants/Organization.ts";
import ReactDOMServer from "react-dom/server";
import VoucherReceiptStatic from "@/components/receipts/VoucherReceiptStatic.tsx";

enum Duration {
    Today,
    Yesterday,
    LastWeek,
    LastMonth,
    LastSixMonth,
    LastYear,
    Custom,
}

type DurationType = {
    duration: Duration;
    startDate: Date;
    endDate: Date;
}

async function getVouchers(organization: Organization, form: DurationType) {
    let query = {};
    if (Number(form.duration) === Duration.Custom) {
        const startDate = new Date(form.startDate);
        startDate.setDate(startDate.getDate() + 1);
        const endDate = new Date(form.endDate);
        endDate.setDate(endDate.getDate() + 1);

        query = {
            start: startDate.toISOString().split("T")[0],
            end: endDate.toISOString().split("T")[0],
        }
    } else {
        let today: Date | string = new Date();
        today = today.toISOString().split("T")[0];

        switch (Number(form.duration)) {
            case Duration.Today:
                query = {
                    date: today,
                };
                break;
            case Duration.Yesterday: {
                const day = new Date(today);
                day.setDate(day.getDate() - 1);

                query = {
                    date: day.toISOString().split("T")[0],
                };
                break;
            }
            case Duration.LastWeek: {
                const day = new Date(today);
                day.setDate(day.getDate() - 7);

                query = {
                    start: day.toISOString().split("T")[0],
                    end: today,
                };
                break;
            }

            case Duration.LastMonth: {
                const day = new Date(today);
                day.setMonth(day.getMonth() - 1);

                query = {
                    start: day.toISOString().split("T")[0],
                    end: today,
                };
                break;
            }

            case Duration.LastSixMonth: {
                const day = new Date(today);
                day.setMonth(day.getMonth() - 6);

                query = {
                    start: day.toISOString().split("T")[0],
                    end: today,
                };
                break;
            }

            case Duration.LastYear: {
                const day = new Date(today);
                day.setFullYear(day.getFullYear() - 1);

                query = {
                    start: day.toISOString().split("T")[0],
                    end: today,
                };
                break;
            }
        }

    }
    const data = await getAllVouchersApi(organization, query);
    return {
        vouchers: data?.data?.docs,
        query,
    };
}

function ExportVoucherDialog() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {organization} = useOrganization();
    const {control, formState: {errors}, handleSubmit, getValues, watch} = useForm<DurationType>({
        defaultValues: {
            duration: Duration.Today,
        }
    });
    const duration = watch('duration');

    async function submit() {
        setIsLoading(true);

        try {
            const {vouchers, query} = await getVouchers(organization, getValues());

            if (vouchers.length === 0) {
                toast.error(
                    'No Vouchers available for the selected duration.'
                );
            } else {
                generateStatement(vouchers, organization, query);
            }
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false);
        }
    }

    async function generateReceipts() {
        setIsLoading(true);

        try {
            const {vouchers} = await getVouchers(organization, getValues());

            if (vouchers.length === 0) {
                toast.error(
                    'No Vouchers available for the selected duration.'
                );
                return;
            }

            generatePDF(vouchers, (voucher) => {
                return ReactDOMServer.renderToStaticMarkup(
                    <VoucherReceiptStatic voucher={voucher}/>
                );
            }).then(() => {
                toast.success('Vouchers PDF has been successfully exported.');
            });
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Export</DialogTitle>
                <DialogDescription>
                    Export the vouchers
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="flex flex-col justify-start items-start gap-2">
                    <Label htmlFor="name" className="text-left">Duration</Label>
                    <Controller
                        control={control}
                        name="duration"
                        rules={{
                            required: {
                                value: true,
                                message: 'This is field is required'
                            }
                        }}
                        render={({field: {value, onChange}}) => (
                            <>
                                <Select value={value.toString()} onValueChange={onChange} disabled={isLoading}>
                                    <SelectTrigger
                                        className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl">
                                        <SelectValue placeholder="Select the Duration"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={Duration.Today.toString()}>Today</SelectItem>
                                        <SelectItem value={Duration.Yesterday.toString()}>Yesterday</SelectItem>
                                        <SelectItem value={Duration.LastWeek.toString()}>Last week</SelectItem>
                                        <SelectItem value={Duration.LastMonth.toString()}>Last month</SelectItem>
                                        <SelectItem value={Duration.LastSixMonth.toString()}>Last 6 months</SelectItem>
                                        <SelectItem value={Duration.LastYear.toString()}>Last 1 year</SelectItem>
                                        <SelectItem value={Duration.Custom.toString()}>Custom</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormError message={errors?.duration?.message}/>
                            </>
                        )}
                    />
                </div>
                {Number(duration) === Duration.Custom && (
                    <div className="w-full flex justify-center items-center gap-2">
                        <div className="w-full flex flex-col justify-start items-start gap-2">
                            <Label htmlFor="name" className="text-left">From</Label>
                            <Controller
                                control={control}
                                name="startDate"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'This is field is required'
                                    }
                                }}
                                render={({field: {value, onChange}}) => (
                                    <>
                                        <FlowDatePicker value={value} onChange={onChange} disabled={isLoading}/>
                                        <FormError message={errors?.startDate?.message}/>
                                    </>
                                )}
                            />
                        </div>
                        <div className="w-full flex flex-col justify-start items-start gap-2">
                            <Label htmlFor="name" className="text-left">To</Label>
                            <Controller
                                control={control}
                                name="endDate"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'This is field is required'
                                    }
                                }}
                                render={({field: {value, onChange}}) => (
                                    <>
                                        <FlowDatePicker value={value} onChange={onChange} disabled={isLoading}/>
                                        <FormError message={errors?.endDate?.message}/>
                                    </>
                                )}
                            />
                        </div>
                    </div>
                )}
            </div>
            <DialogFooter className="w-full flex sm:justify-center">
                <Button
                    onClick={handleSubmit(submit)}
                    className="bg-defaultOrange"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Spinner/>
                    ) : (
                        <p>Export as Statements</p>
                    )}
                </Button>
                <Button
                    onClick={handleSubmit(generateReceipts)}
                    className="bg-defaultOrange"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Spinner/>
                    ) : (
                        <p>Export as PDF</p>
                    )}
                </Button>
            </DialogFooter>
        </DialogContent>
    );
}

export default ExportVoucherDialog;