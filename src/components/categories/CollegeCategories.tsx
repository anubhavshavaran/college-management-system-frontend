import CategorySection from "@/components/ui/CategorySection.tsx";

const collegeCategories = [
    {
        type: "course",
        header: "under graduate courses",
        categories: ['BBA', 'BCA', 'BCom', 'BA', 'BSc']
    },
    {
        type: "course",
        header: "post graduate courses",
        categories: ['MSc']
    },
    {
        type: "course",
        header: "passed out batches",
        categories: ['BBA', 'BCA', 'BCom', 'BA', 'BSc', 'MSc']
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