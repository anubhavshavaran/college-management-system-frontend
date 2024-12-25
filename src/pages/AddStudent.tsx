import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import Organization from "@/constants/Organization.ts";
import CollegeStudentForm from "@/components/students/CollegeStudentForm.tsx";
import SchoolStudentForm from "@/components/students/SchoolStudentForm.tsx";

function AddStudent() {
    const {organization} = useOrganization();

    return (
        <div className="w-full p-4 pt-20">
            <div className="w-full p-6 rounded-xl bg-defaultGray">
                {organization === Organization.SCHOOL ? (
                    <SchoolStudentForm/>
                ) : (
                    <CollegeStudentForm/>
                )}
            </div>
        </div>
    );
}

export default AddStudent;