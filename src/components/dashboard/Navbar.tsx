import {SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";
import {NavLink} from "react-router";
import {useUser} from "@/contexts/UserContextProvider.tsx";

function Navbar() {
    const {user} = useUser();
    return (
        <div className="w-full top-0 fixed bg-white z-10 border-b-2 border-gray-200 p-3 px-5 flex justify-between items-center">
            <div className="flex items-center justify-between gap-4">
                <SidebarTrigger/>
                {/*<Breadcrumb className="sm:hidden md:block">*/}
                {/*    <BreadcrumbList>*/}
                {/*        <BreadcrumbItem>*/}
                {/*            <NavLink to="">Home</NavLink>*/}
                {/*        </BreadcrumbItem>*/}
                {/*        <BreadcrumbSeparator />*/}
                {/*        <BreadcrumbItem>*/}
                {/*            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>*/}
                {/*        </BreadcrumbItem>*/}
                {/*    </BreadcrumbList>*/}
                {/*</Breadcrumb>*/}
            </div>
            <div className="flex gap-3 items-center">
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