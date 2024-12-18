import InfoCard from "@/components/ui/InfoCard.tsx";
import FeesChart from "@/components/home/FeesChart.tsx";
import GenderChart from "@/components/home/GenderChart.tsx";

function Home() {
    return (
        <div className="w-full p-6">
            <div className="w-full pt-16 flex sm:flex-col md:flex-row items-center gap-4 justify-start">
                <InfoCard label="student" text="1260" />
                <InfoCard label="student" text="1260" />
                <InfoCard label="student" text="1260" />
            </div>
            <div className="w-full py-4 flex sm:flex-col md:flex-row gap-4">
                <FeesChart />
                <GenderChart />
            </div>
        </div>
    );
}

export default Home;