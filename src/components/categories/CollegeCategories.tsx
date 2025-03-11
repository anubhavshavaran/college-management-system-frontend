import CategorySection from "@/components/ui/CategorySection.tsx";
import {useNavigate} from "react-router";
import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import {Button} from "@/components/ui/button.tsx";

const collegeCategories = [
    {
        type: "course",
        header: "under graduate courses",
        categories: ['bba', 'bca', 'bcom', 'ba', 'bsc']
    },
    {
        type: "course",
        header: "post graduate courses",
        categories: ['msc']
    },
    {
        type: "course",
        header: "passed out batches",
        categories: ['bba', 'bca', 'bcom', 'ba', 'bsc', 'msc']
    },
]

function CollegeCategories() {
    const navigate = useNavigate();
    const {organization} = useOrganization();

    function navToAdd() {
        navigate(`/${organization}/addStudent`);
    }

    return (
        <>
            <Button
                onClick={navToAdd}
                className="bg-defaultGray p-5 shadow-none border-[1.5px] border-gray-400 rounded-xl hover:bg-defaultGray w-fit">
                <img src="/icons/plus.png" width={18} alt="Add Student"/>
                <p className="text-lg text-black font-normal ">Add Student</p>
            </Button>
            {collegeCategories.map((category, i) => (
                <CategorySection key={i} header={category.header} type={category.type} category={category.categories} />
            ))}
        </>
    );
}

export default CollegeCategories;