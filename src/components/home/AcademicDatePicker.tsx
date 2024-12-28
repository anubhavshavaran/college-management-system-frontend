import DatePicker from "@/components/ui/date-picker.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import {getAcademicDataApi, updateAcademicDateApi} from "@/services/dashboardApi.ts";
import Spinner from "@/components/ui/Spinner.tsx";
import {useEffect, useState} from "react";
import AcademicDate from "@/constants/AcademicDate.ts";

function AcademicDatePicker() {
    const {organization} = useOrganization();
    const [startingDate, setStartingDate] = useState<Date>();
    const [endingDate, setEndingDate] = useState<Date>();
    const {data, isPending, isFetched} = useQuery({
        queryKey: [organization, "academicDate"],
        queryFn: () => getAcademicDataApi(organization)
    });
    const {mutate, isPending: isUpdating} = useMutation({
        mutationFn: (query: AcademicDate) => updateAcademicDateApi(organization, query)
    });

    useEffect(() => {
        if (isFetched) {
            setStartingDate(data.data.startingDate);
            setEndingDate(data.data.endingDate);
        }
    }, [isFetched, data]);

    return (
        <div className="w-full flex flex-col gap-6">
            {isPending || isUpdating ? (
                <Spinner />
            ) : (
                <>
                    <div className="flex gap-2 items-end">
                        <div className="flex flex-col gap-1">
                            <p>Starting Date</p>
                            <DatePicker date={startingDate} setDate={setStartingDate}/>
                        </div>
                        <Button
                            onClick={() => {
                                mutate({
                                    startingDate: startingDate
                                });
                            }}
                            className="bg-defaultOrange hover:bg-defaultOrange"
                        >
                            Set
                        </Button>
                    </div>
                    <div className="flex gap-2 items-end">
                        <div className="flex flex-col gap-1">
                            <p>Ending Date</p>
                            <DatePicker date={endingDate} setDate={setEndingDate}/>
                        </div>
                        <Button
                            onClick={() => {
                                mutate({
                                    endingDate: endingDate
                                });
                            }}
                            className="bg-defaultOrange hover:bg-defaultOrange"
                        >
                            Set
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}

export default AcademicDatePicker;