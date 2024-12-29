import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Dispatch, SetStateAction} from "react";

type DatePickerProps = {
    date: Date | undefined;
    setDate: Dispatch<SetStateAction<Date | undefined>>;
    className?: string;
}

export function DatePicker({date, setDate, className}: DatePickerProps) {
    return (
        <Popover modal={false}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-[1050] ">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => setDate(date)}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}

export default DatePicker;