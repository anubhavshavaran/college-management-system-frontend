import CategorySection from "@/components/ui/CategorySection.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router";
import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";

const schoolCategories = [
    {
        type: "class",
        header: "pre-primary",
        categories: ['nursery', 'lkg', 'ukg']
    },
    {
        type: "class",
        header: "primary",
        categories: ['1', '2', '3', '4', '5', '6', '7', '8']
    },
    {
        type: "class",
        header: "high",
        categories: ['9', '10']
    },
    {
        type: "class",
        header: "passed out batch",
        categories: ['passed out']
    },
]

function SchoolCategories() {
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
            {schoolCategories.map((category, i) => (
                <CategorySection key={i} header={category.header} type={category.type} category={category.categories} />
            ))}
        </>
    );
}

export default SchoolCategories;