import {CiSearch} from "react-icons/ci";
import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import Organization from "@/constants/Organization.ts";
import {useState} from "react";
import {useSearchStudents} from "@/hooks/students.ts";
import Spinner from "@/components/ui/Spinner.tsx";
import {MdArrowOutward} from "react-icons/md";
import {FaRegUser} from "react-icons/fa6";
import {useNavigate} from "react-router";
import Student from "@/constants/Student.ts";

type ResultProps = {
    id: string;
    name: string;
    idNumber: string;
    onNavigate: () => void;
}

function Result({id, name, idNumber, onNavigate}: ResultProps) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`students/${id}`);
        onNavigate();
    }

    return (
        <div
            onClick={handleClick}
            className="w-full px-2 py-1 flex justify-between items-center hover:bg-slate-100"
        >
            <div className="flex justify-center items-center gap-2">
                <div className="bg-slate-200 p-3 rounded-full flex items-center justify-center">
                    <FaRegUser size={12} className="text-slate-400"/>
                </div>
                <div className="flex flex-col">
                    <p className="text-black text-sm capitalize">name: {name}</p>
                    <p className="text-slate-400 text-xs capitalize">ID: {idNumber}</p>
                </div>
            </div>
            <MdArrowOutward size={12} className="text-slate-400"/>
        </div>
    );
}

function Searchbar() {
    const {organization} = useOrganization();
    const [value, setValue] = useState<string | undefined>(undefined);
    const isEnabled = value !== undefined && value !== '';
    const {results, isSearching, isFetched} = useSearchStudents(organization, isEnabled, value);
    const showResults: boolean = isFetched && results?.length > 0;

    return (
        <div className="sm:w-full md:w-[400px] md:mr-8">
            <div className={`relative border-2 border-slate-200 rounded-t-xl p-2 ${!showResults && 'rounded-b-xl'}`}>
                <div className="flex justify-start items-center px-2 gap-2">
                    <CiSearch size={28} className="text-slate-400"/>
                    <input
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value)
                        }}
                        className="w-full border-none outline-none p-0 text-slate-400"
                        placeholder={`Search by name, ${organization === Organization.COLLEGE ? 'registration number' : 'SATS number'}`}
                    />
                </div>
            </div>
            <div
                className={`w-[400px] absolute bg-white flex justify-center ${showResults && 'border-b-2 border-x-2 border-slate-200 rounded-b-xl'}`}
            >
                {isSearching && isEnabled && (
                    <Spinner/>
                )}
                {showResults && (
                    <div className="w-full flex flex-col items-center">
                        {results?.map((item: Student, i: number) => (
                            <Result
                                key={i}
                                id={item._id ?? ''}
                                name={item.name ?? ''}
                                idNumber={organization === Organization.SCHOOL ? item.satsNumber ?? '' : item.registrationNumber ?? ''}
                                onNavigate={() => setValue(undefined)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Searchbar;