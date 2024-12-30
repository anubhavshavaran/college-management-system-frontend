import SchoolCategories from "@/components/categories/SchoolCategories.tsx";
import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import Organization from "@/constants/Organization.ts";
import CollegeCategories from "@/components/categories/CollegeCategories.tsx";
import {useSearchParams} from "react-router";
import StudentsData from "@/components/students/StudentsData.tsx";

function Students() {
    const {organization} = useOrganization();
    const [searchParams] = useSearchParams();
    const isCategory = searchParams.get("cat");

    return (
        <div className="w-full p-4 flex flex-col gap-4">
            {!isCategory && (organization === Organization.SCHOOL ? (
                <SchoolCategories/>
            ) : (
                <CollegeCategories/>
            ))}
            {isCategory && (
                <StudentsData/>
            )}
        </div>
    );
}

export default Students;