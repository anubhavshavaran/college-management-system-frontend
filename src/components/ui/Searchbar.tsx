import {useSearchParams} from "react-router";
import {useEffect, useRef, KeyboardEvent} from "react";

type SearchbarProps = {
    value: string;
    onChange: (value: string) => void;
}

function Searchbar({value, onChange}: SearchbarProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        function handleEvent(this: Window, ev: KeyboardEvent){
            if (ev.key === "/") {
                inputRef.current?.focus();
            }
        }

        window.addEventListener("keydown", handleEvent);

        return () => {
            window.removeEventListener("keydown", handleEvent);
        }
    }, []);

    function search(e: KeyboardEvent) {
        if (e.key === "Enter" && e.target.value !== '') {
            searchParams.set("query", e.target.value);
            setSearchParams(searchParams);
        }
    }

    return (
        <div className="p-1 px-3 rounded-md bg-white flex justify-start items-center gap-2 border-[1.5px] border-gray-400">
            <input
                type="search"
                className="outline-none"
                placeholder="Search"
                ref={inputRef}
                onKeyUp={search}
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    );
}

export default Searchbar;