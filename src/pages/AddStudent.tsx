import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import Organization from "@/constants/Organization.ts";
import CollegeStudentForm from "@/components/students/CollegeStudentForm.tsx";
import SchoolStudentForm from "@/components/students/SchoolStudentForm.tsx";
import {useParams} from "react-router";

function AddStudent() {
    const {organization} = useOrganization();
    const {course} = useParams();

    return (
        <div className="w-full p-4">
            <div className="w-full p-6 rounded-xl bg-defaultGray">
                {organization === Organization.SCHOOL ? (
                    <SchoolStudentForm grade={course} />
                ) : (
                    <CollegeStudentForm course={course} />
                )}
            </div>
        </div>
    );
}

export default AddStudent;