import {useState} from "react";

type InfoCardPropsType = {
    label: string;
    text: string;
}

function InfoCard({label, text}: InfoCardPropsType) {
    const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

    return (
        <div
            onMouseOver={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
            className="sm:w-full md:w-[250px] p-6 rounded-3xl bg-defaultGray flex justify-between items-end"
        >
            <div className="flex flex-col gap-2">
                <p className="text-xl font-light text-slate-600 capitalize">{label}</p>
                <p className="font-bold text-defaultBlue text-2xl">{text}</p>
            </div>
            <div className="w-12 h-12 rounded-full flex justify-center items-center" >
                <img
                    src={isMouseOver ? "/icons/blueArrow.png" : "/icons/whiteArrow.png"}
                    alt="Click"
                />
            </div>
        </div>
    );
}

export default InfoCard;