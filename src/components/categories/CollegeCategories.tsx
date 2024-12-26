import CategorySection from "@/components/ui/CategorySection.tsx";

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
    return (
        <>
            {collegeCategories.map((category, i) => (
                <CategorySection key={i} header={category.header} type={category.type} category={category.categories} />
            ))}
        </>
    );
}

export default CollegeCategories;