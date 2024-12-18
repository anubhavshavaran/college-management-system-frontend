import {MdArrowOutward} from "react-icons/md";

type InfoCardPropsType = {
    label: string;
    text: string;
}

function InfoCard({label, text}: InfoCardPropsType) {
    return (
        <div className="sm:w-full md:w-[250px] p-6 rounded-2xl bg-defaultGray flex justify-between items-end">
            <div className="flex flex-col gap-4">
                <p className="text-xl font-light text-slate-600 capitalize">{label}</p>
                <p className="font-bold text-defaultBlue text-2xl">{text}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white hover:bg-defaultBlue flex justify-center items-center" >
                <MdArrowOutward size={20} />
            </div>
        </div>
    );
}

export default InfoCard;