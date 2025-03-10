"use client";

import * as React from "react";
import { format, setMonth, setYear, getYear } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DatePickerProps {
    date: Date | undefined;
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    className?: string;
}

export default function DatePickerWithMonthYear({ date, setDate, className }: DatePickerProps) {
    const currentDate = new Date(date ?? '');
    const currentYear = getYear(new Date());
    const [tempMonth, setTempMonth] = React.useState<number>(currentDate?.getMonth() || new Date().getMonth());
    const [tempYear, setTempYear] = React.useState<number>(currentDate?.getFullYear() || currentYear);

    const handleMonthChange = (month: number) => {
        setTempMonth(month);
        setDate((prevDate) => prevDate ? setMonth(prevDate, month) : new Date());
    };

    const handleYearChange = (year: number) => {
        setTempYear(year);
        setDate((prevDate) => prevDate ? setYear(prevDate, year) : new Date());
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className={className}>
                    {date ? format(date, "PPP") : "Pick a date"}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4">
                <div className={`flex space-x-2 mb-2`}>
                    <Select onValueChange={(value) => handleMonthChange(Number(value))} defaultValue={String(tempMonth)}>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from({ length: 12 }).map((_, index) => (
                                <SelectItem key={index} value={String(index)}>
                                    {format(new Date(2022, index, 1), "MMMM")}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select onValueChange={(value) => handleYearChange(Number(value))} defaultValue={String(tempYear)}>
                        <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from({ length: currentYear - 1999 }).map((_, index) => {
                                const year = currentYear - index;
                                return (
                                    <SelectItem key={year} value={String(year)}>
                                        {year}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </div>

                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    month={new Date(tempYear, tempMonth, 1)}
                />
            </PopoverContent>
        </Popover>
    );
}