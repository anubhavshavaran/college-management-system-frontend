import {
    SidebarProvider
} from "@/components/ui/sidebar.tsx";
import {Outlet, useNavigate} from "react-router";
import Navbar from "@/components/dashboard/Navbar.tsx";
import DashSidebar from "@/components/dashboard/DashSidebar.tsx";
import {useUser} from "@/contexts/UserContextProvider.tsx";
import {useEffect} from "react";
import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";

function Dashboard() {
    const {user} = useUser();
    const {organization} = useOrganization();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/auth");
            return;
        }

        if (user.role !== "CHAIRMAN" && user.organization !== location.pathname.split("/").at(1)?.toUpperCase()) {
            navigate(`/${user.organization.toLowerCase()}/dash`);
        }
    }, [organization, user]);

    return (
        <SidebarProvider>
            <div className="w-full h-screen flex">
                <DashSidebar/>
                <main className="w-full">
                    <Navbar/>
                    <Outlet/>
                </main>
            </div>
        </SidebarProvider>
    );
}

export default Dashboard;