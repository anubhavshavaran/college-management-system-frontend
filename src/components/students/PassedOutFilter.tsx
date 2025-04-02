import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

type Year = {
    _id: string;
    expectedYearOfPassing: string;
}

type PassedOutFilterProps = {
    data: Year[];
    year: string;
    onChange: (year: string) => void;
}

function PassedOutFilter({data, year, onChange}: PassedOutFilterProps) {
    const years = [...new Set(data?.map(d => d.expectedYearOfPassing))];

    return (
        <div className="w-full">
            <Select onValueChange={onChange} defaultValue={years?.includes(year) ? year : undefined}>
                <SelectTrigger className="w-[180px] m-2 bg-white">
                    <SelectValue placeholder="Year"/>
                </SelectTrigger>
                <SelectContent>
                    {years?.map(y => (
                        <SelectItem value={y}>{y}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

export default PassedOutFilter;