import {formatCurrency} from "@/functions/formatCurrency.ts";

type FeeInfoCardProps = {
    label: string;
    value: string;
}

function FeeInfoCard({label, value}: FeeInfoCardProps) {
    return (
        <div className="md:w-[250px] rounded-xl bg-white p-4 flex justify-center gap-3 border-[1px] border-gray-200">
            <img
                src="/icons/ruppeeSymbol.png"
                alt="Fees"
                width={60}
            />
            <div className="flex flex-col justify-center">
                <p className="text-sm font-normal text-defaultBlue capitalize">{label}</p>
                <p className="text-xl font-semibold">{formatCurrency(Number(value))}</p>
            </div>
        </div>
    );
}

export default FeeInfoCard;