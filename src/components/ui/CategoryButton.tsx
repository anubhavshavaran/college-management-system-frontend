import {useState} from "react";
import {useSearchParams} from "react-router";

type CategoryButtonProps = {
    label: string;
    text: string;
}

function CategoryButton({label, text}: CategoryButtonProps) {
    const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();

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
                <p className="font-bold text-defaultBlue text-lg capitalize">{text}</p>
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