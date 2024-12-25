import {Button} from "@/components/ui/button.tsx";

type StudentInfoTabProps = {
    selectedTab: number;
    setSelectedTab: (selectedTab: number) => void;
}

function StudentInfoTab({selectedTab, setSelectedTab}: StudentInfoTabProps) {
    return (
        <div className="flex gap-16">
            <Button onClick={() => setSelectedTab(0)}
                className={`px-10 bg-transparent text-defaultBlue text-md shadow-none rounded-none hover:bg-transparent ${selectedTab === 0 && 'border-b-[3px] text-defaultOrange border-defaultOrange'}`}>
                Details
            </Button>
            <Button onClick={() => setSelectedTab(1)}
                className={`px-10 bg-transparent text-defaultBlue text-md shadow-none rounded-none hover:bg-transparent ${selectedTab === 1 && 'border-b-[3px] text-defaultOrange border-defaultOrange'}`}>
                Fees
            </Button>
        </div>
    );
}

export default StudentInfoTab;