function FeeInfoCard() {
    return (
        <div className="md:w-[250px] rounded-xl bg-white p-4 flex justify-center gap-3 border-[1px] border-gray-200">
            <img
                src="/icons/ruppeeSymbol.png"
                alt="Fees"
                width={60}
            />
            <div className="flex flex-col justify-center">
                <p className="text-sm font-normal text-defaultBlue">Fixed Fee</p>
                <p className="text-xl font-semibold">50,000</p>
            </div>
        </div>
    );
}

export default FeeInfoCard;