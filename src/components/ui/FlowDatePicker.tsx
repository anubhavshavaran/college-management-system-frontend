import { Datepicker } from "flowbite-react";

type FlowDatePickerProps = {
    value: Date;
    onChange: (time: Date) => void;
    disabled?: boolean;
};

function FlowDatePicker({value, disabled, onChange}: FlowDatePickerProps) {
    const handleChange = (newValue: Date | null) => {
        if (newValue) {
            onChange(newValue);
        }
    };

    return (
        <div className={`w-full bg-white border-2 border-defaultLightBlue text-defaultBlue rounded-xl`}>
            <Datepicker
                value={value}
                onChange={(newValue) => handleChange(newValue)}
                disabled={disabled}
                style={{backgroundColor: 'transparent', border: 'none', width: '100%'}}

            />
        </div>
    );
}

export default FlowDatePicker;