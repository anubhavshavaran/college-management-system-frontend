import {DatePicker} from 'rsuite';
import shadow from 'react-shadow';

type DatePickerInputProps = {
    value: Date | undefined;
    onChange: (date: Date) => void;
}

function DatePickerInput({value, onChange}: DatePickerInputProps) {
    console.log(value)
    const handleChange = (value: Date | null, event: any) => {
        onChange(value ?? new Date());
    };

    return (
        <div
            className={`w-full bg-white p-1 border-2 border-defaultLightBlue text-defaultBlue rounded-xl`}
        >
            <shadow.div>
                <style>{`@import url('https://unpkg.com/rsuite/dist/rsuite.min.css');`}</style>
                <DatePicker
                    format="dd/MM/yyyy"
                    className="w-full"
                    value={value}
                    onChange={handleChange}
                />
            </shadow.div>
        </div>
    );
}

export default DatePickerInput;