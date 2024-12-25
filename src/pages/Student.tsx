import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import StudentInfoTab from "@/components/ui/StudentInfoTab.tsx";
import {useState} from "react";
import Organization from "@/constants/Organization.ts";
import SchoolStudentForm from "@/components/students/SchoolStudentForm.tsx";
import CollegeStudentForm from "@/components/students/CollegeStudentForm.tsx";
import FeeData from "@/components/students/FeeData.tsx";

function Student() {
    const {organization} = useOrganization();
    const [selectedTab, setSelectedTab] = useState<number>(0);

    return (
        <div className="w-full p-6 pt-20">
            <div className="w-full p-6 rounded-2xl bg-defaultGray flex flex-col gap-6">
                <StudentInfoTab selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>

                {selectedTab === 0 ? organization === Organization.SCHOOL ? (
                    <SchoolStudentForm />
                ) : (
                    <CollegeStudentForm />
                ) : (
                    <FeeData />
                )}
            </div>
        </div>
    );
}

export default Student;