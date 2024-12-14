import {useSearchParams} from "react-router";
import {useEffect, useRef, KeyboardEvent} from "react";

function Searchbar() {
    const [searchParams, setSearchParams] = useSearchParams();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        function handleEvent(e: KeyboardEvent) {
            if (e.key === "/") {
                inputRef.current?.focus();
            }
        }

        window.addEventListener("keydown", handleEvent);

        return () => {
            window.removeEventListener("keydown", handleEvent);
        }
    }, []);

    function search(e: KeyboardEvent) {
        if (e.key === "Enter") {
            setSearchParams({query: e.target.value});
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
            />
        </div>
    );
}

export default Searchbar;