import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import Spinner from "@/components/ui/Spinner.tsx";
import {Controller, useForm} from "react-hook-form";
import FormError from "@/components/ui/FormError.tsx";
import {useUpdateStudentsFee} from "@/hooks/students.ts";

function UpdateFixedFeeForm() {
    const {updateFees, isPending} = useUpdateStudentsFee();
    const {control, getValues, handleSubmit, formState: {errors}} = useForm<{ fixedFee: number }>({
        defaultValues: {
            fixedFee: 0
        }
    });

    function submit() {
        updateFees(getValues().fixedFee);
    }

    return (
        <div className="w-full flex gap-2 items-end justify-center">
            <div className="flex flex-col gap-1 justify-center">
                <p className="text-sm font-semibold capitalize">new fixed fee</p>
                <Controller
                    control={control}
                    name="fixedFee"
                    rules={{
                        required: {
                            value: true,
                            message: 'A value for fixed fee is required.'
                        },
                        min: {
                            value: 1,
                            message: 'A value for min fee is required.'
                        }
                    }}
                    render={({field: {value, onChange}}) => (
                        <div className="flex flex-col justify-center gap-2">
                            <Input
                                type="number"
                                className="sm:w-full md:w-[500px]"
                                placeholder="xxxx xxxx"
                                disabled={isPending}
                                value={value}
                                onChange={onChange}
                            />
                            <FormError message={errors?.fixedFee?.message} />
                        </div>
                    )}
                />
            </div>
            <Button
                className="bg-defaultOrange hover:bg-defaultOrange"
                disabled={isPending}
                onClick={handleSubmit(submit)}
            >
                {isPending ? (
                    <Spinner/>
                ) : (
                    "Confirm"
                )}
            </Button>
        </div>
    );
}

export default UpdateFixedFeeForm;