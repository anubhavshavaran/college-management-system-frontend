import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import {useSearchParams} from "react-router";
import Organization from "@/constants/Organization.ts";
import SchoolCategories from "@/components/categories/SchoolCategories.tsx";
import CollegeCategories from "@/components/categories/CollegeCategories.tsx";
import StudentsData from "@/components/students/StudentsData.tsx";

function Fees() {
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
                <StudentsData fromFees/>
            )}
        </div>
    );
}

export default Fees;