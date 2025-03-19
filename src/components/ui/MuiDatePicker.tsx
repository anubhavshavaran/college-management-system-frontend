import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

type MuiDatePickerProps = {
    value: Date;
    onChange: (time: Date) => void;
    disabled?: boolean;
};

function MuiDatePicker({ value, disabled, onChange }: MuiDatePickerProps) {
    const handleChange = (newValue: Date | null) => {
        if (newValue) {
            onChange(newValue);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div
                className={`w-full bg-white p-1 border-2 border-defaultLightBlue text-defaultBlue rounded-xl`}
                onMouseDown={(e) => e.stopPropagation()}
            >
                <DatePicker
                    autoFocus={true}
                    value={new Date(value)}
                    onChange={(newValue) => handleChange(newValue)}
                    format={"dd/MM/yyyy"}
                    className="w-full p-0 border-none"
                    disabled={disabled}
                    sx={{
                        "& .MuiInputBase-input": {
                            padding: "4px 8px",
                            fontSize: "14px",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                        },
                    }}
                    slotProps={{
                        popper: {
                            container: document.body,
                            modifiers: [
                                {
                                    name: "preventOverflow",
                                    options: {
                                        boundary: "viewport",
                                    },
                                },
                            ],
                            sx: {
                                zIndex: 9999,
                            },
                        },
                    }}
                />
            </div>
        </LocalizationProvider>
    );
}

export default MuiDatePicker;