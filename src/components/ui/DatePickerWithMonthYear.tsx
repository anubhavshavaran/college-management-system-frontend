"use client";

import * as React from "react";
import { format, setMonth, setYear, getYear, isValid, parse } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input"; // Assuming you have an Input component

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
    const [inputValue, setInputValue] = React.useState<string>(date ? format(date, "dd/MM/yyyy") : "");

    // Sync input value when date prop changes
    React.useEffect(() => {
        setInputValue(date ? format(date, "dd/MM/yyyy") : "");
    }, [date]);

    // Handle text input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        // Parse and validate the input date
        const parsedDate = parse(value, "dd/MM/yyyy", new Date());
        if (isValid(parsedDate)) {
            setDate(parsedDate);
            setTempMonth(parsedDate.getMonth());
            setTempYear(parsedDate.getFullYear());
        }
    };

    const handleMonthChange = (month: number) => {
        setTempMonth(month);
        setDate((prevDate) => {
            const newDate = prevDate ? setMonth(prevDate, month) : new Date();
            setInputValue(format(newDate, "dd/MM/yyyy"));
            return newDate;
        });
    };

    const handleYearChange = (year: number) => {
        setTempYear(year);
        setDate((prevDate) => {
            const newDate = prevDate ? setYear(prevDate, year) : new Date();
            setInputValue(format(newDate, "dd/MM/yyyy"));
            return newDate;
        });
    };

    return (
        <div className="flex flex-col space-y-2">
            {/* Text Input */}
            <Input
                value={inputValue}
                onChange={handleInputChange}
                placeholder="dd/MM/yyyy"
                className={className}
            />

            {/* Popover with Calendar */}
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className={className}>
                        {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4">
                    <div className={`flex space-x-2 mb-2`}>
                        <Select onValueChange={(value) => handleMonthChange(Number(value))} value={String(tempMonth)}>
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

                        <Select onValueChange={(value) => handleYearChange(Number(value))} value={String(tempYear)}>
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
                        onSelect={(newDate) => {
                            setDate(newDate);
                            if (newDate) {
                                setInputValue(format(newDate, "dd/MM/yyyy"));
                                setTempMonth(newDate.getMonth());
                                setTempYear(newDate.getFullYear());
                            }
                        }}
                        initialFocus
                        month={new Date(tempYear, tempMonth, 1)}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}