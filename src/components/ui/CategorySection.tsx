import CategoryButton from "@/components/ui/CategoryButton.tsx";

type CategorySectionProps = {
    header: string;
    type: string;
    category: Array<string>;
}

function CategorySection({header, type, category}: CategorySectionProps) {
    return (
        <div className="flex flex-col gap-6">
            <div className="w-full pb-5 border-b-2 border-defaultBlue capitalize text-defaultBlue font-normal text-base">
                {header}
            </div>
            <div className="flex sm:flex-col md:flex-row flex-wrap gap-y-4 gap-x-8">
                {category.map((c, i) => (
                    <CategoryButton label={`select ${type}`} text={c} key={i} collegePassedOut={header === "passed out batches"} />
                ))}
            </div>
        </div>
    );
}

export default CategorySection;