import {DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import MuiDatePicker from "@/components/ui/MuiDatePicker.tsx";
import {Controller, useForm} from "react-hook-form";
import FormError from "@/components/ui/FormError.tsx";
import {getAllVouchersApi} from "@/services/voucherApi.ts";
import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import {useState} from "react";
import Spinner from "@/components/ui/Spinner.tsx";
// import {generateStatement} from "@/lib/pdf.ts";

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
            const form = getValues();

            let query = {};
            if (Number(form.duration) === Duration.Custom) {
                query = {
                    start: form.startDate.toISOString(),
                    end: form.endDate.toISOString(),
                }
            } else {
                let today: Date | string = new Date();
                today = today.toISOString();

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
                            date: day.toISOString(),
                        };
                        break;
                    }
                    case Duration.LastWeek: {
                        const day = new Date(today);
                        day.setDate(day.getDate() - 7);

                        query = {
                            start: day.toISOString(),
                            end: today,
                        };
                        break;
                    }

                    case Duration.LastMonth: {
                        const day = new Date(today);
                        day.setMonth(day.getMonth() - 1);

                        query = {
                            start: day.toISOString(),
                            end: today,
                        };
                        break;
                    }

                    case Duration.LastSixMonth: {
                        const day = new Date(today);
                        day.setMonth(day.getMonth() - 6);

                        query = {
                            start: day.toISOString(),
                            end: today,
                        };
                        break;
                    }

                    case Duration.LastYear: {
                        const day = new Date(today);
                        day.setFullYear(day.getFullYear() - 1);

                        query = {
                            start: day.toISOString(),
                            end: today,
                        };
                        break;
                    }
                }

            }

            console.log(query)
            const data = await getAllVouchersApi(organization, query);
            const vouchers = data?.data?.docs;
            console.log(vouchers)
            // generateStatement(vouchers, organization, query);
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
                    <div className="w-full flex flex-col justify-center items-center gap-2">
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
                                        <MuiDatePicker value={value} onChange={onChange} disabled={isLoading}/>
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
                                        <MuiDatePicker value={value} onChange={onChange} disabled={isLoading}/>
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
                        <p>Export</p>
                    )}
                </Button>
            </DialogFooter>
        </DialogContent>
    );
}

export default ExportVoucherDialog;