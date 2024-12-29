import {Controller, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input.tsx";
import FormError from "@/components/ui/FormError.tsx";
import {Button} from "@/components/ui/button.tsx";
import Spinner from "@/components/ui/Spinner.tsx";
import {useUpdateStudent} from "@/hooks/students.ts";
import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import {useParams} from "react-router";

function UpdateStudentFeeForm() {
    const {organization} = useOrganization();
    const {studentId} = useParams();
    const {updateStudent, isUpdatingStudent} = useUpdateStudent(studentId ?? '', organization);
    const {
        control: fixedFeeControl,
        getValues: getFixedFee,
        handleSubmit: handleFixedFee,
        formState: {errors: {fixedFee}}
    } = useForm<{ fixedFee: number }>({
        defaultValues: {
            fixedFee: 0
        }
    });
    const {
        control: previousFeeControl,
        getValues: getPreviousFee,
        handleSubmit: handlePreviousFee,
        formState: {errors: {previousFee}}
    } = useForm<{ previousFee: number }>({
        defaultValues: {
            previousFee: 0
        }
    });

    function submitFixedFee() {
        updateStudent({fixedFee: getFixedFee().fixedFee});
    }

    function submitPreviousFee() {
        updateStudent({previousFee: getPreviousFee().previousFee});
    }

    return (
        <div className="flex flex-col gap-2 justify-center">
            <div className="w-full flex gap-2 items-end justify-center">
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold capitalize">new fixed fee</p>
                    <Controller
                        control={fixedFeeControl}
                        name="fixedFee"
                        rules={{
                            required: {
                                value: true,
                                message: 'A value for fixed fee is required.'
                            }
                        }}
                        render={({field: {value, onChange}}) => (
                            <>
                                <Input
                                    type="number"
                                    className="sm:w-full md:w-[500px] bg-white"
                                    placeholder="xxxx xxxx"
                                    disabled={isUpdatingStudent}
                                    value={value}
                                    onChange={onChange}
                                />
                                <FormError message={fixedFee?.message}/>
                            </>
                        )}
                    />
                </div>
                <Button
                    className="bg-defaultOrange hover:bg-defaultOrange"
                    disabled={isUpdatingStudent}
                    onClick={handleFixedFee(submitFixedFee)}
                >
                    {isUpdatingStudent ? (
                        <Spinner/>
                    ) : (
                        "Confirm"
                    )}
                </Button>
            </div>

            <div className="w-full flex gap-2 items-end justify-center">
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold capitalize">new previous fee</p>
                    <Controller
                        control={previousFeeControl}
                        name="previousFee"
                        rules={{
                            required: {
                                value: true,
                                message: 'A value for previous fee is required.'
                            }
                        }}
                        render={({field: {value, onChange}}) => (
                            <>
                                <Input
                                    type="number"
                                    className="sm:w-full md:w-[500px] bg-white"
                                    placeholder="xxxx xxxx"
                                    disabled={isUpdatingStudent}
                                    value={value}
                                    onChange={onChange}
                                />
                                <FormError message={previousFee?.message}/>
                            </>
                        )}
                    />
                </div>
                <Button
                    className="bg-defaultOrange hover:bg-defaultOrange"
                    disabled={isUpdatingStudent}
                    onClick={handlePreviousFee(submitPreviousFee)}
                >
                    {isUpdatingStudent ? (
                        <Spinner/>
                    ) : (
                        "Confirm"
                    )}
                </Button>
            </div>
        </div>
    );
}

export default UpdateStudentFeeForm;