import {Sidebar, SidebarContent, SidebarGroup, SidebarHeader} from "@/components/ui/sidebar.tsx";
import SidebarButton from "@/components/dashboard/SidebarButton.tsx";
import {LuLayoutDashboard} from "react-icons/lu";
import {PiStudentBold} from "react-icons/pi";
import {IoReceiptOutline} from "react-icons/io5";
import {GrDocumentText} from "react-icons/gr";

function DashSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="w-full p-4 flex flex-row justify-start items-center">
                <img
                    src="/Logo.png"
                    alt="Logo"
                    className="w-12"
                />
                <p className="text-2xl font-semibold">APJ School</p>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="pr-0">
                    <SidebarButton title="dashboard" path="dash" icon={<LuLayoutDashboard/>} />
                    <SidebarButton title="students" path="students" icon={<PiStudentBold/>} />
                    <SidebarButton title="fees" path="fees" icon={<IoReceiptOutline/>} />
                    <SidebarButton title="student docs" path="docs" icon={<GrDocumentText />} />
                    <SidebarButton title="vouchers" path="vouchers" icon={<GrDocumentText/>} />
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}

export default DashSidebar;