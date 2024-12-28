type ReceiptProps = {
    title: string
}

function Receipt({title}: ReceiptProps) {
    return (
        <div className="w-[400px] border-2 border-slate-700 rounded-lg p-4">
            <div className="w-full flex justify-between pb-2">
                <p className="font-semibold text-start capitalize">{title}</p>
                <p>Date: ___________</p>
            </div>
            <div className="flex flex-col gap-4 justify-center items-center">
                <img
                    src="/Logo.png"
                    width="40"
                    alt="Logo"
                />
                <div className="flex flex-col justify-center items-center">
                    <p>S.M.E Society</p>
                    <p className="font-semibold">Abdulkalam College</p>
                    <p>Vivekanand Nagar, Gadag-Betageri-582 103</p>
                </div>
                <p className="text-white px-2 py-1 bg-black rounded-lg">Fee Receipt</p>
            </div>
            <div className="flex flex-col justify-center items-start gap-1 mt-4">
                <p className="">Name of the student:</p>
                <p className="">Class:</p>
                <p className="">Reg no.:</p>
                <p className="">Mode of Payment:</p>
            </div>
            <table className="w-full mt-4">
                <tbody>
                <tr>
                    <td className="text-center border-black border-2">Particulars</td>
                    <td className="text-center border-black border-2">Amount</td>
                </tr>
                <tr>
                    <td className="border-2 p-[15px] border-black"></td>
                    <td className="border-2 p-[15px] border-black"></td>
                </tr>
                </tbody>
            </table>
            <div className="flex flex-col justify-center items-start gap-2 mt-4">
                <div className="w-full flex justify-between">
                    <p className="">Rs:_________</p>
                    <p className="">Rupees in Words:_____________________</p>
                </div>
                <div className="w-full border-b pt-4 border-black"/>
            </div>
            <div className="w-full flex justify-between py-12">
                <p>Accountant sign:_________</p>
                <p>Remitter sign:__________</p>
            </div>
        </div>
    );
}

export default Receipt;