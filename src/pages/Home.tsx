import InfoCard from "@/components/ui/InfoCard.tsx";
import FeesChart from "@/components/home/FeesChart.tsx";
import GenderChart from "@/components/home/GenderChart.tsx";
import {useDashData} from "@/hooks/dashboard.ts";
import Spinner from "@/components/ui/Spinner.tsx";
import {formatCurrency} from "@/functions/formatCurrency.ts";
import {useUser} from "@/contexts/UserContextProvider.tsx";
import AcademicDatePicker from "@/components/home/AcademicDatePicker.tsx";

function Home() {
    const {data, isPending} = useDashData();
    const {user} = useUser();

    return (
        <div className="w-full p-6">
            {isPending ? (
                <Spinner/>
            ) : (
                <div className="w-full">
                    <div className="w-full flex sm:flex-col md:flex-row items-center gap-4 justify-start">
                        <InfoCard label="students" text={data.studentsNum ?? 0}/>
                        <InfoCard label="Total Fixed Fee" text={formatCurrency(data?.fees?.totalFixedFee ?? 0)}/>
                        <InfoCard label="Total Paid Fee" text={formatCurrency(data?.fees?.totalPaidFee ?? 0)}/>
                    </div>
                    <div className="w-full py-4 flex sm:flex-col lg:flex-row gap-4">
                        <FeesChart/>
                        <GenderChart malePercentage={data?.genderRatio?.male ?? 0} femalePercentage={data?.genderRatio?.female ?? 0}/>
                    </div>
                    {user?.role === "CHAIRMAN" && (
                        <AcademicDatePicker />
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;