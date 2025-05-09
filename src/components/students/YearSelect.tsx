import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useSearchParams} from "react-router";

function YearSelect() {
    const [searchParams, setSearchParams] = useSearchParams();
    const year = searchParams.get("year");
    const cat = searchParams.get("cat");

    function handleYearChange(y: string) {
        searchParams.set("year", y);
        setSearchParams(searchParams);
    }

    return (
        <Select value={year ?? ''} onValueChange={handleYearChange}>
            <SelectTrigger className="w-[180px] m-2 bg-white">
                <SelectValue placeholder="Year"/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="newAdmission">New Admission</SelectItem>
                <SelectItem value="1">1st year</SelectItem>
                <SelectItem value="2">2nd year</SelectItem>
                {cat !== 'msc' && (
                    <>
                        <SelectItem value="3">3rd year</SelectItem>
                        <SelectItem value="4">4th year</SelectItem>
                    </>
                )}
            </SelectContent>
        </Select>
    );
}

export default YearSelect;