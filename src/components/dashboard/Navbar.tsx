import {SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {useUser} from "@/contexts/UserContextProvider.tsx";
import Searchbar from "@/components/dashboard/Searchbar.tsx";

function Navbar() {
    const {user} = useUser();
    return (
        <div className="w-full top-0 sticky bg-white z-10 border-b-2 border-gray-200 p-3 px-5 flex justify-between items-center">
            <div className="flex items-center justify-between gap-4">
                <SidebarTrigger/>
            </div>
            <div className="flex gap-3 items-center">
                <Searchbar />
                <div className="w-10 h-10 rounded-full bg-gray-200"/>
                <div className="flex flex-col justify-center items-start">
                    <p className="text-base font-medium">{user?.username}</p>
                    <p className="text-xs text-gray-400 font-normal capitalize">{user?.role}</p>
                </div>
            </div>
        </div>
    );
}

export default Navbar;