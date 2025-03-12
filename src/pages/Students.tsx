import SchoolCategories from "@/components/categories/SchoolCategories.tsx";
import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import Organization from "@/constants/Organization.ts";
import CollegeCategories from "@/components/categories/CollegeCategories.tsx";
import {useNavigate, useSearchParams} from "react-router";
import StudentsData from "@/components/students/StudentsData.tsx";
import {Button} from "@/components/ui/button.tsx";

function Students() {
    const {organization} = useOrganization();
    const [searchParams] = useSearchParams();
    const isCategory = searchParams.get("cat");
    const navigate = useNavigate();

    function navToAdd() {
        navigate(`/${organization}/addStudent`);
    }

    return (
        <div className="w-full p-4 flex flex-col gap-4">
            <>
                <Button
                    onClick={navToAdd}
                    className="bg-defaultGray p-5 shadow-none border-[1.5px] border-gray-400 rounded-xl hover:bg-defaultGray w-fit">
                    <img src="/icons/plus.png" width={18} alt="Add Student"/>
                    <p className="text-lg text-black font-normal ">Add Student</p>
                </Button>
                {!isCategory && (organization === Organization.SCHOOL ? (
                    <SchoolCategories/>
                ) : (
                    <CollegeCategories/>
                ))}
            </>
            {isCategory && (
                <StudentsData/>
            )}
        </div>
    );
}

export default Students;