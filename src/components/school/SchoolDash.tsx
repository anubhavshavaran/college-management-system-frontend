import FeesChart from "@/components/dashboard/FeesChart.tsx";
// import GenderChart from "@/components/dashboard/GenderChart.tsx";

function SchoolDash() {
    return (
        <div className="w-full overflow-y-scroll p-4">
            <div className="w-full flex">
                <FeesChart />
                {/*<GenderChart/>*/}
            </div>
        </div>
    );
}

export default SchoolDash;