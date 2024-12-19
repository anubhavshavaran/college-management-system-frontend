import {
    SidebarProvider
} from "@/components/ui/sidebar.tsx";
import {Outlet} from "react-router";
import Navbar from "@/components/dashboard/Navbar.tsx";
import DashSidebar from "@/components/dashboard/DashSidebar.tsx";

function Dashboard() {
    return (
        <SidebarProvider>
            <div className="w-full h-screen flex ">
                <DashSidebar />
                <main className="w-full">
                    <Navbar />
                    <Outlet />
                </main>
            </div>
        </SidebarProvider>
    );
}

export default Dashboard;