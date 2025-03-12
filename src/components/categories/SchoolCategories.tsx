import CategorySection from "@/components/ui/CategorySection.tsx";

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

    return (
        <>
            {schoolCategories.map((category, i) => (
                <CategorySection key={i} header={category.header} type={category.type} category={category.categories} />
            ))}
        </>
    );
}

export default SchoolCategories;