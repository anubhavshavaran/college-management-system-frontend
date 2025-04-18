import {useSearchParams} from "react-router";
import {useRef} from "react";

type SearchbarProps = {
    value: string;
    onChange: (value: string) => void;
    title: string;
    className?: string;
}

function Searchbar({title, className, value, onChange}: SearchbarProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const inputRef = useRef<HTMLInputElement>(null);

    function search(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && e.currentTarget.value !== '') {
            searchParams.set("query", e.currentTarget.value);
            setSearchParams(searchParams);
        }
    }

    return (
        <div className={`p-1 px-3 rounded-md bg-white flex justify-start items-center gap-2 border-[1.5px] border-gray-400 ${className}`}>
            <input
                className="w-full outline-none"
                placeholder={title}
                ref={inputRef}
                onKeyUp={search}
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    );
}

export default Searchbar;