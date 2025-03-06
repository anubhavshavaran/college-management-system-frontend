import {SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {useUser} from "@/contexts/UserContextProvider.tsx";
import Searchbar from "@/components/dashboard/Searchbar.tsx";

function Navbar() {
    const {user} = useUser();
    return (
        <div className="w-full bg-white z-10 border-b-2 border-gray-200 p-3 px-5 flex justify-between items-center">
            <SidebarTrigger/>
            <div className="flex gap-3 items-center">
                <Searchbar/>
                <div className="flex flex-col justify-center items-start">
                    <p className="text-base font-medium">{user?.username}</p>
                    <p className="text-xs text-gray-400 font-normal capitalize">{user?.role}</p>
                </div>
            </div>
        </div>
    );
}

export default Navbar;