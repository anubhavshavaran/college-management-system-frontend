import CategorySection from "@/components/ui/CategorySection.tsx";

const schoolCategories = [
    {
        type: "class",
        header: "pre-primary",
        categories: ['nursery', 'LKG', 'UKG']
    },
    {
        type: "class",
        header: "primary",
        categories: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th']
    },
    {
        type: "class",
        header: "high",
        categories: ['9th', '10th']
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