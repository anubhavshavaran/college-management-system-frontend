import {useState} from "react";
import {useSearchParams} from "react-router";
import formatOrdinal from "@/functions/formatOrdinal.ts";
import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import Organization from "@/constants/Organization.ts";

type CategoryButtonProps = {
    label: string;
    text: string;
}

function CategoryButton({label, text}: CategoryButtonProps) {
    const {organization} = useOrganization();
    const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();

    let category: string;
    if (text.length >= 3) {
        category = text;
    } else {
        category = formatOrdinal(Number(text));
    }

    function handleClick() {
        searchParams.set("cat", text);
        setSearchParams(searchParams);
    }

    return (
        <div
            onClick={handleClick}
            onMouseOver={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
            className="sm:w-full md:w-[200px] p-4 rounded-[18px] bg-defaultGray flex justify-between items-end border-2 border-defaultOrange"
        >
            <div className="flex flex-col gap-1">
                <p className="text-base font-light text-slate-600 capitalize">{label}</p>
                <p className="font-bold text-defaultBlue text-lg uppercase">{organization === Organization.SCHOOL ? category : text}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white hover:bg-defaultBlue flex justify-center items-center">
                <img
                    src={isMouseOver ? "/icons/blueArrow.png" : "/icons/whiteArrow.png"}
                    alt="Click"
                />
            </div>
        </div>
    );
}

export default CategoryButton;