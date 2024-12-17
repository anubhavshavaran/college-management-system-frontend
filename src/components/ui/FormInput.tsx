import {Input} from "@/components/ui/input.tsx";
import {Control, Controller, FieldValues, RegisterOptions} from "react-hook-form";

type FormInputPropsType = {
    control: Control,
    disabled: boolean,
    name: string,
    type: string,
    placeholder: string,
    rules?:  Omit<RegisterOptions<FieldValues, string>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"> | undefined
}

function FormInput({control, disabled, name, type, placeholder}: FormInputPropsType) {
    return (
        <Controller
            control={control}
            name={name}
            rules={{
                required: {
                    value: true,
                    message: 'Username is required'
                }
            }}
            render={({field: {onChange, value}}) => (
                <Input disabled={disabled} value={value} onChange={onChange} type={type} placeholder={placeholder}/>
            )}
        />
    );
}

export default FormInput;